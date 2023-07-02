import type { NextApiRequest, NextApiResponse } from 'next'
import data from '../../data.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const possibleGuesses = data['locales']

  const randomIndex = Math.floor(Math.random()*possibleGuesses.length)

  res.status(200).json(possibleGuesses[randomIndex])
}