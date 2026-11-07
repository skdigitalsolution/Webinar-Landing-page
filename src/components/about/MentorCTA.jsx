import { ArrowUpRight } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import WebinarFacts from '../ui/WebinarFacts.jsx'
import { webinar } from '../../data/webinar.js'

export default function MentorCTA() {
  return (
    <section className="about-section mentor-invitation" aria-labelledby="mentor-invitation-title">
      <Container><GlassCard className="mentor-invitation-panel" data-about-reveal><Badge tone="gold">AN INVITATION TO REFLECT</Badge><h2 className="heading-section" id="mentor-invitation-title">Discover Your Own<br /><span className="gradient-text">Circle of Life.</span></h2><p className="body-lead">Join an interactive session designed to help you reflect on Health, Wealth, Relationships and Spiritual Bliss, and gain clarity about your priorities.</p><WebinarFacts /><Button to={webinar.registrationDestination}>Register Now – {webinar.ticketLabel}<ArrowUpRight size={17} aria-hidden="true" /></Button><p className="small-copy">Registration coming soon · No payment is collected here.</p></GlassCard></Container>
    </section>
  )
}
