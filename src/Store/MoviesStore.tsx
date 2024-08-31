import React, { useEffect, useState } from 'react';
import { MovieInterface, Genre , MovieDetails, Character} from '../Models/Model';

const options = {
    method: 'GET', headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTFhNmRjMDRkYjhlYzk2YzcxNGRlNTkxMGU5OGI2MCIsInN1YiI6IjY1ZWYyZWM4ZTI1ODYwMDE3YjRjZWI3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HuPRZ5TzIFd4KJS4ibK3CKndvvr_ghPqnCIdxkyHHRw'
    }
};

const MoviesStore = () => {
    const [movies, setMovies] = useState<Array<MovieInterface>>([]);
    const [movieDetails, setMovieDetails] = useState<MovieDetails>();
    const [page, setPage] = useState<number>(1);
    const [year, setYear] = useState<number>(2021);
    const [query, setQuery] = useState<string>('');
    const [genreSelected, setGenreSelected] = useState<Genre[]>([]);
    const [genreTypes, setGenreTypes] = useState<Genre[]>([]);
    const [movieCharacter, setMovieCharacter] = useState<Character[]>([]);



    const fetchMovies = () => {

        fetch(
            `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
            options
        )
            .then((response) => response.json())
            .then((response) => {
                setMovies([...movies, ...response.results]);
                console.log('fetchMovies:  ', response.results);
                setPage((prevPage) => prevPage + 1);
            })
            .catch((err) => console.error(err));
    };

    const fetchMovieDetails = async (id: number) => {  //fetching movie details
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log('fetchMovieDetails', data)
            setMovieDetails({...data}); // Assuming the response is an array of suggestions
        }
        catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const fetchSortedMovies = async (typeSorting: string) => {

        try {
            console.log('typeSorting', typeSorting)
            const response = await fetch(`https://api.themoviedb.org/3/movie/${typeSorting}?language=en-US&page=1`, options);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setMovies([...data.results]); // Assuming the response is an array of suggestions
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const fetchMoviesByFilter = async () => {
        console.log('selected', genreSelected)
        // console.log('selectdGenre', selectdGenre)
        let genreIdListString = genreSelected?.map((genre) => genre?.id).join('%2C');

        console.log('genre', genreIdListString)

        try {
            fetch(
                `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_year=${year}&sort_by=popularity.desc&with_genres=${genreIdListString}`,
                options
            )
                .then((response) => response.json())
                .then((response) => {
                    setMovies([...response.results]);
                    console.log('response.results:  ', response.results);
                    setPage((prevPage) => prevPage + 1);
                })
                .catch((err) => console.error(err));
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };


    const fetchGenreType = async () => {

        try {
            const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en`, options);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setGenreTypes([...data.genres]); // Assuming the response is an array of suggestions
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const fetchCharactersPeople = async (id: number) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log('data.cast', data.cast)
            setMovieCharacter([...data.cast]); // Assuming the response is an array of suggestions
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };


    useEffect(() => {
        fetchGenreType();
    }, []);

    return {
        movies, fetchMovies,
        year, 
        setYear: (year: number) => setYear(year),
        query, setQuery,
        fetchSortedMovies,
        genreSelected,
        setGenreSelected: (selected: Genre[]) => setGenreSelected(selected), 
        genreTypes,
        fetchMoviesByFilter,
        fetchMovieDetails: (id: number) => fetchMovieDetails(id),
        movieDetails,
        movieCharacter,
        fetchCharactersPeople: (id: number) => fetchCharactersPeople(id),

    };
}

export default MoviesStore;