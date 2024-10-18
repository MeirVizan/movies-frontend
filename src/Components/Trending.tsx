import React from 'react'
import { useFetchTredingMoviesQuery } from '../services/moviesApi';
import './Trending.css';
import MovieHomePage from './MovieHomePage';

const Trending = () => {
    const [selected, setSelected] = React.useState('day');
    const { data, error, isLoading } = useFetchTredingMoviesQuery(selected);
    console.log('data Trending:>> ', data);

    return (
        <>
            <div className="trending-container">
                <h3>Trending</h3>
                <div className="toggle-buttons">
                    <button
                        className={selected === 'day' ? 'active' : ''}
                        onClick={() => setSelected('day')}
                    >
                        Today
                    </button>
                    <button
                        className={selected === 'week' ? 'active' : ''}
                        onClick={() => setSelected('week')}
                    >
                        This Week
                    </button>
                </div>
            </div>

            <div className='trending-movies'>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error</p>}
                {data?.results?.map((movie) => (
                    <MovieHomePage movie={movie} />
                ))}
            </div>
        </>

    )
}

export default Trending;
