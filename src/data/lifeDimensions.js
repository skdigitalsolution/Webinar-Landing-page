import { dimensions } from './dimensions.js'

// Educational editorial content, not a scoring model or validated assessment.
// Phase 5 colors are local to this page; existing homepage content is retained.
const detail = [
  {
    color: '#38DDF5', focus: 'Habits, daily energy and physical well-being',
    explanation: 'Health invites you to notice your everyday routines and how you experience your energy and wellbeing. Start with observation rather than judging yourself.',
    examples: ['Making time for a regular sleep routine', 'Finding movement that fits your day', 'Noticing when you need rest'],
    questions: ['Which daily habit would most improve your sense of well-being?', 'Where could you make more room for rest or movement?'],
    learningFocus: 'Notice one everyday routine you would like to understand better.',
  },
  {
    color: '#D6B46A', focus: 'Financial priorities, habits and goals',
    explanation: 'Wealth is a space to reflect on what financial stability and enough mean to you. Consider your habits and priorities without comparing your life to someone else’s.',
    examples: ['Reviewing everyday spending choices', 'Naming a financial priority', 'Setting aside time to reflect on money habits'],
    questions: ['Are your current financial habits aligned with your priorities?', 'Which financial goal feels most meaningful to you right now?'],
    learningFocus: 'Clarify a financial priority you want your everyday choices to reflect.',
  },
  {
    color: '#F198BD', focus: 'Communication, connection and quality time',
    explanation: 'Relationships invites you to consider the people and connections that matter to you. Reflect on how you listen, communicate and make time for one another.',
    examples: ['Giving a conversation your full attention', 'Making time to connect with someone', 'Reflecting on personal boundaries'],
    questions: ['Which relationship would benefit from more attention or meaningful communication?', 'When do you feel most connected to the people around you?'],
    learningFocus: 'Identify one connection you would like to approach with more intention.',
  },
  {
    color: '#B69AFF', focus: 'Inner peace, gratitude and self-awareness',
    explanation: 'Spiritual Bliss, or inner peace, is about exploring personal meaning and what helps you feel grounded. Your reflection can be spiritual, secular or simply personal.',
    examples: ['Spending a quiet moment outdoors', 'Writing down something you appreciate', 'Making space for reflection or a personal practice'],
    questions: ['What activities help you experience calm and clarity?', 'What gives your everyday life a sense of meaning?'],
    learningFocus: 'Recognize a practice or moment that helps you feel grounded.',
  },
]

export const lifeDimensions = dimensions.map((dimension, index) => ({ ...dimension, ...detail[index] }))

export const lifeConnections = [
  { title: 'Routines & connection', text: 'Consider how a busy day changes the time you make for the people around you.' },
  { title: 'Priorities & choices', text: 'Reflect on how the things you value shape your spending and everyday routines.' },
  { title: 'Space & perspective', text: 'Notice whether a quiet moment helps you reconsider what deserves your attention.' },
]
