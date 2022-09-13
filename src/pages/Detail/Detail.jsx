import { useEffect, useState } from 'react';
import configData from '../../config.json';

const Detail = () => {
	return (
		<>
			<Navbar></Navbar>
			<main>
				<h1 className="detail__heading">TODO VARIABLE</h1>
				<article className="details__container">
					<img className="details__poster">TODO Trailer</img>
					<p className="details__release">Release Date</p>
					<p className="details__release--data">TODO VARIABLE</p>
					<p className="details__genres">Genres</p>
					<p className="details__genres--data">TODO VARIABLE</p>
					<p className="details__overview">Overview</p>
					<p className="details__overview--data">TODO VARIABLE</p>
					<p className="details__average">Average Voting</p>
					<p className="details__average--data">TODO VARIABLE</p>
					<p className="details__trailer">Watch Trailer</p>
					<p className="details__trailer--data">TODO Trailer</p>
				</article>
			</main>
			<Footer></Footer>
		</>
	);
};

export default Detail;
