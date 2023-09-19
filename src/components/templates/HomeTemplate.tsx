import { Card, Skeleton } from 'components'
import SwiperCarousel from '../../components/ui/SwiperCarousel'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'store'
import { getMovieListThunk } from 'store/quanLyPhim'
import { quanLyBannerServices } from '../../services/quanLyBanner';

export const HomeTemplate = () => {
    const dispatch = useAppDispatch()
    const { movieList, isFetchingMovieList } = useSelector((state: RootState) => state.quanLyPhim)
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        dispatch(getMovieListThunk());

        const fetchBanners = async () => {
            const response = await quanLyBannerServices.getBanners();
            setBanners(response.data.content);
        };

        fetchBanners();
    }, [dispatch]);

    if (isFetchingMovieList) {
        return (
            <div className="grid grid-cols-4">
                {[...Array(12)].map(() => {
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
            <div className="grid grid-cols-4">
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
        </div>
    )
}
