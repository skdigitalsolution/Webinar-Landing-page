import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock3 } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import { futureTimeframes } from '../../data/solutionSteps.js'
import { assessmentDimensions } from '../../data/assessmentDimensions.js'
import { useReflection } from '../../context/ReflectionContext.jsx'
import useMediaQuery from '../../hooks/useMediaQuery.js'

export default function FutureReflectionSection() {
  const [active, setActive] = useState(0)
  const buttons = useRef([])
  const { priorities, togglePriority } = useReflection()
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const compact = useMediaQuery('(max-width: 767px)')
  function handleKeyDown(event, index) {
    let next
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % futureTimeframes.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + futureTimeframes.length - 1) % futureTimeframes.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = futureTimeframes.length - 1
    else return
    event.preventDefault(); setActive(next); buttons.current[next]?.focus()
  }
  return <section id="future-reflection" className="solution-section future-reflection landing-target" tabIndex={-1} aria-labelledby="future-reflection-title"><Container>
    <div data-landing-reveal><SectionHeading eyebrow="THE COST OF STAYING WHERE YOU ARE" id="future-reflection-title" title="What If Nothing Changes?" description="Small choices made repeatedly can shape our future. Take a moment to reflect on where your current routines and priorities may lead." align="center"/></div>
    <div className="future-timeline" data-landing-reveal>
      <span className="future-timeline-track" aria-hidden="true"><span className="reflection-scroll-glow"/><span className="future-timeframe-progress" style={{ '--timeframe-progress': active / 2 }}/></span>
      <div className="future-timeframe-tabs" role="tablist" aria-label="Future reflection timeframes" aria-orientation={compact?'vertical':'horizontal'}>{futureTimeframes.map((timeframe,index)=><button key={timeframe.label} ref={element=>buttons.current[index]=element} role="tab" id={`future-tab-${index}`} tabIndex={active===index?0:-1} aria-selected={active===index} aria-controls={`future-question-${index}`} onClick={()=>setActive(index)} onKeyDown={event=>handleKeyDown(event,index)}><span className="future-timeline-node" aria-hidden="true"><Clock3 size={20} strokeWidth={1.5}/></span><strong>{timeframe.label}</strong><span className="future-tab-hint">A moment to reflect</span></button>)}</div>
    </div>
    {futureTimeframes.map((timeframe,index)=><div key={timeframe.label} role="tabpanel" id={`future-question-${index}`} aria-labelledby={`future-tab-${index}`} hidden={active!==index} tabIndex={0} className="future-question-panel">{active===index&&<motion.div initial={reduced?false:{opacity:.5,y:5}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:.25}}><GlassCard className="future-question-card"><span className="eyebrow">YOUR {timeframe.label.toUpperCase()} REFLECTION</span><h3>{timeframe.question}</h3><p>These are questions for reflection, not predictions. You can choose where to place your attention.</p></GlassCard></motion.div>}</div>)}
    <fieldset className="future-priorities" data-landing-reveal><legend>Which area would you most like to improve?</legend><p className="small-copy" id="future-priority-guidance">Your assessment selections are carried forward. Choose one or more areas; changes here also update your assessment.</p><div>{assessmentDimensions.map(dimension=><label key={dimension.id} style={{'--focus-color':dimension.color}}><input type="checkbox" checked={priorities.includes(dimension.id)} value={dimension.id} onChange={()=>togglePriority(dimension.id)} aria-describedby="future-priority-guidance"/><span>{dimension.name}</span><ArrowRight size={15} aria-hidden="true"/></label>)}</div></fieldset>
  </Container></section>
}
