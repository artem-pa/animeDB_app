import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Flex, Table, Spin } from "antd";
import millify from "millify";

import { useLazyGetAnimeListFullUrlQuery } from "../../services/malApi";
import { mokList } from "../../helpers/mokData";
import { normalize } from "../../helpers/helpers";
import "./style.css";

const { Column } = Table;

const AnimeList = ({ method, methodParam, isRanking }) => {
  const { pageType } = methodParam;
  const { data, isFetching, isError } = method(methodParam);
  const [getNextPage, { data: nextPageData, isFetching: nextPageFetching }] =
    useLazyGetAnimeListFullUrlQuery();
  const [nextPageUrl, setNextPageUrl] = useState();
  // const [data, isFetching] = [mokList, 0];
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (!isFetching && data && data.data) {
      addTableData(data);
      setNextPageUrl(data.paging?.next);
    }
    if (isError) {
      setTableData([]);
      setNextPageUrl(null);
    }

    return () => setTableData([]);
  }, [isFetching, methodParam]);

  useEffect(() => {
    if (!nextPageFetching && nextPageData && nextPageData.data) {
      addTableData(nextPageData, true);
      setNextPageUrl(nextPageData.paging?.next);
    }
  }, [nextPageFetching]);

  const addTableData = (data, isAdd = false) => {
    const oldData = isAdd ? tableData : [];
    setTableData([
      ...oldData,
      ...data.data.map((item) => {
        const nItem = normalize(item.node);
        return {
          key: methodParam.pageType + methodParam.topType + item.node.id,
          rank: item.ranking?.rank,
          title: (
            <Flex gap={5}>
              <Link
                className="animelist__table-image"
                to={`/${pageType}/${nItem.id}`}
                style={{ backgroundImage: nItem.main_picture }}
              />
              <Flex vertical gap={10}>
                <Link
                  style={{ color: "var(--primary)", fontWeight: 500 }}
                  to={`/${pageType}/${nItem.id}`}
                >
                  {nItem.title}
                </Link>
                <p>{nItem.synopsis}</p>
              </Flex>
            </Flex>
          ),
          type: nItem.media_type,
          eps: nItem.num_episodes ? nItem.num_episodes : "-",
          vol: nItem.num_volumes ? nItem.num_volumes : "-",
          score: nItem.mean ? nItem.mean : "-",
          members: millify(item.node.num_list_users),
        };
      }),
    ]);
  };

  return (
    <>
      {(isFetching || nextPageFetching) && (
        <Spin fullscreen size="large" style={{ pointerEvents: "all" }} />
      )}
      <div className="animelist">
        <Table
          className="animelist__table"
          dataSource={tableData}
          pagination={false}
        >
          {isRanking && (
            <Column
              className="animelist__table-rank"
              title="Rank"
              dataIndex="rank"
              key="rank"
            />
          )}
          <Column
            className="animelist__table-title"
            title="Title"
            dataIndex="title"
            key="title"
          />
          <Column title="Type" dataIndex="type" key="type" />
          {pageType === "anime" && (
            <Column title="Eps." dataIndex="eps" key="eps" />
          )}
          {pageType === "manga" && (
            <Column title="Vol." dataIndex="vol" key="vol" />
          )}
          <Column title="Score" dataIndex="score" key="score" />
          <Column title="Members" dataIndex="members" key="members" />
        </Table>
      </div>
      {isFetching ||
        (nextPageUrl && (
          <Button
            type="primary"
            style={{
              background: "var(--primary)",
              margin: "20px auto 20px",
              display: "block",
            }}
            onClick={() => getNextPage(nextPageUrl)}
          >
            Show More
          </Button>
        ))}
    </>
  );
};

export default AnimeList;
