// src/features/charactersSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { CharacterAPI, CharactersState } from '../types'

const API_BASE = 'https://thesimpsonsapi.com/api'

export const fetchCharacters = createAsyncThunk<CharacterAPI[], void, { rejectValue: string }>(
  'characters/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/characters`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json()) as CharacterAPI[]
      return data
    } catch (e: any) {
      return rejectWithValue(e.message ?? 'Error')
    }
  }
)

const initialState: CharactersState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
  perPage: 16,
  query: '',
  total: 0,
}

const slice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) { state.page = action.payload },
    setQuery(state, action: PayloadAction<string>) { state.query = action.payload; state.page = 1 },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.pending, (s) => { s.loading = true; s.error = null })
    builder.addCase(fetchCharacters.fulfilled, (s, a: PayloadAction<CharacterAPI[]>) => {
      s.items = a.payload.map(it => ({ ...it, imageUrl: it.portrait ? `https://thesimpsonsapi.com${it.portrait}` : null }))
      s.total = s.items.length
      s.loading = false
    })
    builder.addCase(fetchCharacters.rejected, (s, a) => { s.loading = false; s.error = a.payload ?? a.error.message ?? 'Error' })
  }
})

export const { setPage, setQuery } = slice.actions

// Export por defecto: el reducer que el store espera importar
export default slice.reducer

// Selectores sencillos si los necesitas
export const selectPaginatedFrom = (s: CharactersState) => {
  const filtered = s.query ? s.items.filter(i => (i.name ?? '').toLowerCase().includes(s.query.toLowerCase().trim())) : s.items
  const start = (s.page - 1) * s.perPage
  return filtered.slice(start, start + s.perPage)
}
