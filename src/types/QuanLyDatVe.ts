export type Chair = {
  thongtinPhim: {
    maLichChieu: number;
    tenCumRap: string;
    tenRap: string;
    diaChi: string;
    tenPhim: string;
    hinhAnh: string;
    ngayChieu: string;
    gioChieu: string;
  };
  danhSachGhe: [
    {
      maGhe: number;
      tenGhe: string;
      maRap: number;
      loaiGhe: string;
      stt: number;
      giaVe: number;
      daDat: boolean;
      taiKhoanNguoiDat: string;
    }
  ];
};
