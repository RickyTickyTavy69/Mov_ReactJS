import {useEffect, useState, useContext} from "react";
import configData from "../../config.json";
import s from "./Home.module.css";
import useGetGenre from "../../hooks/useGetGenre";
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from "react-router-dom";
import MovieDetail from "../MovieDetails/MovieDetail";


import genreContext from "../../context/context";

const Home = () => {

    const [popularMovies, setPopularMovies] = useState([]);
    const [movieGenres, setMovieGenres] = useState([]);
    const genres = useContext(genreContext).genresArray;
    const getGenre = useGetGenre();
    //const navigate = useNavigate();

    const redirectToDetail = (e) => {
        console.log("redirect", e.target.dataset.value);
        //navigate("/")
    }

    useEffect(() => {           // mit length wird geprüft, dass die Daten vom fetch da sind und es keine leere Array sind.
        if(genres.length && popularMovies.length){
            let genreList = getGenre(genres, popularMovies);
            setMovieGenres(genreList);
        }
    }, [genres, popularMovies]);


    useEffect( () => {
        const getMovies = async () => {
            const response = await fetch(configData["API_LINK"]);
            const data = await response.json();
            console.log("results", data.results);
            setPopularMovies(data.results);
        }
        getMovies();
    }, [])



    return (
        <>
            {<section className={s.movies}>
                <h1>Popular Movies</h1>
                {popularMovies && movieGenres.length && popularMovies.map((movie, idx) => {
                    return(
                        <article key={uuidv4()} className={s.item}>
                            <img data-value={movie.id} onClick={redirectToDetail} src={`${configData.IMG_URL}${movie.poster_path}`} alt=""/>
                            <p>{movie.release_date.split("-")[0]} - {movieGenres[idx].join(", ")}</p>
                            <h2>{movie.title}</h2>
                        </article>
                    )
                })}
            </section>}
        </>
    )
}


export default Home;