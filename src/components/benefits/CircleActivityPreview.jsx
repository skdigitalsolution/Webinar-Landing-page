import { ArrowUpRight } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import ApproachVisual from '../about/ApproachVisual.jsx'
import { benefitsCopy } from '../../data/webinarBonuses.js'

export default function CircleActivityPreview() {
  const copy = benefitsCopy.activity
  return <section className="benefits-section circle-activity" aria-labelledby="circle-activity-title"><Container className="benefit-resource-grid"><div data-benefit-reveal><SectionHeading eyebrow={copy.eyebrow} id="circle-activity-title" title={copy.title} description={copy.description} /><ol className="circle-activity-steps">{copy.steps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol><Button variant="outline" to="/assessment">{copy.cta}<ArrowUpRight size={16} aria-hidden="true" /></Button><p className="small-copy activity-note">{copy.note}</p></div><div className="benefit-activity-visual" data-benefit-reveal><ApproachVisual /></div></Container></section>
}
