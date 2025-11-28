import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchCharacters, setSearchTerm, setCurrentPage } from './features/characters/characterSlice';
import CharacterCard from './components/CharacterCard';
import Pagination from './components/Pagination';
import Loading from './components/Loading';
import Error from './components/Error';
import SearchBar from './components/SearchBar';


const CHARACTERS_PER_PAGE = 16;

function App() {
  const dispatch = useAppDispatch();
  const {
    items: allCharacters,
    status,
    error,
    searchTerm,
    currentPage,
  } = useAppSelector((state) => state.characters);

  // Cargar personajes al inicio
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCharacters());
    }
  }, [status, dispatch]);

  // Filtrar por búsqueda
  const filteredCharacters = Array.isArray(allCharacters)
    ? allCharacters.filter((char) => {
      const characterName = char.name.toLowerCase().trim(); // Elimina espacios al inicio y final
      const searchQuery = searchTerm.toLowerCase().trim(); // Elimina espacios al inicio y final
      return characterName.includes(searchQuery);
    })
    : [];

  const totalPages = Math.ceil(filteredCharacters.length / CHARACTERS_PER_PAGE);
  const startIndex = (currentPage - 1) * CHARACTERS_PER_PAGE;
  const currentCharacters = filteredCharacters.slice(startIndex, startIndex + CHARACTERS_PER_PAGE);

  if (status === 'loading') return <Loading />;
  if (status === 'failed') return <Error message={error!} />;

  return (
    
    <div className="min-h-screen bg-blue-100 p-4 md:p-8">
      <header className="flex justify-between items-center mb-5 px-20">

        <div>
          <img
            src="/logo-tu-empresa.png"
            alt="Logo izquierdo"
            className="h-20 w-auto object-contain"
          />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2x md:text-4xl font-mono text-gray-800">
            Prueba Técnica Simpsons API
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-2 italic">
            Explora los personajes de Springfield
          </p>
        </div>


        <div>
          <img
            src="/logo-simpsons.png"
            alt="The Simpsons"
            className="h-16 w-auto object-contain"
          />
        </div>
      </header>

      <SearchBar onSearch={(term) => {
        dispatch(setSearchTerm(term));
        dispatch(setCurrentPage(1));
      }} />

      {filteredCharacters.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No se encontraron personajes.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {currentCharacters.map((char) => (
              <CharacterCard key={char.name} character={char} />
            ))}
          </div>


          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => dispatch(setCurrentPage(page))}
          />
        </>
      )}
    </div>
  );
}

export default App;