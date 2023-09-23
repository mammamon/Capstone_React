import { createSlice } from '@reduxjs/toolkit';
import { HeThongRap, LichChieu } from 'types'; 
import { getCinemaListThunk, getCinemaScheduleThunk } from './thunk'; 

type QuanLyRapInitialState = {
  cinemaList?: HeThongRap[];
  cinemaSchedule?: LichChieu[];
  isFetchingCinemaList?: boolean;
};

const initialState: QuanLyRapInitialState = {};
const quanLyRapSlice = createSlice({
  name: 'quanLyRap',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCinemaListThunk.fulfilled, (state, action) => {
      state.cinemaList = action.payload;
    });
    builder.addCase(getCinemaScheduleThunk.fulfilled, (state, action) => {
      state.cinemaSchedule = action.payload; 
    });
  },
});

export const { actions: quanLyRapActions, reducer: quanLyRapReducer } = quanLyRapSlice;
