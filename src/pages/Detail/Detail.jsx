import { useEffect, useState } from 'react';
import configData from '../../config.json';

const Detail = () => {
	return (
		<>
			<section>
				<h2 className="details__heading">TODO VARIABLE</h2>
				<article className="details__grid">
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
			</section>
		</>
	);
};

export default Detail;
