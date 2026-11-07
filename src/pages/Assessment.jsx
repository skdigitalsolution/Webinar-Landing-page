import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, RotateCcw, ShieldCheck } from 'lucide-react'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import AssessmentHero from '../components/assessment/AssessmentHero.jsx'
import DimensionSlider from '../components/assessment/DimensionSlider.jsx'
import LifeBalanceChart from '../components/assessment/LifeBalanceChart.jsx'
import AssessmentResults from '../components/assessment/AssessmentResults.jsx'
import AssessmentCTA from '../components/assessment/AssessmentCTA.jsx'
import { assessmentDimensions, createInitialRatings } from '../data/assessmentDimensions.js'
import { calculateAssessment } from '../utils/assessmentCalculations.js'
import { webinar } from '../data/webinar.js'
import useMediaQuery from '../hooks/useMediaQuery.js'
import './assessment.css'

gsap.registerPlugin(ScrollTrigger)

export default function Assessment({ embedded = false }) {
  const [ratings, setRatings] = useState(createInitialRatings)
  const [reviewed, setReviewed] = useState({})
  const [confirmed, setConfirmed] = useState(false)
  const [status, setStatus] = useState('')
  const page = useRef()
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const summary = useMemo(() => calculateAssessment(ratings), [ratings])
  const reviewedCount = Object.values(reviewed).filter(Boolean).length
  useEffect(() => {
    if (embedded) return
    const previousTitle = document.title
    document.title = 'Life Balance Self-Assessment | VAILYF AI'
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('[data-assessment-entrance]', { opacity: 0, y: 16, duration: .75, stagger: .1, ease: 'power2.out' })
        gsap.utils.toArray('[data-assessment-reveal]').forEach(element => gsap.from(element, { opacity: 0, y: 18, duration: .65, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 95%', once: true } }))
      }, page)
      return () => context.revert()
    })
    return () => { media.revert(); document.title = previousTitle }
  }, [embedded])
  function focusRatings() {
    document.getElementById('assessment-form')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' })
    document.getElementById('rating-health')?.focus({ preventScroll: true })
  }
  function updateRating(id, value) {
    if (!Number.isInteger(value) || value < 1 || value > 10) return
    setRatings(current => ({ ...current, [id]: value }))
    setReviewed(current => ({ ...current, [id]: true }))
    setConfirmed(false)
    setStatus('')
  }
  function reset() {
    setRatings(createInitialRatings())
    setReviewed({})
    setConfirmed(false)
    setStatus('Assessment reset. All four ratings are back to the initial placeholder of 5.')
    focusRatings()
  }
  function confirm(event) {
    event.preventDefault()
    setReviewed(Object.fromEntries(assessmentDimensions.map(({ id }) => [id, true])))
    setConfirmed(true)
    setStatus('Your ratings are confirmed. The descriptive self-rating summary is ready.')
    requestAnimationFrame(() => {
      document.getElementById('assessment-results')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' })
      document.getElementById('assessment-results')?.focus({ preventScroll: true })
    })
  }
  const content = <><section className="assessment-form-section" aria-labelledby={embedded ? "landing-assessment-title" : "rating-form-title"}><Container><div className="assessment-form-intro">{!embedded && <SectionHeading eyebrow="FOUR RATINGS. YOUR PERSPECTIVE." id="rating-form-title" title="How does life feel right now?" description="Move each slider to a number that reflects your satisfaction today. There are no right or wrong answers." />}<p className="small-copy" id="assessment-initial-guidance">Every slider starts at 5 as an initial placeholder. Adjust your ratings, or confirm them if 5 feels right. The chart and summary update immediately.</p></div><div className="assessment-workspace"><form id="assessment-form" onSubmit={confirm} aria-describedby="assessment-initial-guidance assessment-local-privacy"><div className="rating-card-grid">{assessmentDimensions.map((dimension, index) => <DimensionSlider key={dimension.id} dimension={dimension} index={index} value={ratings[dimension.id]} reviewed={!!reviewed[dimension.id]} onChange={updateRating} />)}</div><div className="assessment-form-actions"><Button type="submit">Confirm My Ratings<ArrowDown size={16} aria-hidden="true" /></Button><Button variant="outline" onClick={reset}><RotateCcw size={15} aria-hidden="true" />Reset Assessment</Button></div><p className="small-copy local-privacy" id="assessment-local-privacy"><ShieldCheck size={15} aria-hidden="true" />Ratings stay in this page’s memory only. Refreshing or leaving the page clears them. Nothing is sent to a server or saved in browser storage.</p></form><aside className="assessment-live-chart"><LifeBalanceChart scores={summary.scores} reduced={reduced} /><p className="small-copy chart-preview-status">{confirmed ? 'Your confirmed ratings' : reviewedCount ? `${reviewedCount} of 4 ratings reviewed` : 'Initial preview: all four values are placeholders of 5'}</p></aside></div><p className="assessment-action-status" role="status" aria-live="polite">{status}</p></Container></section>
    <AssessmentResults summary={summary} confirmed={confirmed} reviewedCount={reviewedCount} reduced={reduced} onEdit={focusRatings} onReset={reset} /></>
  return embedded ? <div className="assessment-page embedded-content embedded-assessment">{content}</div> : <div className="cosmic-background assessment-page" ref={page}><a className="skip-link" href="#main-content">Skip to content</a><Navbar registrationTo={webinar.registrationDestination} /><main id="main-content" tabIndex={-1}><AssessmentHero onStart={focusRatings} />{content}<AssessmentCTA /></main><Footer preview={false} /></div>
}
