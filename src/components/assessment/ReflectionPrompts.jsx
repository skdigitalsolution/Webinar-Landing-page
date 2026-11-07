import GlassCard from '../ui/GlassCard.jsx'

export default function ReflectionPrompts({ dimensions, allEqual }) {
  return <GlassCard className="reflection-prompts" data-assessment-reveal><p className="eyebrow">A QUESTION TO SIT WITH</p><h3 className="heading-card">What would you like to explore?</h3><p className="body-copy">{allEqual ? 'All four areas are tied. Choose whichever question feels most relevant to you.' : dimensions.length > 1 ? 'Several areas share your lowest rating. Any of these could be a starting point for reflection.' : 'Your lowest-rated area may be a place to start reflecting, if it feels relevant to you.'}</p><ul>{dimensions.map(dimension => <li key={dimension.id} style={{ '--dimension-color': dimension.color }}><span>{dimension.name}</span><p>{dimension.prompt}</p></li>)}</ul><p className="small-copy">These are reflection prompts, not medical, financial or psychological advice.</p></GlassCard>
}
