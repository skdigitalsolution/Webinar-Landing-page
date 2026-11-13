import { ArrowDown, ArrowUpRight } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import WebinarFacts from '../ui/WebinarFacts.jsx'
import CircleExperience from '../hero/CircleOfLife.jsx'
import Assessment from '../../pages/Assessment.jsx'
import LearningOutcomes from '../learning/LearningOutcomes.jsx'
import WebinarTimeline from '../learning/WebinarTimeline.jsx'
import WhyDifferent from '../learning/WhyDifferent.jsx'
import LearningDimensions from './LearningDimensions.jsx'
import LearningRegistrationCTA from './LearningRegistrationCTA.jsx'
import './phase-five.css'
import './phase-six.css'
import BookShowcase from '../benefits/BookShowcase.jsx'
import WhatsAppLearning from '../benefits/WhatsAppLearning.jsx'
import TelegramCommunity from '../benefits/TelegramCommunity.jsx'
import RegistrationFAQ from '../registration/RegistrationFAQ.jsx'
import { lifeDimensions } from '../../data/lifeDimensions.js'
import { webinar } from '../../data/webinar.js'

export function HeroSection({ active, onSelect }) {
  return <section id="home" className="landing-hero landing-target" tabIndex={-1} aria-labelledby="landing-title"><Container><div className="landing-hero-grid"><div className="landing-hero-copy"><div data-landing-entrance><Badge tone="gold"><span className="status-dot" />EXCLUSIVE LIVE WEBINAR</Badge></div><h1 id="landing-title" className="heading-display" data-landing-entrance>Circle <span className="gradient-text">of Life</span></h1><p className="landing-subheadline" data-landing-entrance>A Practical Framework for a More Balanced and Fulfilling Life.</p><p className="body-lead" data-landing-entrance>Explore Health, Wealth, Relationships and Spiritual Bliss through a structured webinar designed to help you understand your priorities, reflect on your current life and gain clarity about your next steps.</p><div className="landing-hero-actions" data-landing-entrance><Button href={webinar.paymentLink}>Reserve Your Place – {webinar.ticketLabel}<ArrowUpRight size={16} aria-hidden="true" /></Button><Button variant="outline" to="/#circle-of-life">Explore the Circle of Life<ArrowDown size={16} aria-hidden="true" /></Button></div><p className="small-copy landing-hero-note">Continue to Razorpay to complete your payment.</p></div><CircleExperience activeDimension={active} onDimensionChange={onSelect} dimensionData={lifeDimensions} enhanced staticOnReducedMotion /></div><WebinarFacts /></Container></section>
}

export { ProblemSection, MentorSection } from '../rapport/RapportSections.jsx'

export { default as CircleOfLifeSection } from './FourPillarsSection.jsx'

export function AssessmentSection() {
  return <section id="assessment" className="landing-section landing-target" tabIndex={-1} aria-labelledby="landing-assessment-title"><Container><SectionHeading eyebrow="A SIMPLE PERSONAL REFLECTION EXERCISE" id="landing-assessment-title" title="Where Are You Today?" description="Take a short self-reflection exercise to explore your current satisfaction across four important areas of life." /></Container><Assessment embedded /></section>
}

export function LearningSection() {
  return <section id="learning" className="landing-section landing-target learning-page phase-five-learning" tabIndex={-1} aria-label="What you will learn"><LearningOutcomes/><LearningDimensions/><WebinarTimeline/><WhyDifferent/></section>
}


export function BenefitsSection() {
  return <section id="benefits" className="landing-target benefits-page phase-five-benefits" tabIndex={-1} aria-labelledby="book-showcase-title"><BookShowcase/><WhatsAppLearning/><TelegramCommunity/><LearningRegistrationCTA/></section>
}

export function RegistrationSection() {
  return <section id="register" className="landing-section landing-target phase-six-registration" tabIndex={-1} aria-labelledby="landing-register-title"><Container><SectionHeading eyebrow="YOUR NEXT STEP" id="landing-register-title" title="Reserve Your Place in the Circle of Life Webinar." description="Join an expert-guided session to reflect on your life priorities, explore how AI-assisted planning may support your goals and discover practical next steps." /><Button href={webinar.paymentLink}>Register Now ? {webinar.ticketLabel}<ArrowUpRight size={16} aria-hidden="true" /></Button><p className="small-copy">Continue to the existing Razorpay checkout. Review the details there before paying.</p></Container></section>
}

export function FAQSection() {
  return <section id="faq" className="landing-section landing-target" tabIndex={-1} aria-label="Webinar questions and answers"><RegistrationFAQ /></section>
}

export function FinalCTA() {
  return <section id="final-cta" tabIndex={-1} className="landing-final-cta landing-target phase-six-final" aria-labelledby="final-cta-title"><Container><GlassCard className="landing-final-panel" data-landing-reveal><SectionHeading eyebrow="A NEW PERSPECTIVE STARTS WITH YOU" id="final-cta-title" title="Take the Next Step Toward Greater Balance and Clarity." description="Start by understanding your current situation, exploring your priorities and discovering how AI-assisted planning may support your next steps." align="center" /><Button href={webinar.paymentLink}>Register Now – {webinar.ticketLabel}<ArrowUpRight size={16} aria-hidden="true" /></Button><p className="small-copy">Continue to Razorpay to complete your payment.</p></GlassCard></Container></section>
}
