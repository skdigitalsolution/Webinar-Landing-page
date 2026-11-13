import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import DimensionSlider from '../assessment/DimensionSlider.jsx'
import LifeBalanceChart from '../assessment/LifeBalanceChart.jsx'
import { assessmentDimensions } from '../../data/assessmentDimensions.js'

export default function CurrentDesiredComparison({ currentSummary, desiredSummary, comparison, desired, reviewed, onChange, priorities, onTogglePriority, onReview, reduced }) {
  return <section id="assessment-comparison" className="assessment-section current-desired-comparison" aria-labelledby="comparison-title" tabIndex={-1}><Container>
    <div data-assessment-reveal><SectionHeading eyebrow="A DIRECTION YOU CHOOSE" id="comparison-title" title="Where You Are vs Where You Want to Be." description="Choose desired ratings that feel meaningful to you. These are personal aspirations, not forecasts or promised outcomes. Each desired slider starts at a clearly marked default of 5, not a recommended target."/></div>
    <div className="assessment-workspace comparison-workspace"><div><div className="rating-card-grid">{assessmentDimensions.map((dimension,index)=><DimensionSlider key={dimension.id} dimension={dimension} index={index} kind="desired" value={desired[dimension.id]} reviewed={!!reviewed[dimension.id]} onChange={onChange}/>)}</div></div><aside className="assessment-live-chart"><LifeBalanceChart scores={currentSummary.scores} desiredScores={desiredSummary.scores} reduced={reduced} onDimensionSelect={id=>document.getElementById(`desired-${id}`)?.focus()}/></aside></div>
    <div className="comparison-table-shell"><table className="comparison-table"><caption>Current and desired personal ratings · difference = desired − current</caption><thead><tr><th scope="col">Life dimension</th><th scope="col">Current</th><th scope="col">Desired</th><th scope="col">Difference</th></tr></thead><tbody>{comparison.map(row=><tr key={row.id} data-comparison-dimension={row.id}><th scope="row">{row.name}</th><td>{row.current} / 10</td><td>{row.desired} / 10</td><td data-difference={row.difference}>{row.difference>0?'+':''}{row.difference}</td></tr>)}</tbody></table></div>
    <fieldset className="assessment-priorities"><legend>Which area would you like to focus on first?</legend><p className="small-copy" id="priority-guidance">Choose one or more, or leave this open for now. Your focus does not have to be your lowest-rated area.</p><div>{assessmentDimensions.map(dimension=><label key={dimension.id} style={{'--dimension-color':dimension.color}}><input type="checkbox" value={dimension.id} checked={priorities.includes(dimension.id)} onChange={()=>onTogglePriority(dimension.id)} aria-describedby="priority-guidance"/><span>{dimension.name}</span></label>)}</div></fieldset><div className="comparison-review"><Button onClick={onReview}>Review My Reflection</Button></div>
  </Container></section>
}
