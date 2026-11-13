import { Goal, CalendarCheck2, MessageCircleQuestion, Lightbulb, Sparkles } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import { aiPlanningContent } from '../../data/solutionSteps.js'

const icons = [Goal, CalendarCheck2, MessageCircleQuestion, Lightbulb]
export default function AIValueSection() {
  return <section id="ai-planning" className="solution-section ai-planning-section landing-target" tabIndex={-1} aria-labelledby="ai-planning-title"><Container>
    <div className="ai-planning-heading" data-landing-reveal><Sparkles size={25} strokeWidth={1.5} aria-hidden="true"/><SectionHeading eyebrow="A TOOL TO SUPPORT YOUR THINKING" id="ai-planning-title" title={aiPlanningContent.heading} description="General ways AI tools may support a planning process, alongside your own judgment." align="center"/></div>
    <div className="ai-value-grid">{aiPlanningContent.useCases.map((text,index)=>{const Icon=icons[index];return <GlassCard className="ai-value-card" key={text} data-landing-reveal><Icon size={23} strokeWidth={1.5} aria-hidden="true"/><h3>{text}</h3></GlassCard>})}</div>
    <p className="ai-role-clarification">{aiPlanningContent.clarification}</p><p className="small-copy ai-content-status">{aiPlanningContent.status}</p>
  </Container></section>
}
