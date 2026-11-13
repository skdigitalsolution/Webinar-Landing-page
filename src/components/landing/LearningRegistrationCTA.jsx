import { ArrowRight, BookOpen } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import { webinar } from '../../data/webinar.js'

export default function LearningRegistrationCTA() {
  return <section id="learning-registration" className="learning-registration-bridge" aria-labelledby="learning-registration-title"><Container><div className="learning-registration-panel" data-benefit-reveal><BookOpen size={32} strokeWidth={1.4} aria-hidden="true"/><SectionHeading eyebrow="YOUR NEXT STEP" id="learning-registration-title" title="Your Next Step Toward Clarity Starts Here." description="Join the Circle of Life webinar to explore your priorities, learn a structured reflection framework and discover practical next steps." align="center"/><Button href={webinar.paymentLink}>Reserve Your Place – {webinar.ticketLabel}<ArrowRight size={18} aria-hidden="true"/></Button><p className="small-copy learning-registration-status">Continue to Razorpay to complete your payment.</p></div></Container></section>
}
