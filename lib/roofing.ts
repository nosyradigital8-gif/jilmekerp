export type RoofInputs = {
  buildingLength: number
  buildingWidth: number
  pitchDegrees: number
  overhang: number
  wastagePercent: number
  effectiveCoverWidth: number
  sheetLength: number
}

export type RoofEstimate = {
  footprintArea: number
  slopedAreaBeforeWaste: number
  wasteArea: number
  slopedAreaWithWaste: number
  rafterLength: number
  sheetColumns: number
  sheetRows: number
  sheetQuantity: number
}

export function calculateGableRoof(inputs: RoofInputs): RoofEstimate {
  const values = Object.values(inputs)
  if (values.some((value) => !Number.isFinite(value) || value < 0)) {
    throw new Error('All roof inputs must be finite, non-negative numbers.')
  }
  if (inputs.buildingLength <= 0 || inputs.buildingWidth <= 0 || inputs.pitchDegrees <= 0 || inputs.pitchDegrees >= 89) {
    throw new Error('Length, width and pitch must be valid positive measurements.')
  }
  if (inputs.effectiveCoverWidth <= 0 || inputs.sheetLength <= 0) {
    throw new Error('Effective cover width and sheet length must be greater than zero.')
  }

  const radians = (inputs.pitchDegrees * Math.PI) / 180
  const halfSpanWithOverhang = inputs.buildingWidth / 2 + inputs.overhang
  const lengthWithOverhang = inputs.buildingLength + inputs.overhang * 2
  const rafterLength = halfSpanWithOverhang / Math.cos(radians)
  const slopedAreaBeforeWaste = lengthWithOverhang * rafterLength * 2
  const wasteArea = slopedAreaBeforeWaste * (inputs.wastagePercent / 100)
  const slopedAreaWithWaste = slopedAreaBeforeWaste + wasteArea
  const sheetColumns = Math.ceil(lengthWithOverhang / inputs.effectiveCoverWidth)
  const sheetRows = Math.ceil(rafterLength / inputs.sheetLength)

  return {
    footprintArea: inputs.buildingLength * inputs.buildingWidth,
    slopedAreaBeforeWaste,
    wasteArea,
    slopedAreaWithWaste,
    rafterLength,
    sheetColumns,
    sheetRows,
    sheetQuantity: sheetColumns * sheetRows * 2,
  }
}
