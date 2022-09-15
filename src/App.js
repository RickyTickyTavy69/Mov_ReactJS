import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import './App.css';
import GenreContext from './context/context';
import useGetGenresArray from './hooks/useGetGenresArray';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
	const [genresArray, setGenresArray] = useState([]);
	const getGenresArray = useGetGenresArray();
	const [nameToSearch, setNameToSearch] = useState();

	useEffect(() => {
		const getGenres = async () => {
			const Array = await getGenresArray();
			setGenresArray(Array.genres);
		};
		getGenres();
	}, []);

	return (
		<>
			<GenreContext.Provider value={{ genresArray, nameToSearch, setNameToSearch }}>
				<Router>
					<Navbar></Navbar>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/detail/:id" element={<Detail />} />{' '}
						{/*in die Route wird ein query paramenter übergeben*/}
					</Routes>
					<Footer></Footer>
				</Router>
			</GenreContext.Provider>
		</>
	);
}

export default App;
