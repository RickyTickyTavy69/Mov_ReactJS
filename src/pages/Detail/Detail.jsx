import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import configData from '../../config.json';
import no_poster from "../../assets/images/no_poster.jpg";


const Detail = () => {
	const params = useParams();
	const [movieData, setMovieData] = useState({});
	const [trailerLink, setTrailerLink] = useState('');
	const [allTrailerLinks, setAllTrailerLinks] = useState([]);
	const [hasTrailer, setHasTrailer] = useState(true);

	const changeTrailer = () => {
		if (allTrailerLinks.length > 1){
			if (allTrailerLinks[1].site === 'YouTube') {
				const videoLink = `https://www.youtube.com/embed/${allTrailerLinks[1].key}`;
				setTrailerLink(videoLink);
			} else {
				setHasTrailer(false);
				console.log('kein lInk für Youtube Trailer');
			}
		}
	}

	useEffect(() => {
		const getMovie = async () => {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${params.id}?api_key=dd7ac1f247ec64e83419d95ecc19b3b3`
			);
			const data = await response.json();
			console.log("data @ Detail", data);
			setMovieData(data);
		};
		getMovie();
	}, [params]);

	useEffect(() => {
		const getMovie = async () => {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=dd7ac1f247ec64e83419d95ecc19b3b3`
			);
			const data = await response.json();
			console.log('useEffect Detail data', data);
			if (!data.results.length) {
				setHasTrailer(false);
			} else {
				setAllTrailerLinks(data.results);
				console.log("@ Detail trailer results", data.results);
				if (data.results[0].site === 'YouTube') {
					const videoLink = `https://www.youtube.com/embed/${data.results[0].key}`;
					setTrailerLink(videoLink);
				} else {
					setHasTrailer(false);
					console.log('kein lInk für Youtube Trainer');
				}
			}
		};
		getMovie();
	}, [movieData.id]);

	return (
		<>
			{movieData.genres && (
				<main>
					<h2 className="details__heading">{movieData.title}</h2>
					<article className="details__grid">
						<img
							className="details__poster"
							alt={`${movieData.title} poster`}
							src={movieData.poster_path? `${configData.IMG_URL}${movieData.poster_path}`: no_poster}
						/>
						<p className="details__release">Release Date</p>
						<p className="details__release--data">{movieData.release_date}</p>
						<p className="details__genres">Genres</p>
						<p className="details__genres--data">
							{movieData.genres
								.map((genreobj) => {
									return genreobj.name;
								})
								.join(', ')}
						</p>
						<p className="details__overview">Overview</p>
						<p className="details__overview--data">{movieData.overview}</p>
						<p className="details__average">Average Voting</p>
						<p className="details__average--data">{movieData.vote_average}</p>
						<p className="details__trailer">Watch Trailer</p>
						<section>
							{hasTrailer && (
								<div>
								<iframe
									width="560"
									height="315"
									src={trailerLink}
									title="YouTube video player"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								></iframe>
								<button onClick={changeTrailer} style={{padding: "2% 4%", cursor: "pointer"}}>Kein Trailer zu sehen?</button>
								</div>
							)}
							{!hasTrailer && (
								<p>
									Leider wurden keine Trailer zu diesem Film gefunden.... Sie können gerne bei Google selber
									suchen ;)
								</p>
							)}
						</section>
					</article>
				</main>
			)}
		</>
	);
};

export default Detail;
