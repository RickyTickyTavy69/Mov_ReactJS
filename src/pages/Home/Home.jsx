import {useEffect, useState} from "react";
import configData from "../../config.json";
import s from "./Home.module.css";
import useGetGenres from "../../hooks/useGetGenre";

const Home = () => {

    const [popularMovies, setPopularMovies] = useState([]);
    const [movieGenres, setMovieGenres] = useState([]);
    const getGenre = useGetGenres();



    useEffect( () => {

        const getMovies = async () => {
            const response = await fetch(configData["API_LINK"]);
            const data = await response.json();
            console.log("data", data.results);
            setPopularMovies(data.results);

            let genres = [];
            data.results.forEach((movie) => {
                console.log("genre_id", movie.genre_ids);
                let movieGenres = [];
                movie.genre_ids.forEach((id) => {
                    let genre = getGenre(id);
                    console.log("genre hier", genre);
                    movieGenres.push(genre);
                })
                console.log("moviegenres", movieGenres);
                genres.push(movieGenres);
            })
            console.log("all genres", genres);
            setMovieGenres(genres);
        }

        getMovies();



    }, [])



    return (
        <>
            {<section className={s.movies}>
            {popularMovies && movieGenres && popularMovies.map((movie, idx) => {

                return(
                    <article className={s.item}>
                        <img src={`${configData.IMG_URL}${movie.poster_path}`} alt=""/>
                        <p>{movie.release_date.split("-")[0]}</p>
                        <p>{movieGenres[idx].toString()}</p>
                    </article>
                )
            })}
        </section>}
        </>
    )
}


export default Home;