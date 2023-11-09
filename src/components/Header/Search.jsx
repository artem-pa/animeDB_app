import React, { useEffect, useState } from "react";
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

import { useGetAnimeSearchQuery } from "../../services/malApi";

const options = [
  { value: "1", label: <a href="/">Title 1</a> },
  { value: "2", label: "Title 2" },
];

const Search = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");

  useEffect(() => {
    console.log(query, type);
  }, [query, type]);

  return (
    <Flex className="header__search">
      <Select
        className="search__type"
        defaultValue="all"
        style={{ width: 85 }}
        onChange={(e) => setType(e)}
      >
        <Select.Option value="all">All</Select.Option>
        <Select.Option value="anime">Anime</Select.Option>
        <Select.Option value="manga">Manga</Select.Option>
      </Select>
      <AutoComplete
        className="search__main"
        options={options}
        style={{ width: 250 }}
      >
        <Input
          placeholder="Search Anime and Manga"
          onChange={(e) => setQuery(e.target.value)}
        />
      </AutoComplete>
      <Button
        className="search__btn"
        icon={<SearchOutlined />}
        loading={false}
      />
    </Flex>
  );
};

export default Search;
