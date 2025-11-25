import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export function formatBirthdate(iso?: string | null) {
  if (!iso) return 'Desconocido'
  try { return format(new Date(iso), "d 'de' MMMM 'de' yyyy", { locale: es }) }
  catch { return 'Desconocido' }
}

