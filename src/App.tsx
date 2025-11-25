import React from 'react'
import Home from './pages/Home'


export default function App() {
  return(
    //Wrapper general con paddings que usaremos en toda la app
    <div className="min-h-screen p-6 bg-gray-50">
      <header className="max-w-6x1 mx-auto mb-6">
        <h1 className="text-2x1 font-bold">Simpsons - Gamera Test</h1>
        <p className="text-sm text-gray-600">Listado de personajes - 16 por pagina</p>
      </header>

      {/*Pagina principal con logica (fetch, paginacion, etc.) */}
      <main className="max-w-6x1 mx-auto">
        <Home />
      </main>
    </div>
  )

  
}

