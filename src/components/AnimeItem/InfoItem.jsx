import React from "react";

import { UnderscoreTitle } from "../modules";

const InfoItem = ({ info, ...options }) => {
  return (
    <div className="anime__block" {...options}>
      <UnderscoreTitle title={info.title} />
      {info.list.map(
        (item, i) =>
          item &&
          item[1] && (
            <div className="anime__block-item" key={i}>
              {item[0] ? <span className="title">{item[0]}: </span> : null}
              <span className="text">{item[1]}</span>
            </div>
          )
      )}
    </div>
  );
};

export default InfoItem;
