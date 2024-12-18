//Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Slider() {
  return (
    <div className="container mx-auto py-10">
      <div>
        <h3 className="mb-18">Navigation</h3>
        <div>
          <Swiper
            modules={[Pagination, Navigation, Autoplay]} // Kích hoạt các module
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }} // Hiển thị pagination
            navigation // Hiển thị nút Next/Prev
            autoplay={{ delay: 3000 }} // Tự động chạy, 3s mỗi slide
          >
            <SwiperSlide>
              <img
                className="w-full h-auto object-cover"
                src="https://via.placeholder.com/800x400"
                alt="Slide 1"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full h-auto object-cover"
                src="https://via.placeholder.com/800x400"
                alt="Slide 2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full h-auto object-cover"
                src="https://via.placeholder.com/800x400"
                alt="Slide 3"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Slider;
