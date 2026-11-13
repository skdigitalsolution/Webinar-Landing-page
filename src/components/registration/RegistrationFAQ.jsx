import './registration-faq.css'
import { useId, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { registrationFAQs } from '../../data/registration.js'
import { webinar } from '../../data/webinar.js'
import useMediaQuery from '../../hooks/useMediaQuery.js'

export default function RegistrationFAQ() {
  const [open,setOpen]=useState(null)
  const buttons=useRef([])
  const id=useId()
  const reduced=useMediaQuery('(prefers-reduced-motion: reduce)')
  const published=registrationFAQs.filter(item=>!item.pending&&item.approved!==false)
  function navigate(event,index){
    let next
    if(event.key==='ArrowDown')next=(index+1)%published.length
    else if(event.key==='ArrowUp')next=(index+published.length-1)%published.length
    else if(event.key==='Home')next=0
    else if(event.key==='End')next=published.length-1
    else return
    event.preventDefault();buttons.current[next]?.focus()
  }
  return <section className="registration-faq-section phase-six-faq" aria-labelledby="registration-faq-title"><Container>
    <div data-register-reveal><SectionHeading eyebrow="BEFORE YOU TAKE THE NEXT STEP" id="registration-faq-title" title="Frequently Asked Questions" description="A clear view of the webinar and the learning experience."/></div>
    <div className="registration-faq-list">{published.map((item,index)=>{const expanded=open===item.id;const buttonId=`${id}-${item.id}-question`,panelId=`${id}-${item.id}-answer`;return <div key={item.id} className="registration-faq-item" data-register-reveal><h3><button ref={element=>buttons.current[index]=element} id={buttonId} type="button" aria-expanded={expanded} aria-controls={panelId} onClick={()=>setOpen(expanded?null:item.id)} onKeyDown={event=>navigate(event,index)}>{item.question}{expanded?<Minus size={19} aria-hidden="true"/>:<Plus size={19} aria-hidden="true"/>}</button></h3><motion.div key={item.id} id={panelId} role="region" aria-labelledby={buttonId} className="faq-answer" initial={false} aria-hidden={!expanded} inert={!expanded} animate={{height:expanded?'auto':0,opacity:expanded?1:0}} transition={{duration:reduced?0:.23}}><p>{item.eventAnswer?`${webinar.dateLabel}, ${webinar.timeLabel}. ${webinar.locationLabel}.`:item.answer}</p></motion.div></div>})}</div>
  </Container></section>
}
