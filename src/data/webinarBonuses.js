import { lifeDimensions } from './lifeDimensions.js'

// The Phase 8 brief describes these resources. No ticket inclusion or delivery
// condition is approved by this file. Replace null fields only after sign-off.
export const bonusConditions = {
  ticketInclusionsApproved: false,
  books: { format: null, eligibility: null, delivery: null, coversApproved: false },
  whatsapp: { days: 30, frequency: 'Daily', eligibility: null, deliveryStart: null, optInProcess: null, connected: false },
  telegram: { eligibility: null, accessPeriod: null, invitationUrl: null, connected: false },
  pendingConfirmations: [
    'Final inclusions and eligibility for the ₹199 ticket.',
    'Four free books: delivery format, timing, eligibility, official covers and publication rights.',
    '30-day WhatsApp tips: availability, eligibility, start date, consent and delivery process.',
    'Telegram learning group: availability, eligibility, access period, moderation and approved invitation.',
    'Final webinar duration: supplied 2-hour schedule versus an earlier 3-hour document.',
  ],
}

export const books = [
  { id: 'circle-of-life', title: 'Circle of Life', description: 'A reflective view of Health, Wealth, Relationships and Spiritual Bliss.', color: '#AA8AEA', coverColor: '#332152', cover: null, coverApproved: false },
  { id: 'health', title: 'Health', description: 'Themes of everyday wellness habits and personal priorities.', color: '#70D7D6', coverColor: '#123C43', cover: null, coverApproved: false },
  { id: 'wealth', title: 'Wealth', description: 'Themes of financial direction, goals and everyday choices.', color: '#D6B46A', coverColor: '#443522', cover: null, coverApproved: false },
  { id: 'relationship', title: 'Relationship', description: 'Themes of communication, connection and meaningful relationships.', color: '#E0A2C0', coverColor: '#43273D', cover: null, coverApproved: false },
]

const sampleTips = [
  'What everyday routine would you like to bring a little more attention to?',
  'Which financial priority feels most meaningful to you right now?',
  'Where could you make space for a more meaningful conversation?',
  'What helps you feel calm or connected to your values?',
]
export const bonusLearningCategories = lifeDimensions.map((dimension, index) => ({
  id: dimension.id, name: dimension.name, color: dimension.color, sample: sampleTips[index],
}))

export const benefitGroups = [
  {
    id: 'learning', label: 'Webinar learning outcomes', status: 'Intended outcomes · not guarantees',
    items: ['Draw Your Own Circle of Life activity', 'Understanding current life position', 'Goal clarity', 'Structured self-reflection'],
    note: 'Learning themes and activities for personal reflection. Individual experiences may differ.',
  },
  {
    id: 'bonuses', label: 'Proposed registration bonuses', status: 'Ticket inclusion pending approval',
    items: ['Four books'],
    note: 'Four free books were mentioned by the organizer. Format, delivery and eligibility still need confirmation.',
  },
  {
    id: 'support', label: 'Post-webinar support resources', status: 'Access conditions pending approval',
    items: ['30 days of WhatsApp learning tips', 'Telegram group access'],
    note: 'Described follow-up resources, subject to confirmation of availability, eligibility and access terms.',
  },
]

export const benefitsCopy = {
  hero: {
    eyebrow: 'YOUR WEBINAR EXPERIENCE', title: 'More Than a Webinar.', accent: 'Resources to Keep Learning.',
    description: 'Explore the Circle of Life framework, reflect on your goals and discover learning resources designed to support your personal development journey.',
    primary: 'Join the Webinar', secondary: 'Explore Your Benefits',
    note: 'Resources described by the organizer · final ticket inclusions pending approval',
    artLabel: 'A little more perspective.', artNote: 'Illustrative resource preview',
  },
  books: {
    eyebrow: 'PROPOSED REGISTRATION BONUS', title: 'Explore Four Essential Areas of Life.',
    description: 'The organizer has mentioned four free books connected to the webinar’s learning themes.',
    conditions: 'Delivery format and eligibility are pending confirmation. These books are not yet confirmed as inclusions for every ticket.',
    placeholder: 'Illustrative cover · final artwork pending', coverLabel: 'ILLUSTRATIVE COVER',
    disclaimer: 'These hardcover-style visuals are illustrative placeholders. They do not represent final published covers or a promise of physical delivery.',
  },
  whatsapp: {
    eyebrow: 'DESCRIBED FOLLOW-UP RESOURCE', title: 'Keep Learning, One Day at a Time.',
    description: 'The organizer has described daily WhatsApp learning tips for 30 days, covering the four life dimensions.',
    note: 'Availability, eligibility and delivery arrangements are pending confirmation. This preview is not connected to WhatsApp.',
    timelineLabel: 'An illustrative 30-day learning format', timelineNote: 'Day markers illustrate the proposed duration, not completed lessons or a confirmed delivery calendar.',
    sampleLabel: 'ILLUSTRATIVE SAMPLE TIP', phoneTitle: 'Learning, in small moments.',
    phoneNote: 'Sample educational content · not a live conversation', sampleHelp: 'Choose a category to preview a sample reflection prompt. No messages are sent.',
  },
  telegram: {
    eyebrow: 'PROPOSED LEARNING GROUP', title: 'Stay Connected Beyond the Session.',
    description: 'Access to a Telegram learning group is among the benefits described by the webinar organizer.',
    note: 'Group availability, access period and eligibility are pending confirmation.',
    status: 'Access details pending', visualTitle: 'A space for learning.', visualLabels: ['Reflection', 'Connection', 'Learning'],
    visualNote: 'Illustrative community concept · no invitation link supplied',
  },
  activity: {
    eyebrow: 'THE CIRCLE OF LIFE ACTIVITY', title: 'Visualize Your Life. Understand Your Priorities.',
    description: 'The Circle of Life drawing activity invites you to reflect on Health, Wealth, Relationships and Spiritual Bliss in one visual exercise.',
    steps: ['Consider the four dimensions of your life.', 'Draw your own Circle of Life as a reflection of your perspective.', 'Notice the priorities you would like to explore further.'],
    cta: 'Explore the Life Assessment', note: 'A personal reflection exercise, not a diagnostic assessment.',
  },
  overview: {
    eyebrow: 'A CLEAR VIEW OF THE EXPERIENCE', title: 'Learning, resources and what comes next.',
    description: 'Different parts of the experience serve different purposes. Proposed bonuses and follow-up resources remain subject to approval.',
    note: 'Do not assume every listed resource is included with every ticket. Final inclusions will be confirmed by the organizer.',
  },
  cta: {
    eyebrow: 'MAKE ROOM FOR YOUR NEXT PERSPECTIVE', title: 'Your Journey Toward Clarity Starts Here.',
    description: 'Explore the Circle of Life webinar and the learning themes described by the organizer. Final bonus inclusions and access conditions are pending approval.',
    button: 'Register Now', note: 'Registration coming soon · No payment collected here.',
    scheduleNote: 'Currently supplied event schedule. Final session duration remains pending client confirmation.',
  },
}
