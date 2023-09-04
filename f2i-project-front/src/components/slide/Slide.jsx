import React from "react";
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

SwiperCore.use([Virtual, Navigation, Pagination]);

import "./slide.scss";

const Slide = ({ data, slidesPerView }) => {
  console.log(data);
  return (
    <div className="slide">
      <div className="container">
        <div className="title">
          <h1>Popular professional services</h1>
        </div>
        <div className="caroussel">
          <Swiper
            className="swipper"
            slidesPerView={slidesPerView}
            centeredSlides={true}
            spaceBetween={30}
            pagination={{
              type: "fraction",
            }}
            navigation={true}
            virtual
          >
            {data.map((card) => (
              <SwiperSlide
                className="swipperslide"
                key={card.id}
                virtualIndex={card.id}
              >
                <img src={card.img} alt="" />
                <div className="desc">
                  <h4>
                    <small>{card.title}</small>
                    {card.desc}
                  </h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Slide;
