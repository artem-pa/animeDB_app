import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Select, Space } from "antd";
import AnimeList from "./AnimeList";
import { useGetAnimeSearchQuery } from "../../services/malApi";
import { firstL } from "../../helpers/helpers";
import { PageTitle } from "../modules";

const SearchAnime = ({ pageType, query }) => {
  const [searchQuery, setSearchQuery] = useState(query);
  const [searchType, setSearchType] = useState(pageType);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchQuery || !searchType) return;
    navigate(`/search/${searchType}?q=${searchQuery}`);
  };

  useEffect(() => {
    if (!query) document.title = `${firstL(pageType)} Search`;
    else document.title = `Search results: ${query}`;
  }, [pageType, query]);

  return (
    <div className="container searchanime">
      <PageTitle title={`${firstL(pageType)} Search`} subTitle={`${query ?? ''}`} />
      <Space.Compact
        block
        size="large"
        color="red"
        className="searchanime__search"
      >
        <Select
          value={searchType}
          style={{ minWidth: 95 }}
          onChange={(e) => setSearchType(e)}
          options={[
            { value: "anime", label: "Anime" },
            { value: "manga", label: "Manga" },
          ]}
        />
        <Input.Search
          placeholder="Input search query"
          onChange={(e) => setSearchQuery(e.target.value)}
          enterButton
          onSearch={handleSearch}
        />
      </Space.Compact>
      {query && (
        <AnimeList
          method={useGetAnimeSearchQuery}
          methodParam={{ pageType, query }}
        />
      )}
    </div>
  );
};

export default SearchAnime;
