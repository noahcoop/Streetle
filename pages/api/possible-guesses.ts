import type { NextApiRequest, NextApiResponse } from 'next'
import data from '../../data.json'
import { uniq } from 'lodash'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const possibleGuesses = data['locales']

  const possibleGuessNames = uniq(possibleGuesses.map((guess) => guess.name))

  res.status(200).json(possibleGuessNames)
}