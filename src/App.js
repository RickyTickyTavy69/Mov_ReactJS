import Home from "./pages/Home/Home";
import "./app.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (

    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Home />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div></>
  );
}

export default App;
