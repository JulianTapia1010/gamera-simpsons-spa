import { Character } from '../features/characters/types';
import { formatDateSpanish } from '../utils/formatDate';

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  console.log(character.portrait_path)
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:translate-y-[-2px] transition-all duration-600">

      <img
        src={`https://cdn.thesimpsonsapi.com/200${character.portrait_path}`}
        alt={character.name}
        className="w-48 h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{character.name}</h3>
        <p className="text-sm text-gray-600"><span className="font-bold">Género:</span> {character.gender || 'Desconocido'}</p>
        <p className="text-sm text-gray-600"><span className="font-bold">Ocupación:</span> {character.occupation || '—'}</p>
        <p className="text-sm text-gray-600">
          <span className="font-bold">Nacimiento: </span>{character.birthdate ? formatDateSpanish(character.birthdate) : '—'}
        </p>
      </div>
    </div>
  );
}