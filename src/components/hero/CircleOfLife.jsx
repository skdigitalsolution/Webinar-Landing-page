import { Component, lazy, Suspense, useCallback, useEffect, useId, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import useMediaQuery from '../../hooks/useMediaQuery.js'
import { dimensions } from '../../data/dimensions.js'

const CircleOfLife3D = lazy(() => import('./CircleOfLife3D.jsx'))
class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onFailure() }
  render() { return this.state.failed ? null : this.props.children }
}

export default function CircleOfLife({ activeDimension, onDimensionChange, dimensionData = dimensions, enhanced = false, staticOnReducedMotion = false, showDescription = true, detailId, referenceHero = false }) {
  const [internalActive, setInternalActive] = useState(0)
  const generatedId = useId()
  const descriptionId = detailId || `circle-description-${generatedId}`
  const active = activeDimension ?? internalActive
  const selectDimension = useCallback(index => {
    if (activeDimension === undefined) setInternalActive(index)
    onDimensionChange?.(index)
  }, [activeDimension, onDimensionChange])
  const [sceneRequested, setSceneRequested] = useState(false)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(true)
  const host = useRef()
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const compact = useMediaQuery('(max-width: 767px)')
  const fail = useCallback(() => setFailed(true), [])
  const markReady = useCallback(() => setReady(true), [])
  useEffect(() => {
    let inView = true
    const update = () => setVisible(inView && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update() })
    observer.observe(host.current.querySelector('.circle-stage'))
    document.addEventListener('visibilitychange', update)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update) }
  }, [])
  const animate = visible && !paused && !reduced
  const staticView = staticOnReducedMotion && reduced
  useEffect(() => {
    if (sceneRequested || failed || staticView || !visible) return
    const start = () => setSceneRequested(true)
    if ('requestIdleCallback' in window) {
      const idle = window.requestIdleCallback(start, { timeout: 1000 })
      return () => window.cancelIdleCallback(idle)
    }
    const timer = setTimeout(start, 100)
    return () => clearTimeout(timer)
  }, [sceneRequested, failed, staticView, visible])
  return (
    <div className="circle-experience" ref={host} data-selected-dimension={dimensionData[active].id} data-render-state={staticView ? 'static' : failed ? 'fallback' : ready ? 'ready' : 'loading'} data-motion={animate ? 'running' : 'paused'}>
      <div className="circle-caption"><span className="eyebrow">YOUR CIRCLE OF LIFE</span><span className="small-copy">Four dimensions. One you.</span></div>
      <div className="circle-stage">
        <div className={`circle-static ${ready && !failed && !staticView ? 'is-hidden' : ''}`} style={{ '--selected-color': dimensionData[active].color }} aria-hidden="true"><span className="static-orbit" /><span className="static-orbit" /><span className="static-orbit" /><span className="static-core" /></div>
        {sceneRequested && !failed && !staticView && <SceneBoundary onFailure={fail}><Suspense fallback={null}><CircleOfLife3D activeDimension={active} onSelect={selectDimension} dimensionData={dimensionData} enhanced={enhanced} referenceHero={referenceHero} animate={animate} compact={compact} onReady={markReady} onFailure={fail} /></Suspense></SceneBoundary>}
        <span className="circle-center-label" aria-hidden="true">YOU</span>
      </div>
      {!referenceHero && <div className="dimension-controls" role="group" aria-label="Explore the four life dimensions">
        {dimensionData.map((dimension, index) => <button key={dimension.id} style={{ '--dimension-color': dimension.color }} aria-pressed={active === index} aria-controls={showDescription || detailId ? descriptionId : undefined} onPointerEnter={() => selectDimension(index)} onFocus={() => selectDimension(index)} onClick={() => selectDimension(index)}><span className="dimension-dot" />{dimension.name}</button>)}
      </div>}
      {showDescription && <motion.div className="circle-description" id={descriptionId} key={active} initial={reduced ? false : { opacity: .4, y: 3 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .2 }}><p><strong style={{ color: dimensionData[active].color }}>{dimensionData[active].name}</strong> — {dimensionData[active].description}</p></motion.div>}
      <div className="circle-bottom"><span className="small-copy">{staticView ? 'Reduced motion · static visual' : failed ? 'Static view · all dimensions remain available' : 'Hover, tap or tab to explore'}</span>{!failed && <button className="scene-pause" onClick={() => setPaused(!paused)} disabled={reduced} aria-pressed={paused || reduced} aria-label={reduced ? 'Motion disabled by your device preference' : paused ? 'Play 3D animation' : 'Pause 3D animation'}>{paused || reduced ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}<span>{reduced ? 'Reduced motion' : paused ? 'Play' : 'Pause'}</span></button>}</div>
    </div>
  )
}
