import { ArrowDown, ArrowUpRight, Compass, Focus, Layers3, Users, Sparkles } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import WebinarFacts from '../ui/WebinarFacts.jsx'
import CircleExperience from '../hero/CircleOfLife.jsx'
import { dimensionIcons } from '../circle-of-life/LifeDimensionCard.jsx'
import DimensionDetailPanel from '../circle-of-life/DimensionDetailPanel.jsx'
import Assessment from '../../pages/Assessment.jsx'
import Register from '../../pages/Register.jsx'
import LearningOutcomes from '../learning/LearningOutcomes.jsx'
import WebinarTimeline from '../learning/WebinarTimeline.jsx'
import WhyDifferent from '../learning/WhyDifferent.jsx'
import LearningPreview from '../learning/LearningPreview.jsx'
import MentorPortrait from '../about/MentorPortrait.jsx'
import MentorProfile from '../about/MentorProfile.jsx'
import PhilosophySection from '../about/PhilosophySection.jsx'
import BookShowcase from '../benefits/BookShowcase.jsx'
import WhatsAppLearning from '../benefits/WhatsAppLearning.jsx'
import TelegramCommunity from '../benefits/TelegramCommunity.jsx'
import BenefitsOverview from '../benefits/BenefitsOverview.jsx'
import RegistrationFAQ from '../registration/RegistrationFAQ.jsx'
import { lifeDimensions } from '../../data/lifeDimensions.js'
import { problemThemes, pillarDescriptions } from '../../data/landing.js'
import { mentor } from '../../data/mentor.js'
import { webinar } from '../../data/webinar.js'
import useMediaQuery from '../../hooks/useMediaQuery.js'

export function HeroSection({ active, onSelect }) {
  return <section id="home" className="landing-hero landing-target" tabIndex={-1} aria-labelledby="landing-title"><Container><div className="landing-hero-grid"><div className="landing-hero-copy"><div data-landing-entrance><Badge tone="gold"><span className="status-dot" />EXCLUSIVE LIVE WEBINAR</Badge></div><h1 id="landing-title" className="heading-display" data-landing-entrance>Circle <span className="gradient-text">of Life</span></h1><p className="landing-subheadline" data-landing-entrance>A Practical Framework for a More Balanced and Fulfilling Life.</p><p className="body-lead" data-landing-entrance>Explore Health, Wealth, Relationships and Spiritual Bliss through a structured webinar designed to help you understand your priorities, reflect on your current life and gain clarity about your next steps.</p><div className="landing-hero-actions" data-landing-entrance><Button to={webinar.registrationDestination}>Reserve Your Place – {webinar.ticketLabel}<ArrowUpRight size={16} aria-hidden="true" /></Button><Button variant="outline" to="/#circle-of-life">Explore the Circle of Life<ArrowDown size={16} aria-hidden="true" /></Button></div><p className="small-copy landing-hero-note">Registration preview available · payments pending integration</p></div><CircleExperience activeDimension={active} onDimensionChange={onSelect} dimensionData={lifeDimensions} enhanced staticOnReducedMotion /></div><WebinarFacts /></Container></section>
}

export function ProblemSection() {
  const icons = [Compass, Focus, Layers3, Users, Sparkles]
  return <section id="problems" className="landing-section landing-target" tabIndex={-1} aria-labelledby="problems-title"><Container><SectionHeading eyebrow="A MOMENT TO PAUSE" id="problems-title" title="Are You Truly Living a Balanced Life?" description="You do not need to have everything figured out. These everyday themes can be a starting point for reflection." align="center" /><div className="problem-grid">{problemThemes.map((theme,index)=>{const Icon=icons[index];return <GlassCard as="article" hover key={theme.title} className="problem-card" data-landing-reveal><Icon size={23} aria-hidden="true" /><h3 className="heading-card">{theme.title}</h3><p className="body-copy">{theme.description}</p></GlassCard>})}</div><div className="landing-centered-action"><Button variant="outline" to="/#assessment">Discover Your Life Balance<ArrowDown size={16} aria-hidden="true" /></Button></div></Container></section>
}

export function CircleOfLifeSection({ active, onSelect }) {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  return <section id="circle-of-life" className="landing-section landing-target circle-page" tabIndex={-1} aria-labelledby="pillars-title"><Container><SectionHeading eyebrow="FOUR DIMENSIONS. ONE YOU." id="pillars-title" title="The Four Pillars of a Fulfilling Life" description="Select a pillar to see everyday examples and questions for reflection." /><div className="landing-pillars-grid">{lifeDimensions.map((dimension,index)=>{const Icon=dimensionIcons[index];return <GlassCard as="article" hover key={dimension.id} className={`landing-pillar ${active===index?'is-selected':''}`} style={{'--dimension-color':dimension.color}} data-landing-reveal><Icon size={25} aria-hidden="true" /><h3 className="heading-card">{dimension.name}</h3><p className="body-copy">{pillarDescriptions[index]}</p><button onClick={()=>onSelect(index)} aria-pressed={active===index} aria-controls="life-dimension-detail">Explore {dimension.name}<span aria-hidden="true">↗</span></button></GlassCard>})}</div><div className="landing-pillar-detail"><DimensionDetailPanel dimension={lifeDimensions[active]} index={active} reduced={reduced} /></div></Container></section>
}

export function AssessmentSection() {
  return <section id="assessment" className="landing-section landing-target" tabIndex={-1} aria-labelledby="landing-assessment-title"><Container><SectionHeading eyebrow="A SIMPLE PERSONAL REFLECTION EXERCISE" id="landing-assessment-title" title="Where Do You Stand Today?" description="Take a few moments to reflect on four important areas of your life. This is a self-reflection exercise, not a scientifically validated or diagnostic assessment." /></Container><Assessment embedded /></section>
}

export function LearningSection() {
  return <section id="learning" className="landing-section landing-target learning-page" tabIndex={-1} aria-label="What you will learn"><LearningOutcomes title="What Will You Learn in This Webinar?" /><WebinarTimeline /><WhyDifferent /><LearningPreview /><div className="landing-centered-action"><Button to={webinar.registrationDestination}>Register Now – {webinar.ticketLabel}</Button></div></section>
}

export function MentorSection() {
  return <section id="mentor" className="landing-section landing-target about-page" tabIndex={-1} aria-labelledby="landing-mentor-title"><Container className="landing-mentor-intro"><div data-landing-reveal><SectionHeading eyebrow="MEET YOUR MENTOR" id="landing-mentor-title" title={`Meet ${mentor.name}`} description={mentor.introduction} /><p className="body-copy">A thoughtful space for self-reflection, goal clarity and meaningful improvement.</p></div><MentorPortrait /></Container><MentorProfile showIntroduction={false} /><PhilosophySection /></section>
}

export function BenefitsSection() {
  return <section id="benefits" className="landing-section landing-target benefits-page" tabIndex={-1} aria-labelledby="landing-benefits-title"><Container><SectionHeading eyebrow="RESOURCES TO KEEP LEARNING" id="landing-benefits-title" title="Your Learning Experience Goes Beyond the Session." description="Final ticket inclusions, delivery format, eligibility and access conditions are pending approval." /></Container><BookShowcase /><WhatsAppLearning /><TelegramCommunity /><BenefitsOverview /><div className="landing-centered-action"><Button to={webinar.registrationDestination}>Register Now – {webinar.ticketLabel}</Button></div></section>
}

export function RegistrationSection() {
  return <section id="register" className="landing-section landing-target" tabIndex={-1} aria-labelledby="landing-register-title"><Container><SectionHeading eyebrow="YOUR NEXT STEP" id="landing-register-title" title="Reserve Your Place in the Circle of Life Webinar." description="Explore the ₹199 webinar ticket and registration preview below." /><p className="registration-demo-banner" id="registration-demo-notice"><strong>Demo-only registration preview.</strong> Payments and live registration are not open. Use fictional sample details only. Approved Terms and Privacy Policy are still pending.</p></Container><Register embedded /></section>
}

export function FAQSection() {
  return <section id="faq" className="landing-section landing-target" tabIndex={-1} aria-label="Webinar questions and answers"><RegistrationFAQ /></section>
}

export function FinalCTA() {
  return <section className="landing-final-cta" aria-labelledby="final-cta-title"><Container><GlassCard className="landing-final-panel" data-landing-reveal><SectionHeading eyebrow="A NEW PERSPECTIVE STARTS WITH YOU" id="final-cta-title" title="Take the Next Step Toward Greater Balance and Clarity." description="Start by understanding where you are today and exploring the direction you want your life to take." align="center" /><Button to={webinar.registrationDestination}>Register Now – {webinar.ticketLabel}<ArrowUpRight size={16} aria-hidden="true" /></Button><p className="small-copy">Registration preview only · payment integration pending</p></GlassCard></Container></section>
}

