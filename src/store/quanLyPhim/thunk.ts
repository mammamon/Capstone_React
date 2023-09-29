import { createAsyncThunk } from '@reduxjs/toolkit'
import { quanLyPhimServices } from 'services/quanLyPhim'

export const getMovieListThunk = createAsyncThunk(
    'quanLyPhim/getMovieList',
    async (maCumRap: string | null = null, { rejectWithValue }) => {
        try {
            const maNhomOptions = ['GP01', 'GP03', 'GP04', 'GP08', 'GP09', 'GP11'];
            const randomIndex = Math.floor(Math.random() * maNhomOptions.length);
            const maNhom = maNhomOptions[randomIndex];
            const data = await quanLyPhimServices.getMovieList(`?maNhom=${maNhom}${maCumRap ? `&maCumRap=${maCumRap}` : ''}`)
            return data.data.content
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)


