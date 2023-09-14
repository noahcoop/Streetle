import type { NextApiRequest, NextApiResponse } from 'next'
import data from '../../data.json'
import seedrandom from 'seedrandom'
import { formatDateStringEST } from '../../lib/date-format'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const possibleAnswers = data['locales']

  const dateString = formatDateStringEST(new Date())

  const rng = seedrandom(dateString)

  const randomIndex = Math.floor(rng()*possibleAnswers.length)

  res.status(200).json(possibleAnswers[randomIndex])
}