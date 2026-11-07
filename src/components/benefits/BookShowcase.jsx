import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import BookCard3D from './BookCard3D.jsx'
import { books, benefitsCopy } from '../../data/webinarBonuses.js'

export default function BookShowcase() {
  const copy = benefitsCopy.books
  return <section className="benefits-section book-showcase" id="benefit-books" aria-labelledby="book-showcase-title"><Container><div data-benefit-reveal><SectionHeading eyebrow={copy.eyebrow} id="book-showcase-title" title={copy.title} description={copy.description} /><p className="bonus-condition-note">{copy.conditions}</p></div><div className="bonus-book-grid">{books.map((book, index) => <BookCard3D key={book.id} book={book} index={index} />)}</div><p className="small-copy book-illustration-disclaimer">{copy.disclaimer}</p></Container></section>
}
