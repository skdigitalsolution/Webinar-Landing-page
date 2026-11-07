import { HeartPulse, Gem, Users, Sparkles } from 'lucide-react'
import Container from '../ui/Container.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import ApproachVisual from './ApproachVisual.jsx'
import { dimensions } from '../../data/dimensions.js'
import { mentorDimensions } from '../../data/mentor.js'

const icons = [HeartPulse, Gem, Users, Sparkles]
export default function LifeDimensionsPreview() {
  return (
    <section className="about-section about-dimensions" aria-labelledby="about-dimensions-title">
      <Container>
        <div className="about-dimensions-intro" data-about-reveal><SectionHeading eyebrow="ONE LIFE. FOUR CONNECTED DIMENSIONS." id="about-dimensions-title" title={<>See the connections.<br /><span className="gradient-text">Find your perspective.</span></>} description="Every dimension has a place in your life. The Circle of Life offers a way to reflect on them together, without reducing you to a single measure of success." /></div>
        <div className="about-dimensions-grid"><div data-about-reveal><ApproachVisual /></div><div className="about-dimension-cards">{dimensions.map((dimension, index) => { const Icon = icons[index]; return <GlassCard as="article" hover key={dimension.id} className="about-dimension-card" style={{ '--dimension-color': dimension.color }} data-about-reveal><span className="about-dimension-icon"><Icon size={21} aria-hidden="true" /></span><h3 className="heading-card">{dimension.name}</h3><p className="body-copy">{mentorDimensions[index].description}</p></GlassCard> })}</div></div>
      </Container>
    </section>
  )
}
