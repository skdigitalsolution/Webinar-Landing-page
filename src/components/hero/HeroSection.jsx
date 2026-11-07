import Container from '../ui/Container.jsx'
import HeroContent from './HeroContent.jsx'
import CircleOfLife from './CircleOfLife.jsx'

export default function HeroSection() {
  return <section className="home-hero" aria-label="VAILYF AI live webinar"><Container className="hero-grid"><HeroContent /><CircleOfLife /></Container><Container className="hero-bottom-line"><span>LIVE WITH INTENTION.</span><span>BALANCE BEGINS WITH AWARENESS.</span></Container></section>
}
