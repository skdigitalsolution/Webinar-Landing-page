import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import BenefitsHero from '../components/benefits/BenefitsHero.jsx'
import BookShowcase from '../components/benefits/BookShowcase.jsx'
import WhatsAppLearning from '../components/benefits/WhatsAppLearning.jsx'
import TelegramCommunity from '../components/benefits/TelegramCommunity.jsx'
import CircleActivityPreview from '../components/benefits/CircleActivityPreview.jsx'
import BenefitsOverview from '../components/benefits/BenefitsOverview.jsx'
import BenefitsCTA from '../components/benefits/BenefitsCTA.jsx'
import { webinar } from '../data/webinar.js'
import './benefits.css'

gsap.registerPlugin(ScrollTrigger)

export default function Benefits() {
  const page = useRef()
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Benefits & Bonuses | VAILYF AI'
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('[data-benefit-entrance]', { y: 16, duration: .8, stagger: .08, ease: 'power2.out' })
        gsap.utils.toArray('[data-benefit-reveal]').forEach(element => gsap.from(element, { opacity: 0, y: 18, duration: .7, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 94%', once: true } }))
        gsap.from('.learning-day-plan li', { opacity: .2, duration: .5, stagger: .018, scrollTrigger: { trigger: '.learning-day-plan', start: 'top 90%', once: true } })
      }, page)
      return () => context.revert()
    })
    return () => { media.revert(); document.title = previousTitle }
  }, [])
  return <div className="cosmic-background benefits-page" ref={page}><a className="skip-link" href="#main-content">Skip to content</a><Navbar registrationTo={webinar.registrationDestination} /><main id="main-content" tabIndex={-1}><BenefitsHero /><BookShowcase /><WhatsAppLearning /><TelegramCommunity /><CircleActivityPreview /><BenefitsOverview /><BenefitsCTA /></main><Footer preview={false} /></div>
}
