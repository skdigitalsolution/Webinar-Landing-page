import { ScanSearch, Target, Cpu, ListChecks, ArrowRight, Compass } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import Button from '../ui/Button.jsx'
import { solutionSteps } from '../../data/solutionSteps.js'
import { assessmentDimensions } from '../../data/assessmentDimensions.js'
import { useReflection } from '../../context/ReflectionContext.jsx'

const icons = [ScanSearch, Target, Cpu, ListChecks]
export default function VailyfSolutionSection() {
  const { priorities, primaryArea } = useReflection()
  const selected = assessmentDimensions.filter(dimension=>priorities.includes(dimension.id))
  const color = assessmentDimensions.find(dimension=>dimension.id===primaryArea)?.color || '#d6b46a'
  return <section id="solution" className="solution-section vailyf-solution landing-target" tabIndex={-1} aria-labelledby="solution-title" data-focus={priorities.join(',')} style={{'--focus-color':color}}><Container>
    <div className="solution-introduction" data-landing-reveal><SectionHeading eyebrow="INTRODUCING VAILYF AI" id="solution-title" title={<>Turn Self-Awareness Into<br/> <span className="solution-gold">a Clearer Plan.</span></>} description="Explore how structured reflection, relevant AI-assisted tools and expert guidance can help you organize priorities and identify practical next steps."/><div className="solution-focus-panel"><Compass size={28} strokeWidth={1.4} aria-hidden="true"/><span>YOUR SELECTED FOCUS</span><p data-solution-focus>{selected.length?selected.map(dimension=>dimension.name).join(' · '):'A starting point that matters to you.'}</p></div></div>
    <div className="solution-process-grid">{solutionSteps.map((step,index)=>{const Icon=icons[index];return <GlassCard as="article" hover className="solution-process-card" key={step.id} data-landing-reveal><div className="solution-step-top"><span>{step.number}</span><Icon size={30} strokeWidth={1.3} aria-hidden="true"/></div><h3>{step.title}</h3><p>{step.description}</p>{index<3&&<span className="solution-connector" aria-hidden="true"><ArrowRight size={21}/></span>}</GlassCard>})}</div>
    <div className="solution-action" data-landing-reveal><p className="small-copy">A practical framework to explore, with your own priorities at its center.</p><Button variant="outline" to="/#next-step">Try the Reflection Template<ArrowRight size={17} aria-hidden="true"/></Button></div>
  </Container></section>
}
