import { useEffect, useState, useContext } from 'react';
import configData from '../../config.json';
import s from './Home.module.css';
import useGetGenre from '../../hooks/useGetGenre';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import genreContext from '../../context/context';
import GenreContext from "../../context/context";

const Home = () => {
	const [popularMovies, setPopularMovies] = useState([]);
	const [movieGenres, setMovieGenres] = useState([]);
	const genres = useContext(genreContext).genresArray;
	const {nameToSearch} = useContext(GenreContext);
	const [searchResults, setSearchResults] = useState([]);
	const getGenre = useGetGenre();
	const navigate = useNavigate();

	const redirectToDetail = (e) => {
		navigate(`/detail/${e.target.dataset.value}`);
	};

	useEffect(() => {

		const getSearchResults = async () => {
			const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=3f5bf13c3624e5013d3c11da8421e497&query=${nameToSearch}`);
			const data = await response.json();
			console.log("results data", data);
			if(!data.errors){
				setSearchResults(data.results);
			}
		}
		getSearchResults();
	}, [nameToSearch]);


	useEffect(() => {
		// mit length wird geprüft, dass die Daten vom fetch da sind und es keine leere Array sind.
		if (genres.length && popularMovies.length) {
			let genreList = getGenre(genres, popularMovies);
			setMovieGenres(genreList);
		}
		console.log("pop movies", popularMovies);
	}, [genres, popularMovies]);

	useEffect(() => {
		// mit length wird geprüft, dass die Daten vom fetch da sind und es keine leere Array sind.
		if (genres.length && searchResults.length) {
			let genreList = getGenre(genres, searchResults);
			setMovieGenres(genreList);
			console.log("@ UseEffect search", genreList);
		}
		console.log("searchResults", searchResults);
	}, [genres, searchResults]);



	useEffect(() => {
		const getMovies = async () => {
			const response = await fetch(configData['API_LINK']);
			const data = await response.json();
			setPopularMovies(data.results);
		};
		getMovies();
	}, []);

	return (
		<>
			{ !nameToSearch &&
				<section className={s.movies}>
					<h1>Popular Movies</h1>
					{popularMovies &&
						movieGenres.length &&
						popularMovies.map((movie, idx) => {
							return (
								<article key={uuidv4()} className={s.item}>
									<img
										data-value={movie.id}
										onClick={redirectToDetail}
										src={`${configData.IMG_URL}${movie.poster_path}`}
										alt=""
									/>
									<p>
										{movie.release_date.split('-')[0]} - {movieGenres[idx].join(', ')}
									</p>
									<h2>{movie.title}</h2>
								</article>
							);
						})}
				</section>
			}
			{ nameToSearch && searchResults &&
				searchResults.map((item) => {
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
								<hr />
								<br />
							</div>
						)
					}
				)

			}

		</>
	);
};

export default Home;
