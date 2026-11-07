import { HeartPulse, Coins, Users, Sparkles, ArrowUpRight } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import Button from '../ui/Button.jsx'

export const dimensionIcons = [HeartPulse, Coins, Users, Sparkles]

export default function LifeDimensionCard({ dimension, index, selected, onSelect }) {
  const Icon = dimensionIcons[index]
  return <GlassCard as="article" hover className={`explorer-card ${selected ? 'is-selected' : ''}`} style={{ '--dimension-color': dimension.color }} data-dimension={dimension.id} data-selected={selected} data-circle-reveal><div className="explorer-card-top"><span className="explorer-icon"><Icon size={23} aria-hidden="true" /></span><span className="small-copy">0{index + 1}</span></div><h3 className="heading-card">{dimension.name}</h3><p className="body-copy">{dimension.focus}</p><Button variant="outline" aria-pressed={selected} aria-controls="life-dimension-detail" aria-label={`Explore ${dimension.name}`} onClick={() => onSelect(index)}>Explore<ArrowUpRight size={16} aria-hidden="true" /></Button></GlassCard>
}
