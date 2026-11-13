import { useEffect, useRef } from 'react'
import { Send, MessageCircle, BookOpen, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import Badge from '../ui/Badge.jsx'
import { benefitsCopy } from '../../data/webinarBonuses.js'

gsap.registerPlugin(ScrollTrigger)

export default function TelegramCommunity() {
  const copy = benefitsCopy.telegram
  const icons = [Sparkles, MessageCircle, BookOpen]
  const section = useRef(null)

  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.timeline({
          scrollTrigger: {
            trigger: section.current,
            start: 'top 82%',
            once: true,
          },
        })
          .fromTo('.community-concept', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .72, ease: 'power2.out' })
          .fromTo('.telegram-community-heading > .eyebrow', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: .55, ease: 'power2.out' }, '-=.32')
          .fromTo('#telegram-community-title', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .62, ease: 'power2.out' }, '-=.3')
          .fromTo('.telegram-community-heading > .body-copy', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: .55, ease: 'power2.out' }, '-=.32')
          .fromTo('.telegram-community-note', { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: .5, ease: 'power2.out' }, '-=.25')
          .fromTo('.telegram-community-status', { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: .5, ease: 'power2.out' }, '-=.25')
      }, section)
      return () => context.revert()
    })
    return () => media.revert()
  }, [])

  return <section ref={section} className="benefits-section telegram-community" id="telegram-community" aria-labelledby="telegram-community-title"><Container className="benefit-resource-grid"><GlassCard className="community-concept"><div className="community-concept-art" aria-hidden="true"><span className="community-orbit"><span className="community-orbit-rotator" /></span><span className="community-symbol"><span className="community-icon"><Send size={44} /></span></span>{copy.visualLabels.map((label, index) => { const Icon = icons[index]; return <span key={label} className={`community-floating-label community-floating-label--${index}`}><Icon size={15} />{label}</span> })}</div><h3 className="heading-card">{copy.visualTitle}</h3><p className="small-copy">{copy.visualNote}</p></GlassCard><div className="telegram-community-copy"><SectionHeading className="telegram-community-heading" eyebrow={copy.eyebrow} id="telegram-community-title" title={copy.title} description={copy.description} /><p className="bonus-condition-note telegram-community-note">{copy.note}</p><div className="telegram-community-status"><Badge tone="cyan">{copy.status}</Badge></div></div></Container></section>
}
