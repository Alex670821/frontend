// components/StreamCarousel.js
import React from "react";
import VideoPlayer from "./VideoPlayer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const StreamCarousel = ({ streams }) => {
  return (
    <Swiper spaceBetween={20} slidesPerView={3} navigation>
      {streams.map((stream, index) => (
        <SwiperSlide key={index}>
          <VideoPlayer />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default StreamCarousel;
