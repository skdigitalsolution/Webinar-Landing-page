import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { assessmentDimensions } from '../data/assessmentDimensions.js'

export const ReflectionContext = createContext(null)
const validIds = new Set(assessmentDimensions.map(({ id }) => id))

export function ReflectionProvider({ children }) {
  const [priorities, setPriorities] = useState([])
  const togglePriority = useCallback(id => {
    if (!validIds.has(id)) return
    setPriorities(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  }, [])
  // The first selected area is the planner's active area. There is no second
  // independently stored selection that can disagree with the assessment.
  const selectArea = useCallback(id => {
    if (!validIds.has(id)) return
    setPriorities(current => [id, ...current.filter(item => item !== id)])
  }, [])
  const clearPriorities = useCallback(() => setPriorities([]), [])
  const value = useMemo(() => ({ priorities, primaryArea: priorities[0] || '', togglePriority, selectArea, clearPriorities }), [priorities, togglePriority, selectArea, clearPriorities])
  return <ReflectionContext.Provider value={value}>{children}</ReflectionContext.Provider>
}

export function useReflection() {
  const state = useContext(ReflectionContext)
  if (!state) throw new Error('Reflection components must be inside ReflectionProvider.')
  return state
}
