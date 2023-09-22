import { createSlice } from '@reduxjs/toolkit';
import { HeThongRap } from 'types'; 
import { getCinemaListThunk } from './thunk'; 

type QuanLyRapInitialState = {
  cinemaList?: HeThongRap[];
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
  },
});

export const { actions: quanLyRapActions, reducer: quanLyRapReducer } = quanLyRapSlice;
