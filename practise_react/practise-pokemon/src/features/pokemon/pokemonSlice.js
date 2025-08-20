import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async (offset = 0, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
      );
      const results = response.data.results;
      const detailedData = await Promise.all(
        results.map(async (pokemon) => {
          const pokeDetails = await axios.get(pokemon.url);
          return pokeDetails.data;
        })
      );
      return { data: detailedData, offset };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    list: [],
    loading: false,
    error: null,
    offset: 0,
    filterType: "all",
    sortOrder: "asc",
  },
  reducers: {
    setFilterType: (state, action) => {
      state.filterType = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.offset = action.payload.offset;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilterType, setSortOrder } = pokemonSlice.actions;
export default pokemonSlice.reducer;
