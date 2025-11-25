import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { setPage } from '../features/characterSlice'


export default function Pagination(){
  const dispatch = useAppDispatch()
  const page = useAppSelector(s => s.characters.page)
  const totalPages = useAppSelector(s => Math.max(1, Math.ceil(s.characters.total / s.characters.perPage)))
  return (
    <div className="flex gap-2 justify-center mt-4">
      <button onClick={()=>dispatch(setPage(page-1))} disabled={page<=1} className="px-3 py-1 border rounded">Anterior</button>
      <span className="px-3 py-1">Página {page} / {totalPages}</span>
      <button onClick={()=>dispatch(setPage(page+1))} disabled={page>=totalPages} className="px-3 py-1 border rounded">Siguiente</button>
    </div>
  )
}
