import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useFetchSortedMoviesQuery } from '../services/moviesApi';
import { useFetchSortedTvShowsQuery, useFetchTvShowsQuery } from '../services/tvShowsApi';
import MovieHomePage from './MovieHomePage';

const MovieOrTvShow = () => {
    const [selected, setSelected] = React.useState('movie');
    const dispatch = useDispatch();
    const page = useSelector((state: RootState) => state.movies.page);
    const { data, error, isLoading } = useFetchSortedMoviesQuery('top_rated')
    const { data: tvData, error: tvError, isLoading: isLoadingTv } = useFetchSortedTvShowsQuery('top_rated');
    console.log('data :>> ', data);
    console.log('tvData :>> ', tvData);


    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    const handleNext = () => {
        if (sliderRef.current) {
            const sliderWidth = sliderRef.current.offsetWidth;
            sliderRef.current.scrollLeft += sliderWidth;
        }
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, data?.results.length! - 1));
    };

    const handlePrev = () => {
        if (sliderRef.current) {
            const sliderWidth = sliderRef.current.offsetWidth;
            sliderRef.current.scrollLeft -= sliderWidth;
        }
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    return (
        <>
            <div className="trending-container">
                <h3>Top Rated</h3>
                <div className="toggle-buttons">
                    <button
                        className={selected === 'movie' ? 'active' : ''}
                        onClick={() => setSelected('movie')}
                    >
                        Movies
                    </button>
                    <button
                        className={selected === 'tv' ? 'active' : ''}
                        onClick={() => setSelected('tv')}
                    >
                        Tv Shows
                    </button>
                </div>
            </div>


            {selected === 'movie' ? (
                <div className='trending-movies'>
                    {isLoading && <p>Loading...</p>}
                    {error && <p>Error</p>}
                    {data?.results?.map((movie, index) => (
                        <MovieHomePage key={index} movie={movie} />
                    ))}
                </div>
            )
                :
                (
                    <div className='trending-movies'>
                        {isLoadingTv && <p>Loading...</p>}
                        {tvError && <p>Error</p>}
                        {tvData?.results?.map((tvShow, index) => (
                            <MovieHomePage key={index} movie={tvShow} />
                        ))}
                    </div>
                )
            }

        </>

    )
}

export default MovieOrTvShow