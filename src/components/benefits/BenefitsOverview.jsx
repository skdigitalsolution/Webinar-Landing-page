import { Check, BookOpen, MessagesSquare } from 'lucide-react'
import Container from '../ui/Container.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Badge from '../ui/Badge.jsx'
import { benefitsCopy, benefitGroups } from '../../data/webinarBonuses.js'

const icons = [Check, BookOpen, MessagesSquare]
export default function BenefitsOverview() {
  const copy = benefitsCopy.overview
  return <section className="benefits-section benefits-overview" aria-labelledby="benefits-overview-title"><Container><div data-benefit-reveal><SectionHeading eyebrow={copy.eyebrow} id="benefits-overview-title" title={copy.title} description={copy.description} align="center" /></div><div className="benefits-overview-grid">{benefitGroups.map((group, index) => { const Icon = icons[index]; return <GlassCard as="article" hover className="benefit-group-card" key={group.id} data-benefit-group={group.id} data-benefit-reveal><span className="icon-tile"><Icon size={23} aria-hidden="true" /></span><h3 className="heading-card">{group.label}</h3><Badge tone={index === 0 ? 'neutral' : 'gold'}>{group.status}</Badge><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul><p className="small-copy">{group.note}</p></GlassCard> })}</div><p className="small-copy benefits-inclusions-note">{copy.note}</p></Container></section>
}

