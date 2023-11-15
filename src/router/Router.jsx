import React from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";

import { Homepage, Page404, AnimeItem, TopAnime, News, SeasonAnime } from "../components";
import { topRoutes } from "../helpers/helpers";

const isValidUrl = (pageType) => {
  return /^anime|manga$/.test(pageType.toLowerCase());
};

const AnimeItemRoute = () => {
  const { pageType, itemId } = useParams();
  if (!isValidUrl(pageType)) return;
  const isManga = pageType === "manga";
  if (!itemId || isNaN(+itemId)) return <Page404 />;
  return <AnimeItem {...{ pageType, itemId, manga: isManga }} />;
};

const TopAnimeRoute = () => {
  const { pageType, topType } = useParams();
  if (!isValidUrl(pageType)) return <Page404 />;
  if (topType && !topRoutes[pageType][topType]) return <Page404 />;
  return (
    <TopAnime
      {...{ pageType, topType: topType ? topType.toLowerCase() : "all" }}
    />
  );
};

const SeasonAnimeRoute = () => {
  const today = new Date();
  const currentSeason = { year: today.getFullYear() };
  // for (const [key, arr] of Object.entries(seasonRoutes)) {
  //   if (arr.includes(today.getMonth())) currentSeason.season = key;
  // }

  
  return <SeasonAnime {...{currentSeason, pageType: 'anime'}} />
};

const Router = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:pageType/:itemId" element={<AnimeItemRoute />} />
        <Route path="/top/:pageType/:topType?" element={<TopAnimeRoute />} />
        <Route path="/season/:year?/:season?" element={<SeasonAnime />} />
        <Route path="/search/:pageType" element={"search xcv"} />
        <Route path="/news" element={<News />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </main>
  );
};

export default Router; 
