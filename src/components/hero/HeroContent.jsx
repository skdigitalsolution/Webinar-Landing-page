import Badge from '../ui/Badge.jsx'
import HeroCTA from './HeroCTA.jsx'

export default function HeroContent() {
  return <div className="hero-content"><div data-hero-text><Badge tone="gold"><span className="status-dot" />EXCLUSIVE LIVE WEBINAR</Badge></div><h1 className="heading-display home-headline" data-hero-text>Your Life Deserves More Than <span className="gradient-text">Just Success.</span></h1><p className="body-lead" data-hero-text>Explore a more balanced life through Health, Wealth, Relationships and Spiritual Bliss. Discover where you stand today and learn practical steps toward greater clarity.</p><HeroCTA /><p className="hero-note small-copy" data-hero-text><span className="note-line" />A moment to reflect. A new perspective to explore.</p></div>
}
