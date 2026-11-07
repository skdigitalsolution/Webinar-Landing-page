import { ArrowDown, LockKeyhole } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'

export default function AssessmentHero({ onStart }) {
  return <section className="assessment-hero" aria-labelledby="assessment-page-title"><Container><div data-assessment-entrance><Badge tone="gold"><span className="status-dot" />DISCOVER YOUR LIFE BALANCE</Badge></div><h1 className="heading-display" id="assessment-page-title" data-assessment-entrance>Where Do You<br /><span className="gradient-text">Stand Today?</span></h1><p className="body-lead" data-assessment-entrance>Take a few moments to reflect on four important areas of your life. Discover which areas feel strong and where you may want to focus more attention.</p><p className="assessment-hero-label" data-assessment-entrance>A Simple Personal Reflection Exercise</p><div data-assessment-entrance><Button onClick={onStart}>Start My Assessment<ArrowDown size={16} aria-hidden="true" /></Button></div><p className="small-copy assessment-privacy" data-assessment-entrance><LockKeyhole size={13} aria-hidden="true" />No personal information. No saved or transmitted ratings.</p><p className="small-copy assessment-disclaimer" data-assessment-entrance>This is a self-reflection tool, not a medical, financial or psychological diagnostic assessment.</p></Container></section>
}
