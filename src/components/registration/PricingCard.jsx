import { CalendarDays, Clock3, Video, ArrowDown } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import { webinar } from '../../data/webinar.js'
import { registrationConfig } from '../../data/registration.js'

export default function PricingCard({ onPreview }) {
  return <GlassCard className="registration-pricing-card" data-register-reveal><Badge tone="gold">THE LIVE WEBINAR</Badge><h2 className="heading-section">{registrationConfig.productName}</h2><div className="ticket-price"><span>{webinar.ticketLabel}</span><small>One ticket</small></div><p className="body-copy">A structured space for reflection across four connected dimensions of life.</p><ul className="pricing-event-list"><li><CalendarDays size={18} aria-hidden="true" /><time dateTime={webinar.date}>{webinar.dateLabel}</time></li><li><Clock3 size={18} aria-hidden="true" />{webinar.timeLabel}</li><li><Video size={18} aria-hidden="true" />{webinar.locationLabel}</li></ul><Button onClick={onPreview}>Preview Registration<ArrowDown size={16} aria-hidden="true" /></Button><p className="small-copy">Demo preview only. No seat is reserved and no payment is collected.</p></GlassCard>
}
