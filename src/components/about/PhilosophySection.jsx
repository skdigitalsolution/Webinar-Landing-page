import { ScanEye, Compass, Route } from 'lucide-react'
import Container from '../ui/Container.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { approachSteps } from '../../data/mentor.js'

const icons = [ScanEye, Compass, Route]
export default function PhilosophySection() {
  return (
    <section className="about-section about-philosophy" id="approach" aria-labelledby="philosophy-title">
      <Container>
        <div data-about-reveal><SectionHeading eyebrow="THE PHILOSOPHY" id="philosophy-title" title={<>Real Change Begins<br />With <span className="gradient-text">Self-Awareness.</span></>} description="Pause. Look a little closer. Give yourself space to consider the life you want to build." align="center" /></div>
        <div className="philosophy-grid">{approachSteps.map((step, index) => { const Icon = icons[index]; return <GlassCard as="article" hover key={step.title} className="philosophy-card" data-about-reveal><div className="philosophy-card-top"><span className="icon-tile"><Icon size={23} aria-hidden="true" /></span><span className="step-index">0{index + 1}</span></div><h3 className="heading-card">{step.title}</h3><p className="body-copy">{step.description}</p></GlassCard> })}</div>
      </Container>
    </section>
  )
}
