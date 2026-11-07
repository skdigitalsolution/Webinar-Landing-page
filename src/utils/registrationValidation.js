import { registrationDemo } from '../data/registration.js'

export const registrationFieldOrder = ['fullName', 'email', 'mobile', 'consent']

export function normalizeRegistration(values = {}) {
  values = values ?? {}
  return {
    fullName: typeof values.fullName === 'string' ? values.fullName.trim().replace(/\s+/g, ' ') : '',
    email: typeof values.email === 'string' ? values.email.trim().toLowerCase() : '',
    mobile: typeof values.mobile === 'string' ? values.mobile.trim().replace(/[\s()-]/g, '').replace(/^\+91/, '') : '',
    consent: values.consent === true,
  }
}

export function validateRegistration(values) {
  const data = normalizeRegistration(values)
  const errors = {}
  if (!data.fullName) errors.fullName = 'Enter a full name.'
  else if (data.fullName.length > 100 || !/^[\p{L}\p{M}][\p{L}\p{M}\s.'’\-]*$/u.test(data.fullName)) errors.fullName = 'Use a name of up to 100 characters, with letters and normal name punctuation.'
  if (!data.email) errors.email = 'Enter an email address.'
  else if (data.email.length > 254 || !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(data.email)) errors.email = 'Enter a valid email address, for example alex@example.com.'
  if (!data.mobile) errors.mobile = 'Enter a mobile number.'
  else if (!/^[6-9]\d{9}$/.test(data.mobile)) errors.mobile = 'Enter a 10-digit India mobile number starting with 6, 7, 8 or 9.'
  if (!data.consent) errors.consent = 'Check the demo acknowledgement to preview the summary.'
  return { valid: Object.keys(errors).length === 0, errors, data }
}

export function validateDemoRegistration(values) {
  const result = validateRegistration(values)
  // Do not accept a real email or arbitrary contact number in the demo preview.
  if (!result.errors.email && !/@example\.(com|org|net)$/.test(result.data.email)) {
    result.errors.email = 'Demo only: use an @example.com, @example.org or @example.net address, not a real email.'
  }
  if (!result.errors.mobile && result.data.mobile !== registrationDemo.mobile) {
    result.errors.mobile = `Demo only: use the fictional sample ${registrationDemo.mobile}; do not enter a real contact number.`
  }
  return { ...result, valid: Object.keys(result.errors).length === 0 }
}
