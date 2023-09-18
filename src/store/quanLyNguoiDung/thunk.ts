import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginSchemaType } from 'schema'
import { quanLyNguoiDungServices } from 'services'
import { getAccessToken, sleep } from 'utils'

export const loginThunk = createAsyncThunk(
    'quanLyNguoiDung/login',
    async (payload: LoginSchemaType, { rejectWithValue }) => {
        try {
            const data = await quanLyNguoiDungServices.login(payload)
            // console.log('data: ', data.data.content)

            // sleep 3s
            // await new Promise(resolve => setTimeout(resolve, 3000))
            await sleep(2000)

            return data.data.content
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const getUserByAccessTokenThunk = createAsyncThunk(
    'quanLyNguoiDung/getUserByAccesToken',
    async (_, { rejectWithValue }) => {
        try {
            // Lấy token dưới localStorage
            const token = getAccessToken()

            // Nếu user đã đăng nhập => có token
            if (token) {
                const data = await quanLyNguoiDungServices.getUserByAccessToken()
                return data.data.content
            }
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

// dispatch(loginThunk(123))
// Promise
// pending, fullfiled, rejected
