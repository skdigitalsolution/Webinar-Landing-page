import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import MobileRegistrationCTA from '../components/layout/MobileRegistrationCTA.jsx'
import PhaseOneHero from '../components/hero/PhaseOneHero.jsx'
import { OriginalIntroductionVideo } from '../components/rapport/RapportSections.jsx'
import { ProblemSection, CircleOfLifeSection, AssessmentSection, LearningSection, MentorSection, BenefitsSection, RegistrationSection, FAQSection, FinalCTA } from '../components/landing/Sections.jsx'
import './home.css'
import './circle-of-life.css'
import './learning.css'
import './benefits.css'
import { ReflectionProvider } from '../context/ReflectionContext.jsx'
import FutureReflectionSection from '../components/landing/FutureReflectionSection.jsx'
import VailyfSolutionSection from '../components/landing/VailyfSolutionSection.jsx'
import PersonalNextStepPreview from '../components/landing/PersonalNextStepPreview.jsx'
import AIValueSection from '../components/landing/AIValueSection.jsx'
import WebinarBridge from '../components/landing/WebinarBridge.jsx'
import '../components/landing/phase-four.css'
import './landing.css'
import './polish.css'

gsap.registerPlugin(ScrollTrigger)

function LandingContent() {
  const [active, setActive] = useState(0)
  const page = useRef()
  useEffect(() => {
    document.title = 'Circle of Life AI Webinar | VAILYF AI'
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('[data-landing-entrance]', { y: 16, duration: .8, stagger: .08, ease: 'power2.out' })
        gsap.utils.toArray('[data-landing-reveal],[data-assessment-reveal],[data-learning-reveal],[data-about-reveal],[data-benefit-reveal],[data-register-reveal]').forEach(element => { const group = element.parentElement; const delay = group?.matches('.problem-grid,.rapport-problem-grid,.rapport-authority-grid,.landing-pillars-grid,.phase-three-pillar-grid,.learning-outcome-list,.learning-dimension-grid,.bonus-book-grid,.philosophy-grid,.benefits-overview-grid, .rating-card-grid,.solution-process-grid,.ai-value-grid') ? Math.min(Array.from(group.children).indexOf(element) * .06, .18) : 0; gsap.from(element, { y: 15, opacity: 0, duration: .6, delay, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 96%', once: true } }) })
        gsap.fromTo('.reflection-scroll-glow', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.future-timeline', start: 'top 90%', end: 'bottom 40%', scrub: .5 } })
        gsap.from('.phase-five-benefits .learning-day-plan li', { opacity: .2, duration: .4, stagger: .015, scrollTrigger: { trigger: '.phase-five-benefits .learning-day-plan', start: 'top 90%', once: true } })
        gsap.fromTo('.agenda-progress', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.agenda-timeline', start: 'top 80%', end: 'bottom 80%', scrub: .8 } })
      }, page)
      return () => context.revert()
    })
    return () => media.revert()
  }, [])
  return <div className="cosmic-background landing-page" ref={page}><a className="skip-link" href="#main-content">Skip to content</a><Navbar /><main id="main-content" tabIndex={-1}><PhaseOneHero active={active} onSelect={setActive} /><ProblemSection /><OriginalIntroductionVideo /><MentorSection /><CircleOfLifeSection active={active} onSelect={setActive} /><AssessmentSection /><FutureReflectionSection /><VailyfSolutionSection /><PersonalNextStepPreview /><AIValueSection /><WebinarBridge /><LearningSection /><BenefitsSection /><RegistrationSection /><FAQSection /><FinalCTA /></main><Footer preview={false} /><MobileRegistrationCTA/></div>
}

export default function LandingPage() {
  return <ReflectionProvider><LandingContent/></ReflectionProvider>
}
