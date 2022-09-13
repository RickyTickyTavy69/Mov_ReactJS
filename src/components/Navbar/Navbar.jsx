import {useContext} from "react";
import { Link } from "react-router-dom";
//import SearchMovies from "../searchmovies/SearchMovies";
import GenreContext from "../../context/context";
import style from './Navbar.module.css';


//https://developers.themoviedb.org/3/getting-started/search-and-query-for-details
// https://api.themoviedb.org/3/search/movie?api_key=3f5bf13c3624e5013d3c11da8421e497&query=Jack+Reacher

const Navbar = (props) => {

    const {setNameToSearch} = useContext(GenreContext);

    return (
        <>
            <nav className={style.headerNavbar}>
                <Link to='/'><h1 className={style.h1Logo}><span>.</span>Mov</h1>  </Link>
                <div>
                    <button >Search</button>
                    <input type="text" placeholder="Search something here" onChange={(e) => setNameToSearch(e.target.value)} />
                </div>
            </nav>
        </>
    )

}

export default Navbar;