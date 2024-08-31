import React, { createContext, ReactNode } from 'react';
import MoviesStore from './MoviesStore';
import TvShowsStore from './TvShowsStore';
import { MovieInterface, Genre, MovieDetails, TvShowInterface, TvShowDetails } from '../Models/Model';


// Define types for the context value
interface StoreContextType {
    movies: MovieInterface[];
    fetchMovies: () => void;
    query: string;
    setQuery: (query: string) => void;
    year: number;
    setYear: (year: number) => void;
    fetchSortedMovies: (typeSorting: string) => void;
    genreSelected: Genre[];
    setGenreSelected: (selected: Genre[]) => void;
    genreTypes: Genre[];
    fetchMoviesByFilter: () => void;
    fetchMovieDetails: (id: number) => void;
    movieDetails?: MovieDetails;
    movieCharacter: any;
    fetchCharactersPeople: (id: number) => void;
    tvShows: TvShowInterface[];
    fetchTvShow: () => void;
    tvPage: number;
    fetchTvShowDetails: (id: number) => void;
    tvShowDetails?: TvShowDetails;
    //   suggestions: any[];
    //   setSuggestions: (suggestions: any[]) => void;
    //   fetchSuggestions: () => void;
    //   setTvShows: (tvShows: any[]) => void;
    //   setTvPage: (page: number) => void;
    //   tvQuery: string;
    //   setTvQuery: (query: string) => void;
    //   tvGenreTypes: any[];
    //   setTvGenreTypes: (genres: any[]) => void;
    //   tvSelected: any[];
    //   setTvSelected: (selected: any[]) => void;
    //   tvYear: number;
    //   setTvYear: (year: number) => void;
    //   tvSuggestions: any[];
    //   setTvSuggestions: (suggestions: any[]) => void;
    //   fetchTvSuggestions: () => void;
    //   fetchSortedTvShows: () => void;
    //   fetchTvGenreType: () => void;
    //   fetchTvShowsByFilter: () => void;
}

// Create context with default value
export const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface StoreProviderProps {
    children: ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
    const {
        movies,
        fetchMovies,
        year, setYear,
        query, setQuery,
        fetchSortedMovies,
        genreSelected,
        setGenreSelected,
        genreTypes,
        fetchMoviesByFilter,
        fetchMovieDetails,
        movieDetails,
        movieCharacter,
        fetchCharactersPeople,
        // suggestions, setSuggestions,
        // fetchSuggestions,
        // fetchGenreType,
    } = MoviesStore()

    const {
        tvShows,
        fetchTvShow,
        tvPage,
        fetchTvShowDetails,
        tvShowDetails,
    } = TvShowsStore();

    return (
        <StoreContext.Provider
            value={{
                movies,
                fetchMovies,
                year, setYear,
                query, setQuery,
                fetchSortedMovies,
                genreSelected,
                setGenreSelected,
                genreTypes,
                fetchMoviesByFilter,
                fetchMovieDetails,
                movieDetails,
                movieCharacter,
                fetchCharactersPeople,
                tvShows,
                fetchTvShow,
                tvPage,
                fetchTvShowDetails,
                tvShowDetails,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;
