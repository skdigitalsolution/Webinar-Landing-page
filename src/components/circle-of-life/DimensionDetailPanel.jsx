import { motion } from 'framer-motion'
import GlassCard from '../ui/GlassCard.jsx'
import Badge from '../ui/Badge.jsx'
import { dimensionIcons } from './LifeDimensionCard.jsx'

export default function DimensionDetailPanel({ dimension, index, reduced }) {
  const Icon = dimensionIcons[index]
  return <GlassCard as="section" className="dimension-detail" id="life-dimension-detail" aria-labelledby="dimension-detail-title" style={{ '--dimension-color': dimension.color }} data-dimension={dimension.id}>
    <motion.div key={dimension.id} initial={reduced ? false : { opacity: .4, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .24 }}>
      <div className="detail-panel-top"><Badge>DIMENSION 0{index + 1} / 04</Badge><Icon size={24} aria-hidden="true" /></div>
      <h3 className="heading-section" id="dimension-detail-title" tabIndex={-1}>{dimension.name}</h3>
      <p className="detail-focus">{dimension.focus}</p><p className="body-copy detail-explanation">{dimension.explanation}</p>
      <h4 className="detail-label">IN EVERYDAY LIFE</h4><ul className="everyday-examples">{dimension.examples.map(example => <li key={example}>{example}</li>)}</ul>
      <div className="reflection-questions"><h4 className="detail-label">A MOMENT TO REFLECT</h4><ol>{dimension.questions.map(question => <li key={question}>{question}</li>)}</ol></div>
      <div className="learning-focus"><h4 className="detail-label">ONE LEARNING FOCUS</h4><p>{dimension.learningFocus}</p></div>
    </motion.div>
  </GlassCard>
}
