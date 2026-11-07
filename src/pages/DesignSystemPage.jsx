import { useState } from 'react'
import { ArrowDown, ArrowUpRight, Check, Layers3, Sparkles } from 'lucide-react'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'
import GlassCard from '../components/ui/GlassCard.jsx'
import InputField from '../components/ui/InputField.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'

const colors = [
  ['Midnight', '#070817', 'bg-primary'], ['Deep navy', '#10112B', 'bg-secondary'],
  ['Surface', '#171932', 'bg-surface'], ['Violet', '#8855FF', 'accent-violet'],
  ['Cyan', '#38DDF5', 'accent-cyan'], ['Gold', '#D6B46A', 'accent-gold'],
  ['White', '#FFFFFF', 'text-primary'], ['Muted', '#A4A6BC', 'text-secondary'],
]

function PreviewSection({ number, title, description, id, children }) {
  return <section className="preview-section" aria-labelledby={id}><div className="preview-section-intro"><span className="section-number">{number}</span><SectionHeading id={id} title={title} description={description} /></div>{children}</section>
}

export default function DesignSystemPage() {
  const [pressed, setPressed] = useState(false)
  const [name, setName] = useState('')
  return (
    <div className="cosmic-background">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Container>
          <section className="preview-intro motion-enter">
            <div className="preview-meta"><Badge tone="gold"><span className="status-dot" />Design foundation</Badge><span className="small-copy">V.01 / PHASE 2B</span></div>
            <p className="eyebrow intro-eyebrow">VAILYF AI · UI / UX SYSTEM</p>
            <h1 className="heading-display">A little cosmic.<br /><span className="gradient-text">Entirely intentional.</span></h1>
            <p className="body-lead">The visual language of VAILYF AI. A considered collection of color, type and components, built to bring every future screen together.</p>
            <div className="intro-bottom"><a className="text-link" href="#palette">Explore the foundations <ArrowDown size={16} aria-hidden="true" /></a><span className="small-copy">Internal preview · No live registration</span></div>
          </section>

          <PreviewSection number="01" id="palette" title="Color, with purpose." description="Midnight foundations. Luminous accents. A signature touch of gold.">
            <div className="swatch-grid">{colors.map(([name, hex, token]) => <div className="swatch" key={token}><div className="swatch-color" style={{ background: `var(--${token})` }} /><div className="swatch-info"><h3>{name}</h3><span>{hex}</span></div><code>--{token}</code></div>)}</div>
            <p className="small-copy section-note">White and muted text sit on dark surfaces. Gold and cyan use dark ink; violet buttons use a deeper shade for readable white labels.</p>
          </PreviewSection>

          <PreviewSection number="02" id="typography" title="Quiet confidence. Clear hierarchy." description="Sora for expression. Inter for clarity. One coherent rhythm across every screen.">
            <GlassCard className="type-specimen"><div className="specimen-row"><span className="specimen-label">DISPLAY / SORA</span><p className="heading-display">Find your <span className="gradient-text">balance.</span></p></div><div className="specimen-row"><span className="specimen-label">HEADING / SORA</span><h3 className="heading-section">A new perspective.</h3></div><div className="specimen-row"><span className="specimen-label">BODY / INTER</span><p className="body-copy">Room to breathe. Space to reflect. Thoughtful typography makes every idea easier to explore.</p></div><div className="specimen-row"><span className="specimen-label">EYEBROW / INTER</span><p className="eyebrow">SMALL DETAILS. LASTING IMPRESSION.</p></div></GlassCard>
          </PreviewSection>

          <PreviewSection number="03" id="buttons" title="Make the next step clear." description="Distinct actions, tactile feedback and a visible focus state.">
            <GlassCard><div className="button-grid"><div><p className="specimen-label">PRIMARY / GOLD</p><Button onClick={() => setPressed(!pressed)} aria-pressed={pressed}>{pressed ? 'Preview selected' : 'Try primary action'}{pressed ? <Check size={16} aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}</Button></div><div><p className="specimen-label">SECONDARY / VIOLET</p><Button variant="secondary" href="#cards">Explore cards <ArrowUpRight size={16} aria-hidden="true" /></Button></div><div><p className="specimen-label">OUTLINE</p><Button variant="outline" href="#fields">View inputs <ArrowDown size={16} aria-hidden="true" /></Button></div><div><p className="specimen-label">DISABLED</p><Button disabled>Not available yet</Button></div></div><p className="small-copy section-note" aria-live="polite">{pressed ? 'Preview action selected. No information was submitted.' : 'These actions demonstrate component states only.'}</p></GlassCard>
          </PreviewSection>

          <PreviewSection number="04" id="cards" title="Depth without distraction." description="Soft glass surfaces, fine borders and just enough light.">
            <div className="card-grid"><GlassCard className="sample-card"><span className="icon-tile"><Layers3 size={22} aria-hidden="true" /></span><Badge>Default surface</Badge><h3 className="heading-card">A place for every idea.</h3><p className="body-copy">A calm, reusable surface for content. Designed to work alone or as part of a responsive grid.</p><span className="card-footnote">STATIC / GLASS</span></GlassCard><GlassCard hover className="sample-card"><span className="icon-tile icon-tile--cyan"><Sparkles size={22} aria-hidden="true" /></span><Badge tone="cyan">Hover enabled</Badge><h3 className="heading-card">A subtle sense of lift.</h3><p className="body-copy">Hover this card to preview a gentle lift and border glow. Decorative surfaces remain non-interactive.</p><span className="card-footnote">HOVER / ELEVATION</span></GlassCard><GlassCard className="sample-card sample-card--gold"><span className="eyebrow">DETAILS THAT CONNECT</span><h3 className="heading-card">Small signals.<br />Clear meaning.</h3><p className="body-copy">Understated badges bring context without competing with the message.</p><div className="badge-row"><Badge>Neutral</Badge><Badge tone="violet">Violet</Badge><Badge tone="cyan">Cyan</Badge><Badge tone="gold">Gold</Badge></div></GlassCard></div>
          </PreviewSection>

          <PreviewSection number="05" id="fields" title="Every interaction considered." description="Clear labels, useful guidance and errors that explain what to do next.">
            <GlassCard><div className="field-grid"><InputField label="Your name" placeholder="Enter your name" autoComplete="off" value={name} onChange={event => setName(event.target.value)} hint="Preview only. Nothing is saved or sent." /><InputField label="Email address" type="email" defaultValue="not-an-email" error="Enter a valid email address, for example name@example.com." hint="Example error state — not a registration form." /><InputField label="Unavailable field" placeholder="Coming in a later phase" disabled hint="Disabled state" /></div></GlassCard>
          </PreviewSection>

          <PreviewSection number="06" id="composition" title="Designed to fit together." description="Shared containers and spacing scale gracefully from desktop to mobile.">
            <GlassCard className="composition-preview"><Badge tone="gold">Section heading component</Badge><SectionHeading eyebrow="A SHARED VISUAL FOUNDATION" title={<>One language.<br /><span className="gradient-text">Many possibilities.</span></>} description="Reusable building blocks for the nine planned screens. The website content, 3D scene and registration experience will follow in later approved phases." align="center" /><div className="spacing-samples" aria-label="Spacing scale"><span>8 px</span><span>16 px</span><span>24 px</span><span>32 px</span><span>48 px</span></div></GlassCard>
          </PreviewSection>
          <p className="preview-disclaimer">Visual reference image not supplied. This foundation follows the documented palette and direction; final alignment awaits the approved image. Navigation marked “planned” and registration are not yet available.</p>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
