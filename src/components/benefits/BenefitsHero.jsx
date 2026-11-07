import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import { BookMockup } from './BookCard3D.jsx'
import { benefitsCopy, books } from '../../data/webinarBonuses.js'
import { webinar } from '../../data/webinar.js'

export default function BenefitsHero() {
  const copy = benefitsCopy.hero
  return <section className="benefits-hero" aria-labelledby="benefits-page-title"><Container className="benefits-hero-grid"><div className="benefits-hero-copy"><div data-benefit-entrance><Badge tone="gold"><span className="status-dot" />{copy.eyebrow}</Badge></div><h1 className="heading-display" id="benefits-page-title" data-benefit-entrance>{copy.title}<br /><span className="gradient-text">{copy.accent}</span></h1><p className="body-lead" data-benefit-entrance>{copy.description}</p><div className="benefits-hero-actions" data-benefit-entrance><Button to={webinar.registrationDestination}>{copy.primary} – {webinar.ticketLabel}<ArrowUpRight size={16} aria-hidden="true" /></Button><Button variant="outline" href="#benefit-books">{copy.secondary}<ArrowDown size={16} aria-hidden="true" /></Button></div><p className="small-copy" data-benefit-entrance>{copy.note}</p></div><div className="benefits-hero-art" aria-hidden="true"><span className="benefits-art-orbit" /><span className="benefits-art-particle" /><span className="benefits-art-particle" /><span className="benefits-art-particle" /><div className="benefits-hero-book benefits-hero-book--back"><BookMockup book={books[1]} /></div><div className="benefits-hero-book benefits-hero-book--front"><BookMockup book={books[0]} /></div><GlassCard className="benefits-art-note"><Sparkles size={18} /><span>{copy.artLabel}<small>{copy.artNote}</small></span></GlassCard></div></Container></section>
}
