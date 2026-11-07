import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import HeroSection from '../components/hero/HeroSection.jsx'
import LifeDimensions from '../components/sections/LifeDimensions.jsx'
import WebinarDetails from '../components/sections/WebinarDetails.jsx'
import './home.css'
import { webinar } from '../data/webinar.js'

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const page = useRef()
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.timeline({ defaults: { ease: 'power2.out' } })
          .from('[data-hero-text]', { opacity: 0, y: 18, duration: .8, stagger: .12 })
          .from('[data-hero-action]', { opacity: 0, y: 10, duration: .5, stagger: .12 }, '-=.6')
        gsap.utils.toArray('[data-reveal]').forEach(element => {
          gsap.from(element, { opacity: 0, y: 22, duration: .75, scrollTrigger: { trigger: element, start: 'top 92%', once: true } })
        })
      }, page)
      return () => context.revert()
    })
    return () => media.revert()
  }, [])
  return <div className="cosmic-background homepage" ref={page}><a className="skip-link" href="#main-content">Skip to content</a><Navbar registrationTo={webinar.registrationDestination} /><main id="main-content" tabIndex={-1}><HeroSection /><LifeDimensions /><WebinarDetails /></main><Footer preview={false} /></div>
}
