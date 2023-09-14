export type GameState = {
  finished: boolean;
  won: boolean;
  guesses: string[]
  saveTime?: Date
}