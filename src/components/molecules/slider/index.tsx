import { TSlider } from "@/types/slider";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slider.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

const DEFAULT_SWIPER_PROPS = {
  spaceBetween: 25,
  slidesPerView: 4,
  pagination: { clickable: true },
  modules: [Pagination, Navigation],
  navigation: true,
  autoplay: { delay: 1000 },
  loop: true,
};

export const Slider: React.FC<Readonly<TSlider>> = ({
  items,
  slideProps,
  ...swiperProps
}) => {
  return (
    <Swiper {...DEFAULT_SWIPER_PROPS} {...swiperProps}>
      {items.map((item, index) => (
        <SwiperSlide key={index} {...slideProps}>
          {item}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
