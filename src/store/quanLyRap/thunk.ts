import { createAsyncThunk } from '@reduxjs/toolkit';
import { quanLyHeThongRapServices } from 'services/quanLyRap';
import { sleep } from 'utils';

export const getCinemaListThunk = createAsyncThunk(
  'quanLyRap/getCinemaList',
  async (_, { rejectWithValue }) => {
    try {
      const data = await quanLyHeThongRapServices.getCinemaList();
      await sleep(2000);
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
