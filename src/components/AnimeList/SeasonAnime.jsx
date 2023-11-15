import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Select, InputNumber, Button } from "antd";

import { useGetAnimeSeasonQuery } from "../../services/malApi";
import { seasonList, firstL } from "../../helpers/helpers";
import { PageTitle } from "../modules";
import AnimeList from "./AnimeList";

const SeasonAnime = () => {
  const season = useParams();
  const [stateSeason, setStateSeason] = useState(season);
  const [formSeason, setFormSeason] = useState(season);
  const navigate = useNavigate();

  const getCurrentSeason = () => {
    const today = new Date();
    let year = today.getFullYear();
    let season;
    for (const [key, arr] of Object.entries(seasonList)) {
      if (arr.includes(today.getMonth())) season = key;
    }

    return { year, season };
  };

  useEffect(() => {
    if (!season.season || !season.year) {
      setStateSeason(getCurrentSeason());
      setFormSeason(getCurrentSeason());
    } else {
      setStateSeason(season);
    }
  }, [season]);

  useEffect(() => {
    document.title = `Seasonal Anime - ${firstL(stateSeason.season)} ${
      stateSeason.year
    }`;
  }, [stateSeason]);

  return (
    <div className="container season">
      <PageTitle
        title={"Seasonal Anime"}
        subTitle={`${firstL(stateSeason.season)} ${stateSeason.year}`}
      />

      <Form className="season__form">
        <Select
          value={formSeason.season}
          onChange={(e) => setFormSeason({ ...formSeason, season: e })}
          style={{ width: 100, margin: "0 8px" }}
        >
          {Object.keys(seasonList).map((key) => (
            <Select.Option key={key} value={key}>
              {firstL(key)}
            </Select.Option>
          ))}
        </Select>
        <InputNumber
          min={1900}
          max={getCurrentSeason().year + 1}
          value={formSeason.year}
          onChange={(e) => setFormSeason({ ...formSeason, year: e })}
          style={{ width: 100, margin: "0 8px" }}
        />
        <Button
          onClick={() =>
            navigate(`/season/${formSeason.year}/${formSeason.season}`)
          }
          style={{ width: 100, background: "var(--primary)" }}
          type="primary"
        >
          Go
        </Button>
      </Form>

      {stateSeason.year && (
        <AnimeList
          method={useGetAnimeSeasonQuery}
          methodParam={{ ...stateSeason, pageType: "anime" }}
        />
      )}
    </div>
  );
};

export default SeasonAnime;
