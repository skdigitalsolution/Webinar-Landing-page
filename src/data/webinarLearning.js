import { lifeDimensions } from './lifeDimensions.js'

// Highlights and intended outcomes supplied in the Phase 7 brief.
// Descriptions/preview copy are editable editorial explanations, not guarantees.
const content = [
  {
    description: 'Bring attention to the routines and priorities that shape your everyday wellbeing.',
    highlights: ['Reflect on current daily habits', 'Identify wellness priorities', 'Explore opportunities for healthier routines'],
    question: 'Which everyday habit would you like to understand better?',
    objective: 'Identify one wellness priority you would like to explore.',
    topic: 'A guided reflection on daily habits, energy and personal wellness priorities.',
  },
  {
    description: 'Look at your financial direction through the lens of what matters to you.',
    highlights: ['Reflect on financial direction', 'Clarify personal priorities and goals', 'Identify habits requiring greater attention'],
    question: 'How do your current financial habits reflect your priorities?',
    objective: 'Clarify a personal financial goal and a habit you want to examine.',
    topic: 'Exploring financial priorities and the everyday choices connected to them.',
  },
  {
    description: 'Make space to reflect on communication, connection and meaningful relationships.',
    highlights: ['Explore communication and connection', 'Reflect on meaningful relationships', 'Recognize areas needing attention'],
    question: 'Where would you like to bring more attention to a meaningful relationship?',
    objective: 'Recognize a connection you would like to approach with greater intention.',
    topic: 'Reflecting on communication, quality time and the connections you value.',
  },
  {
    description: 'Explore the personal meaning and practices that help you feel grounded.',
    highlights: ['Explore personal meaning and inner peace', 'Reflect on gratitude and self-awareness', 'Identify practices that support personal calm'],
    question: 'What helps you feel calm, grateful or connected to your values?',
    objective: 'Identify a personally meaningful practice you would like to reflect on.',
    topic: 'Exploring inner peace, gratitude and self-awareness in your own way.',
  },
]
export const learningDimensions = lifeDimensions.map((dimension, index) => ({
  id: dimension.id, name: dimension.name, color: dimension.color, ...content[index],
}))

export const learningOutcomes = [
  { title: 'Understand Where You Are', description: 'Reflect on your current life situation.' },
  { title: 'Identify Where You Want to Go', description: 'Consider the direction you want your life to move toward.' },
  { title: 'Gain Clarity About Your Goals', description: 'Explore your priorities and personal objectives.' },
  { title: 'Draw Your Own Circle of Life', description: 'Use a visual exercise to reflect on the four dimensions.' },
  { title: 'Reflect on the Four Life Dimensions', description: 'Explore Health, Wealth, Relationships and Spiritual Bliss together.' },
  { title: 'Identify Practical Next Steps', description: 'Consider practical ways to approach your priorities.' },
]

export const webinarAgenda = {
  status: 'Indicative agenda · pending approval',
  note: 'These are proposed content modules, not a client-approved minute-by-minute agenda. Module order and content are subject to approval.',
  modules: [
    { title: 'Welcome and Introduction', description: 'An introduction to the session and the space for personal reflection.' },
    { title: 'Understanding the Circle of Life', description: 'Explore the framework and how to consider the different parts of your life together.' },
    { title: 'Exploring Four Life Dimensions', description: 'Look at each dimension through everyday habits, priorities and personal meaning.' },
    { title: 'Self-Reflection Exercise', description: 'Use a visual exercise to reflect on your perspective across the four dimensions.' },
    { title: 'Goal Clarity', description: 'Consider the priorities and direction you would like to explore further.' },
    { title: 'Questions and Next Steps', description: 'Bring your questions and reflect on possible next steps.' },
  ],
}

export const learningApproach = [
  { title: 'Structured learning', text: 'Follow a connected framework across the four life dimensions.' },
  { title: 'Self-realisation', text: 'Notice what your own reflections reveal about the priorities that matter to you.' },
  { title: 'Personal reflection', text: 'Consider your own experience through thoughtful questions and a visual exercise.' },
  { title: 'Organised content', text: 'Explore ideas that build on one another, from understanding your situation to considering direction.' },
  { title: 'Practical goal clarity', text: 'Use your priorities as a starting point for thinking about possible next steps.' },
]
