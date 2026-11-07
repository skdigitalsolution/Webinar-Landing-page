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
  { id: 'when', question: 'When is the webinar scheduled?', eventAnswer: true },
  { id: 'online', question: 'Is the session online?', answer: 'The currently supplied event information lists an online session via Zoom.' },
  { id: 'learning', question: 'What will participants learn?', answer: 'Intended learning themes include reflecting on your current life situation, identifying priorities, drawing your Circle of Life and exploring possible next steps. Individual outcomes are not guaranteed.' },
  { id: 'joining', question: 'How will I receive my joining link?', answer: 'Joining-link delivery details are pending confirmation. This demo does not create a registration or issue a Zoom link.', pending: true },
  { id: 'refunds', question: 'What is the refund policy?', answer: 'The refund policy is pending organizer approval and will need to be available before live registration opens.', pending: true },
  { id: 'books', question: 'Are the four books included?', answer: 'The organizer has mentioned four books. Ticket inclusion, eligibility, format and delivery are pending confirmation.', pending: true },
]
