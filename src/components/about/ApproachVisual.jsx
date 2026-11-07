import { useState } from 'react'
import { dimensions } from '../../data/dimensions.js'
import { mentorDimensions } from '../../data/mentor.js'

export default function ApproachVisual() {
  const [active, setActive] = useState(0)
  return (
    <div className="approach-visual">
      <div className="approach-map" role="group" aria-label="Explore the connected life dimensions">
        <svg className="approach-connections" viewBox="0 0 500 430" aria-hidden="true"><defs><linearGradient id="approach-line"><stop stopColor="#8855FF" /><stop offset="1" stopColor="#38DDF5" /></linearGradient></defs><ellipse cx="250" cy="215" rx="160" ry="145" /><ellipse cx="250" cy="215" rx="120" ry="110" />{[[250,55],[415,215],[250,375],[85,215]].map(([x,y], index) => <line key={index} x1="250" y1="215" x2={x} y2={y} className={active === index ? 'is-active' : ''} style={{ '--dimension-color': dimensions[index].color }} />)}</svg>
        <div className="approach-map-core" aria-hidden="true"><span>YOUR</span><strong>Circle<br />of Life</strong><span className="core-gold-dot" /></div>
        {dimensions.map((dimension, index) => <button key={dimension.id} className={`approach-node approach-node--${index}`} aria-pressed={active === index} aria-controls="approach-description" style={{ '--dimension-color': dimension.color }} onPointerEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}><span className="approach-node-dot" />{dimension.name}</button>)}
      </div>
      <div className="approach-description" id="approach-description"><span className="eyebrow" style={{ color: dimensions[active].color }}>{dimensions[active].name}</span><p className="body-copy">{mentorDimensions[active].description}</p></div>
      <p className="small-copy approach-hint">Hover, tap or tab between the four dimensions.</p>
    </div>
  )
}
