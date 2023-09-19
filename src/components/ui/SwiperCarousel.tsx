import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Banner } from '../../types/QuanLyBanner';

type SwiperCarouselProps = {
  data: Banner[];
};

const SwiperCarousel: React.FC<SwiperCarouselProps> = ({ data }) => {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      className="mySwiper"
    >
      {data.map((banner) => (
        <SwiperSlide key={banner.maBanner}>
          <img src={banner.hinhAnh} alt="Banner" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperCarousel;
