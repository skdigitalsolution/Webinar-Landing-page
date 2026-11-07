import GlassCard from '../ui/GlassCard.jsx'
import { dimensionIcons } from '../circle-of-life/LifeDimensionCard.jsx'

export default function LearningDimensionCard({ dimension, index }) {
  const Icon = dimensionIcons[index]
  return <GlassCard as="article" hover className="learning-dimension-card" style={{ '--dimension-color': dimension.color }} data-learning-reveal><div className="learning-card-top"><span className="learning-card-icon"><Icon size={23} aria-hidden="true" /></span><span>0{index + 1}</span></div><h3 className="heading-card">{dimension.name}</h3><p className="body-copy">{dimension.description}</p><ul>{dimension.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul></GlassCard>
}
