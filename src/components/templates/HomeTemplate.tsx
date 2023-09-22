import { Card, Skeleton } from 'components'
import SwiperCarousel from '../../components/ui/SwiperCarousel'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'store'
import { getMovieListThunk } from 'store/quanLyPhim'
import { quanLyBannerServices } from '../../services/quanLyBanner';
import { getCinemaListThunk } from 'store/quanLyRap'; 

export const HomeTemplate = () => {
    const dispatch = useAppDispatch()
    const { movieList, isFetchingMovieList } = useSelector((state: RootState) => state.quanLyPhim)
    const { cinemaList, isFetchingCinemaList } = useSelector((state: RootState) => state.quanLyRap);
    const [banners, setBanners] = useState([]);
    
    useEffect(() => {
        dispatch(getMovieListThunk());
        dispatch(getCinemaListThunk());
        const fetchBanners = async () => {
            const response = await quanLyBannerServices.getBanners();
            setBanners(response.data.content);
        };
        fetchBanners();
    }, [dispatch]);

    if (isFetchingMovieList || isFetchingCinemaList) {
        return (
            <div className="grid grid-cols-5">
                {[...Array(15)].map(() => {
                    return (
                        <Card className="!w-[300px] !mt-20">
                            <Skeleton.Image className="!w-full !h-[250px]" />
                            <Skeleton.Input className="!w-full mt-16" />
                            <Skeleton.Input className="!w-full mt-16" />
                        </Card>
                    )
                })}
            </div>
        )
    }

    return (
        <div>
            <SwiperCarousel data={banners}/>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:pt-[20px] lg:pt-[60px]">
                {movieList?.map((movie) => (
                    <Card
                        key={movie.maPhim}
                        className="!mt-20"
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src={movie.hinhAnh} />}
                    >
                        <Card.Meta
                            title={movie.tenPhim}
                            description={movie.moTa.substring(0, 30)}
                        />
                    </Card>
                ))}
            </div>
            <div className="cinema-list flex grid-cols-2 gap-4 mt-8">
                {cinemaList?.map((cinema) => (
                    <Card key={cinema.maHeThongRap} hoverable>
                        <img src={cinema.logo} alt={cinema.tenHeThongRap} className="w-full h-auto" />
                    </Card>
                ))}
            </div>
        </div>
    )
}
