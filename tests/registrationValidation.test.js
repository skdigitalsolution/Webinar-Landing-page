import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeRegistration, validateRegistration, validateDemoRegistration } from '../src/utils/registrationValidation.js'
import { createCheckoutPreview } from '../src/utils/checkoutPreview.js'
import { registrationDemo } from '../src/data/registration.js'

const sample = () => ({ ...registrationDemo, consent: true })
test('requires name, email, phone and an explicit acknowledgement', () => {
  assert.deepEqual(Object.keys(validateRegistration({}).errors), ['fullName','email','mobile','consent'])
  assert.equal(validateRegistration(null).valid, false)
  for (const consent of [false, undefined, 'true', 1]) assert.equal(validateRegistration({ ...sample(), consent }).valid, false)
})
test('normalizes spaces, email and an explicit India prefix without mutating input', () => {
  const input = Object.freeze({ fullName: '  Alex   Example ', email: ' ALEX@EXAMPLE.COM ', mobile: '+91 90000-00000', consent: true })
  assert.deepEqual(normalizeRegistration(input), sample())
  assert.equal(validateDemoRegistration(input).valid, true)
})
test('supports international names and mononyms', () => {
  for (const fullName of ['वैष्णवी', 'Léo', 'Mary O’Connell', 'Jean-Luc', 'A']) {
    assert.equal(validateRegistration({ ...sample(), fullName }).valid, true)
  }
})
test('rejects malformed addresses, names and phone numbers', () => {
  for (const email of ['alex','a@@example.com','a@.com','a b@example.com','a@example..com']) assert.equal(validateRegistration({ ...sample(), email }).valid, false)
  for (const mobile of ['12345','5000000000','90000000000','9abcdefgh0']) assert.equal(validateRegistration({ ...sample(), mobile }).valid, false)
  for (const fullName of ['123','<script>', 'A'.repeat(101)]) assert.equal(validateRegistration({ ...sample(), fullName }).valid, false)
})
test('keeps demo restrictions separate from ordinary form validation', () => {
  const nonDemo = { ...sample(), email: 'person@domain.test', mobile: '9876543210' }
  assert.equal(validateRegistration(nonDemo).valid, true)
  assert.deepEqual(Object.keys(validateDemoRegistration(nonDemo).errors), ['email','mobile'])
  for (const email of ['alex@example.com','demo@example.org','demo@example.net']) assert.equal(validateDemoRegistration({ ...sample(), email }).valid, true)
})
test('checkout preview contains no contact details, payment IDs or success state', () => {
  const preview = createCheckoutPreview(sample())
  assert.equal(preview.total, 199)
  assert.equal(preview.quantity, 1)
  assert.equal(preview.currency, 'INR')
  assert.equal(preview.paymentStatus, 'unavailable')
  assert.equal(preview.registrationStatus, 'not-created')
  for (const key of ['fullName','email','mobile','paymentId','orderId','receipt']) assert.equal(key in preview, false)
  assert.throws(() => createCheckoutPreview({ ...sample(), consent: false }))
})
