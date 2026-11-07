import { ArrowUpRight } from 'lucide-react'
import Container from '../ui/Container.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import WebinarFacts from '../ui/WebinarFacts.jsx'
import { webinar } from '../../data/webinar.js'

export default function WebinarDetails() {
  return <section className="home-section webinar-section" aria-labelledby="webinar-title"><Container><WebinarFacts data-reveal /><GlassCard className="registration-notice" id="registration" data-reveal><div><Badge tone="gold">THE NEXT STEP</Badge><h2 className="heading-section" id="webinar-title">Make room for <span className="gradient-text">a fuller life.</span></h2><p className="body-copy">A demo registration preview is available. Tickets are listed at {webinar.ticketLabel} for the live Zoom webinar on {webinar.dateLabel}, {webinar.timeLabel}.</p><p className="small-copy">Live booking and payments are not open yet. Use fictional details only in the demo.</p></div><div className="registration-action"><Button to={webinar.registrationDestination}>Preview Registration</Button><Button variant="outline" href="#life-dimensions">Explore the four dimensions <ArrowUpRight size={16} aria-hidden="true" /></Button></div></GlassCard></Container></section>
}

