import { ScanEye, Compass, Focus, CircleDot, Layers3, Footprints } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { learningOutcomes } from '../../data/webinarLearning.js'

const icons = [ScanEye, Compass, Focus, CircleDot, Layers3, Footprints]
export default function LearningOutcomes({ title }) {
  return <section className="learning-section learning-outcomes" aria-labelledby="learning-outcomes-title"><Container><div data-learning-reveal><SectionHeading eyebrow="A FRAMEWORK TO TAKE WITH YOU" id="learning-outcomes-title" title={title || <>What Will You<br /><span className="gradient-text">Walk Away With?</span></>} description="These are intended learning outcomes, not guaranteed results. Your reflections and next steps are personal to you." /></div><ol className="learning-outcome-list">{learningOutcomes.map((outcome, index) => { const Icon = icons[index]; return <li key={outcome.title} data-learning-reveal><span className="outcome-number">0{index + 1}</span><div><h3 className="heading-card">{outcome.title}</h3><p className="body-copy">{outcome.description}</p></div><Icon size={22} aria-hidden="true" /></li> })}</ol></Container></section>
}

