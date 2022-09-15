import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import GenreContext from '../../context/context';


const Navbar = (props) => {
	const { setNameToSearch, nameToSearch } = useContext(GenreContext);
	const navigate = useNavigate();
	const path = window.location.pathname.split("/")[1];

	const changeNameToSearch = (e) => {
		setNameToSearch(e.target.value)
		path === "detail" && navigate("/");
	}

	const redirectToHome = (e) => {
		//e.preventDefault();
		console.log("redirect to Home");
		setNameToSearch("");						// nach dem leeren des search muss man irgendwie nochmal ein mount erzwingen.
		path === "detail" && navigate("/");
	}


	return (
		<nav className="navigation-grid">
			{/*Den Link am besten in ein div umbauen und dann nur den cursor: pointer dazu*/}
			<div onClick={(e) => redirectToHome(e)} className="navigation__link" >
				<h1 className="navigation__text--white">
					<span className="navigation__text--color">.</span>Mov
				</h1>
			</div>
			<section className="search">
				<button className="search__button"></button>
				<input
					value={nameToSearch}
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
