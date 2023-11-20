import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Flex, Select, Input, AutoComplete } from "antd";

import { malApi } from "../../services/malApi";
import { normalize } from "../../helpers/helpers";

let searchDelay = null;

const Search = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [loading, setLoading] = useState(false)
  const [getAnime, { data: animeData, isFetching: animeFetching }] =
    malApi.useLazyGetAnimeSearchQuery();
  const [getManga, { data: mangaData, isFetching: mangaFetching }] =
    malApi.useLazyGetAnimeSearchQuery();
  const navigate = useNavigate();

  const getOptions = () => {
    if (query === "" || query.length <= 2) return [];

    let result = [];
    if (animeData && mangaData && !loading) {
      if (type !== "manga" && animeData.data?.length) {
        result.push({
          key: "anime",
          label: (
            <Link
              to={`/search/anime?q=${query}`}
              className="search__popup-category"
            >
              Anime
            </Link>
          ),
        });

        const animes = animeData.data.map((item, i) => {
          const {
            id,
            title,
            media_type,
            main_picture,
            mean,
            year,
            status,
            date,
          } = normalize(item.node);
          return {
            key: "anime" + i,
            label: (
              <Link to={`/anime/${id}`} className="search__item">
                <div
                  className="left"
                  style={{ backgroundImage: main_picture }}
                ></div>
                <Flex className="rigth" vertical>
                  <span className="title">
                    {title} <span>({media_type})</span>{" "}
                  </span>
                  <span className="short-info">
                    ({media_type}, {year ?? "N/A"})
                  </span>
                  <span className="full-info">
                    Aired: {date} <br />
                    Score: {mean ?? "N/A"} <br />
                    Status: {status ?? "N/A"}
                  </span>
                </Flex>
              </Link>
            ),
          };
        });
        result.push(...animes);
      }

      if (type !== "anime" && mangaData.data?.length) {
        result.push({
          key: "manga",
          label: (
            <Link
              to={`/search/manga?q=${query}`}
              className="search__popup-category"
            >
              Manga
            </Link>
          ),
        });
        const manga = mangaData.data.map((item, i) => {
          const {
            id,
            title,
            media_type,
            main_picture,
            mean,
            year,
            status,
            date,
          } = normalize(item.node);
          return {
            key: "manga" + i,
            label: (
              <Link to={`/manga/${id}`} className="search__item">
                <div
                  className="left"
                  style={{ backgroundImage: main_picture }}
                ></div>
                <Flex className="rigth" vertical>
                  <span className="title">
                    {title} <span>({media_type})</span>{" "}
                  </span>
                  <span className="short-info">
                    ({media_type}, {year ?? "N/A"})
                  </span>
                  <span className="full-info">
                    Published: {date} <br />
                    Score: {mean ?? "N/A"} <br />
                    Status: {status ?? "N/A"}
                  </span>
                </Flex>
              </Link>
            ),
          };
        });

        result.push(...manga);
      }
    }

    return result;
  };

  const handleSearch = () => {
    if (!query) return;
    if (type === "manga") return navigate(`/search/manga?q=${query}`);
    navigate(`/search/anime?q=${query}`);
  };

  useEffect(() => {
    if (query !== "" && query.length > 2) {
      setLoading(true)
      searchDelay = setTimeout(() => {
        setLoading(false)
        if (query && type !== "manga")
          getAnime({ pageType: "anime", query, limit: 5 });
        if (query && type !== "anime")
          getManga({ pageType: "manga", query, limit: 5 });
      }, 2000);
    } else {
      setLoading(false)
      clearTimeout(searchDelay);
    }

    return () => {
      setLoading(false);
      clearTimeout(searchDelay);
    };
  }, [query]);

  return (
    <Flex className="header__search">
      <Select
        className="search__type"
        defaultValue="all"
        style={{ width: 85, zIndex: 1 }}
        onChange={(e) => setType(e)}
      >
        <Select.Option value="all">All</Select.Option>
        <Select.Option value="anime">Anime</Select.Option>
        <Select.Option value="manga">Manga</Select.Option>
      </Select>
      <AutoComplete
        listHeight="100%"
        className="search__main"
        popupClassName="search__popup"
        options={getOptions()}
        style={{ width: 365, left: -85 }}
      >
        <Input.Search
          placeholder="Search Anime and Manga"
          onChange={(e) => setQuery(e.target.value)}
          onSearch={handleSearch}
          loading={
            (loading || animeFetching || mangaFetching) && query.length > 1
          }
          style={{ width: 280, marginLeft: 85 }}
        />
      </AutoComplete>
    </Flex>
  );
};

export default Search;
