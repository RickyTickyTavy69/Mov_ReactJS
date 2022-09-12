import { useState } from "react";
import { Link } from "react-router-dom";
import SearchMovies from "../searchmovies/SearchMovies";
import style from './Navbar.module.css';


//https://developers.themoviedb.org/3/getting-started/search-and-query-for-details
// https://api.themoviedb.org/3/search/movie?api_key=3f5bf13c3624e5013d3c11da8421e497&query=Jack+Reacher

const Navbar = (props) => {

    return (
        <nav className={style.headerNavbar}>
            <Link to='/'><h1 className={style.h1Logo}><span>.</span>Mov</h1>  </Link>
            <SearchMovies />
        </nav>
    )

}

export default Navbar;