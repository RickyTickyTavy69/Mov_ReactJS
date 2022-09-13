import DisplaySearchResults from '../displaysearchresults/DisplaySearchResults';
import { useState } from 'react';
import { useEffect } from 'react';

const SearchMovies = (props) => {
	const [nameToSearch, setNameToSearch] = useState('');
	const [urlData, setUrlData] = useState('');
	/*className={style.searchField}*/
	const [searchResults, setSearchResults] = useState([]);
	console.log(props.pNameToSearch);

	/*
    useEffect(() => {
        fetch({ urlData })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSearchResults(data);
                //setImgUrl(data.url)
            })
    }, [urlData])
*/

	const fnSetUrlWithSearchWord = () => {
		console.log('Name to search = ', nameToSearch);
		// setUrlData(`https://api.themoviedb.org/3/search/movie?api_key=3f5bf13c3624e5013d3c11da8421e497&query=${nameToSearch}`);

		fetch(`https://api.themoviedb.org/3/search/movie?api_key=3f5bf13c3624e5013d3c11da8421e497&query=${nameToSearch}`)
			.then((res) => res.json())
			.then((data) => {
				setSearchResults(data.results);
				console.log('From SearchMovies');
				console.log(data.results);
				console.log(searchResults.results);
			});
	};

	return (
		<>
			<section className="search">
				<button className="search__button" onClick={fnSetUrlWithSearchWord}></button>
				<input
					className="search__input"
					type="text"
					placeholder="Search something here"
					onChange={(e) => setNameToSearch(e.target.value)}
				/>
			</section>
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
						<hr />
						<br />
					</div>
				);
			})}
		</>
	);
};

export default SearchMovies;
