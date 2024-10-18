import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useFetchMoviesQuery } from '../services/moviesApi';
import { useFetchTvShowsQuery } from '../services/tvShowsApi';
import Movie from '../Components/Movie';
import TvShow from '../Components/TvShow';
import { Container, Slider } from '@mui/material';
import Trending from '../Components/Trending';
import MovieHomePage from '../Components/MovieHomePage';
import SliderHomePage from '../Components/SliderHomePage';
import Popular from '../Components/Popular';
import MovieOrTvShow from '../Components/MovieOrTvShow';



const Home = () => {

    // const dispatch = useDispatch();
    // const page = useSelector((state: RootState) => state.movies.page);
    // const { data, error, isLoading } = useFetchMoviesQuery(1);
    // const { data: tvData, error: tvError, isLoading: isLoadingTv } = useFetchTvShowsQuery(1);
    // console.log('data :>> ', data);
    // console.log('tvData :>> ', tvData);

    return (
        <>
            <SliderHomePage />
            <div className='container'>
                <div >
                    <Trending />
                </div>

                <div>
                    <Popular />
                </div>

                <div>
                    <MovieOrTvShow />
                </div>

            </div>
        </>
    )
}

export default Home;
