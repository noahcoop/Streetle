export type GameState = {
  finished: boolean;
  won: boolean;
  guesses: string[]
  saveTime?: string
  fromCache?: boolean
}