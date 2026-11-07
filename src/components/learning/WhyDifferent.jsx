import { Check } from 'lucide-react'
import Container from '../ui/Container.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { learningApproach } from '../../data/webinarLearning.js'

export default function WhyDifferent() {
  return <section className="learning-section learning-approach" aria-labelledby="learning-approach-title"><Container className="learning-approach-grid"><div data-learning-reveal><SectionHeading eyebrow="LEARN WITH INTENTION" id="learning-approach-title" title={<>More Than Another<br /><span className="gradient-text">Motivational Session.</span></>} description="The session is designed around a connected process of reflection. It offers a framework to engage with, rather than a collection of disconnected ideas to watch." /><p className="small-copy learning-approach-note">An invitation to understand your own life. No promises of instant transformation.</p></div><GlassCard className="learning-approach-panel" data-learning-reveal><ul>{learningApproach.map(item => <li key={item.title}><Check size={16} aria-hidden="true" /><div><h3>{item.title}</h3><p className="body-copy">{item.text}</p></div></li>)}</ul></GlassCard></Container></section>
}
