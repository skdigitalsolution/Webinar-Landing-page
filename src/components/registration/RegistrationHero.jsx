import Container from '../ui/Container.jsx'
import Badge from '../ui/Badge.jsx'
import WebinarFacts from '../ui/WebinarFacts.jsx'

export default function RegistrationHero() {
  return <section className="registration-hero" aria-labelledby="registration-page-title"><Container><div data-register-entrance><Badge tone="gold"><span className="status-dot" />RESERVE YOUR PLACE</Badge></div><h1 className="heading-display" id="registration-page-title" data-register-entrance>Your Journey Toward<br /><span className="gradient-text">Greater Clarity Begins Here.</span></h1><p className="body-lead" data-register-entrance>Join the Circle of Life webinar and explore a structured approach to understanding your priorities across Health, Wealth, Relationships and Spiritual Bliss.</p><p className="registration-demo-banner" id="registration-demo-notice" data-register-entrance><strong>Demo-only registration preview.</strong> Live registration and payments are not open. Use fictional sample details only. Approved Terms and Privacy Policy are not yet available.</p><WebinarFacts /></Container></section>
}
