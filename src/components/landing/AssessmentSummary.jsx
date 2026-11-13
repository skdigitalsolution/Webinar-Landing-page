import GlassCard from '../ui/GlassCard.jsx'

export default function AssessmentSummary({ comparison, priorities, desiredReviewed }) {
  const selected = comparison.filter(row=>priorities.includes(row.id))
  return <GlassCard className="aspiration-summary" data-assessment-reveal><p className="eyebrow">YOUR PERSONAL REFLECTION</p><h3 className="heading-card">Current life. Desired life. Your focus.</h3><p className="small-copy">Desired ratings are chosen aspirations; unreviewed values remain marked as defaults.</p><dl>{comparison.map(row=><div key={row.id}><dt>{row.name}</dt><dd><span>Current {row.current} / 10</span><span>Desired {row.desired} / 10{!desiredReviewed[row.id]&&' · default'}</span></dd></div>)}</dl><h4>Selected focus areas</h4><p data-selected-priorities>{selected.length?selected.map(row=>row.name).join(', '):'No focus areas selected yet.'}</p><h4>Questions for your next step</h4><ul>{(selected.length?selected:comparison).map(row=><li key={row.id}>{row.prompt}</li>)}</ul><p className="small-copy">What is one practical step you could choose for yourself? Nothing here predicts your future or provides a clinical interpretation.</p></GlassCard>
}
