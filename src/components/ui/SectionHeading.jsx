export default function SectionHeading({ eyebrow, title, description, as: Heading = 'h2', align = 'left', className = '', id }) {
  return (
    <div className={`section-heading section-heading--${align} ${className}`.trim()}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Heading className="heading-section" id={id}>{title}</Heading>
      {description && <p className="body-copy">{description}</p>}
    </div>
  )
}
