import { formatToTimeZone } from "date-fns-timezone"

export const formatDateStringEST = (date: Date): string => {
  return formatToTimeZone(new Date(), 'YYYY-MM-DD', { timeZone: 'America/New_York' })
}