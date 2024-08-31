import { useDispatch, useSelector } from 'react-redux';
import { useFetchFilterMoviesQuery, useFetchSortedMoviesQuery } from '../services/moviesApi';
import { selectGenresSelected, setMovies } from '../features/movies/moviesSlice';
import { FetchMoviesResponse } from '../Models/Model';
import { RootState } from '../store';

export const useMoviesSorted = () => {
    const dispatch = useDispatch();
    const genresSelected = useSelector((state: RootState) => selectGenresSelected(state));
    const { data, error, isLoading } = useFetchFilterMoviesQuery({ genres: genresSelected, year: 2022 });

    if (error) {
        console.error('Failed to fetch sorted movies:', error);
    }

    if (data) {
        const movieData: FetchMoviesResponse = data as FetchMoviesResponse;
        dispatch(setMovies([...movieData.results]));
    }

    return {data };
};

