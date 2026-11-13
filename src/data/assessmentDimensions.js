import { lifeDimensions } from './lifeDimensions.js'

const questions = [
  'How satisfied are you with your current well-being and daily habits?',
  'How satisfied are you with your financial direction?',
  'How satisfied are you with your relationships?',
  'How satisfied are you with your inner peace and personal clarity?',
]
const prompts = [
  'What small daily routine would you like to improve?',
  'What financial priority would you like to clarify?',
  'Which relationship would benefit from more intentional attention?',
  'What helps you feel calmer or more connected to your values?',
]
const colors = ['#61dfaa', '#e4bf77', '#e89ac9', '#a99bff']
const descriptions = [
  'Build better habits and support everyday well-being.',
  'Bring clarity to your financial goals and priorities.',
  'Explore stronger communication and meaningful connections.',
  'Cultivate self-awareness, gratitude and inner peace.',
]

export const assessmentDimensions = lifeDimensions.map((dimension, index) => ({
  id: dimension.id, name: dimension.name, color: colors[index],
  explanation: dimension.focus, question: questions[index], prompt: prompts[index],
  desiredQuestion: `What satisfaction rating would you personally like to work toward for ${dimension.name}?`,
  pillarDescription: descriptions[index],
}))
export const createInitialRatings = () => Object.fromEntries(assessmentDimensions.map(({ id }) => [id, 5]))
