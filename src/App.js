import Home from "./pages/Home/Home";
import "./app.css";
import GenreContext from "./context/context";


function App() {
  return (
      <GenreContext.Provider value={{}}>
    <div className="App">
      <Home/>
    </div>
      </GenreContext.Provider>
  );
}

export default App;
