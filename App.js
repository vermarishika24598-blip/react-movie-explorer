import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Card from "./components/Card";
import Popular from "./components/Popular";
import Top from "./components/Toprated";
import Upcoming from "./components/Upcoming";
import Footer from "./components/Footer";
import MovieDetails from "./components/moviesdata";


export default function App() {
  return (
    <BrowserRouter>
      <Header />  {/* stays on all pages */}
      <Routes>
        <Route
          path="/" element={<><Card /><Popular /> </> }/>
        <Route path="/popular" element={<Popular />} />
        <Route path="/top-rated" element={<Top />} />
        <Route path="/upcoming" element={<Upcoming />} />
         <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
      <Footer /> {/* stays on all pages */}
    </BrowserRouter>
  );
}
