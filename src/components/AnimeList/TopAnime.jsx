import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs } from "antd";

import { useGetAnimeRankingQuery } from "../../services/malApi";
import { firstL, topRoutes } from "../../helpers/helpers";
import { PageTitle } from "../modules";
import AnimeList from "./AnimeList";

const TopAnime = ({ pageType, topType }) => {
  useEffect(() => {
    document.title = `Top ${firstL(pageType)} - ${
      topRoutes[pageType][topType]
    }`;
  });

  return (
    <div className="container topanime">
      <PageTitle
        title={`Top ${pageType}`}
        subTitle={topRoutes[pageType][topType]}
      />
      <Tabs
        activeKey={topType}
        type="line"
        items={Object.keys(topRoutes[pageType]).map((key) => ({
          key,
          label: (
            <Link
              className="topanime__tab"
              key={key}
              to={`/top/${pageType}/${key}`}
            >
              {topRoutes[pageType][key]}
            </Link>
          ),
          children: (
            <AnimeList
              isRanking
              method={useGetAnimeRankingQuery}
              methodParam={{ pageType, topType }}
            />
          ),
        }))}
      />
      <br />
    </div>
  );
};

export default TopAnime;
