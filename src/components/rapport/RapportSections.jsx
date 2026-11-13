import { useEffect, useRef, useState } from 'react'
import { ArrowRight, BookOpen, Compass, HeartPulse, Coins, Users, Sparkles, Stethoscope, Video } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import Button from '../ui/Button.jsx'
import PremiumVideo from '../media/PremiumVideo.jsx'
import { rapportProblems, mentorAuthority } from '../../data/rapport.js'
import { mentor } from '../../data/mentor.js'
import { webinar } from '../../data/webinar.js'
import './rapport.css'

const problemIcons = [HeartPulse, Coins, Users, Sparkles]
const authorityIcons = [Stethoscope, Compass, BookOpen]

export function ProblemSection() {
  return <section id="problems" className="rapport-section rapport-problems landing-target" tabIndex={-1} aria-labelledby="problems-title">
    <Container>
      <div data-landing-reveal><SectionHeading eyebrow="DOES THIS SOUND FAMILIAR?" id="problems-title" title={<>Are You Working Hard but<br className="rapport-desktop-break"/> Still Feeling <span className="rapport-gold">Stuck in Life?</span></>} description="Sometimes life becomes so busy that we lose sight of what truly needs our attention. Explore the areas where greater clarity may help." align="center"/></div>
      <div className="rapport-problem-grid">{rapportProblems.map(({ id, title, question, color }, index) => {
        const Icon = problemIcons[index]
        return <GlassCard as="article" hover className="rapport-problem-card" key={id} style={{ '--rapport-accent': color }} data-landing-reveal>
          <span className="rapport-icon"><Icon size={27} strokeWidth={1.5} aria-hidden="true"/></span>
          <h3>{title}</h3><p>{question}</p>
        </GlassCard>
      })}</div>
    </Container>
  </section>
}

export function OriginalIntroductionVideo() {
  const host = useRef(null)
  const [nearby, setNearby] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNearby(true); observer.disconnect() }
    }, { rootMargin: '200px' })
    observer.observe(host.current)
    return () => observer.disconnect()
  }, [])
  return <section id="mentor-introduction" className="rapport-section rapport-video-section landing-target" ref={host} tabIndex={-1} aria-labelledby="mentor-video-title">
    <Container>
      <div className="rapport-video-intro" data-landing-reveal><span className="rapport-section-marker"><Video size={16} aria-hidden="true"/> A PERSONAL INTRODUCTION</span><SectionHeading id="mentor-video-title" title="A Message From Your Mentor." description="Discover the purpose behind the Circle of Life webinar and explore what this learning experience is designed to help you understand." align="center"/></div>
      <div className="rapport-video-frame" data-landing-reveal>
        {nearby ? <PremiumVideo src={`${import.meta.env.BASE_URL}assets/webinar/3.mp4`} label="A message from Dr. Vaishnavi Jayawant"/> : <div className="rapport-video-reserved" aria-label="Mentor introduction video"><Video size={38} aria-hidden="true"/><span>The introduction will load as you approach.</span></div>}
      </div>
      <p className="rapport-video-caption">29-second introduction <span aria-hidden="true">·</span> Watch at your own pace</p>
    </Container>
  </section>
}

export function MentorSection() {
  const portrait = mentor.portrait.approved && mentor.portrait.src
  return <section id="mentor" className="rapport-section rapport-mentor landing-target" tabIndex={-1} aria-labelledby="landing-mentor-title">
    <Container>
      <div className="rapport-mentor-grid">
        <figure className="rapport-mentor-artwork" data-landing-reveal>
          <div className="rapport-artwork-frame"><img src={portrait || `${import.meta.env.BASE_URL}${mentorAuthority.artwork}`} alt={portrait ? mentor.portrait.alt : 'Client-supplied Circle of Life promotional artwork featuring Dr. Vaishnavi Jayawant'} width={portrait ? 480 : 2047} height={portrait ? 600 : 2560} loading="lazy" decoding="async"/></div>
          <figcaption>{portrait ? 'Your webinar mentor' : 'Client-supplied Circle of Life artwork · shown in full'}</figcaption>
        </figure>
        <div className="rapport-mentor-copy">
          <div data-landing-reveal><SectionHeading eyebrow="MEET YOUR GUIDE" id="landing-mentor-title" title={<>Meet <span className="rapport-gold">{mentor.name}.</span></>} description={mentorAuthority.description}/></div>
          <ul className="rapport-credentials" aria-label="Client-provided credentials" data-landing-reveal>{mentorAuthority.credentials.map(credential => <li key={credential}>{credential}</li>)}</ul>
          {mentor.biography && <p className="body-copy rapport-bio" data-landing-reveal>{mentor.biography}</p>}
          <div className="rapport-author-highlight" data-landing-reveal><BookOpen size={30} strokeWidth={1.4} aria-hidden="true"/><div><span className="eyebrow">THE AUTHOR'S PERSPECTIVE</span><h3>Author of Four Books</h3></div></div>
          <div className="rapport-approach" data-landing-reveal><h3>The Circle of Life approach</h3><p className="body-copy">Explore Health, Wealth, Relationships and Spiritual Bliss together. Start with self-awareness, identify your priorities and consider your next steps.</p></div>
          <Button className="rapport-register" href={webinar.paymentLink} data-landing-reveal>Join the Webinar – {webinar.ticketLabel}<ArrowRight size={18} aria-hidden="true"/></Button>
        </div>
      </div>
      <div className="rapport-authority-grid">{mentorAuthority.credentials.map((credential, index) => {
        const Icon = authorityIcons[index]
        return <GlassCard as="article" hover className="rapport-authority-card" key={credential} data-landing-reveal><Icon size={25} strokeWidth={1.5} aria-hidden="true"/><h3>{credential}</h3></GlassCard>
      })}</div>
      <div className="rapport-bridge" data-landing-reveal><span className="rapport-bridge-line" aria-hidden="true"/><p>Before deciding where you want to go,<br/> understand where you stand today.</p><Button variant="outline" to="/#circle-of-life">Explore Your Circle of Life<ArrowRight size={18} aria-hidden="true"/></Button></div>
    </Container>
  </section>
}
