import React, { useEffect } from "react";
import { Row, Col, Card, Typography } from "antd";

import { useGetNewsQuery } from "../../services/newsApi";
import { placeholderImage } from "../../assets/images";
import { ImgItem, PageTitle } from "../modules";

import "./style.css";

const News = ({ short = false, query = "anime" }) => {
  const { data, isFetching } = useGetNewsQuery(query);

  const newsSlice = short ? [0, 6] : [0];

  useEffect(() => {
    document.title = "News";
  }, []);

  return (
    <>
      {!short && <PageTitle title="News" container />}
      <Row gutter={[3, 3]} className={`news ${short ? "" : "container"}`}>
        {(!data || isFetching) && "Loading news..."}
        {data &&
          !isFetching &&
          data.news.slice(...newsSlice).map((item, i) => (
            <Col className="news-item" key={i}>
              <a href={item.url} target="_blank" rel="noreferrer">
                <Card className="news-card" hoverable>
                  <Typography.Title className="news-title" level={5}>
                    {item.title}
                  </Typography.Title>

                  <p className="news-info">
                    <ImgItem
                      src={item.image ?? placeholderImage}
                      fallback={placeholderImage}
                      placeholder={placeholderImage}
                    />{" "}
                    {item.body}
                  </p>
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
