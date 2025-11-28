import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Character } from './types';

interface CharactersState {
  items: Character[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentPage: number;
  totalCharacters: number;
  searchTerm: string;
}

const initialState: CharactersState = {
  items: [],
  status: 'idle',
  error: null,
  currentPage: 1,
  totalCharacters: 0,
  searchTerm: '',
};

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://thesimpsonsapi.com/api/characters');
      if (!response.ok) throw new Error('Network response was not ok');

      const rawData = await response.json();


const data: Character[] = rawData.results.map((personaje: any) => {

  return {
    name: personaje.name || '',
    gender: personaje.gender || '',
    occupation: personaje.occupation || '',
    birthdate: personaje.birthdate || '',
    portrait_path: personaje.portrait_path,
  };
});
      
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload.toLowerCase();
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.totalCharacters = action.payload.length;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setSearchTerm, setCurrentPage } = charactersSlice.actions;
export default charactersSlice.reducer;