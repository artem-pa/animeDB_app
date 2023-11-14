import React, { useEffect } from "react";
import { Row, Col, Card, Typography, Empty } from "antd";

import { useGetNewsQuery } from "../../services/newsApi";
import { placeholderImage } from "../../assets/images";
import { ImgItem, PageTitle } from "../modules";

import "./style.css";
import NewsSkeleton from "./NewsSkeleton";

const News = ({ short = false, query = "anime" }) => {
  const { data, isFetching, isError } = useGetNewsQuery(query);
  // const [data, isFetching, isError] = [mokNews, 1, 0];

  const newsSlice = short ? [0, 6] : [0];

  useEffect(() => {
    document.title = "News";
    console.log(22);
    console.log(
      (isError || (data?.news && data.news.length === 0)) && (
        <Empty style={{ marginTop: short ? 10 : 50 }} />
      )
    );
  }, []);

  return (
    <>
      {!short && <PageTitle title="News" container />}

      {(isError || (data?.news && data.news.length === 0)) && (
        <Empty style={{ marginTop: short ? 10 : 50 }} />
      )}

      <Row gutter={[3, 3]} className={`news ${short ? "" : "container"}`}>
        {isFetching && <NewsSkeleton short={short} />}

        {data &&
          !isFetching &&
          data.news.slice(...newsSlice).map((item, i) => (
            <Col className="news-item" key={i}>
              <a href={item.url} target="_blank" rel="noreferrer">
                <Card className="news-card" hoverable>
                  <Typography.Title className="news-title" level={5}>
                    {item.title}
                  </Typography.Title>
                  <div className="news-info">
                    <ImgItem
                      src={item.image ?? placeholderImage}
                      fallback={placeholderImage}
                      placeholder={placeholderImage}
                    />{" "}
                    {item.body}
                  </div>
                  <p className="news-end">
                    {item.date} <br />
                    {item.source}
                  </p>
                </Card>
              </a>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default News;
