import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import Container from '../components/ui/Container.jsx'
import RegistrationHero from '../components/registration/RegistrationHero.jsx'
import PricingCard from '../components/registration/PricingCard.jsx'
import RegistrationForm from '../components/registration/RegistrationForm.jsx'
import CheckoutSummary from '../components/registration/CheckoutSummary.jsx'
import RegistrationFAQ from '../components/registration/RegistrationFAQ.jsx'
import { registrationDemo } from '../data/registration.js'
import { registrationFieldOrder, validateDemoRegistration } from '../utils/registrationValidation.js'
import { createCheckoutPreview } from '../utils/checkoutPreview.js'
import { webinar } from '../data/webinar.js'
import useMediaQuery from '../hooks/useMediaQuery.js'
import './register.css'

gsap.registerPlugin(ScrollTrigger)
const emptyForm = () => ({ fullName: '', email: '', mobile: '', consent: false })

export default function Register({ embedded = false }) {
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [attempted, setAttempted] = useState(false)
  const [preview, setPreview] = useState(null)
  const [notice, setNotice] = useState('')
  const page = useRef()
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  useEffect(() => {
    if (embedded) return
    const previousTitle = document.title
    document.title = 'Webinar Registration Preview | VAILYF AI'
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('[data-register-entrance]', { y: 14, duration: .7, stagger: .08, ease: 'power2.out' })
        gsap.utils.toArray('[data-register-reveal]').forEach(element => gsap.from(element, { opacity: 0, y: 16, duration: .65, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 95%', once: true } }))
      }, page)
      return () => context.revert()
    })
    return () => { media.revert(); document.title = previousTitle }
  }, [embedded])
  function focusForm() {
    document.getElementById('registration-demo-form')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' })
    document.getElementById('register-fullName')?.focus({ preventScroll: true })
  }
  function update(field, value) {
    const next = { ...values, [field]: value }
    setValues(next)
    setPreview(null)
    setNotice('')
    if (attempted || errors[field]) {
      const nextErrors = validateDemoRegistration(next).errors
      setErrors(current => {
        const next = { ...current }
        if (nextErrors[field]) next[field] = nextErrors[field]
        else delete next[field]
        return next
      })
    }
  }
  function blur(field) {
    const error = validateDemoRegistration(values).errors[field]
    setErrors(current => {
      const next = { ...current }
      if (error) next[field] = error
      else delete next[field]
      return next
    })
  }
  function submit(event) {
    event.preventDefault()
    setAttempted(true)
    const result = validateDemoRegistration(values)
    setErrors(result.errors)
    if (!result.valid) {
      setPreview(null)
      const field = registrationFieldOrder.find(key => result.errors[key])
      document.getElementById(`register-${field}`)?.focus()
      return
    }
    setPreview(createCheckoutPreview(values))
    setNotice('Demo summary validated. No registration was created and payments remain unavailable.')
    requestAnimationFrame(() => {
      const summary = document.getElementById('registration-summary')
      summary?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' })
      summary?.focus({ preventScroll: true })
    })
  }
  function loadSample() {
    setValues({ ...registrationDemo, consent: false })
    setErrors({})
    setAttempted(false)
    setPreview(null)
    setNotice('Fictional sample loaded. The demo acknowledgement remains unchecked.')
  }
  function clear() {
    setValues(emptyForm())
    setErrors({})
    setAttempted(false)
    setPreview(null)
    setNotice('Demo details cleared. Nothing was saved or submitted.')
    focusForm()
  }
  const content = <><section className="registration-workspace-section" aria-label="Demo pricing and registration"><Container className="registration-workspace"><aside className="registration-price-column"><PricingCard onPreview={focusForm} /></aside><div className="registration-details-column"><RegistrationForm values={values} errors={errors} attempted={attempted} onChange={update} onBlur={blur} onSubmit={submit} onLoadSample={loadSample} onReset={clear} /><p className="registration-action-notice" role="status">{notice}</p><CheckoutSummary preview={preview} reduced={reduced} /></div></Container></section></>
  return embedded ? <div className="register-page embedded-content">{content}</div> : <div className="cosmic-background register-page" ref={page}><a className="skip-link" href="#main-content">Skip to content</a><Navbar registrationTo={webinar.registrationDestination} /><main id="main-content" tabIndex={-1}><RegistrationHero />{content}<RegistrationFAQ /></main><Footer preview={false} /></div>
}
