// Demo fixtures only. These values are not a real registrant or contact route.
export const registrationDemo = Object.freeze({
  fullName: 'Alex Example', email: 'alex@example.com', mobile: '9000000000',
})

export const registrationConfig = Object.freeze({
  mode: 'demo',
  productName: 'Circle of Life Webinar',
  quantity: 1,
  countryCallingCode: '+91',
  terms: { approved: false, url: null },
  privacy: { approved: false, url: null },
  support: null,
  backendOrderEndpoint: null,
  paymentEnabled: false,
})

export const registrationFAQs = [
  { id: 'what', question: 'What is the Circle of Life webinar?', answer: 'A structured self-reflection session exploring priorities across Health, Wealth, Relationships and Spiritual Bliss.' },
  { id: 'who', question: 'Who is this webinar for?', answer: 'People who want to reflect on their life priorities, explore the Circle of Life framework and consider practical next steps.' },
  { id: 'when', question: 'When is the webinar scheduled?', eventAnswer: true },
  { id: 'online', question: 'Is the webinar online?', answer: 'The currently supplied event information lists an online session via Zoom.' },
  { id: 'learning', question: 'What will participants learn?', answer: 'Intended learning themes include reflecting on your current life situation, identifying priorities, drawing your Circle of Life and exploring possible next steps. Individual outcomes are not guaranteed.' },
  { id: 'joining', question: 'How will I receive my joining link?', answer: null, pending: true, approved: false, pendingReason: 'Joining-link delivery method requires organizer approval.' },
  { id: 'refunds', question: 'What is the refund policy?', answer: null, pending: true, approved: false, pendingReason: 'Refund policy requires organizer approval.' },
  { id: 'books', question: 'Are the four books included?', answer: null, pending: true, approved: false, pendingReason: 'Confirm final participant eligibility, format and delivery terms before publishing this answer.' },
]
