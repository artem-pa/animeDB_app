import React from "react";
import { Divider, Flex } from "antd";
import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
} from "@ant-design/icons";

import "./style.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <Flex className="footer__buttons">
          <Flex className="footer__buttons-block">
            <span className="footer__buttons-text footer__text">
              Follow Original MAL
            </span>
            <Flex className="footer__buttons-buttons">
              <a
                href="https://www.facebook.com/OfficialMyAnimeList"
                target="_blank"
                rel="noreferrer"
                className="footer__buttons-link"
              >
                <FacebookFilled />
              </a>
              <a
                href="https://twitter.com/myanimelist"
                target="_blank"
                rel="noreferrer"
                className="footer__buttons-link"
              >
                <TwitterSquareFilled />
              </a>
              <a
                href="https://www.instagram.com/myanimelistofficial/"
                target="_blank"
                rel="noreferrer"
                className="footer__buttons-link"
              >
                <InstagramFilled />
              </a>
            </Flex>
          </Flex>
          <Flex className="footer__buttons-block">
            <span className="footer__buttons-text footer__text">
              Get the App
            </span>
            <Flex className="footer__buttons-buttons">
              <a
                href="https://play.google.com/store/apps/details?utm_campaign=pc_footer_login&id=net.myanimelist.app&utm_source=mal"
                target="_blank"
                rel="noreferrer"
                className="footer__buttons-link"
              >
                <img
                  src="https://cdn.myanimelist.net/images/appli/badge_googleplay.png"
                  alt="google play"
                />
              </a>
              <a
                href="https://apps.apple.com/us/app/myanimelist-official/id1469330778?md=8&ct=pc_footer_login"
                target="_blank"
                rel="noreferrer"
                className="footer__buttons-link"
              >
                <img
                  src="https://cdn.myanimelist.net/images/appli/badge_iOS.png"
                  alt="app store"
                />
              </a>
            </Flex>
          </Flex>
        </Flex>
        <Divider className="footer__divider" />
        <Flex className="footer__links">
          <Link to="/">Home</Link>
          <Divider className="footer__links-divider" type="vertical" />
          <Link to="/anime/search">Anime Search</Link>
          <Link to="/manga/search">Manga Search</Link>
          <Link to="/topanime">Top Anime</Link>
          <Link to="/topmanga">Top Manga</Link>
          <Link to="/news">News</Link>
        </Flex>
        <div className="footer__bottom">
          <span className="footer__text">
            MyAnimeDB © 2023 All Rights Reserved
          </span>
          <span className="footer__text">
            This site is provided by MyAnimeList API v2, NewsNow RapidAPI
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
