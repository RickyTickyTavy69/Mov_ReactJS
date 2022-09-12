import { useState } from "react";
import { useEffect } from "react";

const DisplaySearchResults = (props) => {

    // https://image.tmdb.org/t/p/w500/ + "poster_path": "/uQBbjrLVsUibWxNDGA4Czzo8lwz.jpg"
    // https://image.tmdb.org/t/p/original/ + "backdrop_path": "/5QEtCBM6aXHftr7sgFxxUUl9Ej8.jpg"

    // How to get trailer
    // https://www.themoviedb.org/talk/5451ec02c3a3680245005e3c?language=de-DE
    // http://api.themoviedb.org/3/movie/157336/videos?api_key=###
    // 686487
    // http://api.themoviedb.org/3/movie/686487/videos?api_key=3f5bf13c3624e5013d3c11da8421e497
    // `https://api.themoviedb.org/3/search/movie?api_key=3f5bf13c3624e5013d3c11da8421e497&query=Jack+Reacher`

    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=3f5bf13c3624e5013d3c11da8421e497&query=${props.pNameToSearch}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSearchResults(data);
                //setImgUrl(data.url)
            })
    }, [])

    return (
        <section>
            <p>{searchResults.original_title}</p>
            <p>{searchResults.title}</p>
            <p>{searchResults.backdrop_path}</p>
            <p>{searchResults.poster_path}</p>
            <p>{searchResults.release_date}</p>
            <p>{searchResults.genre_ids}</p>
            <p>{searchResults.overview}</p>
            <p>{searchResults.vote_average}</p>
        </section>
    );


}

export default DisplaySearchResults;