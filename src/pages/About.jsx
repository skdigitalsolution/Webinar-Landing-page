import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import AboutHero from '../components/about/AboutHero.jsx'
import MentorProfile from '../components/about/MentorProfile.jsx'
import PhilosophySection from '../components/about/PhilosophySection.jsx'
import LifeDimensionsPreview from '../components/about/LifeDimensionsPreview.jsx'
import MentorCTA from '../components/about/MentorCTA.jsx'
import { webinar } from '../data/webinar.js'
import './about.css'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const page = useRef()
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Meet Dr. Vaishnavi Jayawant | VAILYF AI'
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('[data-about-entrance]', { opacity: 0, y: 18, duration: .75, stagger: .1, ease: 'power2.out' })
        gsap.utils.toArray('[data-about-reveal]').forEach(element => {
          gsap.from(element, { opacity: 0, y: 20, duration: .7, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 93%', once: true } })
        })
      }, page)
      return () => context.revert()
    })
    return () => { media.revert(); document.title = previousTitle }
  }, [])
  return <div className="cosmic-background about-page" ref={page}><a className="skip-link" href="#main-content">Skip to content</a><Navbar registrationTo={webinar.registrationDestination} /><main id="main-content" tabIndex={-1}><AboutHero /><MentorProfile /><PhilosophySection /><LifeDimensionsPreview /><MentorCTA /></main><Footer preview={false} /></div>
}
