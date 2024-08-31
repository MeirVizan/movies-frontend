import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Movies from './Pages/Movies';
import MovieDetails from './Pages/MovieDetails';
import TvShows from './Pages/TvShows';
import TvShowDetails from './Pages/TvShowDetails';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import ProtectedRoute from './Components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <div className='app'>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Movies />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/movieDetails/:id" element={<MovieDetails />} />
            <Route path="/tvshows" element={<TvShows />} />
            <Route path="/tvshows/tvShowDetails/:id" element={<TvShowDetails />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
