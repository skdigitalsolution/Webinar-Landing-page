import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, BookOpen } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Badge from '../ui/Badge.jsx'
import { benefitsCopy, bonusConditions, bonusLearningCategories } from '../../data/webinarBonuses.js'
import useMediaQuery from '../../hooks/useMediaQuery.js'

export default function WhatsAppLearning() {
  const [active, setActive] = useState(0)
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const copy = benefitsCopy.whatsapp
  const category = bonusLearningCategories[active]
  return <section className="benefits-section whatsapp-learning" id="whatsapp-learning" aria-labelledby="whatsapp-learning-title"><Container className="benefit-resource-grid"><div data-benefit-reveal><SectionHeading eyebrow={copy.eyebrow} id="whatsapp-learning-title" title={copy.title} description={copy.description} /><p className="bonus-condition-note">{copy.note}</p><div className="learning-day-plan"><p className="eyebrow">{copy.timelineLabel}</p><ol aria-label={`${bonusConditions.whatsapp.days} illustrative day markers`}>{Array.from({ length: bonusConditions.whatsapp.days }, (_, index) => <li key={index} style={{ '--day-index': index }} aria-label={`Day ${index + 1}`}><span>{index + 1}</span></li>)}</ol><p className="small-copy">{copy.timelineNote}</p></div></div><div className="sample-phone-composition" data-benefit-reveal><div className="sample-phone"><div className="phone-camera" aria-hidden="true" /><div className="sample-phone-header"><MessageCircle size={22} aria-hidden="true" /><span>{copy.phoneTitle}</span></div><Badge tone="cyan">{copy.sampleLabel}</Badge><div className="phone-sample-card" id="phone-sample-content" aria-live="polite" style={{ '--dimension-color': category.color }}><motion.div key={category.id} initial={reduced ? false : { opacity: .4, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .22 }}><BookOpen size={20} aria-hidden="true" /><h3>{category.name}</h3><p>{category.sample}</p></motion.div></div><div className="phone-category-controls" role="group" aria-label="Sample learning category">{bonusLearningCategories.map((item, index) => <button key={item.id} onClick={() => setActive(index)} aria-pressed={active === index} aria-controls="phone-sample-content" style={{ '--dimension-color': item.color }}>{item.name}</button>)}</div><p className="small-copy" id="phone-sample-description">{copy.sampleHelp}</p></div><p className="small-copy phone-preview-caption">{copy.phoneNote}</p></div></Container></section>
}
