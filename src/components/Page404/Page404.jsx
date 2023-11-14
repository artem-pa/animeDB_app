import React, { useEffect } from "react";
import { Image } from "antd";

import { error404, error404Static } from "../../assets/images";
import "./style.css";

const Page404 = () => {
  useEffect(() => {
    return () => (document.title = "Page not found");
  }, []);

  return (
    <div className="container page404">
      <Image
        src={error404}
        alt="gif"
        preview={false}
        placeholder={<Image preview={false} src={error404Static} />}
      />
      <h1>
        404
        <br /> Not Found
      </h1>
      <h2>This page doesn't exist</h2>
    </div>
  );
};

export default Page404;
