import { ArrowDown, ArrowUpRight } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import MentorPortrait from './MentorPortrait.jsx'
import { mentor } from '../../data/mentor.js'
import { webinar } from '../../data/webinar.js'

export default function AboutHero() {
  return (
    <section className="about-hero" aria-labelledby="about-title">
      <Container className="about-hero-grid">
        <div className="about-hero-copy">
          <div data-about-entrance><Badge tone="gold"><span className="status-dot" />MEET YOUR MENTOR</Badge></div>
          <h1 className="heading-display" id="about-title" data-about-entrance>A Clearer Path to a More <span className="gradient-text">Balanced Life.</span></h1>
          <p className="mentor-name" data-about-entrance>With {mentor.name}</p>
          <p className="body-lead" data-about-entrance>A thoughtful space for self-reflection, goal clarity and meaningful improvement. Begin by understanding where you are, and what matters most to you.</p>
          <div className="about-hero-actions" data-about-entrance><Button to={webinar.registrationDestination}>Join the Webinar – {webinar.ticketLabel}<ArrowUpRight size={17} aria-hidden="true" /></Button><Button variant="outline" href="#approach">Explore the Approach<ArrowDown size={16} aria-hidden="true" /></Button></div>
          <p className="small-copy" data-about-entrance>Live on Zoom · {webinar.dateLabel}<br />{webinar.timeLabel} · Registration coming soon</p>
        </div>
        <MentorPortrait />
      </Container>
    </section>
  )
}
