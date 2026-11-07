import { useEffect, useId, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import { navigation } from '../../data/navigation.js'
import { landingSectionIds } from '../../data/landing.js'
import { webinar } from '../../data/webinar.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const menuId = useId()
  const toggle = useRef(null)
  const location = useLocation()
  useEffect(() => { setOpen(false) }, [location.pathname, location.hash])
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1100px)')
    const close = () => { if (media.matches) setOpen(false) }
    media.addEventListener('change', close)
    return () => media.removeEventListener('change', close)
  }, [])
  useEffect(() => {
    let frame
    const update = () => {
      let next = 'home'
      for (const id of landingSectionIds) {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top <= 180) next = id
      }
      setActive(next)
      frame = undefined
    }
    const schedule = () => { if (frame === undefined) frame = requestAnimationFrame(update) }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule) }
  }, [])
  function handleKeyDown(event) {
    if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus() }
  }
  return <header className="site-header" onKeyDown={handleKeyDown}><Container className="navbar"><Link className="brand" to="/#home" aria-label="VAILYF AI home"><span className="brand-mark" aria-hidden="true">V</span><span>VAILYF <span className="brand-ai">AI</span></span></Link><button ref={toggle} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(!open)}><span aria-hidden="true">{open ? <X size={22} /> : <Menu size={22} />}</span></button><div className={`navbar-panel ${open ? 'is-open' : ''}`} id={menuId}><nav aria-label="Main navigation">{navigation.map(item=><Link key={item.id} to={item.to} className={`nav-link ${active===item.id?'is-active':''}`} aria-current={active===item.id?'location':undefined} onClick={()=>setOpen(false)}>{item.label}</Link>)}</nav><div className="navbar-action"><Button to={webinar.registrationDestination} onClick={()=>setOpen(false)} aria-describedby={`${menuId}-status`}>Register Now – {webinar.ticketLabel}</Button><span className="nav-status" id={`${menuId}-status`}>Payment integration pending</span></div></div></Container></header>
}
