import { HeartPulse, Gem, Users, Sparkles } from 'lucide-react'
import Container from '../ui/Container.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { dimensions } from '../../data/dimensions.js'

const icons = [HeartPulse, Gem, Users, Sparkles]
export default function LifeDimensions() {
  return <section className="life-dimensions home-section" id="life-dimensions" aria-labelledby="dimensions-title"><Container><div data-reveal><SectionHeading eyebrow="THE FOUR LIFE DIMENSIONS" id="dimensions-title" title={<>Success is one part.<br /><span className="gradient-text">Life is the whole picture.</span></>} description="Take a step back. See how the different parts of your life connect, and where you would like to bring more attention." align="center" /></div><div className="life-dimension-grid">{dimensions.map((dimension, index) => { const Icon = icons[index]; return <GlassCard key={dimension.id} hover as="article" className="life-dimension-card" style={{ '--dimension-color': dimension.color }} data-reveal><div className="dimension-card-top"><span className="dimension-icon"><Icon size={23} aria-hidden="true" /></span><span className="dimension-number">0{index + 1}</span></div><h3 className="heading-card">{dimension.name}</h3><p className="body-copy">{dimension.description}</p><p className="dimension-prompt">{dimension.prompt}</p></GlassCard> })}</div></Container></section>
}
