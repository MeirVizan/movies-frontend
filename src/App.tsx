import React, { useEffect } from 'react';
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
import { useGetUserQuery } from './services/authApi';
import { isToken } from 'typescript';
import { useSelector } from 'react-redux';
import { selectToken } from './features/user/userSlice';
import { RootState } from './store';
import Home from './Pages/Home';
import SearchResult from './Pages/SearchResult';

const App: React.FC = () => {

  const token = useSelector((state: RootState) => selectToken(state));
  const { data, error } = useGetUserQuery();
  useEffect(() => {
    if (error) {
      console.error('Failed to fetch user:', error);
    }
    if (data) {
      console.log('data :>> ', data);
    }
  }, [token]);

  return (
    <div className='background-container fade-in'>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/movieDetails/:id" element={<MovieDetails />} />
            <Route path="/tvshows" element={<TvShows />} />
            <Route path="/tvshows/tvShowDetails/:id" element={<TvShowDetails />} />
            <Route path="/searchresult" element={<SearchResult />} />
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
