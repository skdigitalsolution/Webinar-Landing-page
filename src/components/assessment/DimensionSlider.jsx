import GlassCard from '../ui/GlassCard.jsx'
import { dimensionIcons } from '../circle-of-life/LifeDimensionCard.jsx'

export default function DimensionSlider({ dimension, index, value, reviewed, onChange }) {
  const Icon = dimensionIcons[index]
  const inputId = `rating-${dimension.id}`
  return <GlassCard as="fieldset" className="rating-card" style={{ '--dimension-color': dimension.color, '--range-fill': `${(value - 1) / 9 * 100}%` }} data-assessment-reveal>
    <legend className="sr-only">{dimension.name} self-rating</legend>
    <div className="rating-card-top"><span className="rating-icon"><Icon size={22} aria-hidden="true" /></span><h3 className="heading-card">{dimension.name}</h3><output htmlFor={inputId} aria-hidden="true"><strong>{value}</strong><span>/ 10</span></output></div>
    <label htmlFor={inputId}>{dimension.question}</label><p className="small-copy rating-explanation" id={`${inputId}-explanation`}>{dimension.explanation}</p>
    <input id={inputId} name={dimension.id} type="range" min="1" max="10" step="1" value={value} onChange={event => onChange(dimension.id, Number(event.target.value))} aria-valuetext={`${value} out of 10${reviewed ? '' : ', initial placeholder'}`} aria-describedby={`${inputId}-explanation ${inputId}-guidance ${inputId}-status`} />
    <div className="range-guidance" id={`${inputId}-guidance`}><span>1 · Very Unsatisfied</span><span>10 · Very Satisfied</span></div><p className="rating-status" id={`${inputId}-status`}>{reviewed ? 'Your current self-rating' : 'Initial placeholder: 5 · adjust or confirm your rating'}</p>
  </GlassCard>
}
