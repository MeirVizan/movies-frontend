import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Select, SelectChangeEvent } from '@mui/material';
import {Accordion, AccordionSummary, AccordionDetails} from '@mui/joy';
import { AccordionGroup } from '@mui/joy';
import { useDispatch } from 'react-redux';
import { useFetchSortedMoviesQuery } from '../services/moviesApi';
import { FetchMoviesResponse, FetchTvShowsResponse } from '../Models/Model';
import { setMovies, setLoading, setError } from '../features/movies/moviesSlice';
import { skipToken } from "@reduxjs/toolkit/query";
import { useFetchSortedTvShowsQuery } from '../services/tvShowsApi';
import { setTvShows } from '../features/tvShows/tvShowsSlice';


const dataSort = {
    movies: [{ value: 'now_playing', title: 'Now Playing' },
    { value: 'popular', title: 'Popular' },
    { value: 'top_rated', title: 'Top Rated' },
    { value: 'upcoming', title: 'Upcoming' }],
    tvShows: [{ value: 'airing_today', title: 'Airing Today' },
    { value: 'on_the_air', title: 'On The Air' },
    { value: 'popular', title: 'Popular' },
    { value: 'top_rated', title: 'Top Rated' }]
}


const Sort = () => {

    const dispatch = useDispatch();
    const pathUrl = window.location.pathname;
    const [selected, setSelected] = React.useState<string>(pathUrl === '/tvshows' ? 'airing_today' : 'now_playing');

    const [myState, setState] = useState<any>(skipToken) // initialize with skipToken to skip at first
    const { data, error, isLoading } = useFetchSortedMoviesQuery(myState)

    const [myStateTv, setStateTv] = useState<any>(skipToken) // initialize with skipToken to skip at first
    const { data: tvData, error: tvError, isLoading: tvIsLoading } = useFetchSortedTvShowsQuery(myStateTv)

    useEffect(() => {
        const fetchMovieData = () => {
            dispatch(setLoading(true));
            try {
                if (error || tvError) {
                    throw new Error('Failed to fetch movies.');
                }
                if (data) {
                    const movieData: FetchMoviesResponse = data as FetchMoviesResponse;
                    dispatch(setMovies([...movieData.results]));
                    dispatch(setError(null));
                } else
                    if (tvData) {
                        const tvShowData: FetchTvShowsResponse = tvData as FetchTvShowsResponse;
                        dispatch(setTvShows([...tvShowData.results]));
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
    }, [data, tvData]);

    const handleEvent = (event: SelectChangeEvent<string>) => {
        setSelected(event.target.value);
        pathUrl === '/tvshows' ? setStateTv(event.target.value) : setState(event.target.value);
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
                backgroundColor: 'white',
                color: '#638fc2'
            }}
        >
            <Accordion>
                <AccordionSummary color='primary' style={{ height: '52px' }}>Sort</AccordionSummary>
                <AccordionDetails>
                    <p>Sort Results By</p>
                    <Select
                        style={{ width: 225, height: 45 }}
                        value={selected}
                        onChange={(event) => handleEvent(event)}
                        id="grouped-select"
                    >
                        {
                            pathUrl === '/tvshows' ?
                                dataSort.tvShows.map((item) => {
                                    return <MenuItem value={item.value}>{item.title}</MenuItem>
                                }) :
                                dataSort.movies.map((item) => {
                                    return <MenuItem value={item.value}>{item.title}</MenuItem>
                                })
                        }

                    </Select>
                </AccordionDetails>
            </Accordion>
        </AccordionGroup >
    );
}

export default Sort;
