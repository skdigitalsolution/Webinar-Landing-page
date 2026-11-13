import { useState } from 'react'
import { HeartPulse, Coins, ArrowUpRight, TrendingUp } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import LotusMark from '../ui/LotusMark.jsx'
import DimensionDetailPanel from '../circle-of-life/DimensionDetailPanel.jsx'
import { lifeDimensions } from '../../data/lifeDimensions.js'
import { assessmentDimensions } from '../../data/assessmentDimensions.js'
import useMediaQuery from '../../hooks/useMediaQuery.js'
import './phase-three.css'

function PillarVisual({ index }) {
  if (index === 3) return <LotusMark className="pillar-lotus"/>
  if (index === 2) return <svg viewBox="0 0 160 90" fill="currentColor" aria-hidden="true"><circle cx="80" cy="24" r="10"/><circle cx="45" cy="31" r="8" opacity=".6"/><circle cx="115" cy="31" r="8" opacity=".6"/><path d="M65 83V50q15-18 30 0v33ZM31 83V54q14-17 28 0v29ZM101 83V54q14-17 28 0v29Z"/><path d="m48 54 28 13 27-13" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/></svg>
  const Icon = index === 0 ? HeartPulse : Coins
  return <><Icon size={78} strokeWidth={1.25} aria-hidden="true"/>{index===1&&<TrendingUp className="pillar-growth" size={32} strokeWidth={1.5} aria-hidden="true"/>}</>
}

export default function FourPillarsSection({ active, onSelect }) {
  const [expanded, setExpanded] = useState(false)
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  return <section id="circle-of-life" className="landing-section landing-target phase-three-pillars" tabIndex={-1} aria-labelledby="pillars-title"><Container>
    <SectionHeading eyebrow="FOUR DIMENSIONS. ONE LIFE." id="pillars-title" title="The Four Pillars of a Fulfilling Life" description="Explore the areas that matter to you. Select a pillar for a closer look." align="center"/>
    <div className="phase-three-pillar-grid">{assessmentDimensions.map((dimension,index)=><GlassCard as="article" className={`phase-three-pillar ${active===index?'is-selected':''}`} key={dimension.id} style={{'--pillar-color':dimension.color}} data-landing-reveal>
      <div className="pillar-visual" aria-hidden="true"><PillarVisual index={index}/></div><h3>{dimension.name}</h3><p>{dimension.pillarDescription}</p><button onClick={()=>{onSelect(index);setExpanded(true)}} aria-expanded={expanded&&active===index} aria-pressed={active===index} aria-controls="life-dimension-detail">Explore {dimension.name}<ArrowUpRight size={15} aria-hidden="true"/></button>
    </GlassCard>)}</div>
    <button className="pillar-detail-toggle" aria-expanded={expanded} aria-controls="life-dimension-detail" onClick={()=>setExpanded(!expanded)}>{expanded?'Hide pillar details':`Read more about ${assessmentDimensions[active].name}`}</button>
    <div className="landing-pillar-detail" hidden={!expanded}><DimensionDetailPanel dimension={{...lifeDimensions[active],color:assessmentDimensions[active].color}} index={active} reduced={reduced}/></div>
  </Container></section>
}
