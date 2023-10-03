
import {  useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "store";
import { useEffect} from "react";
import { useSelector } from "react-redux";
import { getMovieDetailThunk } from "store/quanLyRap";

export const BookingMovieTemplate = () => {
  const dispatch = useAppDispatch();
  const {bookingId} = useParams();
  const { chairList} = useSelector((state: RootState) => state.quanLyDatVe);
  useEffect(() => {
    dispatch(getMovieDetailThunk(bookingId));
  }, [dispatch, bookingId]);
  console.log(chairList)
  return (
    <div className="booking-movie">
      <div className="flex">
        <div className="w-8/12"></div>
        <div className="w-3/12"></div>
      </div>
    </div>
  );
};
