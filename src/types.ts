export interface CharacterAPI {
  id: string
  name: string
  gender?: string | null
  occupation?: string | null
  birthdate?: string | null
  portrait?: string | null
  imageUrl?: string | null
}

export interface CharactersState {
  items: CharacterAPI[]
  loading: boolean
  error: string | null
  page: number
  perPage: number
  query: string
  total: number
}
