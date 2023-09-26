import { createAsyncThunk } from '@reduxjs/toolkit';
import { quanLyHeThongRapServices } from 'services/quanLyRap';
import { sleep } from 'utils';

export const getCinemaListThunk = createAsyncThunk(
  'quanLyRap/getCinemaList',
  async (_, { rejectWithValue }) => {
    try {
      const data = await quanLyHeThongRapServices.getCinemaList();
      await sleep(500);
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getCinemaScheduleThunk = createAsyncThunk(
  'quanLyRap/getCinemaSchedule',
  async (maHeThongRap: string, { rejectWithValue }) => {
    try {
      const data = await quanLyHeThongRapServices.getCinemaSchedule(maHeThongRap);
      await sleep(100);
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
