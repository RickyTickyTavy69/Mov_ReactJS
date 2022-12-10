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
    // ${props.pNameToSearch}
    const [searchResults, setSearchResults] = useState([]);
    console.log(props.pNameToSearch);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=3f5bf13c3624e5013d3c11da8421e497&query=King Kong`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSearchResults(data);
                //setImgUrl(data.url)
            })
    }, [])

    return (
        <section>
            {searchResults.map((item) => {
                return (
                    <div>
                        <p>id : {item.id}</p>
                        <p>original_title : {item.original_title}</p>
                        <p>title : {item.title}</p>
                        <p>backdrop_path : {item.backdrop_path}</p>
                        <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} />
                        <p>poster_path : {item.poster_path}</p>
                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />
                        <p>release_date : {item.release_date}</p>
                        <p>genre_ids : {item.genre_ids}</p>
                        <p>overview : {item.overview}</p>
                        <p>vote_average : {item.vote_average}</p>
                        <br />
                    </div>)
            }
            )
            }
        </section>
    );
}

export default DisplaySearchResults;