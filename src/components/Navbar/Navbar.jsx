import { NavLink } from 'react-router-dom';
import SearchMovies from '../searchmovies/SearchMovies';

//https://developers.themoviedb.org/3/getting-started/search-and-query-for-details
// https://api.themoviedb.org/3/search/movie?api_key=3f5bf13c3624e5013d3c11da8421e497&query=Jack+Reacher

const Navbar = (props) => {
	return (
		<nav className="navigation-grid">
			<NavLink className="navigation__link" to="/">
				<h1 className="navigation__text--white">
					<span className="navigation__text--color">.</span>Mov
				</h1>
			</NavLink>
			<SearchMovies className="search"></SearchMovies>
		</nav>
	);
};

export default Navbar;
