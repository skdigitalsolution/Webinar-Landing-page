import { Link } from 'react-router-dom'
import Container from '../ui/Container.jsx'
import { navigation } from '../../data/navigation.js'

export default function Footer() {
  const links = [...navigation, {label:'Meet Your Mentor',to:'/#mentor',id:'mentor'}, {label:'Registration',to:'/#register',id:'register'}]
  return <footer className="site-footer"><Container><div className="footer-grid"><div><Link className="brand" to="/#home">VAILYF <span className="brand-ai">AI</span></Link><p className="body-copy footer-description">A space to explore life balance and intentional growth.</p></div><div><h2 className="footer-label">Explore</h2><nav className="footer-nav" aria-label="Footer navigation">{links.map(item=><Link key={item.id} to={item.to}>{item.label}</Link>)}</nav></div><div><h2 className="footer-label">Stay connected</h2><p className="body-copy">Contact details pending confirmation.</p><p className="small-copy">Email and social channels will appear once approved.</p></div></div><div className="footer-bottom"><span className="small-copy">© 2026 VAILYF AI</span><div className="footer-legal"><span aria-disabled="true">Privacy Policy <small>Pending</small></span><span aria-disabled="true">Terms <small>Pending</small></span></div></div></Container></footer>
}
