import { registrationConfig } from '../data/registration.js'
import { webinar } from '../data/webinar.js'
import { validateDemoRegistration } from './registrationValidation.js'

// Phase 9 has no network operation. Future order creation and trusted payment
// verification belong in a separately approved backend integration. The server
// must determine the product/amount; browser totals must never authorize payment.
export function createCheckoutPreview(values) {
  if (!validateDemoRegistration(values).valid) throw new Error('A valid demo form is required to preview the summary.')
  return {
    kind: 'demo-preview',
    productName: registrationConfig.productName,
    quantity: registrationConfig.quantity,
    unitAmount: webinar.ticketAmount,
    total: webinar.ticketAmount * registrationConfig.quantity,
    currency: 'INR',
    registrationStatus: 'not-created',
    paymentStatus: 'unavailable',
  }
}
