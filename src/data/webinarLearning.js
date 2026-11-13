import { lifeDimensions } from './lifeDimensions.js'

// Intended outcomes and general AI use cases supplied in the Phase 5 brief.
// Descriptions/preview copy are editable editorial explanations, not guarantees.
const content = [
  {
    description: 'Bring attention to the routines and priorities that shape your everyday wellbeing.',
    highlights: ['Organizing wellness routines', 'Tracking personal habits', 'Preparing reflection questions'],
    question: 'Which everyday habit would you like to understand better?',
    objective: 'Identify one wellness priority you would like to explore.',
    topic: 'A guided reflection on daily habits, energy and personal wellness priorities.',
  },
  {
    description: 'Look at your financial direction through the lens of what matters to you.',
    highlights: ['Organizing financial goals', 'Creating planning checklists', 'Reviewing personal priorities'],
    question: 'How do your current financial habits reflect your priorities?',
    objective: 'Clarify a personal financial goal and a habit you want to examine.',
    topic: 'Exploring financial priorities and the everyday choices connected to them.',
  },
  {
    description: 'Make space to reflect on communication, connection and meaningful relationships.',
    highlights: ['Structuring communication goals', 'Planning quality time', 'Reflecting on relationship priorities'],
    question: 'Where would you like to bring more attention to a meaningful relationship?',
    objective: 'Recognize a connection you would like to approach with greater intention.',
    topic: 'Reflecting on communication, quality time and the connections you value.',
  },
  {
    description: 'Explore the personal meaning and practices that help you feel grounded.',
    highlights: ['Reflection prompts', 'Gratitude journaling ideas', 'Personal routine planning'],
    question: 'What helps you feel calm, grateful or connected to your values?',
    objective: 'Identify a personally meaningful practice you would like to reflect on.',
    topic: 'Exploring inner peace, gratitude and self-awareness in your own way.',
  },
]
export const learningDimensions = lifeDimensions.map((dimension, index) => ({
  id: dimension.id, name: dimension.name, color: dimension.color, ...content[index],
}))

export const learningOutcomes = [
  { title: 'Discover', description: 'Understand where you currently stand across Health, Wealth, Relationships and Spiritual Bliss.' },
  { title: 'Understand', description: 'Identify the personal priorities and goals that matter to you.' },
  { title: 'Explore AI', description: 'Learn how relevant AI tools may support goal organization, reflection and everyday planning.' },
  { title: 'Plan', description: 'Outline practical next steps using structured reflection and expert guidance.' },
]

export const webinarAgenda = {
  status: 'Indicative agenda · pending approval',
  note: 'These are proposed content modules, not a client-approved minute-by-minute agenda. Module order and content are subject to approval.',
  modules: [
    { title: 'Welcome and Introduction', description: 'An introduction to the session and its reflective learning approach.' },
    { title: 'Understanding the Circle of Life', description: 'Explore the framework and how the four areas can be considered together.' },
    { title: 'Four Life Dimensions', description: 'Reflect on Health, Wealth, Relationships and Spiritual Bliss.' },
    { title: 'Draw Your Own Circle of Life Activity', description: 'Explore a visual activity for reflecting on your own perspective.' },
    { title: 'Goal Clarity and Self-Reflection', description: 'Consider the priorities and personal goals that matter to you.' },
    { title: 'Explore AI-Assisted Planning', description: 'Explore general ways relevant AI tools may support organization and reflection.' },
    { title: 'Questions and Next Steps', description: 'Bring your questions and consider practical steps to explore after the session.' },
  ],
}

export const learningApproach = [
  { title: 'Structured and organized learning', text: 'Follow a connected framework, from reflection to possible next steps.' },
  { title: 'Reflection on your own life', text: 'Consider the areas and priorities that feel meaningful to you.' },
  { title: 'Circle of Life activity', text: 'Explore your perspective through a visual reflection exercise.' },
  { title: 'Personal goal clarity', text: 'Give attention to the goals you would like to understand better.' },
  { title: 'Exploration of AI-assisted planning', text: 'Consider general uses for AI as a supporting tool, alongside your own judgment.' },
  { title: 'Practical next-step thinking', text: 'Reflect on manageable actions you could choose for yourself.' },
]

export const learningCopy = {
  eyebrow: 'WHAT YOU WILL EXPERIENCE',
  title: 'What Will You Actually Learn in This Webinar?',
  description: 'Understand your current situation, explore the Circle of Life framework and discover how AI-assisted planning may help you organize meaningful next steps.',
  outcomeNote: 'Intended learning outcomes, not guaranteed results. Your reflections and next steps are personal to you.',
  dimensionsTitle: 'Four Areas. Practical Planning Possibilities.',
  dimensionsDescription: 'Potential general AI use cases across the four life dimensions. These examples are not verified capabilities of a specific VAILYF AI device.',
  demonstrationNote: 'Specific tools and demonstrations are pending client approval. No clinical or financial outcomes are promised.',
}
