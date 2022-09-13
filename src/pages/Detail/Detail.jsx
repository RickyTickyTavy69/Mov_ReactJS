import {useParams} from "react-router-dom";
import { useEffect, useState } from 'react';
import configData from '../../config.json';




const Detail = () => {

	const params = useParams();

	const [movieData, setMovieData] = useState({});
	const [trailerLink, setTrailerLink] = useState("");
	const [hasTrailer, setHasTrailer] = useState(true);

	useEffect( () => {
		const getMovie = async () => {
			const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=dd7ac1f247ec64e83419d95ecc19b3b3`);
			const data = await response.json()
			setMovieData(data);
		}

		getMovie();
	}, [params])

	useEffect( () => {
		const getMovie = async () => {
			const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=dd7ac1f247ec64e83419d95ecc19b3b3`);
			const data = await response.json();
			console.log("useEffect Detail data", data);
			if(!data.results.length){
				setHasTrailer(false);
			} else{
				if(data.results[0].site === "YouTube"){
					const videoLink = `https://www.youtube.com/embed/${data.results[0].key}`;
					setTrailerLink(videoLink);
				} else{
					setHasTrailer(false);
					console.log("kein lInk für Youtube Trainer");
				}
			}


		}

		getMovie();
	}, [movieData.id]);



	return (
		<div>
			{movieData.genres &&
			<main>
				 <h1 className="detail__heading">{movieData.title}</h1>
				<article className="details__container">
					<img className="details__poster" alt={`${movieData.title} poster`}  src={`${configData.IMG_URL}${movieData.poster_path}`}/>
					<p className="details__release">Release Date</p>
					<p className="details__release--data">{movieData.release_date}</p>
					<p className="details__genres">Genres</p>
					<p className="details__genres--data">{movieData.genres.map((genreobj) => {
							return genreobj.name;
					}).join(", ")}
					</p>
					<p className="details__overview">Overview</p>
					<p className="details__overview--data">{movieData.overview}</p>
					<p className="details__average">Average Voting</p>
					<p className="details__average--data">{movieData.vote_average}</p>
					<p className="details__trailer">Watch Trailer</p>
					<div>
						{ hasTrailer && <iframe width="560" height="315" src={trailerLink}
								title="YouTube video player" frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen>
						</iframe>}
						{!hasTrailer && <p>
							Leider wurden keine Trailer zu diesem Film gefunden....
							Sie können gerne bei Google selber suchen ;)
						</p> }
					</div>
				</article>
			</main>}
		</div>
	);
};

export default Detail;
