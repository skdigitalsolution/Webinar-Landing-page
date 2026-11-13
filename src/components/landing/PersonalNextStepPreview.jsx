import { useState } from 'react'
import { ClipboardPenLine, RotateCcw, ShieldCheck } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import InputField from '../ui/InputField.jsx'
import Button from '../ui/Button.jsx'
import { assessmentDimensions } from '../../data/assessmentDimensions.js'
import { useReflection } from '../../context/ReflectionContext.jsx'

const emptyDraft = { priority: '', action: '', date: '' }
export default function PersonalNextStepPreview() {
  const { primaryArea, selectArea } = useReflection()
  // Separate drafts prevent notes for one area being attributed to another.
  const [drafts, setDrafts] = useState({})
  const [status, setStatus] = useState('')
  const draft = drafts[primaryArea] || emptyDraft
  const selected = assessmentDimensions.find(dimension=>dimension.id===primaryArea)
  function update(field, value) {
    if (!primaryArea) return
    setDrafts(current=>({...current,[primaryArea]:{...(current[primaryArea]||emptyDraft),[field]:value}}))
    setStatus('')
  }
  function reset() {
    setDrafts({})
    setStatus('Planning fields cleared for all areas. Your shared assessment selections are unchanged.')
  }
  return <section id="next-step" className="solution-section personal-next-step landing-target" tabIndex={-1} aria-labelledby="next-step-title"><Container>
    <div data-landing-reveal><SectionHeading eyebrow="A SMALL STEP. YOUR OWN WORDS." id="next-step-title" title="What Could Your Next Step Look Like?" description="An illustrative planning activity, not a personalized AI-generated plan. Choose an area and write a simple next step in your own words."/></div>
    <div className="next-step-workspace">
      <form className="next-step-form" onSubmit={event=>event.preventDefault()} autoComplete="off" aria-label="Local reflection template" aria-describedby="next-step-privacy" data-landing-reveal>
        <div className="input-field"><label htmlFor="planning-area">Selected Area</label><select id="planning-area" className="input-control" value={primaryArea} onChange={event=>{selectArea(event.target.value);setStatus('')}} aria-describedby="planning-area-hint"><option value="" disabled>Choose an area to explore</option>{assessmentDimensions.map(dimension=><option key={dimension.id} value={dimension.id}>{dimension.name}</option>)}</select><p className="field-hint" id="planning-area-hint">Uses your first selected assessment area. Choosing another area also adds it to your shared focus areas. Each area keeps its own notes until reset or refresh.</p></div>
        <InputField id="planning-priority" label="My Priority" value={draft.priority} onChange={event=>update('priority',event.target.value)} placeholder="What would you like to give more attention to?" maxLength={160} disabled={!primaryArea}/>
        <InputField id="planning-action" label="One Small Action" value={draft.action} onChange={event=>update('action',event.target.value)} placeholder="A manageable action you choose for yourself" maxLength={240} disabled={!primaryArea}/>
        <InputField id="planning-date" label="When I Will Start (optional)" type="date" value={draft.date} onChange={event=>update('date',event.target.value)} disabled={!primaryArea}/>
        <Button variant="outline" onClick={reset}><RotateCcw size={16} aria-hidden="true"/>Reset Planning Fields</Button>
        <p className="small-copy" id="next-step-privacy"><ShieldCheck size={16} aria-hidden="true"/>Use general, non-sensitive notes. Everything stays in this page’s memory; nothing is submitted or stored.</p>
        <p className="planning-status" role="status">{status}</p>
      </form>
      <GlassCard className="next-step-preview" role="region" aria-labelledby="local-preview-title" style={{'--focus-color':selected?.color||'#d6b46a'}} data-landing-reveal>
        <div className="next-step-preview-top"><ClipboardPenLine size={30} strokeWidth={1.3} aria-hidden="true"/><span className="eyebrow">YOUR LOCAL PREVIEW</span></div><h3 id="local-preview-title">One area. One small action.</h3><p className="next-step-preview-note">Your words, organized into a reflection template. No AI service is involved.</p>
        <dl><div><dt>Selected Area</dt><dd data-preview-area>{selected?.name||'Choose an area to begin.'}</dd></div><div><dt>My Priority</dt><dd data-preview-priority>{draft.priority||'Add a priority in the fields.'}</dd></div><div><dt>One Small Action</dt><dd data-preview-action>{draft.action||'Describe one manageable action.'}</dd></div><div><dt>When I Will Start</dt><dd data-preview-date>{draft.date?<time dateTime={draft.date}>{draft.date}</time>:'Leave open, or choose a date.'}</dd></div></dl>
        <p className="small-copy">This is an illustrative planning activity. You decide whether and how to act on it.</p>
      </GlassCard>
    </div>
  </Container></section>
}
