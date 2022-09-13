import s from "./MovieDetail.module.css"
import {useParams} from "react-router-dom";

const MovieDetail = () => {

    const params = useParams();
    console.log("params", params);

    return(
        <div className={s.contaier}>
            <h1>MovieDetail</h1>
        </div>
    )
}

export default MovieDetail;