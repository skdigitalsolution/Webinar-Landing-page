import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Target, BookOpen } from 'lucide-react'
import Container from '../ui/Container.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { dimensionIcons } from '../circle-of-life/LifeDimensionCard.jsx'
import { learningDimensions } from '../../data/webinarLearning.js'
import useMediaQuery from '../../hooks/useMediaQuery.js'

export default function LearningPreview() {
  const [active, setActive] = useState(0)
  const tabs = useRef([])
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  function handleKeyDown(event, index) {
    let next
    if (event.key === 'ArrowRight') next = (index + 1) % learningDimensions.length
    else if (event.key === 'ArrowLeft') next = (index + learningDimensions.length - 1) % learningDimensions.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = learningDimensions.length - 1
    else return
    event.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }
  return <section className="learning-section learning-preview" id="learning-preview" aria-labelledby="learning-preview-title"><Container><div data-learning-reveal><SectionHeading eyebrow="A SMALL PREVIEW. A PERSONAL PERSPECTIVE." id="learning-preview-title" title={<>Try a different<br /><span className="gradient-text">point of view.</span></>} description="Choose a dimension to explore a reflection question, a practical learning objective and a preview of the topic." align="center" /></div><GlassCard className="learning-preview-card" data-learning-reveal><div className="learning-preview-tabs" role="tablist" aria-label="Learning dimension preview">{learningDimensions.map((dimension, index) => { const Icon = dimensionIcons[index]; return <button role="tab" key={dimension.id} id={`learning-tab-${dimension.id}`} aria-selected={active === index} aria-controls={`learning-panel-${dimension.id}`} tabIndex={active === index ? 0 : -1} ref={element => { tabs.current[index] = element }} style={{ '--dimension-color': dimension.color }} onClick={() => setActive(index)} onFocus={() => setActive(index)} onKeyDown={event => handleKeyDown(event, index)}><Icon size={18} aria-hidden="true" />{dimension.name}</button> })}</div>{learningDimensions.map((dimension, index) => <div key={dimension.id} role="tabpanel" id={`learning-panel-${dimension.id}`} aria-labelledby={`learning-tab-${dimension.id}`} tabIndex={0} hidden={active !== index} className="learning-preview-panel" style={{ '--dimension-color': dimension.color }} data-dimension={dimension.id}>{active === index && <motion.div initial={reduced ? false : { opacity: .4, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .22 }}><div className="preview-question"><MessageCircle size={21} aria-hidden="true" /><div><p className="eyebrow">A QUESTION TO CONSIDER</p><h3 className="heading-card">{dimension.question}</h3></div></div><div className="learning-preview-details"><div><Target size={18} aria-hidden="true" /><h4>Practical learning objective</h4><p className="body-copy">{dimension.objective}</p></div><div><BookOpen size={18} aria-hidden="true" /><h4>Inside the webinar</h4><p className="body-copy">{dimension.topic}</p></div></div></motion.div>}</div>)}<p className="small-copy learning-preview-privacy">A learning preview only. No personal responses are requested, stored or sent.</p></GlassCard></Container></section>
}
