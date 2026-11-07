import { ArrowUpRight } from 'lucide-react'
import Container from '../ui/Container.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import Badge from '../ui/Badge.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import WebinarFacts from '../ui/WebinarFacts.jsx'
import { benefitsCopy } from '../../data/webinarBonuses.js'
import { webinar } from '../../data/webinar.js'

export default function BenefitsCTA() {
  const copy = benefitsCopy.cta
  return <section className="benefits-section benefits-webinar" aria-labelledby="benefits-webinar-title"><Container><GlassCard className="benefits-webinar-panel" data-benefit-reveal><Badge tone="gold">{copy.eyebrow}</Badge><SectionHeading id="benefits-webinar-title" title={copy.title} description={copy.description} align="center" /><WebinarFacts /><p className="small-copy">{copy.scheduleNote}</p><Button to={webinar.registrationDestination}>{copy.button} – {webinar.ticketLabel}<ArrowUpRight size={16} aria-hidden="true" /></Button><p className="small-copy">{copy.note}</p></GlassCard></Container></section>
}
