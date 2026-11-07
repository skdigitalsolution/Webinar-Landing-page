import { Orbit } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import { benefitsCopy } from '../../data/webinarBonuses.js'

export function BookMockup({ book }) {
  return <div className="book-float"><div className="book-object" style={{ '--book-color': book.color, '--book-cover': book.coverColor }} aria-hidden="true"><div className="book-pages" /><div className="book-front">{book.coverApproved && book.cover ? <img src={book.cover} alt="" width="360" height="510" /> : <><span className="book-cover-brand">VAILYF AI</span><span className="book-cover-line" /><Orbit className="book-cover-symbol" size={42} /><span className="book-cover-title">{book.title}</span><span className="book-cover-label">{benefitsCopy.books.coverLabel}</span></>}</div></div></div>
}

export default function BookCard3D({ book, index }) {
  const illustrative = !book.coverApproved || !book.cover
  return <GlassCard as="article" className="bonus-book-card" data-benefit-reveal style={{ '--book-color': book.color, '--book-delay': `${index * -.9}s` }}><figure><BookMockup book={book} /><figcaption>{illustrative ? benefitsCopy.books.placeholder : 'Organizer-approved cover'}</figcaption></figure><h3 className="heading-card">{book.title}</h3><p className="body-copy">{book.description}</p></GlassCard>
}
