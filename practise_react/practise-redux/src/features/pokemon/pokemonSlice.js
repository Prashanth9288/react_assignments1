// src/features/pokemon/pokemonSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Helper to compute offset from page and limit
const getOffset = (page, limit) => (page - 1) * limit;

// Async thunk to fetch pokemons for the dashboard
export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchPokemons',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState().pokemon;
    const { page, limit, filterType, sortOrder } = state;
    const offset = getOffset(page, limit);

    try {
      // If a type filter is active (not 'all'), use the /type/{name} endpoint
      if (filterType && filterType !== 'all') {
        const typeRes = await fetch(`https://pokeapi.co/api/v2/type/${filterType}`);
        if (!typeRes.ok) throw new Error('Failed to fetch type list');
        const typeData = await typeRes.json();
        // typeData.pokemon is an array of { pokemon: { name, url } }
        const allTypePokemons = typeData.pokemon.map(p => p.pokemon);
        const count = allTypePokemons.length;
        // slice the required page
        const pageSlice = allTypePokemons.slice(offset, offset + limit);
        // fetch details for each pokemon on that page
        const details = await Promise.all(
          pageSlice.map(async (p) => {
            const res = await fetch(p.url);
            if (!res.ok) throw new Error('Failed to fetch pokemon detail');
            return res.json();
          })
        );

        // sort by name according to sortOrder
        details.sort((a, b) => {
          if (sortOrder === 'az') return a.name.localeCompare(b.name);
          return b.name.localeCompare(a.name);
        });

        return { count, results: details };
      } else {
        // No type filter: use /pokemon endpoint with offset and limit
        const listRes = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        if (!listRes.ok) throw new Error('Failed to fetch pokemon list');
        const listData = await listRes.json(); // contains count and results [{name, url}]
        const count = listData.count;
        // fetch details for each result
        const details = await Promise.all(
          listData.results.map(async (r) => {
            const res = await fetch(r.url);
            if (!res.ok) throw new Error('Failed to fetch pokemon detail');
            return res.json();
          })
        );

        // sort by name
        details.sort((a, b) => {
          if (sortOrder === 'az') return a.name.localeCompare(b.name);
          return b.name.localeCompare(a.name);
        });

        return { count, results: details };
      }
    } catch (error) {
      // Pass error message to rejected action
      return thunkAPI.rejectWithValue(error.message || 'Unknown error');
    }
  }
);

// Async thunk to fetch a single pokemon by id (for details page)
export const fetchPokemonById = createAsyncThunk(
  'pokemon/fetchPokemonById',
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) throw new Error('Failed to fetch pokemon details');
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Unknown error');
    }
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    items: [],             // current page's detailed Pokemon objects
    count: 0,              // total count (depends on filter)
    page: 1,
    limit: 20,
    filterType: 'all',     // 'all' or e.g. 'fire'
    sortOrder: 'az',       // 'az' or 'za'
    status: 'idle',        // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    selectedPokemon: {     // for detail page
      data: null,
      status: 'idle',
      error: null,
    },
  },
  reducers: {
    setFilterType(state, action) {
      state.filterType = action.payload;
      state.page = 1; // reset to first page on filter change
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
      state.page = 1; // reset page (optional)
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
      state.page = 1;
    },
    clearSelectedPokemon(state) {
      state.selectedPokemon = { data: null, status: 'idle', error: null };
    }
  },
  extraReducers: (builder) => {
    // fetchPokemons lifecycle
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.results;
        state.count = action.payload.count;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });

    // fetchPokemonById lifecycle
    builder
      .addCase(fetchPokemonById.pending, (state) => {
        state.selectedPokemon.status = 'loading';
        state.selectedPokemon.error = null;
      })
      .addCase(fetchPokemonById.fulfilled, (state, action) => {
        state.selectedPokemon.status = 'succeeded';
        state.selectedPokemon.data = action.payload;
      })
      .addCase(fetchPokemonById.rejected, (state, action) => {
        state.selectedPokemon.status = 'failed';
        state.selectedPokemon.error = action.payload || action.error.message;
      });
  }
});

export const { setFilterType, setSortOrder, setPage, setLimit, clearSelectedPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
