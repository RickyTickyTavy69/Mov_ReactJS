import {NavLink, useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import GenreContext from '../../context/context';


const Navbar = (props) => {
	const { setNameToSearch } = useContext(GenreContext);
	const navigate = useNavigate();
	const path = window.location.pathname.split("/")[1];

	const changeNameToSearch = (e) => {
		setNameToSearch(e.target.value)
		path === "detail" && navigate("/");
	}


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
					onChange={(e) => changeNameToSearch(e)}
				/>
			</section>
		</nav>
	);
};

export default Navbar;
