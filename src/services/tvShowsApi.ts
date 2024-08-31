import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { Genre, Character, TvShowInterface, TvShowDetails, FetchCharactersResponse } from '../Models/Model';

interface FetchTvShowsResponse {
    results: TvShowInterface[];
}

interface FetchGenresResponse {
    genres: Genre[];
}



interface FetchTvShowDetailsResponse extends TvShowDetails {}



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

export const tvShowsApi = createApi({
    reducerPath: 'tvShowsApi',
    baseQuery,
    endpoints: (builder) => ({
        fetchTvShows: builder.query<FetchTvShowsResponse, number>({
            query: (tvPage) => `/discover/tv?include_adult=true&language=en-US&page=${tvPage}`,
        }),
        fetchTvShowDetails: builder.query<FetchTvShowDetailsResponse, number>({
            query: (id) => `/tv/${id}?language=en-US`,
        }),
        fetchSortedTvShows: builder.query<FetchTvShowsResponse, string>({
            query: (typeSorting) => `/tv/${typeSorting}?language=en-US&page=1`,
        }),
        fetchTvShowsCharacters: builder.query<FetchCharactersResponse, number>({
            query: (id) => `/tv/${id}/credits?language=en-US`,
        }),
        fetchTvShowsGenres: builder.query<FetchGenresResponse, void>({
            query: () => `/genre/tv/list?language=en`,
        }),
        fetchFilterTvShows: builder.query<FetchTvShowsResponse, { genres: Genre[]; year: number }>({
            query: ({ genres, year }) => {
                const genreIds = genres.map((genre) => genre.id).join('%2C');
                return `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${1}&first_air_date_year=${year}&sort_by=popularity.desc&with_genres=${genreIds}`;
            },
        }),
    }),
});

export const {
    useFetchTvShowsQuery,
    useFetchTvShowDetailsQuery,
    useFetchSortedTvShowsQuery,
    useFetchTvShowsCharactersQuery,
    useFetchTvShowsGenresQuery,
    useFetchFilterTvShowsQuery,
} = tvShowsApi;
