import React from 'react'
import { CharacterAPI } from '../types'
import { formatBirthdate } from '../utils/formatDate'

export default function CharacterCard({ character }: { character: CharacterAPI }) {
  return (
    <article className="bg-white p-3 rounded shadow">
      <img src={character.imageUrl ?? '/placeholder.png'} alt={character.name} className="w-full h-36 object-cover rounded" />
      <h3 className="font-bold mt-2">{character.name}</h3>
      <p className="text-sm text-gray-600">{character.occupation ?? 'Desconocido'}</p>
      <p className="text-sm text-gray-500">Nacimiento: {formatBirthdate(character.birthdate)}</p>
    </article>
  )
}
