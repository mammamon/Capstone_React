import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyDatVeServices } from "services";

export const getChairListThunk = createAsyncThunk(
  "quanLyDatVe/getChairList",
  async (MaLichChieu: string, { rejectWithValue }) => {
    try {
      const data = await quanLyDatVeServices.getChairList(MaLichChieu);
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
