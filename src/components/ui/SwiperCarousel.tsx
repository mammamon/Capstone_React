import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Banner } from '../../types/QuanLyBanner';
import { useState, useEffect } from 'react';
import { quanLyBannerServices } from '../../services/quanLyBanner';

type SwiperCarouselProps = {
  data: Banner[];
};

const SwiperCarousel: React.FC<SwiperCarouselProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      await quanLyBannerServices.getBanners();
      setIsLoading(false);
    };

    fetchBanners();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Swiper
    modules={[Pagination, Autoplay]} 
    pagination={{
        dynamicBullets: true,
        clickable: true,
    }}
    autoplay={{
        delay: 5000, 
        disableOnInteraction: false, 
    }}
    loop={true} 
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
