import React from "react";
import { Skeleton, Col, Card, Flex } from "antd";

const {Image, Button} = Skeleton;

const NewsSkeleton = ({ short }) => {
  const count = Array(short ? 3 : 8).fill();

  return count.map((el,i) => (
    <Col className="news-item" key={i}>
      <Card className="news-card">
        <Button active block style={{ height: 18 }} />
        <Button active block style={{ height: 18 }} />
        <div className="news-info">
          <Flex>
            <Image
              active
              style={{ width: 92, height: 92, float: "left" }}
            />
            <Col style={{padding: '14px 0 5px 5px',}}>
              <Button active block style={{ height: 16 }} />
              <Button active block style={{ height: 16 }} />
              <Button active block style={{ height: 16 }} />
              <Button active block style={{ height: 16 }} />
            </Col>
          </Flex>
              <Button active block style={{ height: 16 }} />
              <Button active block style={{ height: 16 }} />
        </div>
        <div className="news-end">
              <Button active block style={{ height: 15, width: '50%', opacity: 0.5 }} />
              <Button active block style={{ height: 15, width: '65%', opacity: 0.5 }} />
        </div>
      </Card>
    </Col>
  ));
};

export default NewsSkeleton;
