import { ArrowRight } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import LotusMark from '../ui/LotusMark.jsx'

export default function WebinarBridge() {
  return <section id="webinar-bridge" className="solution-section solution-webinar-bridge landing-target" tabIndex={-1} aria-labelledby="webinar-bridge-title"><Container><div className="solution-webinar-panel" data-landing-reveal><LotusMark/><SectionHeading eyebrow="BRING YOUR REFLECTION INTO THE SESSION" id="webinar-bridge-title" title="Discover the Framework in the Webinar." description="Join the Circle of Life session to explore your priorities, understand the framework and learn how to approach your next steps." align="center"/><Button to="/#learning">Explore What You'll Learn<ArrowRight size={18} aria-hidden="true"/></Button></div></Container></section>
}
