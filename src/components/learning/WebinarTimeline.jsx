import Container from '../ui/Container.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import Badge from '../ui/Badge.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { webinarAgenda } from '../../data/webinarLearning.js'

export default function WebinarTimeline() {
  return <section className="learning-section learning-agenda" id="webinar-agenda" aria-labelledby="learning-agenda-title"><Container className="learning-agenda-grid"><div className="agenda-introduction" data-learning-reveal><SectionHeading eyebrow="THE PROPOSED LEARNING JOURNEY" id="learning-agenda-title" title={<>One session.<br /><span className="gradient-text">A connected journey.</span></>} description="A proposed flow from understanding the framework to reflecting on your own direction." /><Badge tone="gold">{webinarAgenda.status}</Badge><p className="small-copy">{webinarAgenda.note}</p></div><div className="agenda-timeline"><div className="agenda-track" aria-hidden="true"><span className="agenda-progress" /></div><ol>{webinarAgenda.modules.map((module, index) => <li key={module.title}><span className="agenda-node" aria-hidden="true" /><GlassCard className="agenda-module" data-learning-reveal><span className="eyebrow">MODULE 0{index + 1}</span><h3 className="heading-card">{module.title}</h3><p className="body-copy">{module.description}</p></GlassCard></li>)}</ol></div></Container></section>
}
