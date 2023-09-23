export type HeThongRap = {
  maHeThongRap: string;
  tenHeThongRap: string;
  biDanh: string;
  logo: string;
};

export type LichChieu = {
  maHeThongRap: string;
  maPhim: number;
  maLichChieu: number;
  maRap: string;
  tenRap: string;
  ngayChieuGioChieu: string;
  giaVe: number;
  lstCumRap: CumRap[];
};

export type CumRap = {
  danhSachPhim: Phim[];
};

export type Phim = {
  lstLichChieuTheoPhim: LichChieu[];
  maPhim: number;
  tenPhim: string;
  hinhAnh: string;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
};