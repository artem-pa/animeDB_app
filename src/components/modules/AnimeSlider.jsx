import React from "react";
import { Link } from "react-router-dom";

import Slider from "./Slider";
import UnderscoreTitle from "./UnderscoreTitle";
import { normalize } from "../../helpers/helpers";
import { Skeleton } from "antd";

import "./style.css";

const AnimeSlider = ({ data, title, loading, type }) => {
  return (
    <>
      <UnderscoreTitle title={title} />
      {!loading && (
        <Slider type={1}>
          {data &&
            data.data.map((item, i) => {
              const nItem = normalize(item.node);
              return (
                <Link
                  className="anime-item"
                  key={i}
                  to={`/${type ?? "anime"}/${nItem.id}`}
                >
                  <div
                    className="image"
                    style={{ backgroundImage: nItem.main_picture }}
                  ></div>
                  <span className="title">{nItem.title}</span>
                </Link>
              );
            })}
        </Slider>
      )}
      {loading && (
        <Slider type={1} disableButtonsControls>
          {Array(5)
            .fill()
            .map(() => (
              <Skeleton.Image
                active
                rootClassName="anime-item__skeleton"
                style={{ width: "100%", height: "100%" }}
              />
            ))}
        </Slider>
      )}
    </>
  );
};

export default AnimeSlider;
