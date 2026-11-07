import { ArrowDown, ArrowUpRight } from 'lucide-react'
import Button from '../ui/Button.jsx'
import { webinar } from '../../data/webinar.js'

export default function HeroCTA() {
  return <div className="hero-actions"><div data-hero-action><Button to={webinar.registrationDestination}>Register Now – {webinar.ticketLabel} <ArrowUpRight size={17} aria-hidden="true" /></Button></div><div data-hero-action><Button variant="outline" href="#life-dimensions">Explore Your Circle of Life <ArrowDown size={16} aria-hidden="true" /></Button></div></div>
}
