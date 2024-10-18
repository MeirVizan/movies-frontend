import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieInterface, MovieDetails, Character, Genre, Identifiable } from '../../Models/Model';
import { RootState } from '../../store';


interface SearchState<T extends Identifiable = Genre> {
    results: any[];
    querySearch: string;
}

const initialState: SearchState = {
    results: [],
    querySearch: '',
};



const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setResults(state, action: PayloadAction<any[]>) {
            state.results = action.payload;
        },
        setQuerySearch(state, action: PayloadAction<string>) {
            state.querySearch = action.payload;
        }
    },
});


export default searchSlice.reducer;


export const { setResults, setQuerySearch } = searchSlice.actions;

export const selectSeatchQuery = (state: RootState) => state.search.querySearch;
