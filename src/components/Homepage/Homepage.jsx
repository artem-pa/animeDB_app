import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Flex, Col, Image, Skeleton } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import "react-alice-carousel/lib/alice-carousel.css";

import { youtubeApi } from "../../services/youtubeApi";
import { AnimeSlider, ImgItem, Slider, UnderscoreTitle } from "../modules";
import {
  mainPoster,
  mainPosterBlur,
  mainPosterMob,
  mainPosterMobBlur,
} from "../../assets/images";
import "./style.css";
import { mokList, mokYoutube } from "../../helpers/mokData";
import { getSeason, firstL, normalize } from "../../helpers/helpers";
import { malApi } from "../../services/malApi";

const { Title } = Typography;

const Homepage = () => {
  const seasons = [getSeason(), getSeason(-3), getSeason(3)];
  const tops = [
    ["Top Airing Anime", "airing", 3],
    ["Top Upcoming Anime", "upcoming", 3],
    ["Most Popular Anime", "bypopularity", 5],
  ];

  const youtubeData = youtubeApi.useGetSearchQuery();
  const seasonData = seasons.map((s) =>
    malApi.useGetAnimeSeasonQuery({ ...s, limit: 12 })
  );
  const topData = tops.map((top) =>
    malApi.useGetAnimeRankingQuery({
      pageType: "anime",
      topType: top[1],
      limit: top[2],
    })
  );
  const seasonTitle = ["Current", "Previous", "Upcoming"];

  useEffect(() => {
    console.log(topData);
    return () => (document.title = "MyAnimeDB");
  }, []);

  return (
    <>
      <div className="homepage">
        <Link className="homepage__poster" to="/anime/51535">
          <ImgItem
            rootClassName="desktop"
            className="homepage__poster-img"
            src={mainPoster}
            placeholder={mainPosterBlur}
            alt="poster"
          />
          <ImgItem
            rootClassName="mobile"
            className="homepage__poster-img"
            src={mainPosterMob}
            placeholder={mainPosterMobBlur}
            alt="poster"
          />
        </Link>
        <div className="container">
          <Title className="homepage__title">Welcome to MyAnimeDB!</Title>
          <Flex className="homepage__content">
            <div className="homepage__left">
              <p className="homepage__description">
                Explore the vast universe of anime and manga on MyAnimeDB, where
                you can delve into detailed information on each title, discover
                top-ranked anime and manga, browse by seasons, or find your
                favorite creations effortlessly through our powerful search
                feature. Uncover the richness of the anime and manga realm now!
              </p>
              <div className="homepage__block">
                <UnderscoreTitle title="Popular Anime Trailers" />
                {youtubeData.data && (
                  <Slider type={0}>
                    {youtubeData.data.items.map((item, i) => (
                      <Image
                        key={i}
                        style={{ width: "95%" }}
                        src={item.snippet.thumbnails.medium.url}
                        preview={{
                          imageRender: () => (
                            <iframe
                              style={{
                                width: "90vw",
                                maxHeight: "95vh",
                                aspectRatio: "16/9",
                              }}
                              src={`https://www.youtube.com/embed/${item.id.videoId}?enablejsapi=1&wmode=opaque&autoplay=1`}
                              title="YouTube video player"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            ></iframe>
                          ),
                          toolbarRender: () => {},
                          mask: (
                            <span className="homepage__youtube-mask">
                              <PlayCircleOutlined className="icon" />
                              Play
                            </span>
                          ),
                          title: "watch",
                          destroyOnClose: true,
                        }}
                      />
                    ))}
                  </Slider>
                )}
                {youtubeData.isFetching && (
                  <Slider type={0} disableButtonsControls>
                    {Array(4)
                      .fill()
                      .map(() => (
                        <Skeleton.Image
                          active
                          rootClassName="homepage__youtube-skeleton"
                          style={{ width: "100%", height: "100%" }}
                        />
                      ))}
                  </Slider>
                )}
              </div>

              {seasonData.map((season, i) => (
                <div className="homepage__block">
                  <AnimeSlider
                    key={i}
                    data={season.data}
                    loading={season.isFetching}
                    title={
                      <Flex justify="space-between">
                        <span>{`${firstL(seasons[i].season)} ${
                          seasons[i].year
                        } – ${seasonTitle[i]} Season`}</span>
                        <Link
                          className="view-more"
                          to={`/season/${seasons[i].year}/${seasons[i].season}`}
                        >
                          View More
                        </Link>
                      </Flex>
                    }
                  />
                </div>
              ))}
            </div>
            <div className="homepage__right">
              {topData.map((top, i) => (
                <div className="homepage__top" key={i}>
                  <Flex justify="space-between" className="homepage__top-title">
                    <span className="title">{tops[i][0]}</span>
                    <Link to={`/top/anime/${tops[i][1]}`}>More</Link>
                  </Flex>

                  <Col className="homepage__top-list">
                    {top.data &&
                      top.data.data.map((item) => {
                        const nItem = normalize(item.node);
                        return (
                          <Flex key={nItem.id} className="homepage__top-item">
                            <span className="rank">{item.ranking.rank}</span>
                            <Link
                              className="image"
                              style={{ backgroundImage: nItem.main_picture }}
                            />
                            <Flex vertical gap={10}>
                              <Link className="title" to={`/anime/${nItem.id}`}>
                                {nItem.title}
                              </Link>
                              <span className="description">
                                {`${nItem.media_type}, ${nItem.num_episodes} eps, scored ${nItem.mean ?? 'N/A'}`}
                                <br />
                                {`${nItem.num_list_users} members`}
                              </span>
                            </Flex>
                          </Flex>
                        );
                      })}
                    {top.isFetching &&
                      [null, null, null].map((item, i) => (
                        <Flex key={i} className="homepage__top-item">
                          <Skeleton.Image
                            active
                            style={{
                              width: 50,
                              height: 75,
                              margin: "0 5px 0 15px",
                            }}
                          />
                          <Skeleton
                            title={false}
                            paragraph={{
                              rows: 4,
                              width: [100, 0, "90%", "100%"],
                            }}
                            active
                          />
                        </Flex>
                      ))}
                  </Col>
                </div>
              ))}
            </div>
          </Flex>
        </div>
      </div>
    </>
  );
};

export default Homepage;
