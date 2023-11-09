import React from "react";
import { Link } from "react-router-dom";
import { Flex, Dropdown, Select, Option, Input, AutoComplete } from "antd";

import Search from "./Search";
import { logo, logoMob } from "../../assets/images";
import "./style.css";

const animeMenu = [
  {
    key: "1",
    label: <Link to="/anime/search">Anime Search</Link>,
  },
  {
    key: "2",
    label: <Link to="/anime/top">Top Anime</Link>,
  },
  {
    key: "3",
    label: <Link to="/anime/season">Seasonal Anime</Link>,
  }
];
const mangaMenu = [
  {
    key: "1",
    label: <Link to="/manga/search">Manga Search</Link>,
  },
  {
    key: "2",
    label: <Link to="/manga/top">Top Manga</Link>,
  }
];


const Header = () => {
  return (
    <header className="header">
      <Flex className="container" justify="start" align="center">
        <Flex className="header__logo" align="center">
          <Link to="/">
            <picture>
              <source srcSet={logo} media="(min-width: 800px)" />
              <img src={logoMob} alt="logo" />
            </picture>
          </Link>
        </Flex>
        <nav className="header__nav">
          <Dropdown className="header__item" menu={{ items: animeMenu }}>
            <span>Anime</span>
          </Dropdown>
          <Dropdown className="header__item" menu={{ items: mangaMenu }}>
            <span>Manga</span>
          </Dropdown>
          <Link className="header__item" to='/news'>News</Link>
          <Search />
        </nav>
      </Flex>
    </header>
  );
};

export default Header;
