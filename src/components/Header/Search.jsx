import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Flex,
  Dropdown,
  Select,
  Option,
  Input,
  AutoComplete,
  Button,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

import {
  useGetAnimeSearchQuery,
  useGetMangaSearchQuery,
} from "../../services/malApi";
import { normalize } from "../../helpers/helpers";

let searchDelay = null;

const Search = () => {
  const [query, setQuery] = useState("");
  const [apiQuery, setApiQuery] = useState("");
  const [type, setType] = useState("all");
  const { data: animeData } = useGetAnimeSearchQuery(apiQuery);
  const { data: mangaData } = useGetMangaSearchQuery(apiQuery);
  const navigate = useNavigate();

  const getOptions = () => {
    if (query === "" || query.length <= 2) return [];

    let result = [];
    if (animeData && mangaData && !searchDelay) {
      if (type !== "manga") {
        result.push({
          key: "anime",
          label: (
            <Link
              to={`/anime/search?q=${query}`}
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
            key: "manga" + i,
            label: (
              <Link to={`/anime/item/${id}`} className="search__item">
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

      if (type !== "anime") {
        result.push({
          key: "manga",
          label: (
            <Link
              to={`/manga/search?q=${query}`}
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
            key: "anime" + i,
            label: (
              <Link to={`/anime/item/${id}`} className="search__item">
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
    if (type === "manga") return navigate(`/manga/search?q=${query}`);
    navigate(`/anime/search?q=${query}`);
  };

  useEffect(() => {
    if (query !== "" && query.length > 2) {
      searchDelay = setTimeout(() => {
        setApiQuery(query);
        searchDelay = null;
      }, 2000);
    } else {
      clearTimeout(searchDelay);
    }

    return () => {
      clearTimeout(searchDelay);
    };
  }, [query, type]);

  useEffect(() => {}, [animeData]);

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
        style={{ width: 332, left: "-85px", marginRight: "-132px" }}
      >
        <Input
          placeholder="Search Anime and Manga"
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: 200, left: "85px" }}
        />
      </AutoComplete>
      <Button
        className="search__btn"
        icon={<SearchOutlined />}
        loading={searchDelay && query.length > 2}
        onClick={handleSearch}
      />
    </Flex>
  );
};

export default Search;
