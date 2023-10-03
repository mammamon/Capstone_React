import { apiInstance } from "constant/apiInstance"
import { Chair } from "types"

const api = apiInstance({
  baseURL: import.meta.env.VITE_QUAN_LY_DAT_VE_API,
})
export const quanLyDatVeServices = {
    getChairList: (MaLichChieu: string) => api.get<ApiResponse<Chair>>(`/LayDanhSachPhongVe?MaLichChieu=${MaLichChieu}`),

}
