import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { fetchCharacters, selectPaginatedFrom } from '../features/characterSlice'
import CharacterCard from '../components/CharacterCard'
import SearchBar from '../components/searchBar'
import Pagination from '../components/Pagination'

export default function Home(){
  const dispatch = useAppDispatch()
  const state = useAppSelector(s => s.characters)

  useEffect(()=>{ dispatch(fetchCharacters()) }, [dispatch])

  const items = selectPaginatedFrom(state)

  return (
    <section>
      <SearchBar />
      {state.loading && <div>Cargando...</div>}
      {state.error && <div className="text-red-600">Error: {state.error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map(i => <CharacterCard key={i.id} character={i} />)}
      </div>
      <Pagination />
    </section>
  )
}
