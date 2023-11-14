import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Flex, Badge, Row, Col } from "antd";
import { PieChart } from "react-minimal-pie-chart";

import { malApi } from "../../services/malApi";
import { normalize } from "../../helpers/helpers";
import { PageTitle, UnderscoreTitle } from "../modules";
import News from "../News/News";
import InfoItem from "./InfoItem";
import "./style.css";

const AnimeItem = ({ manga }) => {
  const { itemId } = useParams();
  const pageType = manga ? "manga" : "anime";
  const { data, isFetching, isError } = malApi.useGetAnimeInfoQuery({
    type: pageType,
    itemId,
  });
  const [nData, setNData] = useState({});

  const getInfoList = () => {
    const result = [];

    const getItem = (title, text) => text && [title, text];

    // Alternative Titles
    if (data?.alternative_titles) {
      result.push({
        title: "Alternative Titles",
        list: [
          getItem("Synonyms", nData.synonyms),
          getItem("Japanese", nData.ja),
          getItem("English", nData.en),
        ],
      });
    }

    // Information
    result.push({
      title: "Information",
      list: manga
        ? [
            getItem("Type", nData.media_type),
            getItem("Volumes", nData.num_volumes),
            getItem("Chapters", nData.num_chapters),
            getItem("Status", nData.status),
            getItem("Published", nData.date),
            getItem("Genres", nData.genres),
            getItem("Serialization", nData.serialization),
            getItem("Authors", nData.authors),
          ]
        : [
            getItem("Type", nData.media_type),
            getItem("Episodes", nData.num_episodes),
            getItem("Status", nData.status),
            getItem("Aired", nData.date),
            getItem("Premiered", nData.start_season),
            getItem("Broadcast", nData.broadcast),
            getItem("Studios", nData.studios),
            getItem("Source", nData.source),
            getItem("Genres", nData.genres),
            getItem("Duration", nData.duration),
            getItem("Rating", nData.rating),
          ],
    });

    //Statistics
    result.push({
      title: "Statistics",
      list: [
        getItem("Score", nData.mean),
        getItem("Ranked", nData.rank),
        getItem("Popularity", nData.popularity),
        getItem("Members", nData.num_list_users),
      ],
    });

    return result;
  };

  const getRelated = () => {
    const related = manga ? data.related_manga : data.related_anime;
    const result = [];
    const types = new Set();

    related.forEach((item) => types.add(item.relation_type_formatted));

    types.forEach((item) => {
      const links = related
        .filter((el) => el.relation_type_formatted === item)
        .map((el, i) => (
          <span key={i}>
            {i > 0 ? ", " : ""}
            <Link key={i} to={`/${pageType}/${el.node.id}`}>
              {el.node.title}
            </Link>
          </span>
        ));

      result.push([item, links]);
    });
    return result;
  };

  const getPie = () => {
    const { status } = data.statistics;
    return [
      { title: "Watching", value: +status.watching, color: "#c0c0c0" },
      { title: "Completed", value: +status.completed, color: "#2E51A2" },
      { title: "On-Hold", value: +status.on_hold, color: "#0b1428" },
      { title: "Dropped", value: +status.dropped, color: "#88a1dd" },
      {
        title: "Plan to Watch",
        value: +status.plan_to_watch,
        color: "#d7e0f4",
      },
    ];
  };

  useEffect(() => {
    data && (document.title = data.title);
    data && setNData(normalize(data));
  }, [isFetching]);

  if (isFetching) return "Loading...";
  if (isError) return "ERROR!";

  return (
    
    <div className="anime container">
      <PageTitle title={data.title} subTitle={data?.alternative_titles?.en} />
      <Flex className="anime__content">
        <div className="anime__left">
          <div className="anime__poster">
            <img src={data.main_picture.medium} alt="poster" />
          </div>
          {getInfoList().map((item, i) => (
            <InfoItem info={item} key={i} />
          ))}
        </div>
        <div className="anime__right">
          <p className="anime__updated">
            Last updated: {new Date(data.updated_at).toUTCString().slice(5, -4)}
          </p>
          <Row className="anime__head">
            {data.mean && <Row className="anime__head-left">
              <Col>
                <Col className="anime__head-score">
                  <span className="score">score</span>
                  <span className="number">{nData.mean}</span>
                </Col>
                <span className="members">{nData.num_scoring_users + ' users'}</span>
              </Col>
            </Row>}
            <Col className="anime__head-right">
              <Row className="anime__head-top">
                <Col>
                  Ranked <span>{nData.rank}</span>
                </Col>
                <Col>
                  Popularity <span>{nData.popularity}</span>
                </Col>
                <Col>
                  Members <span>{nData.num_list_users}</span>
                </Col>
              </Row>
              {manga ? (
                <Row className="anime__head-bottom">
                  <span>{nData.media_type}</span>
                  <span>{nData.serialization}</span>
                  <span>{nData.authors}</span>
                </Row>
              ) : (
                <Row className="anime__head-bottom">
                  <span>{nData.start_season}</span>
                  <span>{nData.media_type}</span>
                  <span>{nData.studios}</span>
                </Row>
              )}
            </Col>
          </Row>
          {/* SYNOPSIS */}
          <InfoItem
            style={{ whiteSpace: "pre-line" }}
            info={{ title: "Synopsis", list: [["", data.synopsis]] }}
          />
          {/* BACKGROUND */}
          {data.background && (
            <InfoItem
              style={{ whiteSpace: "pre-line" }}
              info={{ title: "Background", list: [["", data.background]] }}
            />
          )}
          {/* RELATED ANIME */}
          {!!data.related_anime?.length && (
            <InfoItem info={{ title: "Related anime", list: getRelated() }} />
          )}
          {/* RELATED MANGA */}
          {!!data.related_manga?.length && (
            <InfoItem info={{ title: "Related manga", list: getRelated() }} />
          )}
          {/* SUMMARY STATS PIE */}
          {!manga && (
            <div className="anime__block">
              <UnderscoreTitle title="Summary Stats" />
              <div className="anime__pie-labels">
                {getPie().map((item) => (
                  <Badge
                    className="anime__pie-label"
                    color={item.color}
                    text={
                      <>
                        <span className="bold">{item.title}: </span>
                        {item.value.toLocaleString("en")}
                      </>
                    }
                    key={item.title}
                  />
                ))}
                <span className="anime__pie-label">
                  <span className="bold">Total:</span>{" "}
                  {data.statistics.num_list_users.toLocaleString("en")}
                </span>
              </div>
              <PieChart
                data={getPie()}
                style={{ margin: "-10% 0", transform: "scale(.7)" }}
                radius={50}
                animate
              />
            </div>
          )}
          {/* NEWS */}
          {data.title && data.popularity < 5e3 && (
            <div className="anime__block">
              <UnderscoreTitle title="News" />
              <News short query={data.title} />
            </div>
          )}
        </div>
      </Flex>
    </div>
  );
};

export default AnimeItem;
