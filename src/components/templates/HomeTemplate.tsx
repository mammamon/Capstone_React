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
    const [filter, setFilter] = useState(null);


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
            <div>
              <SwiperCarousel data={banners} />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] mt-[90px]">
                {[...Array(15)].map((_, index) => (
                  <Card key={index} className="!w-[240px] !h-[300px]">
                    <Skeleton.Image className='!w-full !h-[200px]' active />
                    <div className="mt-16">
                      <Skeleton.Input className="!w-full !h-[70px]" active />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        }

    return (
        <div>
            <SwiperCarousel data={banners} />
            <div className='btn-filter flex gap-[20px] justify-center mt-[40px] mb-[20px]'>
                <button className={filter === "dangChieu" ? "selected" : ""} onClick={() => setFilter(filter !== "dangChieu" ? "dangChieu" : null)}>Đang Chiếu</button>
                <button className={filter === "sapChieu" ? "selected" : ""} onClick={() => setFilter(filter !== "sapChieu" ? "sapChieu" : null)}>Sắp Chiếu</button>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {movieList?.filter(movie => filter ? movie[filter] : true).map((movie) => (
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

            <div className="cinema-zone pt-[60px] flex">
                <div className="cinema-list-wrapper w-1/12">
                    <h2>Cụm rạp</h2>
                    <div className="cinema-list flex-2 grid-cols-2 gap-4 mt-8">
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
                                        // Cập nhật state của cụm rạp
                                        const selectedCinemaSchedule = cinemaSchedule.find(schedule => schedule.maHeThongRap === cinema.maHeThongRap);
                                        if (selectedCinemaSchedule && selectedCinemaSchedule.lstCumRap.length > 0) {
                                            setSelectedCumRap(selectedCinemaSchedule.lstCumRap[0].maCumRap);
                                        }
                                    }}
                                />
                            </Card>
                        ))}
                    </div>
                </div>
                <div className="cinema-location-wrapper w-3/12 pr-[6px] mr-[30px]">
                    <h2>Địa điểm</h2>
                    <div className="cinema-location mt-8">
                        {cinemaSchedule?.map((schedule) => (
                            <div key={schedule.maHeThongRap}>
                                {schedule.lstCumRap.map((cumRap) => (
                                    <div key={cumRap.maCumRap} className={`cinema-name cursor-pointer p-[6px] pt-0 mr-[6px] rounded-6 ${cumRap.maCumRap === selectedCumRap ? 'selected' : ''}`} onClick={() => {
                                        setSelectedCumRap(cumRap.maCumRap);
                                    }}>
                                        <h3>{cumRap.tenCumRap}</h3>
                                        <img src={cumRap.hinhAnh} className="w-[100px]" />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="cinema-schedule-wrapper w-8/12">
                    <h2>Lịch chiếu</h2>
                    <div className="cinema-schedule mt-8">
                        {selectedCinemaList && selectedCumRap && cinemaSchedule?.map((schedule) => (
                            <div key={schedule.maHeThongRap}>
                                {schedule.lstCumRap.map((cumRap) => (
                                    selectedCumRap === cumRap.maCumRap && cumRap.danhSachPhim.map((phim) => (
                                        <div key={phim.maPhim} className='cinema-schedule-movie flex p-[12px]'>
                                            <div className='w-2/12 pr-[8px]'>
                                                <h3>{phim.tenPhim}</h3>
                                                <img src={phim.hinhAnh} alt={phim.tenPhim} />
                                            </div>
                                            <div className="showtimes w-10/12">
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
        </div>
    )
}
