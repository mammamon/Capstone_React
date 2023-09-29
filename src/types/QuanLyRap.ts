export type HeThongRap = {
  maHeThongRap: string;
  tenHeThongRap: string;
  biDanh: string;
  logo: string;
  lstCumRap: CumRap[];
};

export type CumRap = {
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: string;
  diaChi: string;
  danhSachPhim: Phim[];
};

export type Phim = {
  maPhim: number;
  tenPhim: string;
  hinhAnh: string;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
  lstLichChieuTheoPhim: {
    maLichChieu: number;
    maRap: string;
    tenRap: string;
    ngayChieuGioChieu: string;
    giaVe: number;
  }[];
};

// export type LichChieu = [
//   {
//     lstCumRap: [
//       { 
//         danhSachPhim: [
//           {
//             lstLichChieuTheoPhim: [
//               {
//                 maLichChieu: number;
//                 maRap: string;
//                 tenRap: string;
//                 ngayChieuGioChieu: string;
//                 giaVe: number;
//               },
//             ];
//             maPhim: number;
//             tenPhim: string;
//             hinhAnh: string;
//             hot: boolean;
//             dangChieu: boolean;
//             sapChieu: boolean;
//           }
//         ];
//         maCumRap: string;
//         tenCumRap: string;
//         hinhAnh: string;
//         diaChi: string;
//       }
//     ];
//     maHeThongRap: string;
//     tenHeThongRap: string;
//     logo: string;
//     mahom: string;
//   }
// ];

export type ThongTinPhim = {
  heThongRapchieu: [
    {
      cumRapChieu: [
        {
          lichChieuPhim: [
            {
              maLichChieu: string;
              maRap: string;
              tenRap: string;
              ngayChieuGioChieu: string;
              giaVe: number;
              thoiLuong: number;
            }
          ];
          maCumRap: string;
          tenCumRap: string;
          hinhAnh: string;
          diaChi: string;
        }
      ];
      maHeThongRap: string;
      tenHeThongRap: string;
      logo: string;
    }
  ];
};
