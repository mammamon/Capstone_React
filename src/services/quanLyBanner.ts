import { apiInstance } from 'constant/apiInstance';
import { Banner } from 'types'

const api = apiInstance({
    baseURL: import.meta.env.VITE_QUAN_LY_PHIM_API,
});

export const quanLyBannerServices = {
    getBanners: () => api.get<ApiResponse<Banner[]>>('/LayDanhSachBanner'),
};
