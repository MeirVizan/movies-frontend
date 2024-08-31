import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieInterface, MovieDetails, Character, Genre, Identifiable } from '../../Models/Model';
import { RootState } from '../../store';


interface MoviesState<T extends Identifiable = Genre> {
    movies: MovieInterface[];
    movieDetails: MovieDetails | null;
    sortType: string;

    genresSelected: T[];
    genres: Genre[];

    movieCharacters: Character[];
    isLoading: boolean;
    error: string | null;
    page: number;
    year: number;
}

const initialState: MoviesState = {
    movies: [],
    movieDetails: null,
    sortType: 'now_playing',

    genresSelected: [],
    genres: [],

    movieCharacters: [],
    isLoading: false,
    error: null,
    page: 1,
    year: 2024,
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies(state, action: PayloadAction<MovieInterface[]>) {
            state.movies = action.payload;
        },
        setMovieDetails(state, action: PayloadAction<MovieDetails>) {
            state.movieDetails = action.payload;
        },
        setMovieCharacters(state, action: PayloadAction<Character[]>) {
            state.movieCharacters = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setYear(state, action: PayloadAction<number>) {
            state.year = action.payload;
        },
        setGenresSelected(state, action: PayloadAction<Identifiable[]>) {
            state.genresSelected = action.payload;
        },
        setGenres(state, action: PayloadAction<Genre[]>) {
            state.genres = [...action.payload];
        },
    },
});

export const {
    setMovies,
    setMovieDetails,
    setMovieCharacters,
    setLoading,
    setError,
    setPage,
    setYear,
    setGenresSelected,
    setGenres,
 } = moviesSlice.actions;

export default moviesSlice.reducer;


export const selectMovies = (state: RootState) => state.movies.movies;
export const selectMovieDetails = (state: RootState) => state.movies.movieDetails;
export const selectMovieCharacters = (state: RootState) => state.movies.movieCharacters;
export const selectIsLoading = (state: RootState) => state.movies.isLoading;
export const selectError = (state: RootState) => state.movies.error;
export const selectPage = (state: RootState) => state.movies.page;
export const selectYear = (state: RootState) => state.movies.year;
export const selectGenresSelected = (state: RootState) => state.movies.genresSelected;
export const selectGenres = (state: RootState) => state.movies.genres;

