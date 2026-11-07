import { ArrowUpRight } from 'lucide-react'
import Container from '../ui/Container.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import Badge from '../ui/Badge.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import WebinarFacts from '../ui/WebinarFacts.jsx'
import { webinar } from '../../data/webinar.js'

export default function LearningCTA() {
  return <section className="learning-section learning-webinar" aria-labelledby="learning-webinar-title"><Container><GlassCard className="learning-webinar-panel" data-learning-reveal><Badge tone="gold">MAKE SPACE FOR A NEW PERSPECTIVE</Badge><SectionHeading id="learning-webinar-title" title={<>Your Next Step<br />Starts With <span className="gradient-text">Clarity.</span></>} description="Join the Circle of Life webinar and explore a structured approach to understanding your priorities and your next steps." align="center" /><WebinarFacts /><p className="small-copy learning-event-note">Currently supplied event schedule shown above. Final session duration is pending client confirmation.</p><Button to={webinar.registrationDestination}>Register Now – {webinar.ticketLabel}<ArrowUpRight size={17} aria-hidden="true" /></Button><p className="small-copy">Registration coming soon · No payment collected here.</p></GlassCard></Container></section>
}
