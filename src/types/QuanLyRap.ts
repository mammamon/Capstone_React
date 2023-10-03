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
// export type ThongTinPhim = {
//   biDanh:string,
//   dangChieu:boolean,
//   danhGia:number,
//   hinhAnh:string,
//   hot:boolean,
//   maNhom:string,
//   maPhim:number,
//   moTa:string,
//   ngayKhoiChieu:string,
//   sapChieu:boolean,
//   tenPhim:string,
//   trailer:string,
//   heThongRapChieu:[
//     {
//       logo:string,
//       maHeThongRap:string,
//       tenHeThongRap:string,
//       cumRapChieu:[
//         {
//           diaChi:string,
//           hinhAnh:string,
//           maCumRap:string,
//           tenCumRap:string,
//           lichChieuPhim:[
//             {
//               giaVe:number,
//               maLichChieu:string,
//               maRap:string,
//               ngayChieuGioChieu:string,
//               tenRap:string,
//               thoiLuong:number
//             }
//           ]
//         }
//       ]
//     }
//   ]
// };
