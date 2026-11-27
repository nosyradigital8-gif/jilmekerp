import assert from 'node:assert/strict'
import { calculateGableRoof } from '../lib/roofing'

const estimate = calculateGableRoof({
  buildingLength: 12,
  buildingWidth: 8,
  pitchDegrees: 30,
  overhang: 0.45,
  wastagePercent: 10,
  effectiveCoverWidth: 0.85,
  sheetLength: 3,
})

assert.equal(estimate.sheetQuantity, estimate.sheetColumns * estimate.sheetRows * 2)
assert.ok(estimate.slopedAreaWithWaste > estimate.slopedAreaBeforeWaste)
assert.ok(estimate.slopedAreaBeforeWaste > estimate.footprintArea)

assert.throws(() => calculateGableRoof({
  buildingLength: 0,
  buildingWidth: 8,
  pitchDegrees: 30,
  overhang: 0.45,
  wastagePercent: 10,
  effectiveCoverWidth: 0.85,
  sheetLength: 3,
}))

console.log('Roofing calculation checks passed.')
