import { CalendarDays, Clock3, Video, Ticket } from 'lucide-react'
import { webinar } from '../../data/webinar.js'
import './webinar-facts.css'

export default function WebinarFacts({ className = '', ...props }) {
  return (
    <div className={`webinar-facts ${className}`} {...props}>
      <div><CalendarDays aria-hidden="true" size={20} /><p><span>THE DATE</span><time dateTime={webinar.date}>{webinar.dateLabel}</time></p></div>
      <div><Clock3 aria-hidden="true" size={20} /><p><span>YOUR TIME</span><span className="event-value">{webinar.timeLabel}</span></p></div>
      <div><Video aria-hidden="true" size={20} /><p><span>WHERE WE MEET</span><span className="event-value">{webinar.locationLabel}</span></p></div>
      <div><Ticket aria-hidden="true" size={20} /><p><span>YOUR TICKET</span><span className="event-value">{webinar.ticketLabel}</span></p></div>
    </div>
  )
}
