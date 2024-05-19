import { configureStore } from '@reduxjs/toolkit';
import { rickMortyApi } from './services/RickAndMortyApi';

// ---------------------------------------------------------------------------

const store = configureStore({
    reducer: {

        [rickMortyApi.reducerPath]: rickMortyApi.reducer,
    },

    middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(rickMortyApi.middleware)
})

export default store;