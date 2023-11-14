import React from "react";
import { Typography } from "antd";

import './style.css'

const {Title} = Typography;

const PageTitle = ({title, subTitle, container}) => {
  return (
    <div className={`page-title ${container ? 'container' : ''}` }>
      <Title className="main" level={3} style={{ margin: "0" }}>
        {title}
      </Title>
      {subTitle && <Title className="sub" level={4} style={{ margin: "0" }}>
        {subTitle}
      </Title>}
    </div>
  );
};

export default PageTitle;
