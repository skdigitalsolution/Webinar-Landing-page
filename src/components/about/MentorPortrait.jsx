import { Orbit, Sparkles } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import { mentor } from '../../data/mentor.js'

export default function MentorPortrait() {
  const portraitApproved = mentor.portrait.approved && mentor.portrait.src
  return (<figure className="mentor-portrait-composition" aria-labelledby="portrait-caption">
          <div className="portrait-orbit portrait-orbit--outer" aria-hidden="true" /><div className="portrait-orbit portrait-orbit--inner" aria-hidden="true" />
          <div className="mentor-portrait-frame">
            {portraitApproved ? <img src={mentor.portrait.src} alt={mentor.portrait.alt} width="600" height="720" loading="lazy" decoding="async" /> : <div className="portrait-placeholder"><span className="portrait-initials" aria-hidden="true">VJ</span><span className="eyebrow">OFFICIAL PORTRAIT</span><span className="small-copy">Awaiting client-approved image</span></div>}
          </div>
          <GlassCard className="portrait-detail portrait-detail--top"><Orbit size={18} aria-hidden="true" /><span>Self-reflection<br /><small>A place to begin</small></span></GlassCard>
          <GlassCard className="portrait-detail portrait-detail--bottom"><Sparkles size={18} aria-hidden="true" /><span>Clarity & direction<br /><small>One step at a time</small></span></GlassCard>
          <figcaption id="portrait-caption"><strong>{mentor.name}</strong><span>{portraitApproved ? 'Your webinar mentor' : 'Portrait placeholder · not a photograph'}</span></figcaption>
        </figure>)
}

