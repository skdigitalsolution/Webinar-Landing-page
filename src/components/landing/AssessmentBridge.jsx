import { ArrowRight } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'

export default function AssessmentBridge() {
  return <section className="assessment-section assessment-bridge" aria-labelledby="assessment-bridge-title"><Container><div className="assessment-bridge-panel" data-assessment-reveal><SectionHeading eyebrow="FROM REFLECTION TO DIRECTION" id="assessment-bridge-title" title="Understanding the Gap Is the First Step." description="Discover how structured reflection, expert guidance and appropriate AI tools may help you organize your goals and explore practical next steps." align="center"/><Button to="/#solution">Discover the VAILYF AI Approach<ArrowRight size={18} aria-hidden="true"/></Button></div></Container></section>
}
