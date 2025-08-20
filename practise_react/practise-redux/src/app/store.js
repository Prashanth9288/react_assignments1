// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../features/pokemon/pokemonSlice';

// Configure the Redux store with the pokemon reducer
const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});

export default store;
