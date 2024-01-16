"use client";
import { Fragment } from "react";
import { Navigation, Autoplay, Scrollbar } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import QuoteBanner from "../common/quote";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";



export default function QuoteSwiper() {
  return (
    <Fragment>
      <div className="relative w-7/12  mx-auto">
        <Swiper
          modules={[Scrollbar, Navigation, Autoplay]}
          scrollbar={{ draggable: true }}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          spaceBetween={0}
        >
          <SwiperSlide>
            <QuoteBanner
              quote="
                  Wujudkan UX yang kamu impikan, user dijamin makin
                  nyaman, Repeat oder pasti amaan. ^_^
              "
              author="Indra Susila"
            />
          </SwiperSlide>

          <SwiperSlide>
            <QuoteBanner
              quote="
                  Dimata executive.. 
                  kesuksesan teknologi berbanding lurus dengan kesuksesan
                  bisnis.. Secanggih apapun teknologi yg kamu punya, kalo gak
                  bisa cuan ya,, tetep dipandang amatir.
              "
              author="Indra Susila"
            />
          </SwiperSlide>

           <SwiperSlide>
            <QuoteBanner
              quote={
                <>
                  Even your favorite developers may not know many things that
                  you know.
                </>
              }
              author="Dan Abdramov"
            />
          </SwiperSlide>

          <SwiperSlide>
            <QuoteBanner
              quote={
                <>
                  Good code is like a love letter to the next developer who will
                  maintain it.
                </>
              }
              author="Addy Osmani"
            />
          </SwiperSlide>

          <SwiperSlide>
            <QuoteBanner
              quote={<>Complexity is the enemy of accessibility.</>}
              author="Allistair Duggin"
            />
          </SwiperSlide>

          <SwiperSlide>
            <QuoteBanner
              quote={
                <>
                  Accessibility is a perfect indicator for the quality of a
                  website.
                </>
              }
              author="Manuel Matuzovic"
            />
          </SwiperSlide> 
        </Swiper> 
      </div>
    </Fragment>
  );
}
