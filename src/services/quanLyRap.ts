import { apiInstance } from 'constant/apiInstance'
import { HeThongRap, LichChieu } from 'types'

const api = apiInstance({
    baseURL: import.meta.env.VITE_QUAN_LY_RAP_API,
})

export const quanLyHeThongRapServices = {
    getCinemaList: (query = '') => api.get<ApiResponse<HeThongRap[]>>(`/LayThongTinHeThongRap${query}`),
    getCinemaSchedule: (maHeThongRap: string) => api.get<ApiResponse<LichChieu[]>>(`/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP01`),
}
