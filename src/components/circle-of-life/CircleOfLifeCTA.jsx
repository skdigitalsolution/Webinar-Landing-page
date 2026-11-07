import { ArrowUpRight, Compass } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import WebinarFacts from '../ui/WebinarFacts.jsx'
import { webinar } from '../../data/webinar.js'

export default function CircleOfLifeCTA() {
  return <>
    <section className="circle-page-section circle-assessment" aria-labelledby="assessment-title"><Container><GlassCard className="assessment-invitation" data-circle-reveal><div className="assessment-heading"><span className="icon-tile"><Compass size={26} aria-hidden="true" /></span><SectionHeading eyebrow="A LITTLE SPACE FOR SELF-REFLECTION" id="assessment-title" title="Where Do You Stand Today?" description="Take a short self-reflection assessment to explore which areas of your life may deserve more attention." /></div><div className="assessment-invitation-action"><Badge tone="violet">Personal reflection exercise</Badge><Button variant="secondary" to="/assessment">Discover Your Life Balance<ArrowUpRight size={16} aria-hidden="true" /></Button></div></GlassCard></Container></section>
    <section className="circle-page-section circle-webinar" aria-labelledby="circle-webinar-title"><Container><GlassCard className="circle-webinar-panel" data-circle-reveal><Badge tone="gold">CONTINUE THE CONVERSATION</Badge><SectionHeading id="circle-webinar-title" title={<>Ready to Understand<br />Your Own <span className="gradient-text">Circle of Life?</span></>} description="Make time to explore your priorities in the live webinar. Bring your questions, your perspective and a willingness to reflect." align="center" /><WebinarFacts /><Button to={webinar.registrationDestination}>Register Now – {webinar.ticketLabel}<ArrowUpRight size={17} aria-hidden="true" /></Button><p className="small-copy">Registration coming soon · No payment collected here.</p></GlassCard></Container></section>
  </>
}
