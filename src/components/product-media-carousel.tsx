"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Grid, Navigation, Thumbs } from "swiper/modules";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/grid";

export default function ProductMediaCarousel() {
  const images = [
    "https://images.g2crowd.com/uploads/attachment/file/81607/Trello-Board.png",
    "https://images.g2crowd.com/uploads/attachment/file/81608/Trello-Card.png",
    "https://images.g2crowd.com/uploads/attachment/file/81616/Trello-Mobile.png",
  ];
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <div className="gap-5 flex">
      <div className="flex-1 max-w-2xl">
        <Swiper
          spaceBetween={10}
          navigation={true}
          slidesPerView={1}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {images.map((s, i) => (
            <SwiperSlide
              className="w-full border rounded-lg overflow-hidden border-gray-300"
              key={i}
            >
              <img className="w-full h-[400px] object-cover" src={s} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex-1 w-[500px]">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={13}
          slidesPerView={3}
          freeMode={true}
          grid={{ rows: 4, fill: "row" }}
          watchSlidesProgress={true}
          modules={[Grid, FreeMode, Navigation, Thumbs]}
        >
          {images.map((s, i) => (
            <SwiperSlide key={i}>
              <img
                className="h-[90px] w-full object-cover border border-gray-300 rounded-lg"
                src={s}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
