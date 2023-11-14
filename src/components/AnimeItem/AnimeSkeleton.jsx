import React from "react";
import { Skeleton, Flex, Row, Col } from "antd";

import InfoItem from "./InfoItem";
import { PageTitle } from "../modules";

const leftData = [[3, 2, 2], Array(10).fill(1)];
const rightData = [[4, 3, 3], [2], [3]];

const AnimeSkeleton = () => {
  return (
    <div className="anime container skeleton">
      <PageTitle
        title={<Skeleton.Input className="anime__title" block active />}
        subTitle={<Skeleton.Input className="anime__subtitle" block active />}
      />
      <Flex className="anime__content">
        <div className="anime__left">
          <div className="anime__poster">
            <Skeleton.Image block active />
          </div>
          {leftData.map((item, i) => (
            <InfoItem
              key={i}
              info={{
                title: <Skeleton.Input className="title" block active />,
                list: item.map((itemNum) => [
                  null,
                  <Skeleton
                    active
                    paragraph={{
                      rows: itemNum,
                      width: itemNum === 1 ? "100%" : "65%",
                    }}
                    title={false}
                  />,
                ]),
              }}
            />
          ))}
        </div>
        <div className="anime__right">
          <div className="anime__head">
            <Skeleton.Input active block />
          </div>
          {rightData.map((item, i) => (
            <InfoItem
              key={i}
              info={{
                title: <Skeleton.Input className="title" block active />,
                list: item.map((itemNum) => [
                  null,
                  <Skeleton
                    active
                    paragraph={{
                      rows: itemNum,
                      width: itemNum === 1 ? "100%" : "65%",
                    }}
                    title={false}
                  />,
                ]),
              }}
            />
          ))}
        </div>
      </Flex>
    </div>
  );
};

export default AnimeSkeleton;
