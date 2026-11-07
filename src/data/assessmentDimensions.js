import { lifeDimensions } from './lifeDimensions.js'

const questions = [
  'How satisfied are you with your current health habits and well-being?',
  'How satisfied are you with your current financial direction and priorities?',
  'How satisfied are you with the quality of your relationships?',
  'How connected do you feel to inner peace and personal meaning?',
]
const prompts = [
  'What small daily routine would you like to improve?',
  'What financial priority would you like to clarify?',
  'Which relationship would benefit from more intentional attention?',
  'What helps you feel calmer or more connected to your values?',
]

export const assessmentDimensions = lifeDimensions.map((dimension, index) => ({
  id: dimension.id, name: dimension.name, color: dimension.color,
  explanation: dimension.focus, question: questions[index], prompt: prompts[index],
}))
export const createInitialRatings = () => Object.fromEntries(assessmentDimensions.map(({ id }) => [id, 5]))
