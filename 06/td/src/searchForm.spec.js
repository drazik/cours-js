import { initSearchForm } from "./searchForm.js"
import { getArtistInfo } from "./api.js"
import data from "./data.json"
import { fireEvent, getByText, getByLabelText, wait } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'

jest.mock("./api.js")

function getDOM(initialValue = '') {
  let formElement = document.createElement('form')
  formElement.innerHTML = `
  <label for="artist-name">Artiste / groupe</label><input type="text" id="artist-name" value="${initialValue}" />
  <button type="submit">Rechercher</button>
  `

  return formElement
}

describe("initSearchForm", () => {
  afterEach(() => {
    getArtistInfo.mockReset()
  })

  describe("when initialized", () => {
    describe("when input is empty", () => {
      it("should disable the submit button", () => {
        let formElement = getDOM()
        let submitButton = getByText(formElement, /rechercher/i)

        initSearchForm(formElement, jest.fn(), jest.fn(), jest.fn())

        expect(submitButton).toBeDisabled()
      })
    })
  })

  describe("when typing something", () => {
    it("should update submit button state", () => {
      let formElement = getDOM()
      let input = getByLabelText(formElement, /artiste/i)
      let submitButton = getByText(formElement, /rechercher/i)

      initSearchForm(formElement, jest.fn(), jest.fn(), jest.fn())

      fireEvent.input(input, { target: { value: "Fat Freddy's Drop" } })
      expect(submitButton).not.toBeDisabled()

      fireEvent.input(input, { target: { value: "" } })
      expect(submitButton).toBeDisabled()
    })
  })

  describe("when submitted", () => {
    it("should disable the submit button", () => {
      let formElement = getDOM()
      let input = getByLabelText(formElement, /artiste/i)
      let submitButton = getByText(formElement, /rechercher/i)

      initSearchForm(formElement, jest.fn(), jest.fn(), jest.fn())

      fireEvent.input(input, { target: { value: "Fat Freddy's Drop" } })
      fireEvent.submit(formElement)

      expect(submitButton).toBeDisabled()
    })

    it("should call the onLoading callback", () => {
      let formElement = getDOM()
      let input = getByLabelText(formElement, /artiste/i)
      let onLoading = jest.fn()

      getArtistInfo.mockResolvedValue(data["fat freddy's drop"])

      initSearchForm(formElement, jest.fn(), jest.fn(), onLoading)
      
      fireEvent.input(input, { target: { value: "Fat Freddy's Drop" } })
      fireEvent.submit(formElement)

      expect(onLoading).toHaveBeenCalled()
    })

    it("should get artist infos with trimmed input value", () => {
      let formElement = getDOM()
      let input = getByLabelText(formElement, /artiste/i)

      initSearchForm(formElement, jest.fn(), jest.fn(), jest.fn())

      fireEvent.input(input, { target: { value: " Fat Freddy's Drop " } })
      fireEvent.submit(formElement)

      expect(getArtistInfo).toHaveBeenCalledWith("Fat Freddy's Drop")
    })
  })

  describe("on success", () => {
    it("should call the onSuccess callback with the artist infos", async () => {
      let formElement = getDOM()
      let input = getByLabelText(formElement, /artiste/i)
      let onSuccess = jest.fn()

      getArtistInfo.mockResolvedValue(data["fat freddy's drop"])

      initSearchForm(formElement, onSuccess, jest.fn(), jest.fn())
      
      fireEvent.input(input, { target: { value: "Fat Freddy's Drop" } })
      fireEvent.submit(formElement)

      await wait(() => {
        expect(onSuccess).toHaveBeenCalledWith(data["fat freddy's drop"])
      })
    })

    it("should flush the input", async () => {
      let formElement = getDOM()
      let input = getByLabelText(formElement, /artiste/i)

      getArtistInfo.mockResolvedValue(data["fat freddy's drop"])

      initSearchForm(formElement, jest.fn(), jest.fn(), jest.fn())
      
      fireEvent.input(input, { target: { value: "Fat Freddy's Drop" } })
      fireEvent.submit(formElement)
      
      await wait(() => {
        expect(input).toHaveValue("")
      })
    })
  })

  describe("on error", () => {
    it("should call the onError callback with the error thrown", async () => {
      let formElement = getDOM()
      let input = getByLabelText(formElement, /artiste/i)
      let onError = jest.fn()

      let error = new Error("The artist you supplied could not be found")
      getArtistInfo.mockRejectedValue(error)

      initSearchForm(formElement, jest.fn(), onError, jest.fn())

      fireEvent.input(input, { target: { value: "existepas" } })
      fireEvent.submit(formElement)

      await wait(() => {
        expect(onError).toHaveBeenCalledWith(error.message)
      })
    })

    it("should enable the submit button", async () => {
      let formElement = getDOM()
      let input = getByLabelText(formElement, /artiste/i)
      let submitButton = getByText(formElement, /rechercher/i)

      let error = new Error("The artist you supplied could not be found")
      getArtistInfo.mockRejectedValue(error)

      initSearchForm(formElement, jest.fn(), jest.fn(), jest.fn())
      
      fireEvent.input(input, { target: { value: "existepas" } })
      fireEvent.submit(formElement)

      await wait(() => {
        expect(submitButton).not.toBeDisabled()
      })
    })
  })
})
