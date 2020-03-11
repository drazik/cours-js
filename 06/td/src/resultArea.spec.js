import { initResultArea } from "./resultArea.js"
import { getByTestId, getByText } from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"
import data from "./data.json"

function getDOM(initialMainContent = "", initialSimilarContent = "") {
  let rootElement = document.createElement('div')
  rootElement.innerHTML = `
  <div id="main-result" data-testid="main-area">${initialMainContent}</div>
  <div id="similar-artists" data-testid="similar-area">${initialSimilarContent}</div>
  `

  return rootElement
}

describe("initResultArea", () => {
  describe("showLoading", () => {
    it("should show a loading message in the main area", () => {
      let root = getDOM()
      let resultArea = initResultArea(root)
      let mainArea = getByTestId(root, "main-area")

      resultArea.showLoading()
      expect(mainArea).toHaveTextContent("Chargement...")
    })

    it("should reset the similar artists area", () => {
      let root = getDOM(undefined, "<div>Similar artists</div>")
      let resultArea = initResultArea(root)
      let similarArea = getByTestId(root, "similar-area")

      resultArea.showLoading()
      expect(similarArea).toBeEmpty()
    })
  })

  describe("showResult", () => {
    it("should show the given artist info in main area", () => {
      let root = getDOM()
      let resultArea = initResultArea(root)
      let result = data["fat freddy's drop"]

      resultArea.showResult(result)
      let mainArea = getByTestId(root, "main-area")

      expect(getByText(mainArea, result.artist.name)).toBeDefined()
      // TODO find a better way to check this one
      // expect(getByText(mainArea, new RegExp(result.artist.bio.summary.slice(0, 20), 'i'))).toBeDefined()
    })

    it("should show the given artist's similar artists in similar area", () => {
      let root = getDOM()
      let resultArea = initResultArea(root)
      let result = data["fat freddy's drop"]

      resultArea.showResult(result)
      let similarArea = getByTestId(root, "similar-area")

      for (let similarArtist of result.artist.similar.artist) {
        expect(getByText(similarArea, similarArtist.name)).toBeDefined()
      }
    })
  })

  describe("showError", () => {
    it("should show the given error in main area", () => {
      let root = getDOM()
      let resultArea = initResultArea(root)
      let mainArea = getByTestId(root, "main-area")

      resultArea.showError("The artist does not exist")
      expect(mainArea).toHaveTextContent("The artist does not exist")
    })

    it("should reset the similar artists area", () => {
      let root = getDOM(undefined, "<div>Similar artists</div>")
      let resultArea = initResultArea(root)
      let similarArea = getByTestId(root, "similar-area")

      resultArea.showError("The artist does not exist")
      expect(similarArea).toBeEmpty()
    })
  })
})
