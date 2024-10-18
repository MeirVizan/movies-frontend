import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';




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


export const searchApi = createApi({
    reducerPath: 'searchApi',
    baseQuery,
    endpoints: (builder) => ({
        searchMovies: builder.query<any, string>({
            query: (query) => `/search/movie?include_adult=false&language=en-US&page=1&query=${query}`,
        }),
        searchTvShows: builder.query<any, string>({
            query: (query) => `/search/tv?include_adult=false&language=en-US&page=1&query=${query}`,
        }),
        searchPeople: builder.query<any, string>({
            query: (query) => `/search/person?include_adult=false&language=en-US&page=1&query=${query}`,
        }),
    }),
});

export const {
    useSearchMoviesQuery,
    useSearchTvShowsQuery,
    useSearchPeopleQuery
} = searchApi;


