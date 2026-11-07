import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { Plus } from 'lucide-react'
import { registrationFAQs } from '../../data/registration.js'
import { webinar } from '../../data/webinar.js'

export default function RegistrationFAQ() {
  return <section className="registration-faq-section" aria-labelledby="registration-faq-title"><Container><div data-register-reveal><SectionHeading eyebrow="BEFORE YOU TAKE THE NEXT STEP" id="registration-faq-title" title={<>A little more<br /><span className="gradient-text">clarity.</span></>} description="The event details we have, with open questions clearly marked." /></div><div className="registration-faq-list">{registrationFAQs.map(item => <details key={item.id} className="registration-faq-item" data-register-reveal><summary><span>{item.question}{item.pending && <small>Information pending</small>}</span><Plus size={18} aria-hidden="true" /></summary><div><p>{item.eventAnswer ? `The currently supplied schedule is ${webinar.dateLabel}, ${webinar.timeLabel}.` : item.answer}</p></div></details>)}</div></Container></section>
}
