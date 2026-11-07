import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import Container from '../components/ui/Container.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import CircleExperience from '../components/hero/CircleOfLife.jsx'
import LifeDimensionCard from '../components/circle-of-life/LifeDimensionCard.jsx'
import DimensionDetailPanel from '../components/circle-of-life/DimensionDetailPanel.jsx'
import LifeConnections from '../components/circle-of-life/LifeConnections.jsx'
import CircleOfLifeCTA from '../components/circle-of-life/CircleOfLifeCTA.jsx'
import { lifeDimensions } from '../data/lifeDimensions.js'
import { webinar } from '../data/webinar.js'
import useMediaQuery from '../hooks/useMediaQuery.js'
import './circle-of-life.css'

gsap.registerPlugin(ScrollTrigger)

export default function CircleOfLife() {
  const [active, setActive] = useState(0)
  const page = useRef()
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Explore Your Circle of Life | VAILYF AI'
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('[data-circle-entrance]', { opacity: 0, y: 16, duration: .8, stagger: .1, ease: 'power2.out' })
        gsap.utils.toArray('[data-circle-reveal]').forEach(element => gsap.from(element, { opacity: 0, y: 20, duration: .7, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 94%', once: true } }))
        gsap.to('.wheel-depth-layer', { y: -14, ease: 'none', scrollTrigger: { trigger: '#life-explorer', start: 'top bottom', end: 'bottom top', scrub: 1 } })
      }, page)
      return () => context.revert()
    })
    return () => { media.revert(); document.title = previousTitle }
  }, [])
  function selectCard(index) {
    setActive(index)
    requestAnimationFrame(() => {
      const heading = document.getElementById('dimension-detail-title')
      heading?.focus({ preventScroll: true })
      document.getElementById('life-explorer')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' })
    })
  }
  return <div className="cosmic-background circle-page" ref={page}><a className="skip-link" href="#main-content">Skip to content</a><Navbar registrationTo={webinar.registrationDestination} /><main id="main-content" tabIndex={-1}>
    <section className="circle-page-hero" aria-labelledby="circle-page-title"><Container><div data-circle-entrance><Badge tone="gold"><span className="status-dot" />DISCOVER YOUR CIRCLE OF LIFE</Badge></div><h1 className="heading-display" id="circle-page-title" data-circle-entrance>Four Dimensions.<br /><span className="gradient-text">One More Balanced Life.</span></h1><p className="body-lead" data-circle-entrance>Explore how Health, Wealth, Relationships and Spiritual Bliss connect with your everyday choices. Reflect on where you are and where you want to go.</p><div className="circle-hero-actions" data-circle-entrance><Button href="#life-explorer">Explore Your Life Balance<ArrowDown size={16} aria-hidden="true" /></Button><Button variant="outline" to={webinar.registrationDestination}>Join the Webinar – {webinar.ticketLabel}<ArrowUpRight size={16} aria-hidden="true" /></Button></div><p className="circle-educational-note small-copy" data-circle-entrance>A reflective framework, not a clinical assessment. No scores, diagnoses or guaranteed outcomes.</p></Container></section>
    <section className="circle-explorer-section" id="life-explorer" aria-labelledby="life-explorer-title"><Container><div className="explorer-section-heading"><SectionHeading id="life-explorer-title" eyebrow="FOUR PERSPECTIVES. ONE CONNECTED PICTURE." title="Start with what matters to you." description="Select a dimension to explore everyday examples and a few questions to consider." /><span className="explorer-selection-label" aria-live="polite">Exploring {lifeDimensions[active].name}</span></div><div className="life-explorer-grid"><div className="wheel-column"><div className="wheel-depth-layer"><CircleExperience activeDimension={active} onDimensionChange={setActive} dimensionData={lifeDimensions} enhanced staticOnReducedMotion showDescription={false} detailId="life-dimension-detail" /></div><p className="wheel-footnote small-copy">No dimension stands for a score. Your priorities are personal.</p></div><DimensionDetailPanel dimension={lifeDimensions[active]} index={active} reduced={reduced} /></div><div className="explorer-dimension-cards" aria-label="Explore each dimension">{lifeDimensions.map((dimension, index) => <LifeDimensionCard key={dimension.id} dimension={dimension} index={index} selected={active === index} onSelect={selectCard} />)}</div></Container></section>
    <LifeConnections /><CircleOfLifeCTA />
  </main><Footer preview={false} /></div>
}
