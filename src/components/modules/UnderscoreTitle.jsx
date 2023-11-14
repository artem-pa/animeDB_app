import React from "react";
import { Typography } from "antd";

import "./style.css";

const UnderscoreTitle = ({ title, className, ...options }) => {
  return (
    <Typography.Title {...options} level={5} className="underscore-title">
      {title}
    </Typography.Title>
  );
};

export default UnderscoreTitle;
