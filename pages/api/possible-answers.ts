import type { NextApiRequest, NextApiResponse } from 'next'
import data from '../../data.json'
import { uniq } from 'lodash'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const possibleAnswers = data['locales']

  const possibleAnswerNames = uniq(possibleAnswers.map((answer) => answer.name))

  res.status(200).json(possibleAnswerNames)
}