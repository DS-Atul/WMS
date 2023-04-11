import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./BirthdayModal.css";

// import required modules
import { EffectCards } from "swiper";

export default function BirthdayModal() {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="card swiper-slide">
            <div className="image-content">
              <span className="overlay"></span>

              <div className="card-image">
                <img
                  src="https://media.licdn.com/dms/image/C5103AQEVLuPfI_Rh3w/profile-displayphoto-shrink_200_200/0/1518872449311?e=1686182400&v=beta&t=KqqwW_dpTmgCsXS5MZCDFfABQTRR6g1YVyJUPx2RRa4"
                  alt="Available"
                  className="card-img"
                ></img>
              </div>
            </div>

            <div className="card-content">
              <h2 className="name">Rahul Thakur</h2>
              <p className="description">DOB: 13th Feb</p>
              <p className="description">Vehicle System</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="card swiper-slide">
            <div className="image-content">
              <span className="overlay"></span>

              <div className="card-image">
                <img
                  src="https://media.licdn.com/dms/image/C5103AQEVLuPfI_Rh3w/profile-displayphoto-shrink_200_200/0/1518872449311?e=1686182400&v=beta&t=KqqwW_dpTmgCsXS5MZCDFfABQTRR6g1YVyJUPx2RRa4"
                  alt="Available"
                  className="card-img"
                ></img>
              </div>
            </div>

            <div className="card-content">
              <h2 className="name">Rahul Thakur</h2>
              <p className="description">DOB: 13th Feb</p>
              <p className="description">Vehicle System</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="card swiper-slide">
            <div className="image-content">
              <span className="overlay"></span>

              <div className="card-image">
                <img
                  src="https://media.licdn.com/dms/image/C5103AQEVLuPfI_Rh3w/profile-displayphoto-shrink_200_200/0/1518872449311?e=1686182400&v=beta&t=KqqwW_dpTmgCsXS5MZCDFfABQTRR6g1YVyJUPx2RRa4"
                  alt="Available"
                  className="card-img"
                ></img>
              </div>
            </div>

            <div className="card-content">
              <h2 className="name">Rahul Thakur</h2>
              <p className="description">DOB: 13th Feb</p>
              <p className="description">Vehicle System</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="card swiper-slide">
            <div className="image-content">
              <span className="overlay"></span>

              <div className="card-image">
                <img
                  src="https://media.licdn.com/dms/image/C5103AQEVLuPfI_Rh3w/profile-displayphoto-shrink_200_200/0/1518872449311?e=1686182400&v=beta&t=KqqwW_dpTmgCsXS5MZCDFfABQTRR6g1YVyJUPx2RRa4"
                  alt="Available"
                  className="card-img"
                ></img>
              </div>
            </div>

            <div className="card-content">
              <h2 className="name">Rahul Thakur</h2>
              <p className="description">DOB: 13th Feb</p>
              <p className="description">Vehicle System</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="card swiper-slide">
            <div className="image-content">
              <span className="overlay"></span>

              <div className="card-image">
                <img
                  src="https://media.licdn.com/dms/image/C5103AQEVLuPfI_Rh3w/profile-displayphoto-shrink_200_200/0/1518872449311?e=1686182400&v=beta&t=KqqwW_dpTmgCsXS5MZCDFfABQTRR6g1YVyJUPx2RRa4"
                  alt="Available"
                  className="card-img"
                ></img>
              </div>
            </div>

            <div className="card-content">
              <h2 className="name">Rahul Thakur</h2>
              <p className="description">DOB: 13th Feb</p>
              <p className="description">Vehicle System</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="card swiper-slide">
            <div className="image-content">
              <span className="overlay"></span>

              <div className="card-image">
                <img
                  src="https://media.licdn.com/dms/image/C5103AQEVLuPfI_Rh3w/profile-displayphoto-shrink_200_200/0/1518872449311?e=1686182400&v=beta&t=KqqwW_dpTmgCsXS5MZCDFfABQTRR6g1YVyJUPx2RRa4"
                  alt="Available"
                  className="card-img"
                ></img>
              </div>
            </div>

            <div className="card-content">
              <h2 className="name">Rahul Thakur</h2>
              <p className="description">DOB: 13th Feb</p>
              <p className="description">Vehicle System</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="card swiper-slide">
            <div className="image-content">
              <span className="overlay"></span>

              <div className="card-image">
                <img
                  src="https://media.licdn.com/dms/image/C5103AQEVLuPfI_Rh3w/profile-displayphoto-shrink_200_200/0/1518872449311?e=1686182400&v=beta&t=KqqwW_dpTmgCsXS5MZCDFfABQTRR6g1YVyJUPx2RRa4"
                  alt="Available"
                  className="card-img"
                ></img>
              </div>
            </div>

            <div className="card-content">
              <h2 className="name">Rahul Thakur</h2>
              <p className="description">DOB: 13th Feb</p>
              <p className="description">Vehicle System</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="card swiper-slide">
            <div className="image-content">
              <span className="overlay"></span>

              <div className="card-image">
                <img
                  src="https://media.licdn.com/dms/image/C5103AQEVLuPfI_Rh3w/profile-displayphoto-shrink_200_200/0/1518872449311?e=1686182400&v=beta&t=KqqwW_dpTmgCsXS5MZCDFfABQTRR6g1YVyJUPx2RRa4"
                  alt="Available"
                  className="card-img"
                ></img>
              </div>
            </div>

            <div className="card-content">
              <h2 className="name">Rahul Thakur</h2>
              <p className="description">DOB: 13th Feb</p>
              <p className="description">Vehicle System</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="card swiper-slide">
            <div className="image-content">
              <span className="overlay"></span>

              <div className="card-image">
                <img
                  src="https://media.licdn.com/dms/image/C5103AQEVLuPfI_Rh3w/profile-displayphoto-shrink_200_200/0/1518872449311?e=1686182400&v=beta&t=KqqwW_dpTmgCsXS5MZCDFfABQTRR6g1YVyJUPx2RRa4"
                  alt="Available"
                  className="card-img"
                ></img>
              </div>
            </div>

            <div className="card-content">
              <h2 className="name">Rahul Thakur</h2>
              <p className="description">DOB: 13th Feb</p>
              <p className="description">Vehicle System</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
