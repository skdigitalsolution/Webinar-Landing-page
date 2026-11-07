import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import Button from '../components/ui/Button.jsx'
import { HeroSection, ProblemSection, CircleOfLifeSection, AssessmentSection, LearningSection, MentorSection, BenefitsSection, RegistrationSection, FAQSection, FinalCTA } from '../components/landing/Sections.jsx'
import { webinar } from '../data/webinar.js'
import './home.css'
import './circle-of-life.css'
import './learning.css'
import './about.css'
import './benefits.css'
import './landing.css'

gsap.registerPlugin(ScrollTrigger)

export default function LandingPage() {
  const [active, setActive] = useState(0)
  const page = useRef()
  useEffect(() => {
    document.title = 'Circle of Life Webinar | VAILYF AI'
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('[data-landing-entrance]', { y: 16, duration: .8, stagger: .08, ease: 'power2.out' })
        gsap.utils.toArray('[data-landing-reveal],[data-assessment-reveal],[data-learning-reveal],[data-about-reveal],[data-benefit-reveal],[data-register-reveal]').forEach(element => { const group = element.parentElement; const delay = group?.matches('.problem-grid,.landing-pillars-grid,.learning-outcome-list,.bonus-book-grid,.philosophy-grid,.benefits-overview-grid,.rating-card-grid') ? Math.min(Array.from(group.children).indexOf(element) * .06, .18) : 0; gsap.from(element, { y: 15, opacity: 0, duration: .6, delay, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 96%', once: true } }) })
        gsap.fromTo('.agenda-progress', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.agenda-timeline', start: 'top 80%', end: 'bottom 80%', scrub: .8 } })
      }, page)
      return () => context.revert()
    })
    return () => media.revert()
  }, [])
  return <div className="cosmic-background landing-page" ref={page}><a className="skip-link" href="#main-content">Skip to content</a><Navbar /><main id="main-content" tabIndex={-1}><HeroSection active={active} onSelect={setActive} /><ProblemSection /><CircleOfLifeSection active={active} onSelect={setActive} /><AssessmentSection /><LearningSection /><MentorSection /><BenefitsSection /><RegistrationSection /><FAQSection /><FinalCTA /></main><Footer preview={false} /><div className="mobile-register-bar"><span><strong>{webinar.ticketLabel}</strong><small>Webinar · payment pending</small></span><Button to={webinar.registrationDestination}>Register Now</Button></div></div>
}

