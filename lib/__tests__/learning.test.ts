import {
  convolve,
  FILTERS,
  PEOPLE,
  pixelCalculation,
  selectAdults,
} from '../learning'

describe('the browser teaching calculations', () => {
  test('an identity kernel preserves every pixel, including image boundaries', () => {
    const image = [
      [0, 20, 40],
      [60, 80, 100],
      [120, 140, 255],
    ]
    expect(convolve(image, [0, 0, 0, 0, 1, 0, 0, 0, 0])).toEqual(image)
  })
  test('the edge filter cancels a constant region and detects a brightness boundary', () => {
    expect(
      convolve(
        [
          [100, 100, 100],
          [100, 100, 100],
          [100, 100, 100],
        ],
        FILTERS.edges.kernel,
      )[1][1],
    ).toBe(0)
    expect(
      convolve(
        [
          [0, 0, 255],
          [0, 0, 255],
          [0, 0, 255],
        ],
        FILTERS.edges.kernel,
      )[1][2],
    ).toBe(255)
  })
  test('box blur uses the actual nine-pixel mean', () => {
    const image = [
      [0, 9, 18],
      [27, 36, 45],
      [54, 63, 72],
    ]
    expect(convolve(image, FILTERS.blur.kernel, 9)[1][1]).toBe(36)
  })
  test('the inspector exposes the unclipped sum while the display is clipped', () => {
    const calculation = pixelCalculation(
      [
        [0, 0, 0],
        [0, 255, 0],
        [0, 0, 0],
      ],
      FILTERS.edges.kernel,
      1,
      1,
    )
    expect(calculation.sum).toBe(2040)
    expect(calculation.output).toBe(255)
    expect(
      calculation.values.reduce((sum, value) => sum + value.product, 0),
    ).toBe(calculation.sum)
  })
  test('the DataFrame / query condition includes its boundary and supports an empty result', () => {
    expect(selectAdults(18).map((person) => person.name)).toEqual([
      'Joseph',
      'Rebecca',
      'Karl',
      'Tommy',
    ])
    expect(selectAdults(19).some((person) => person.name === 'Joseph')).toBe(
      false,
    )
    expect(selectAdults(31)).toEqual([])
    expect(PEOPLE).toHaveLength(6)
  })
})
