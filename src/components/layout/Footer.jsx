import { Link } from 'react-router-dom'
import Container from '../ui/Container.jsx'
import LotusMark from '../ui/LotusMark.jsx'
import { navigation } from '../../data/navigation.js'
import { registrationConfig } from '../../data/registration.js'

export default function Footer(){
  const links=[...navigation,{label:'Registration',to:'/#register',id:'register'}]
  const policies=[{label:'Privacy Policy',...registrationConfig.privacy},{label:'Terms and Conditions',...registrationConfig.terms}]
  const contact=registrationConfig.support
  return <footer className="site-footer phase-six-footer"><Container><div className="footer-grid"><div><Link className="brand footer-brand" to="/#home" aria-label="VAILYF AI home"><LotusMark/><span>VAILYF AI</span></Link><p className="footer-tagline">Life • Clarity • Balance</p><p className="body-copy footer-description">A space for self-awareness, life balance and intentional next steps.</p></div><div><h2 className="footer-label">Explore</h2><nav className="footer-nav" aria-label="Footer navigation">{links.map(item=><Link key={item.id} to={item.to}>{item.label}</Link>)}</nav></div>{contact?.approved&&contact?.href&&contact?.label&&<div><h2 className="footer-label">Contact</h2><a href={contact.href}>{contact.label}</a></div>}</div><div className="footer-bottom"><span className="small-copy">© 2026 VAILYF AI</span><div className="footer-legal">{policies.map(policy=>policy.approved&&policy.url?<a key={policy.label} href={policy.url}>{policy.label}</a>:<span key={policy.label}>{policy.label}<small>Pending approval</small></span>)}</div></div></Container></footer>
}
