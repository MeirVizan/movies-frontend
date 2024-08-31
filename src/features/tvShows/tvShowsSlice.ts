import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TvShowInterface, Character, TvShowDetails } from '../../Models/Model';
import { RootState } from '../../store';


interface TvShowsState {
    tvShows: TvShowInterface[];
    tvShowDetails: TvShowDetails | null;
    // genres: Genre[];
    // tvShowCharacters: Character[];
    isLoading: boolean;
    error: string | null;
    page: number;
}

const initialState: TvShowsState = {
    tvShows: [],
    tvShowDetails: null,
    // genres: [],
    // tvShowCharacters: [],
    isLoading: false,
    error: null,
    page: 1,
};

const tvShowsSlice = createSlice({
    name: 'tvShows',
    initialState,
    reducers: {
        setTvShows(state, action: PayloadAction<TvShowInterface[]>) {
            state.tvShows = action.payload;
        },
        setTvShowDetails(state, action: PayloadAction<TvShowDetails>) {
            state.tvShowDetails = action.payload;
        },
        // setTvShowCharacters(state, action: PayloadAction<Character[]>) {
        //     state.tvShowCharacters = action.payload;
        // },
        // setGenres(state, action: PayloadAction<Genre[]>) {
        //     state.genres = action.payload;
        // },
        // setSelectedMovie(state, action: PayloadAction<MovieInterface>) {
        //     state.selectedMovie = action.payload;
        // },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
    },
});

export const { setTvShows, setTvShowDetails,  setLoading, setError, setPage } = tvShowsSlice.actions;

export default tvShowsSlice.reducer;


export const selectTvShows = (state: RootState) => state.tvShows.tvShows;
export const selectTvShowDetails = (state: RootState) => state.tvShows.tvShowDetails;
// export const selectTvShowCharacters = (state: RootState) => state.tvShows.tvShowCharacters;
export const selectIsLoading = (state: RootState) => state.tvShows.isLoading;
export const selectError = (state: RootState) => state.tvShows.error;
export const selectPage = (state: RootState) => state.tvShows.page;

