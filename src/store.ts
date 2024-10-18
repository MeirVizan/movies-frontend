import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authApi';
import { moviesApi } from './services/moviesApi';
import userReducer from './features/user/userSlice';
import moviesReducer from './features/movies/moviesSlice';
import tvShowsReducer from './features/tvShows/tvShowsSlice';
import { tvShowsApi } from './services/tvShowsApi';
import searchReducer from './features/search/searchSlice';
import { searchApi } from './services/searchApi';


const store = configureStore({
    reducer: {
        user: userReducer,
        [authApi.reducerPath]: authApi.reducer,
        movies: moviesReducer,
        [moviesApi.reducerPath]: moviesApi.reducer,
        tvShows: tvShowsReducer,
        [tvShowsApi.reducerPath]: tvShowsApi.reducer,
        search: searchReducer,
        [searchApi.reducerPath]: searchApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(moviesApi.middleware)
            .concat(tvShowsApi.middleware)
            .concat(searchApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
