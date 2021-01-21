import { generateRandomNumber } from "./utils.js"

describe("generateRandomNumber", () => {
  let randomSpy

  beforeEach(() => {
    randomSpy = jest.spyOn(Math, "random")
  })

  describe("Lorsque Math.random renvoie 0", () => {
    it("renvoie la valeur minimum passée à la fonction", () => {
      randomSpy.mockReturnValue(0)

      expect(generateRandomNumber(1, 100)).toBe(1)
    })
  })

  describe("Lorsque Math.random renvoie 1", () => {
    it("renvoie la valeur maximum passée à la fonction", () => {
      randomSpy.mockReturnValue(1)

      expect(generateRandomNumber(1, 100)).toBe(100)
    })
  })

  describe("Lorsque Math.random renvoie une valeur entre 0 et 1", () => {
    it("renvoie la valeur associée dans l'intervalle entre le minimum et le maximum passés à la fonction", () => {
      randomSpy.mockReturnValue(0.25)
      expect(generateRandomNumber(1, 100)).toBe(25)

      randomSpy.mockReturnValue(0.5)
      expect(generateRandomNumber(1, 100)).toBe(50)

      randomSpy.mockReturnValue(0.75)
      expect(generateRandomNumber(1, 100)).toBe(75)
    })
  })
})
