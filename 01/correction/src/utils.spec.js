import { generateRandomNumber } from './utils.js'

describe('generateRandomNumber', () => {
  let randomSpy

  beforeEach(() => {
    randomSpy = jest.spyOn(Math, 'random')
  })

  it('should return at least the given minimum value', () => {
    randomSpy.mockReturnValue(0)

    expect(generateRandomNumber(1, 100)).toBe(1)
  })

  it('should return at most the given maximum value', () => {
    randomSpy.mockReturnValue(1)

    expect(generateRandomNumber(1, 100)).toBe(100)
  })
})
