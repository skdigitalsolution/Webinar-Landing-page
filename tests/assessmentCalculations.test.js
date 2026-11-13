import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateAssessment } from '../src/utils/assessmentCalculations.js'
import { createInitialRatings } from '../src/data/assessmentDimensions.js'

const ratings = (health, wealth, relationships, spiritual) => ({ health, wealth, relationships, 'spiritual-bliss': spiritual })
const ids = list => list.map(item => item.id)

test('initial placeholders are independent, 20/40 and 50%, with all four tied', () => {
  const initial = createInitialRatings()
  initial.health = 10
  assert.equal(createInitialRatings().health, 5)
  const summary = calculateAssessment(createInitialRatings())
  assert.equal(summary.total, 20)
  assert.equal(summary.percentage, 50)
  assert.equal(summary.allEqual, true)
  assert.equal(summary.highest.length, 4)
  assert.equal(summary.lowest.length, 4)
})
test('minimum and maximum permitted ratings', () => {
  const minimum = calculateAssessment(ratings(1,1,1,1))
  const maximum = calculateAssessment(ratings(10,10,10,10))
  assert.equal(minimum.total, 4)
  assert.equal(minimum.percentage, 10)
  assert.equal(maximum.total, 40)
  assert.equal(maximum.percentage, 100)
})
test('rounds half percentages up and identifies distinct highest and lowest', () => {
  const result = calculateAssessment(ratings(10,1,4,6))
  assert.equal(result.total, 21)
  assert.equal(result.percentage, 53)
  assert.deepEqual(ids(result.highest), ['health'])
  assert.deepEqual(ids(result.lowest), ['wealth'])
  assert.equal(result.allEqual, false)
})
test('retains every tied highest and lowest area in stable dimension order', () => {
  const result = calculateAssessment(ratings(9,2,2,9))
  assert.deepEqual(ids(result.highest), ['health','spiritual-bliss'])
  assert.deepEqual(ids(result.lowest), ['wealth','relationships'])
  const threeWay = calculateAssessment(ratings(3,3,8,3))
  assert.deepEqual(ids(threeWay.lowest), ['health','wealth','spiritual-bliss'])
})
test('rejects missing, out-of-range, fractional and nonnumeric ratings', () => {
  for (const value of [0,11,-1,5.5,NaN,Infinity,'5',null,undefined]) {
    assert.throws(() => calculateAssessment({ ...createInitialRatings(), health: value }), RangeError)
  }
  assert.throws(() => calculateAssessment({}), RangeError)
  assert.throws(() => calculateAssessment(null), RangeError)
})
test('does not mutate input ratings', () => {
  const input = Object.freeze(ratings(8,7,6,5))
  calculateAssessment(input)
  assert.deepEqual(input, ratings(8,7,6,5))
})

import { calculateComparison } from '../src/utils/assessmentCalculations.js'

test('comparison retains signed aspirational differences and stable dimension order', () => {
  const current = Object.freeze(ratings(8,2,5,9))
  const desired = Object.freeze(ratings(6,7,5,10))
  const result = calculateComparison(current,desired)
  assert.deepEqual(result.map(row=>row.difference),[-2,5,0,1])
  assert.deepEqual(result.map(row=>row.current),[8,2,5,9])
  assert.deepEqual(result.map(row=>row.desired),[6,7,5,10])
  assert.deepEqual(ids(result),['health','wealth','relationships','spiritual-bliss'])
})
test('comparison validates both rating sets and defaults are neutral rather than all 10', () => {
  assert.ok(calculateComparison(createInitialRatings(),createInitialRatings()).every(row=>row.difference===0))
  assert.throws(()=>calculateComparison(createInitialRatings(),{...createInitialRatings(),wealth:11}),RangeError)
  assert.throws(()=>calculateComparison(null,createInitialRatings()),RangeError)
})
