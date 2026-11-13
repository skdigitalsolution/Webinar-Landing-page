import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { motion } from 'framer-motion'
import { Pencil, RotateCcw } from 'lucide-react'
import Container from '../ui/Container.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import ReflectionPrompts from './ReflectionPrompts.jsx'

function ScoreRing({ percentage, total, reduced }) {
  const displayed = useRef()
  const counter = useRef({ value: percentage })
  useEffect(() => {
    const tween = gsap.to(counter.current, { value: percentage, duration: reduced ? 0 : .45, ease: 'power2.out', onUpdate: () => { if (displayed.current) displayed.current.textContent = `${Math.round(counter.current.value)}%` } })
    return () => { tween.kill() }
  }, [percentage, reduced])
  const circumference = 2 * Math.PI * 78
  return <div className="assessment-score-ring"><svg viewBox="0 0 200 200" aria-hidden="true"><circle className="score-ring-track" cx="100" cy="100" r="78" /><motion.circle className="score-ring-value" cx="100" cy="100" r="78" strokeDasharray={circumference} initial={false} animate={{ strokeDashoffset: circumference * (1 - percentage / 100) }} transition={{ duration: reduced ? 0 : .45 }} /></svg><div className="score-ring-label"><span className="sr-only">{percentage}%</span><strong ref={displayed} aria-hidden="true">{percentage}%</strong><span data-total-score>{total} / 40</span></div></div>
}

export default function AssessmentResults({ summary, confirmed, reviewedCount, reduced, onEdit, onReset, extraSummary }) {
  const label = confirmed ? 'Ratings confirmed' : reviewedCount === 4 ? 'Live preview · all ratings reviewed' : reviewedCount ? 'Live preview · includes starting values' : 'Initial preview · placeholder ratings'
  return <section className="assessment-section assessment-results" id="assessment-results" tabIndex={-1} aria-labelledby="assessment-results-title"><Container><div data-assessment-reveal><SectionHeading eyebrow="A MOMENT OF PERSPECTIVE" id="assessment-results-title" title={<>Your descriptive<br /><span className="gradient-text">self-rating summary.</span></>} description="A summary of how you rate your satisfaction today. This is not a scientifically validated life balance score." /></div><div className="assessment-results-grid"><GlassCard className="rating-summary" data-assessment-reveal><Badge tone={confirmed ? 'gold' : 'violet'}>{label}</Badge><div className="summary-score-row"><ScoreRing percentage={summary.percentage} total={summary.total} reduced={reduced} /><div><p className="eyebrow">OVERALL SELF-RATING</p><p className="body-copy">{summary.allEqual ? 'You have given every dimension the same rating. You can still choose any area you would like to explore.' : 'Your answers suggest that you currently feel more satisfied in some areas than others. Consider which area you would most like to focus on first.'}</p></div></div><dl className="summary-dimensions">{summary.scores.map(score => <div key={score.id} style={{ '--dimension-color': score.color }}><dt>{score.name}</dt><dd>{score.value}<span> / 10</span></dd></div>)}</dl><div className="rating-extremes"><div><h3>Highest-rated {summary.highest.length > 1 ? 'areas · tied' : 'area'}</h3><p data-highest>{summary.highest.map(dimension => dimension.name).join(', ')}<span>{summary.highest[0].value} / 10</span></p></div><div><h3>Lowest-rated {summary.lowest.length > 1 ? 'areas · tied' : 'area'}</h3><p data-lowest>{summary.lowest.map(dimension => dimension.name).join(', ')}<span>{summary.lowest[0].value} / 10</span></p></div></div><p className="summary-formula small-copy">Total = the sum of four ratings. Percentage = total ÷ 40 × 100, rounded to the nearest whole number.</p><div className="summary-actions"><Button variant="outline" onClick={onEdit}><Pencil size={15} aria-hidden="true" />Edit My Ratings</Button><Button variant="outline" onClick={onReset}><RotateCcw size={15} aria-hidden="true" />Reset Assessment</Button></div></GlassCard>{extraSummary || <ReflectionPrompts dimensions={summary.lowest} allEqual={summary.allEqual} />}</div></Container></section>
}
