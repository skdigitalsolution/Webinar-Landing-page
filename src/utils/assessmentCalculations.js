import { assessmentDimensions } from '../data/assessmentDimensions.js'

export function calculateAssessment(ratings) {
  const scores = assessmentDimensions.map(dimension => {
    const value = ratings?.[dimension.id]
    if (!Number.isInteger(value) || value < 1 || value > 10) {
      throw new RangeError(`Rating for ${dimension.id} must be an integer from 1 to 10.`)
    }
    return { ...dimension, value }
  })
  const total = scores.reduce((sum, dimension) => sum + dimension.value, 0)
  const highestValue = Math.max(...scores.map(({ value }) => value))
  const lowestValue = Math.min(...scores.map(({ value }) => value))
  return {
    total, maximum: 40, percentage: Math.round(total / 40 * 100), scores,
    highest: scores.filter(({ value }) => value === highestValue),
    lowest: scores.filter(({ value }) => value === lowestValue),
    allEqual: highestValue === lowestValue,
  }
}
