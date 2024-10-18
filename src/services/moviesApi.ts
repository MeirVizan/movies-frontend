import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { MovieInterface, MovieDetails, Genre, Character, FetchCharactersResponse } from '../Models/Model';
import { setMovies } from '../features/movies/moviesSlice';
import { useDispatch, useSelector } from 'react-redux';

interface FetchMoviesResponse {
    results: MovieInterface[];
}

interface FetchGenresResponse {
    genres: Genre[];
}

interface FetchMovieDetailsResponse extends MovieDetails {}


const baseQuery = fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).user.token;
        if (token) {
            headers.set('authorization', `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTFhNmRjMDRkYjhlYzk2YzcxNGRlNTkxMGU5OGI2MCIsInN1YiI6IjY1ZWYyZWM4ZTI1ODYwMDE3YjRjZWI3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HuPRZ5TzIFd4KJS4ibK3CKndvvr_ghPqnCIdxkyHHRw`);
        }
        headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTFhNmRjMDRkYjhlYzk2YzcxNGRlNTkxMGU5OGI2MCIsInN1YiI6IjY1ZWYyZWM4ZTI1ODYwMDE3YjRjZWI3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HuPRZ5TzIFd4KJS4ibK3CKndvvr_ghPqnCIdxkyHHRw`); // Add your TMDB API key here
        headers.set('Content-Type', 'application/json');
        return headers;
    },
});

export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery,
    endpoints: (builder) => ({
        fetchMovies: builder.query<FetchMoviesResponse, number>({
            query: (page) => `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
            transformResponse: (response: FetchMoviesResponse) => {
                // const dispatch = useDispatch();
                // console.log('response :>> ', response);
                const movieData: FetchMoviesResponse = response;
                // const movies = useSelector((state: RootState) => state.movies.movies);
                setMovies([...movieData.results]);
                return response;
            }
        }),
        fetchMvieDetails: builder.query<FetchMovieDetailsResponse, number>({
            query: (id) => `/movie/${id}?language=en-US`,
        }),
        fetchSortedMovies: builder.query<FetchMoviesResponse, string>({
            query: (typeSorting) => `/movie/${typeSorting}?language=en-US&page=1`,
            transformResponse: (response: FetchMoviesResponse) => {
                return response;
            }
        }),
        fetchCharacters: builder.query<FetchCharactersResponse, number>({
            query: (id) => `/movie/${id}/credits?language=en-US`,
        }),
        fetchGenres: builder.query<FetchGenresResponse, void>({
            query: () => `/genre/movie/list?language=en-US`,
        }),
        fetchFilterMovies: builder.query<FetchMoviesResponse, { genres: Genre[]; year: number }>({
            query: ({ genres, year }) => {
                const genreIds = genres.map((genre) => genre.id).join('%2C');
                return `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=${year}&sort_by=popularity.desc&with_genres=${genreIds}`;
            },
        }),
        fetchTredingMovies: builder.query<FetchMoviesResponse, string>({
            query: (period) => `/trending/all/${period}?language=en-US`,
        }),
        fetchTheatersMovies: builder.query<FetchMoviesResponse, string>({
            query: (period) => `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=${period}`,
        }),
    }),
});

export const {
    useFetchMoviesQuery,
    useFetchMvieDetailsQuery,
    useFetchSortedMoviesQuery,
    useFetchCharactersQuery,
    useFetchGenresQuery,
    useFetchFilterMoviesQuery,
    useFetchTredingMoviesQuery,
    useFetchTheatersMoviesQuery,
} = moviesApi;
