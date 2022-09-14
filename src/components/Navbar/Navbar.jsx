import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import GenreContext from '../../context/context';

// https://developers.themoviedb.org/3/getting-started/search-and-query-for-details
// https://api.themoviedb.org/3/search/movie?api_key=3f5bf13c3624e5013d3c11da8421e497&query=Jack+Reacher

const Navbar = (props) => {
	const { setNameToSearch } = useContext(GenreContext);
	return (
		<nav className="navigation-grid">
			<NavLink className="navigation__link" to="/">
				<h1 className="navigation__text--white">
					<span className="navigation__text--color">.</span>Mov
				</h1>
			</NavLink>
			<section className="search">
				<button className="search__button"></button>
				<input
					className="search__input"
					type="text"
					placeholder="Search something here"
					onChange={(e) => setNameToSearch(e.target.value)}
				/>
			</section>
		</nav>
	);
};

export default Navbar;
