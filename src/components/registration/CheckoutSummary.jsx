import { motion } from 'framer-motion'
import GlassCard from '../ui/GlassCard.jsx'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import { webinar } from '../../data/webinar.js'
import { registrationConfig } from '../../data/registration.js'

export default function CheckoutSummary({ preview, reduced }) {
  return <GlassCard as="section" className="registration-checkout-summary" id="registration-summary" tabIndex={-1} aria-labelledby="registration-summary-title" data-register-reveal><div className="checkout-summary-heading"><p className="eyebrow">A TRANSPARENT OVERVIEW</p><h2 className="heading-card" id="registration-summary-title">Registration summary</h2><Badge tone={preview ? 'gold' : 'neutral'}>{preview ? 'Validated demo preview' : 'Ticket overview · form not validated'}</Badge></div><dl className="checkout-line-items"><div><dt>Product</dt><dd>{registrationConfig.productName}</dd></div><div><dt>Ticket</dt><dd>{webinar.ticketLabel}</dd></div><div><dt>Quantity</dt><dd>{registrationConfig.quantity}</dd></div><div className="checkout-total"><dt>Total</dt><dd>{webinar.ticketLabel}</dd></div></dl><p className="checkout-event">{webinar.dateLabel}<br />{webinar.timeLabel}<br />{webinar.locationLabel}</p>{preview && <motion.div className="validated-demo-note" role="status" initial={reduced ? false : { opacity: .4, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .2 }}><strong>Demo form validated in this browser.</strong><p>No registration or payment was created. No personal details are included in this summary or sent anywhere.</p></motion.div>}<div className="payment-status" data-payment-status="unavailable"><Button disabled>Proceed to Payment – {webinar.ticketLabel}</Button><p className="small-copy">Payment integration pending.</p><p className="small-copy">Checkout is unavailable. This preview cannot reserve a seat, charge a payment or issue a receipt.</p></div><p className="small-copy registration-support">Support contact · pending confirmation</p></GlassCard>
}

