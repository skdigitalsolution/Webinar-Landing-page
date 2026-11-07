import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import Container from '../components/ui/Container.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import LearningHero from '../components/learning/LearningHero.jsx'
import LearningDimensionCard from '../components/learning/LearningDimensionCard.jsx'
import LearningOutcomes from '../components/learning/LearningOutcomes.jsx'
import WebinarTimeline from '../components/learning/WebinarTimeline.jsx'
import WhyDifferent from '../components/learning/WhyDifferent.jsx'
import LearningPreview from '../components/learning/LearningPreview.jsx'
import LearningCTA from '../components/learning/LearningCTA.jsx'
import { learningDimensions } from '../data/webinarLearning.js'
import { webinar } from '../data/webinar.js'
import './learning.css'

gsap.registerPlugin(ScrollTrigger)

export default function WhatYoullLearn() {
  const page = useRef()
  useEffect(() => {
    const previousTitle = document.title
    document.title = "What You'll Learn | VAILYF AI"
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        // Keep headline and primary actions visible throughout the entrance.
        gsap.from('[data-learning-entrance]', { y: 16, duration: .8, stagger: .08, ease: 'power2.out' })
        gsap.utils.toArray('[data-learning-reveal]').forEach(element => gsap.from(element, { opacity: 0, y: 18, duration: .7, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 94%', once: true } }))
        gsap.fromTo('.agenda-progress', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.agenda-timeline', start: 'top 75%', end: 'bottom 75%', scrub: 1 } })
      }, page)
      return () => context.revert()
    })
    return () => { media.revert(); document.title = previousTitle }
  }, [])
  return <div className="cosmic-background learning-page" ref={page}><a className="skip-link" href="#main-content">Skip to content</a><Navbar registrationTo={webinar.registrationDestination} /><main id="main-content" tabIndex={-1}><LearningHero /><section className="learning-section learning-dimensions" id="learning-dimensions" aria-labelledby="learning-dimensions-title"><Container><div data-learning-reveal><SectionHeading eyebrow="FOUR DIMENSIONS TO EXPLORE" id="learning-dimensions-title" title={<>A broader picture.<br /><span className="gradient-text">A more personal perspective.</span></>} description="Explore practical themes across four connected areas of life, with space to consider what each means to you." /></div><div className="learning-dimension-grid">{learningDimensions.map((dimension, index) => <LearningDimensionCard key={dimension.id} dimension={dimension} index={index} />)}</div></Container></section><LearningOutcomes /><WebinarTimeline /><WhyDifferent /><LearningPreview /><LearningCTA /></main><Footer preview={false} /></div>
}
