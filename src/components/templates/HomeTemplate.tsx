import { Card, Skeleton } from 'components'
import SwiperCarousel from '../../components/ui/SwiperCarousel'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'store'
import { getMovieListThunk } from 'store/quanLyPhim'
import { quanLyBannerServices } from '../../services/quanLyBanner';
import { getCinemaListThunk, getCinemaScheduleThunk } from 'store/quanLyRap';
import { formatTime } from '../../utils/formatTime'

export const HomeTemplate = () => {
    const dispatch = useAppDispatch()
    const { movieList, isFetchingMovieList } = useSelector((state: RootState) => state.quanLyPhim)
    const { cinemaList, isFetchingCinemaList } = useSelector((state: RootState) => state.quanLyRap);
    const [banners, setBanners] = useState([]);
    const [selectedCinemaList, setSelectedCinemaList] = useState(null);
    const [selectedCumRap, setSelectedCumRap] = useState(null);
    const { cinemaSchedule } = useSelector((state: RootState) => state.quanLyRap);

    useEffect(() => {
        dispatch(getMovieListThunk(null));
        dispatch(getCinemaListThunk());

        const fetchBanners = async () => {
            const response = await quanLyBannerServices.getBanners();
            setBanners(response.data.content);
        };
        fetchBanners();
    }, [dispatch]);

    useEffect(() => {
        // tự động chọn cụm rạp đầu tiên khi load page
        if (cinemaList?.length > 0) {
            setSelectedCinemaList(cinemaList[0].maHeThongRap);
        }
    }, [cinemaList]);

    useEffect(() => {
        if (selectedCinemaList) {
            dispatch(getCinemaScheduleThunk(selectedCinemaList));
        }
    }, [dispatch, selectedCinemaList]);

    useEffect(() => {
        if (cinemaSchedule?.length > 0) {
            const selectedCinemaSchedule = cinemaSchedule.find(schedule => schedule.maHeThongRap === selectedCinemaList);
            if (selectedCinemaSchedule && selectedCinemaSchedule.lstCumRap.length > 0) {
                setSelectedCumRap(selectedCinemaSchedule.lstCumRap[0].maCumRap);
            }
        }
    }, [cinemaSchedule, selectedCinemaList]);

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
            <SwiperCarousel data={banners} />
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
            <div className="cinema-zone flex">
                <div className="cinema-list flex-2 grid-cols-2 gap-4 mt-8 w-2/12">
                    {cinemaList?.map((cinema) => (
                        <Card key={cinema.maHeThongRap} hoverable className={selectedCinemaList === cinema.maHeThongRap ? 'selected' : ''}>
                            <img
                                src={cinema.logo}
                                alt={cinema.tenHeThongRap}
                                className="w-full h-auto"
                                onClick={() => {
                                    setSelectedCumRap(null);
                                    setSelectedCinemaList(cinema.maHeThongRap);
                                    dispatch(getCinemaScheduleThunk(cinema.maHeThongRap));
                                    // cập nhật state của cụm rạp
                                    const selectedCinemaSchedule = cinemaSchedule.find(schedule => schedule.maHeThongRap === cinema.maHeThongRap);
                                    if (selectedCinemaSchedule && selectedCinemaSchedule.lstCumRap.length > 0) {
                                        setSelectedCumRap(selectedCinemaSchedule.lstCumRap[0].maCumRap);
                                    }
                                }}
                            />
                        </Card>
                    ))}
                </div>
                <div className="cinema-location mt-8 w-4/12">
                    {cinemaSchedule?.map((schedule) => (
                        <div key={schedule.maHeThongRap}>
                            {schedule.lstCumRap.map((cumRap) => (
                                <div key={cumRap.maCumRap} className={`cursor-pointer ${cumRap.maCumRap === selectedCumRap ? 'selected' : ''}`} onClick={() => {
                                    setSelectedCumRap(cumRap.maCumRap);
                                }}>
                                    <h3>{cumRap.tenCumRap}</h3>
                                    <img src={cumRap.hinhAnh} className="w-[100px]" />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="cinema-schedule mt-8 w-6/12">
                    {selectedCinemaList && selectedCumRap && cinemaSchedule?.map((schedule) => (
                        <div key={schedule.maHeThongRap}>
                            {schedule.lstCumRap.map((cumRap) => (
                                selectedCumRap === cumRap.maCumRap && cumRap.danhSachPhim.map((phim) => (
                                    <div key={phim.maPhim} className='cinema-schedule-movie flex p-[12px]'>
                                        <div className='h-full'>
                                            <h3>{phim.tenPhim}</h3>
                                            <img src={phim.hinhAnh} alt={phim.tenPhim} className="w-[100px]" />
                                        </div>
                                        <div className="showtimes">
                                            {phim.lstLichChieuTheoPhim &&
                                                [...phim.lstLichChieuTheoPhim]
                                                    .sort((a, b) => new Date(a.ngayChieuGioChieu).getTime() - new Date(b.ngayChieuGioChieu).getTime())
                                                    .map((lichChieu) => (
                                                        <p key={lichChieu.maLichChieu}>
                                                            {formatTime(lichChieu.ngayChieuGioChieu)}
                                                        </p>
                                                    ))
                                            }
                                        </div>
                                    </div>
                                ))
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
