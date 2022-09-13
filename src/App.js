import Home from "./pages/Home/Home";
import "./app.css";
import GenreContext from "./context/context";
import useGetGenresArray from "./hooks/useGetGenresArray";
import {useState, useEffect} from "react";
import MovieDetail from "./pages/MovieDetails/MovieDetail";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {

  const [genresArray, setGenresArray] = useState([]);
  const getGenresArray = useGetGenresArray();

  useEffect(() => {

    const getGenres = async() => {
      const Array = await getGenresArray();
      setGenresArray(Array.genres);
    }

    getGenres();

  }, [])





  return (
      <GenreContext.Provider value={{genresArray}}>
        <div className="App">
            <Home/>
                {/*
                <MovieDetail/>*/}
            </div>
      </GenreContext.Provider>
  );
}

export default App;
