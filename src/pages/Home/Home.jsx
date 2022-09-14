import { useEffect, useState, useContext } from 'react';
import configData from '../../config.json';
import s from './Home.module.css';
import useGetGenre from '../../hooks/useGetGenre';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import genreContext from '../../context/context';
import GenreContext from '../../context/context';

const Home = () => {
	const [popularMovies, setPopularMovies] = useState([]);
	const [movieGenres, setMovieGenres] = useState([]);
	const genres = useContext(genreContext).genresArray;
	const { nameToSearch } = useContext(GenreContext);
	const [searchResults, setSearchResults] = useState([]);
	const getGenre = useGetGenre();
	const navigate = useNavigate();

	const redirectToDetail = (e) => {
		navigate(`/detail/${e.target.dataset.value}`);
	};

	useEffect(() => {
		const getSearchResults = async () => {
			const response = await fetch(
				`https://api.themoviedb.org/3/search/movie?api_key=3f5bf13c3624e5013d3c11da8421e497&query=${nameToSearch}`
			);
			const data = await response.json();
			console.log('results data', data);
			if (!data.errors) {
				setSearchResults(data.results);
			}
		};
		getSearchResults();
	}, [nameToSearch]);

	useEffect(() => {
		// mit length wird geprüft, dass die Daten vom fetch da sind und es keine leere Array sind.
		if (genres.length && popularMovies.length) {
			let genreList = getGenre(genres, popularMovies);
			setMovieGenres(genreList);
		}
		console.log('pop movies', popularMovies);
	}, [genres, popularMovies]);

	useEffect(() => {
		// mit length wird geprüft, dass die Daten vom fetch da sind und es keine leere Array sind.
		if (genres.length && searchResults.length) {
			let genreList = getGenre(genres, searchResults);
			setMovieGenres(genreList);
			console.log('@ UseEffect search', genreList);
		}
		console.log('searchResults', searchResults);
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
			<h2 className="home__heading">Popular Movies</h2>
			{!nameToSearch && (
				<section className="home-grid">
					{popularMovies &&
						movieGenres.length &&
						popularMovies.map((movie, idx) => {
							return (
								<article className="home-item" key={uuidv4()}>
									<p className="home__rating">TODO Variable Artem (rating)</p>
									<img
										className="home__image"
										data-value={movie.id}
										onClick={redirectToDetail}
										src={`${configData.IMG_URL}${movie.poster_path}`}
										alt=""
									/>
									<p className="home__text--thin">
										{movie.release_date.split('-')[0]} - {movieGenres[idx]?.join(', ')}
									</p>
									<h3 className="home__text--white">{movie.title}</h3>
								</article>
							);
						})}
				</section>
			)}

			{nameToSearch && (
				<section>
					<h2 className="home-search__heading">Search Results</h2>
					{nameToSearch &&
						searchResults &&
						searchResults.map((movie, idx) => {
							<section className="home-search-grid">
								return (
								<article className="home-search-item" key={uuidv4()}>
									<p className="home-search__rating">TODO Variable Artem (rating)</p>
									<img
										className="home-search__image"
										data-value={movie.id}
										onClick={redirectToDetail}
										src={`${configData.IMG_URL}${movie.poster_path}`}
										alt=""
									/>
									<p className="home-search__text--thin">
										{movie.release_date?.split('-')[0]} - {movieGenres[idx]?.join(', ')}
									</p>
									<h3 className="home-search__text--white">{movie.title}</h3>
								</article>
								);
							</section>;
						})}
					{nameToSearch && searchResults && !searchResults.length && (
						<section className="search-nores">
							<h3 className="search-nores__heading">Wir haben diesen Film nicht!</h3>
							<p className="search-nores__text">
								leider haben wir keinen Film, der <strong>{nameToSearch}</strong> heißt. Falls es diesen Film
								wirklich gibt, schreiben sie uns gerne eine Email.
							</p>
							<a className="search-nores__link" href="mailto:FilmDatenBank@fakeEmailBitteNixSenden.com">
								Email Us
							</a>
						</section>
					)}
				</section>
			)}
		</>
	);
};

export default Home;
