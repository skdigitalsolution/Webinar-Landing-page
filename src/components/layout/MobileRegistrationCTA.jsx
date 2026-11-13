import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../ui/Button.jsx'
import { webinar } from '../../data/webinar.js'
import useMediaQuery from '../../hooks/useMediaQuery.js'

export default function MobileRegistrationCTA(){
  const compact=useMediaQuery('(max-width: 767px)')
  const reduced=useMediaQuery('(prefers-reduced-motion: reduce)')
  const [registrationVisible,setRegistrationVisible]=useState(false)
  const [editing,setEditing]=useState(false)
  useEffect(()=>{
    const visibility=new Map()
    const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>visibility.set(entry.target,entry.isIntersecting));setRegistrationVisible([...visibility.values()].some(Boolean))})
    document.querySelectorAll('#register,#final-cta,.phase-six-footer').forEach(element=>observer.observe(element))
    let frame
    const update=()=>setEditing(!!document.activeElement?.matches('input,select,textarea,[contenteditable="true"]'))
    const schedule=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update)}
    document.addEventListener('focusin',update);document.addEventListener('focusout',schedule)
    return()=>{observer.disconnect();cancelAnimationFrame(frame);document.removeEventListener('focusin',update);document.removeEventListener('focusout',schedule)}
  },[])
  const visible=compact&&!registrationVisible&&!editing
  return <AnimatePresence>{visible&&<motion.aside key="mobile-registration" className="mobile-register-bar phase-six-mobile-bar" aria-label="Webinar registration shortcut" initial={reduced?false:{y:12,opacity:0}} animate={{y:0,opacity:1}} exit={{y:12,opacity:0}} transition={{duration:reduced?0:.18}}><span><strong>Webinar {webinar.ticketLabel}</strong><small>Razorpay checkout</small></span><Button href={webinar.paymentLink}>Register Now</Button></motion.aside>}</AnimatePresence>
}
