import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDateSpanish = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'd \'de\' MMMM \'de\' yyyy', { locale: es });
};