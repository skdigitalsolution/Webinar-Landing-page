import { useId } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '../ui/GlassCard.jsx'

const center = 210
const radius = 135
const point = (index, value) => {
  const angle = index * Math.PI / 2 - Math.PI / 2
  return `${center + Math.cos(angle) * radius * value / 10},${center + Math.sin(angle) * radius * value / 10}`
}
export default function LifeBalanceChart({ scores, desiredScores, reduced, onDimensionSelect }) {
  const id = useId()
  const points = scores.map(({ value }, index) => point(index, value)).join(' ')
  const desiredPoints = desiredScores?.map(({ value }, index) => point(index, value)).join(' ')
  const transition = { duration: reduced ? 0 : .25 }
  return <GlassCard as="figure" className="balance-chart-card" aria-labelledby={`${id}-title`}>
    <div className="chart-heading"><span className="eyebrow">YOUR RATINGS, AT A GLANCE</span><h3 className="heading-card" id={`${id}-title`}>{desiredScores ? 'Two perspectives. Your priorities.' : 'A picture of this moment.'}</h3></div>
    {desiredScores && <div className="assessment-chart-legend"><span>Current · solid violet</span><span>Desired · dashed gold</span></div>}
    <svg className="balance-radar" viewBox="0 0 420 420" aria-hidden="true"><defs><linearGradient id={`${id}-fill`} x1="0" x2="1" y1="0" y2="1"><stop stopColor="#8855FF" stopOpacity=".3"/><stop offset="1" stopColor="#38DDF5" stopOpacity=".12"/></linearGradient></defs>
      {[2,4,6,8,10].map(level => <polygon className="radar-grid" key={level} points={scores.map((_, index) => point(index, level)).join(' ')} />)}
      {scores.map((dimension, index) => { const [x,y] = point(index,10).split(','); return <line key={dimension.id} className="radar-axis" x1={center} y1={center} x2={x} y2={y} style={{ stroke: dimension.color }}/> })}
      {[2,4,6,8,10].map(level=><text key={level} className="radar-scale" x="218" y={center-radius*level/10}>{level}</text>)}
      <motion.polygon className="radar-shape" style={{ fill: `url(#${id}-fill)` }} initial={false} animate={{ points }} transition={transition} data-points={points}/>
      {desiredScores && <motion.polygon className="radar-desired-shape" initial={false} animate={{ points: desiredPoints }} transition={transition} data-points={desiredPoints}/>}
      {scores.map((dimension, index) => { const [cx,cy] = point(index,dimension.value).split(','); return <motion.circle key={dimension.id} initial={false} animate={{ cx: Number(cx), cy: Number(cy) }} transition={transition} r="5" fill={dimension.color} stroke="#10112B" strokeWidth="2"/> })}
      <text x="210" y="42" textAnchor="middle" fill={scores[0].color}>Health</text><text x="380" y="214" textAnchor="middle" fill={scores[1].color}>Wealth</text><text x="210" y="397" textAnchor="middle" fill={scores[2].color}>Relationships</text><text x="40" y="204" textAnchor="middle" fill={scores[3].color}><tspan x="40">Spiritual</tspan><tspan x="40" dy="16">Bliss</tspan></text>
    </svg>
    <figcaption><p className="small-copy">Each axis uses a 1–10 personal rating. {desiredScores ? 'Desired values are your aspirations, not predicted outcomes.' : 'This is self-reflection, not a clinically validated score or measure of personal worth.'}</p>
      <ul className="chart-text-alternative">{scores.map((score,index) => <li key={score.id} style={{ '--dimension-color': score.color }}>{onDimensionSelect ? <button type="button" onClick={()=>onDimensionSelect(score.id)} aria-label={`Edit ${score.name} ${desiredScores ? 'desired' : 'current'} rating`}><span>{score.name}</span><strong>{score.value}{desiredScores ? ` → ${desiredScores[index].value}` : ' / 10'}</strong></button> : <><span><i aria-hidden="true"/>{score.name}</span><strong>{score.value} / 10</strong></>}</li>)}</ul>
    </figcaption>
  </GlassCard>
}
