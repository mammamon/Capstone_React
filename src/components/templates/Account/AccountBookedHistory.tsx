import { useAuth} from "hooks";

export const AccountBookedHistory = () => {
  const { booked} = useAuth();
  return (
	<div>{booked.thongTinDatVe[0].ngayDat}</div>
  )
}