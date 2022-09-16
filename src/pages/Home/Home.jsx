import { useEffect, useState, useContext } from 'react';
import configData from '../../config.json';
import useGetGenre from '../../hooks/useGetGenre';
import useRequest from "../../hooks/useRequest";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import genreContext from '../../context/context';
import GenreContext from '../../context/context';
import no_poster from '../../assets/images/no_poster.jpg';

const Home = () => {
	const [popularMovies, setPopularMovies] = useState([]);
	const [movieGenres, setMovieGenres] = useState([]);
	const genres = useContext(genreContext).genresArray;
	const { nameToSearch } = useContext(GenreContext);
	const [searchResults, setSearchResults] = useState([]);
	const getGenre = useGetGenre();
	const navigate = useNavigate();
	const request = useRequest();

	const redirectToDetail = (e) => {
		navigate(`/detail/${e.target.dataset.value}`);
	};

	useEffect(() => {
		const getSearchResults = async () => {
			const url = `https://api.themoviedb.org/3/search/movie?api_key=3f5bf13c3624e5013d3c11da8421e497&query=${nameToSearch}`;
			const data = await request(url);
			if (!data.errors) {
				setSearchResults(data.results);
			}
		};
		if (nameToSearch) {
			getSearchResults();
		}

	}, [nameToSearch]);

	useEffect(() => {
		// mit length wird geprüft, dass die Daten vom fetch da sind und es keine leere Array sind.
		if (genres.length && popularMovies.length) {

			let genreList = getGenre(genres, popularMovies);

			setMovieGenres(genreList);
		}
	}, [genres, popularMovies]);

	useEffect(() => {
		// mit length wird geprüft, dass die Daten vom fetch da sind und es keine leere Array sind.
		if (genres.length && searchResults.length) {
			let genreList = getGenre(genres, searchResults);
			setMovieGenres(genreList);

		}

	}, [genres, searchResults]);

	useEffect(() => {
		const getMovies = async () => {
			const data = await request(configData['API_LINK']);
			setPopularMovies(data.results);
		};
		getMovies();
	}, [nameToSearch]);

	return (
		<>
			{!nameToSearch && (
				<>
					<h2 className="home__heading">Popular Movies</h2>
					<section className="home-grid">
						{popularMovies &&
							movieGenres.length &&
							popularMovies.map((movie, idx) => {
								return (
									<article className="home-item" key={uuidv4()}>
										<p className="home__rating">{movie.vote_average}</p>
										<img
											className="home__image"
											data-value={movie.id}
											onClick={redirectToDetail}
											src={movie.poster_path ? `${configData.IMG_URL}${movie.poster_path}` : no_poster}
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
				</>
			)}

			{nameToSearch && (
				<section>
					<h2 className="home-search__heading">Search Results</h2>
					{nameToSearch && searchResults && (
						<section className="home-search-grid">
							{searchResults.map((movie, idx) => {
								return (
									<article className="home-search-item" key={uuidv4()}>
										<p className="home-search__rating">{movie.vote_average}</p>
										<img
											className="home-search__image"
											data-value={movie.id}
											onClick={redirectToDetail}
											src={movie.poster_path ? `${configData.IMG_URL}${movie.poster_path}` : no_poster}
											alt=""
										/>
										<p className="home-search__text--thin">
											{movie.release_date?.split('-')[0]} - {movieGenres[idx]?.join(', ')}
										</p>
										<h3 className="home-search__text--white">{movie.title}</h3>
									</article>
								);
							})}
						</section>
					)}

					{nameToSearch && searchResults && !searchResults.length && (
						<article className="search-nores" key={uuidv4()}>
							<h3 className="search-nores__heading">Entschuldigung! </h3>
							<p className="search-nores__text">
								Leider haben wir keinen Film, der <strong>{nameToSearch}</strong> heißt. Falls es diesen Film
								wirklich gibt, schreiben sie uns gerne eine Email.
							</p>
							<p className="home-search__text--thin"></p>
							<a className="search-nores__link" href="mailto:FilmDatenBank@fakeEmailBitteNixSenden.com">
								Email Us
							</a>
						</article>
					)}
				</section>
			)}
		</>
	);
};
export default Home;
