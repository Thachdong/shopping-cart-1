import React from "react";
import { SwiperProps, SwiperSlideProps } from "swiper/react";

interface ISlider<T> {
  items: T[];
  title: string;
  detailLink: string;
}

type TSlider = SwiperProps & {
  items: React.ReactNode[];
  slideProps?: SwiperSlideProps;
};
