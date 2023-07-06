import type { NextApiRequest, NextApiResponse } from 'next'
import data from '../../data.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const possibleAnswers = data['locales']

  const randomIndex = Math.floor(Math.random()*possibleAnswers.length)

  res.status(200).json(possibleAnswers[randomIndex])
}