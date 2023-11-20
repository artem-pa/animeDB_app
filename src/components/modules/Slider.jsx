import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const Slider = ({ children, type, ...options }) => {
  const responsive = [
    {
      0: { items: 1 },
      450: { items: 2 },
      1024: { items: 3 },
    },
    {
      0: { items: 2, itemsFit: 'contain' },
      450: { items: 3, itemsFit: 'contain' },
      1024: { items: 4, itemsFit: 'contain' },
    },
  ];

  return (
    <AliceCarousel
      {...options}
      infinite={!(type === 1 && children?.length < 3)}
      paddingRight={50}
      controlsStrategy="responsive"
      responsive={responsive[type]}
      disableDotsControls
      items={children}
    />
  );
};

export default Slider;
