import seedrandom from "seedrandom"
import { formatDateStringEST } from "./date-format"

export const dateSpecificRandom = (): number => {
  const dateString = formatDateStringEST(new Date())

  return seedrandom(dateString)()
}