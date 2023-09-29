import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { RootState } from "store";

export const DetailTemplate = () => {
  const {detailId}=useParams()
  const { movieDetail, isFetchingCinemaList } = useSelector(
    (state: RootState) => state.quanLyRap
  );
  console.log(movieDetail)
  console.log(movieDetail)
  return (
    <div className="detail-movie">    
      <div className="detail-card flex">
        <div className="movie-icon w-4/12 ">
    <p>hahah</p>
        </div>
        <div className="movie-info w-8/12 ">
    <p>hahah</p>
        </div>
      </div>
    </div>
  )
}
