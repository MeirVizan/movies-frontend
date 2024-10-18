import React, { useEffect, useState } from 'react'
import { AccordionGroup } from '@mui/joy';
import {Accordion, AccordionSummary, AccordionDetails} from '@mui/joy';
import {  Button } from '@mui/material';
import MultiSelect from './MultiSelect';
import { useFetchFilterMoviesQuery, useFetchGenresQuery } from '../services/moviesApi';
import { FetchMoviesResponse, FetchTvShowsResponse, Genre } from '../Models/Model';
import { selectGenresSelected, setGenresSelected, setMovies } from '../features/movies/moviesSlice';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import FilterByYear from './FilterByYear';
import { skipToken } from '@reduxjs/toolkit/query';
import { useFetchFilterTvShowsQuery, useFetchTvShowsGenresQuery } from '../services/tvShowsApi';
import { setTvShows } from '../features/tvShows/tvShowsSlice';

interface FetchGenresResponse {
    genres: Genre[];
}


export const Filter = () => {

    const dispatch = useDispatch();
    const { data, isLoading, isError } = useFetchGenresQuery();
    const genreTypes: FetchGenresResponse = data as FetchGenresResponse;

    const { data: tvShowGenres, isLoading: isLoadingTvShowGenres, isError: isErrorTvShowGenres } = useFetchTvShowsGenresQuery();
    const tvShowGenreTypes: FetchGenresResponse = tvShowGenres as FetchGenresResponse;

    const genresSelected = useSelector((state: RootState) => selectGenresSelected(state));
    const year = useSelector((state: RootState) => state.movies.year);

    const pathUrl = window.location.pathname;


    const [myState, setState] = useState<any>(skipToken) // initialize with skipToken to skip at first
    const { data: filteredMoviesData } = useFetchFilterMoviesQuery(myState);

    const [myStateTv, setStateTv] = useState<any>(skipToken) // initialize with skipToken to skip at first
    const { data: filteredTvData } = useFetchFilterTvShowsQuery(myStateTv);
    // console.log('filteredTvData :>> ', filteredTvData);

    // console.log('filteredMoviesData :>> ', filteredMoviesData);

    useEffect(() => {
        if (filteredMoviesData) {
            const movieData: FetchMoviesResponse = filteredMoviesData as FetchMoviesResponse;
            dispatch(setMovies(movieData.results));
        }
        if (filteredTvData) {
            const tvData: FetchTvShowsResponse = filteredTvData as FetchTvShowsResponse;
            // console.log('tvData :>> ', tvData);
            dispatch(setTvShows(tvData.results));
        }
    }, [filteredMoviesData, filteredTvData]);

    const fetchFiltered = () => {
        let parameters = { genres: genresSelected, year: year };
        pathUrl === '/tvshows' ? setStateTv(parameters) : setState(parameters);
    }

    if (isError) {
        return <div>Error</div>
    }
    if (isLoading) {
        return <div>Loading...</div>
    }
    if(isErrorTvShowGenres){
        return <div>Error</div>
    }
    if (isLoadingTvShowGenres) {
        return <div>Loading...</div>
    }


    return (
        <AccordionGroup
            sx={{
                minWidth: '260px',
                width: '260px',
                border: '1px solid #e3e3e3',
                borderRadius: '8px',
                overflow: 'hidden',
                margin: '30px 50px',
                backgroundColor: '#fff'
            }}
        >
            <Accordion>
                <AccordionSummary color='primary' style={{ height: '52px', }}>Filter</AccordionSummary>
                <AccordionDetails>

                    <MultiSelect
                        title='Genre'
                        selected={genresSelected}
                        setGenresSelected={setGenresSelected}
                        fullList={pathUrl === '/tvshows' ? tvShowGenreTypes.genres : genreTypes.genres}
                    />


                    <br />
                    <hr
                        style={{
                            color: '#f3f3f3',
                            backgroundColor: '#f3f3f3',
                            height: 0.1,
                            width: 225,
                        }}
                    />
                    <FilterByYear />

                    <Button variant="outlined" onClick={fetchFiltered}>Filter</Button>

                </AccordionDetails>
            </Accordion>
        </AccordionGroup>
    )
}
