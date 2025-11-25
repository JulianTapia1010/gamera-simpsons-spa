import React, { useState } from 'react'
import { useAppDispatch } from '../hooks/reduxHooks'
import { setQuery } from '../features/characterSlice'

export default function SearchBar(){
  const [v, setV] = useState('')
  const dispatch = useAppDispatch()
  return (
    <form onSubmit={(e)=>{ e.preventDefault(); dispatch(setQuery(v)) }} className="flex gap-2 mb-4">
      <input value={v} onChange={e=>setV(e.target.value)} placeholder="Buscar..." className="flex-1 px-3 py-2 border rounded" />
      <button className="px-4 py-2 bg-blue-600 text-white rounded">Buscar</button>
    </form>
  )
}
