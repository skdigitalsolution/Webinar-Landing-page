import { Send, MessageCircle, BookOpen, Sparkles } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import Badge from '../ui/Badge.jsx'
import { benefitsCopy } from '../../data/webinarBonuses.js'

export default function TelegramCommunity() {
  const copy = benefitsCopy.telegram
  const icons = [Sparkles, MessageCircle, BookOpen]
  return <section className="benefits-section telegram-community" aria-labelledby="telegram-community-title"><Container className="benefit-resource-grid"><GlassCard className="community-concept" data-benefit-reveal><div className="community-concept-art" aria-hidden="true"><span className="community-orbit" /><span className="community-symbol"><Send size={44} /></span>{copy.visualLabels.map((label, index) => { const Icon = icons[index]; return <span key={label} className={`community-floating-label community-floating-label--${index}`}><Icon size={15} />{label}</span> })}</div><h3 className="heading-card">{copy.visualTitle}</h3><p className="small-copy">{copy.visualNote}</p></GlassCard><div data-benefit-reveal><SectionHeading eyebrow={copy.eyebrow} id="telegram-community-title" title={copy.title} description={copy.description} /><p className="bonus-condition-note">{copy.note}</p><Badge tone="cyan">{copy.status}</Badge></div></Container></section>
}
