import { Image } from "antd";
import React from "react";

const ImgItem = ({ src, placeholder, ...options }) => {
  return (
    <Image
      {...options}
      preview={false}
      src={src}
      placeholder={<Image src={placeholder} preview={false} />}
    />
  );
};

export default ImgItem;
