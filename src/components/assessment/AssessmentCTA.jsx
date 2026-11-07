import { ArrowUpRight } from 'lucide-react'
import Container from '../ui/Container.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import Badge from '../ui/Badge.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import WebinarFacts from '../ui/WebinarFacts.jsx'
import { webinar } from '../../data/webinar.js'

export default function AssessmentCTA() {
  return <section className="assessment-section assessment-webinar" aria-labelledby="assessment-webinar-title"><Container><GlassCard className="assessment-webinar-panel" data-assessment-reveal><Badge tone="gold">CONTINUE YOUR REFLECTION</Badge><SectionHeading id="assessment-webinar-title" title={<>Take the Next Step<br />Toward <span className="gradient-text">Greater Clarity.</span></>} description="Join the Circle of Life webinar to explore structured self-reflection, goal clarity and practical ways to think about your priorities." align="center" /><WebinarFacts /><Button to={webinar.registrationDestination}>Join the Webinar – {webinar.ticketLabel}<ArrowUpRight size={17} aria-hidden="true" /></Button><p className="small-copy">Registration coming soon · No payment collected here.</p></GlassCard></Container></section>
}
