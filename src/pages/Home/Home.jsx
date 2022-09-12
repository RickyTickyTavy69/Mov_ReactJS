import {useEffect, useState} from "react";
import configData from "../../config.json";
import s from "./Home.module.css";

const Home = () => {

    const [popularMovies, setPopularMovies] = useState([]);

    useEffect( () => {

        const getMovies = async () => {
            const response = await fetch(configData["API_LINK"]);
            const data = await response.json();
            console.log("data", data.results);
            setPopularMovies(data.results);
        }
        getMovies();

    }, [])



    return (
        <>
            {<section className={s.movies}>
            {popularMovies && popularMovies.map((movie) => {
                console.log(`${movie.poster_path}`)
                return(
                    <article className={s.item}>
                        <div>bild</div>
                        <img src={`${configData["API_LINK"]}${movie.poster_path}`} alt=""/>
                    </article>
                )
            })}
        </section>}
        </>
    )
}


export default Home;