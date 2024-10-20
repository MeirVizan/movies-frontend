import React, { useEffect } from 'react'
import { MovieInterface } from '../Models/Model';
import Movie from '../Components/Movie';
import { Sidebar } from '../Components/Sidbar';
import './Pages.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectMovies, setError, setLoading, setMovies, setPage } from '../features/movies/moviesSlice';
import { useFetchMoviesQuery } from '../services/moviesApi';
import Search from '../Components/Search';

interface FetchMoviesResponse {
    results: MovieInterface[];
}

const Movies: React.FC = () => {

    const dispatch = useDispatch();
    const page = useSelector((state: RootState) => state.movies.page);
    const { data, error, isLoading } = useFetchMoviesQuery(page);
    const movies = useSelector((state: RootState) => selectMovies(state));

    useEffect(() => {
        const fetchMovieData = () => {
            dispatch(setLoading(true));
            try {
                if (error) {
                    throw new Error('Failed to fetch movies.');
                }
                if (data) {
                    const movieData: FetchMoviesResponse = data as FetchMoviesResponse;
                    dispatch(setMovies([...movies, ...movieData.results]));
                    dispatch(setError(null));
                } else {
                    throw new Error('No data.');
                }
            } catch (err) {
                dispatch(setError('Failed to fetch movies.'));
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchMovieData();
    }, [data, error, dispatch]);

    const handelPage = () => {
        dispatch(setPage(page + 1));
    }


    return (
        <div>
            <div className='autocomplete'>
                <Search />
            </div>
            <div style={{
                display: 'flex', width: '100%', margin: 'auto'
            }}>
                <div style={{ width: '20%' }}>

                    <Sidebar />
                </div>

                <div style={{ width: '80%' }}>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', margin: '0px 50px' }}>
                        {
                            movies?.map((movie, index) =>

                                <Movie movie={movie} index={index} />
                            )
                        }
                    </div>


                    <button className='loadmore-btn' onClick={handelPage} >Load More</button>

                </div>
            </div>

        </div>
    )
}

export default Movies;