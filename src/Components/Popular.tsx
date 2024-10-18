import React from 'react';
import './Trending.css';
import { useFetchSortedMoviesQuery, useFetchTheatersMoviesQuery } from '../services/moviesApi';
import { useFetchSortedTvShowsQuery } from '../services/tvShowsApi';
import MovieHomePage from './MovieHomePage';

const Popular = () => {
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    // convert date to string like 2024-09-01
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let dateString = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    console.log('dateString :>> ', dateString);
    const [selected, setSelected] = React.useState('streaming');
    const { data, error, isLoading } = useFetchSortedMoviesQuery('popular')
    const { data: tvData, error: tvError, isLoading: tvIsLoading } = useFetchSortedTvShowsQuery('popular');
    const { data: moviesTheathers, error: errorTheathers, isLoading: isLoadingTheathers } = useFetchTheatersMoviesQuery(dateString);
    console.log(' moviesTheathers:>> ', moviesTheathers);

    return (
        <>
            <div className="trending-container">
                <h3>What's Popular</h3>
                <div className="toggle-buttons">
                    <button
                        className={selected === 'streaming' ? 'active' : ''}
                        onClick={() => setSelected('streaming')}
                    >
                        Streaming
                    </button>
                    <button
                        className={selected === 'onTv' ? 'active' : ''}
                        onClick={() => setSelected('onTv')}
                    >
                        On Tv
                    </button>
                    <button
                        className={selected === 'inTheaters' ? 'active' : ''}
                        onClick={() => setSelected('inTheaters')}
                    >
                        In Theaters
                    </button>
                </div>
            </div>

            {selected === 'streaming' ? (
                <div className='trending-movies'>
                    {isLoading && <p>Loading...</p>}
                    {error && <p>Error</p>}
                    {data?.results?.map((movie) => (
                        <MovieHomePage movie={movie} />
                    ))}
                </div>
            )
                : selected === 'onTv' ? (

                    <div className='trending-movies'>
                        {tvIsLoading && <p>Loading...</p>}
                        {tvError && <p>Error</p>}
                        {tvData?.results?.map((tvShow) => (
                            <MovieHomePage movie={tvShow} />
                        ))}
                    </div>
                ) :
                    (
                        <div className='trending-movies'>
                            {isLoadingTheathers && <p>Loading...</p>}
                            {errorTheathers && <p>Error</p>}
                            {moviesTheathers?.results?.map((movie) => (
                                <MovieHomePage movie={movie} />
                            ))}
                        </div>

                    )
            }

        </>
    )
}

export default Popular