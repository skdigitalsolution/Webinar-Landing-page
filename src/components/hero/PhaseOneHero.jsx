import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CheckCircle2, Play, X, HeartPulse, Coins, Users, Sparkles } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import LotusMark from '../ui/LotusMark.jsx'
import WebinarFacts from '../ui/WebinarFacts.jsx'
import CircleExperience from './CircleOfLife.jsx'
import PremiumVideo from '../media/PremiumVideo.jsx'
import { webinar } from '../../data/webinar.js'
import './phase-one.css'

const pillars = [
  { id: 'health', name: 'Health', color: '#66ff9b', Icon: HeartPulse },
  { id: 'wealth', name: 'Wealth', color: '#ffc761', Icon: Coins },
  { id: 'relationships', name: 'Relationships', color: '#ee8bff', Icon: Users },
  { id: 'spiritual-bliss', name: 'Spiritual Bliss', color: '#b589ff', Icon: Sparkles },
]
const artwork = [
  ['1.jpeg', 'Approved promotional artwork'],
  ['2.jpeg', 'Health and AI promotional artwork'],
  ['4.jpeg', 'Circle of Life promotional artwork'],
]

export default function PhaseOneHero({ active, onSelect }) {
  const dialog = useRef(null)
  const trigger = useRef(null)
  const [mediaMounted, setMediaMounted] = useState(false)
  useEffect(() => {
    const modal = dialog.current
    const close = () => { modal.querySelector('video')?.pause(); setMediaMounted(false); trigger.current?.focus() }
    modal.addEventListener('close', close)
    return () => modal.removeEventListener('close', close)
  }, [])
  useEffect(() => {
    if (!mediaMounted) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [mediaMounted])
  const closeIntro = () => {
    dialog.current?.querySelector('video')?.pause()
    dialog.current?.close()
  }
  const showIntro = () => { setMediaMounted(true); dialog.current.showModal() }
  return <section id="home" className="phase-one-hero landing-target" tabIndex={-1} aria-labelledby="landing-title">
    <div className="hero-atmosphere" aria-hidden="true"><span className="hero-nebula"/><span className="hero-horizon"/><span className="hero-horizon-ridge"/></div>
    <Container>
      <div className="phase-one-grid">
        <div className="phase-one-copy">
          <span className="live-webinar" data-landing-entrance>LIVE ONLINE WEBINAR</span>
          <h1 id="landing-title" data-landing-entrance><span>Discover How AI Can</span> <span>Help You Build a</span> <em>Better Life.</em></h1>
          <p className="phase-one-description" data-landing-entrance>Explore practical ways to use AI for clearer goals, better habits and a more balanced life across Health, Wealth, Relationships and Spiritual Bliss.</p>
          <ul className="hero-benefits" data-landing-entrance>{['Understand your current situation', 'Identify your priorities', 'Explore practical AI-assisted planning', 'Find your next steps'].map(item => <li key={item}><CheckCircle2 size={17} aria-hidden="true"/>{item}</li>)}</ul>
          <div className="phase-one-actions" data-landing-entrance><Button href={webinar.paymentLink}>Join the Webinar – {webinar.ticketLabel}<ArrowRight size={20} aria-hidden="true"/></Button><button ref={trigger} className="intro-trigger" aria-haspopup="dialog" aria-controls="webinar-intro-dialog" onClick={showIntro}><span><Play size={16} fill="currentColor" aria-hidden="true"/></span>Watch 29-Sec Intro</button></div>
        </div>
        <div className="hero-life-visual">
          <CircleExperience activeDimension={active} onDimensionChange={onSelect} dimensionData={pillars} referenceHero showDescription={false} staticOnReducedMotion />
          <div className="life-title" aria-hidden="true"><LotusMark/><span>Circle<br/>of Life</span></div>
          <div className="life-nodes" role="group" aria-label="Circle of Life dimensions">{pillars.map(({ id, name, color, Icon }, index) => <button key={id} style={{ '--node-color': color }} aria-pressed={active === index} onPointerEnter={() => onSelect(index)} onFocus={() => onSelect(index)} onClick={() => onSelect(index)}><Icon size={29} aria-hidden="true"/><span>{name}</span></button>)}</div>
          <div className="ai-chip" aria-hidden="true">AI</div>
        </div>
        <figure className="hero-mentor">
          <div className="hero-portrait-frame hero-portrait-frame--professional"><span className="hero-mentor-halo" aria-hidden="true" /><img className="hero-mentor-photo" src={`${import.meta.env.BASE_URL}assets/webinar/Dr.%20Vaishnavi%20Jayawant.png`} alt="Dr. Vaishnavi Jayawant, Homoeopathy Doctor and Life Coach" width="1186" height="1327" decoding="async" /></div>
          <figcaption className="hero-mentor-authority"><svg className="hero-laurel hero-laurel--left" viewBox="0 0 24 72" fill="none" aria-hidden="true"><path d="M20 68C2 51 2 23 20 4" stroke="currentColor"/><path d="M13 57C2 58 1 49 4 45C11 44 15 49 13 57ZM9 41C0 40 1 31 5 28C12 30 13 35 9 41ZM12 24C4 20 8 12 13 11C19 16 18 21 12 24ZM15 60C15 50 21 46 24 48C25 55 21 60 15 60ZM10 43C11 35 17 32 20 35C19 41 16 44 10 43ZM13 26C16 20 21 20 23 23C21 28 17 29 13 26Z" fill="currentColor"/></svg><strong>Dr. Vaishnavi Jayawant</strong><p>Homoeopathy Doctor <span>│</span> Life Coach<br/>Author of Four Books</p><svg className="hero-laurel hero-laurel--right" viewBox="0 0 24 72" fill="none" aria-hidden="true"><path d="M20 68C2 51 2 23 20 4" stroke="currentColor"/><path d="M13 57C2 58 1 49 4 45C11 44 15 49 13 57ZM9 41C0 40 1 31 5 28C12 30 13 35 9 41ZM12 24C4 20 8 12 13 11C19 16 18 21 12 24ZM15 60C15 50 21 46 24 48C25 55 21 60 15 60ZM10 43C11 35 17 32 20 35C19 41 16 44 10 43ZM13 26C16 20 21 20 23 23C21 28 17 29 13 26Z" fill="currentColor"/></svg></figcaption>
        </figure>
      </div>
      <WebinarFacts className="phase-one-facts"/>
    </Container>
    <dialog ref={dialog} id="webinar-intro-dialog" className="intro-dialog" onCancel={event => { event.preventDefault(); closeIntro() }} aria-labelledby="intro-title" onClick={event => { if (event.target === dialog.current) closeIntro() }}><div className="intro-dialog-content"><div className="intro-dialog-heading"><h2 id="intro-title">Meet your mentor. Explore your circle.</h2><button aria-label="Close introduction" onClick={closeIntro} autoFocus><X size={24}/></button></div>{mediaMounted && <><PremiumVideo src={`${import.meta.env.BASE_URL}assets/webinar/3.mp4`}/><details className="client-artwork"><summary>Explore the client’s promotional artwork</summary><div>{artwork.map(([file, label]) => <a key={file} href={`${import.meta.env.BASE_URL}assets/webinar/${file}`} target="_blank" rel="noreferrer"><img src={`${import.meta.env.BASE_URL}assets/webinar/${file}`} alt={label} width="1280" height="1600" loading="lazy"/><span>{label}</span></a>)}</div></details></>}</div></dialog>
  </section>
}
