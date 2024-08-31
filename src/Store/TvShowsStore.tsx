import React, { useEffect, useState } from 'react';
import { TvShowInterface, TvShowDetails } from '../Models/Model';

const options = {
    method: 'GET', headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTFhNmRjMDRkYjhlYzk2YzcxNGRlNTkxMGU5OGI2MCIsInN1YiI6IjY1ZWYyZWM4ZTI1ODYwMDE3YjRjZWI3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HuPRZ5TzIFd4KJS4ibK3CKndvvr_ghPqnCIdxkyHHRw'
    }
};

const TvShowStore = () => {


    const [tvShows, setTvShows] = useState<TvShowInterface[]>([]);
    const [tvPage, setTvPage] = useState<number>(1);
    const [tvShowDetails, setTvShowDetails] = React.useState<TvShowDetails>();
    // const [tvGenreTypes, setTvGenreTypes] = React.useState([]);
    // const [tvSelected, setTvSelected] = React.useState([]);
    // const [tvYear, setTvYear] = React.useState('');
    // const [tvQuery, setTvQuery] = React.useState("");
    // const [tvSuggestions, setTvSuggestions] = React.useState([]);   

    const fetchTvShow = () => {
        fetch(
            `https://api.themoviedb.org/3/discover/tv?include_adult=true&language=en-US&page=${tvPage}`,
            options
        )
            .then((response) => response.json())
            .then((response) => {
                setTvShows([...tvShows, ...response.results]);
                setTvPage((prevPageTv) => prevPageTv + 1);
            })
            .catch((err) => console.error(err));
    };

    const fetchTvShowDetails = async (id: number) => {  //fetching movie details
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log('fetchTvShowDetails', data)
            setTvShowDetails({ ...data }); // Assuming the response is an array of suggestions
        }
        catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };


    // const fetchTvSuggestions = async () => {

    //     // console.log("path:  ", window.location.pathname);
    //     // let searchType = window.location.pathname === '/tvshow' ? 'tv' : 'movie';
    //     try {
    //         const response = await fetch(
    //             `https://api.themoviedb.org/3/search/tv?query=${tvQuery}&include_adult=false&language=en-US&page=1`,
    //             options 
    //         );
    //         if (!response.ok) {
    //             throw new Error("Network response was not ok");
    //         }
    //         const data = await response.json();
    //         console.log('data fetchTvSuggestions', data)
    //         setTvSuggestions([...data.results]); // Assuming the response is an array of suggestions
    //     } catch (error) {
    //         console.error("Error fetching suggestions:", error);
    //     }
    // };

    // const fetchSortedTvShows = async (typeSorting) => {

    //     try {
    //         const response = await fetch(`https://api.themoviedb.org/3/tv/${typeSorting}?language=en-US&page=1`, options);
    //         if (!response.ok) {
    //             throw new Error("Network response was not ok");
    //         }
    //         const data = await response.json();
    //         setTvShows([...data.results]); // Assuming the response is an array of suggestions
    //     } catch (error) {
    //         console.error("Error fetching suggestions:", error);
    //     }
    // };

    // const fetchTvGenreType = async () => {

    //     try {

    //         const response = await fetch(`https://api.themoviedb.org/3/genre/tv/list?language=en`, options);

    //         if (!response.ok) {
    //             throw new Error("Network response was not ok");
    //         }
    //         const data = await response.json();
    //         console.log('fetchTvGenreType ', data)
    //         setTvGenreTypes([...data.genres]); // Assuming the response is an array of suggestions
    //     } catch (error) {
    //         console.error("Error fetching suggestions:", error);
    //     }
    // };

    // const fetchTvShowsByFilter = async () => {
    //     console.log('selected', tvSelected)
    //     let selectdGenre = tvGenreTypes.filter((genre) => tvSelected.includes(genre.name));
    //     console.log('selectdGenre', selectdGenre)
    //     let genre = selectdGenre.map((genre) => genre.id).join('%2C');
    //     console.log('genre', genre)

    //     try {
    //         fetch(
    //             `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${tvPage}&first_air_date_year=${tvYear}&sort_by=popularity.desc&with_genres=${genre}`,
    //             options
    //         )
    //             .then((response) => response.json())
    //             .then((response) => {
    //                 setTvShows([...response.results]);
    //                 console.log('response.results:  ', response.results);
    //                 setTvPage((prevPage) => prevPage + 1);
    //             })
    //             .catch((err) => console.error(err));
    //     } catch (error) {
    //         console.error("Error fetching suggestions:", error);
    //     }
    // };


    // useEffect(() => {
    //     fetchTvGenreType()
    // }, [])

    return {
        tvShows,
        fetchTvShow,
        tvPage,
        fetchTvShowDetails,
        tvShowDetails,
        // tvGenreTypes, setTvGenreTypes,
        // tvSelected, setTvSelected,
        // tvYear, setTvYear,
        // tvQuery, setTvQuery,
        // tvSuggestions, setTvSuggestions,
        // fetchTvSuggestions,
        // fetchSortedTvShows,
        // fetchTvGenreType,
        // fetchTvShowsByFilter
    }
};

export default TvShowStore;
