import type { NextApiRequest, NextApiResponse } from 'next'
import data from '../../data.json'
import seedrandom from 'seedrandom'
import { formatDateStringEST } from '../../lib/date-format'
import { dateSpecificRandom } from '../../lib/random'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const possibleAnswers = data['locales']

  const rng = dateSpecificRandom()

  const randomIndex = Math.floor(rng*possibleAnswers.length)

  res.status(200).json(possibleAnswers[randomIndex])
}