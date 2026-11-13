import { ScanEye, Compass, Cpu, ListChecks } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { learningOutcomes, learningCopy } from '../../data/webinarLearning.js'

const icons = [ScanEye, Compass, Cpu, ListChecks]
export default function LearningOutcomes({ title }) {
  return <section className="learning-section learning-outcomes" aria-labelledby="learning-outcomes-title"><Container><div data-learning-reveal><SectionHeading eyebrow={learningCopy.eyebrow} id="learning-outcomes-title" title={title || learningCopy.title} description={learningCopy.description}/><p className="learning-outcome-note small-copy">{learningCopy.outcomeNote}</p></div><ol className="learning-outcome-list">{learningOutcomes.map((outcome,index)=>{const Icon=icons[index];return <li key={outcome.title} data-learning-reveal><div className="learning-outcome-top"><span className="outcome-number">0{index+1}</span><Icon size={27} strokeWidth={1.4} aria-hidden="true"/></div><h3 className="heading-card">{outcome.title}</h3><p className="body-copy">{outcome.description}</p></li>})}</ol></Container></section>
}
