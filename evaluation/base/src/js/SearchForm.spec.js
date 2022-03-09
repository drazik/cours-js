import * as SearchForm from "./SearchForm"
import { getByRole, fireEvent, waitFor } from "@testing-library/dom"
import { fetchImages } from "./api"

jest.mock("./api")

const setup = ({ initialQuery = "", options } = {}) => {
  const root = getRootElement(initialQuery)
  const searchForm = SearchForm.init(root, options)

  return { root, searchForm }
}

const getRootElement = (initialQuery) => {
  const rootElement = document.createElement("form")
  rootElement.innerHTML = `
  <input
    type="search"
    aria-label="Rechercher"
    name="q"
    value="${initialQuery}"
  />
  <button type="submit">
    Rechercher
  </button>
  `

  return rootElement
}

describe("init", () => {
  describe("when query field is empty", () => {
    test.skip("submit button is disabled", () => {
      const { root } = setup()

      expect(getByRole(root, "button", { name: "Rechercher" })).toBeDisabled()
    })
  })

  describe("when query field is not empty", () => {
    test.skip("submit button is enabled", () => {
      const { root } = setup({ initialQuery: "earth" })

      expect(
        getByRole(root, "button", { name: "Rechercher" })
      ).not.toBeDisabled()
    })
  })

  describe("when user types something in query field", () => {
    describe("when query is only spaces", () => {
      test.skip("submit button is disabled", () => {
        const { root } = setup()
        const queryField = getByRole(root, "searchbox", { name: "Rechercher" })

        fireEvent.input(queryField, { target: { value: "   " } })

        expect(getByRole(root, "button", { name: "Rechercher" })).toBeDisabled()
      })
    })

    describe("when query is not only spaces", () => {
      test.skip("submit button is enabled", () => {
        const { root } = setup()
        const queryField = getByRole(root, "searchbox", { name: "Rechercher" })

        fireEvent.input(queryField, { target: { value: "earth" } })

        expect(
          getByRole(root, "button", { name: "Rechercher" })
        ).not.toBeDisabled()
      })
    })
  })

  describe("when the form is submitted", () => {
    test.skip("onLoading option function is called", () => {
      const onLoading = jest.fn()
      const { root } = setup({ initialQuery: "earth", options: { onLoading } })

      fireEvent.submit(root)

      expect(onLoading).toHaveBeenCalled()
    })

    test.skip("submit button is disabled", () => {
      const { root } = setup({ initialQuery: "earth" })

      fireEvent.submit(root)

      expect(getByRole(root, "button", { name: "Rechercher" })).toBeDisabled()
    })

    test.skip("fetches images", () => {
      const query = "earth"
      const { root } = setup({ initialQuery: query })

      fireEvent.submit(root)

      expect(fetchImages).toHaveBeenCalledWith(query)
    })

    describe("when request is successful", () => {
      test.skip("onSuccess option function is called", async () => {
        const collection = { items: [] }
        fetchImages.mockReturnValueOnce(Promise.resolve(collection))

        const onSuccess = jest.fn()
        const { root } = setup({
          initialQuery: "earth",
          options: { onSuccess },
        })

        fireEvent.submit(root)

        await waitFor(() => {
          expect(onSuccess).toHaveBeenCalledWith(collection)
        })
      })

      test.skip("submit button is enabled", async () => {
        const { root } = setup({ initialQuery: "earth" })

        fireEvent.submit(root)

        await waitFor(() => {
          expect(
            getByRole(root, "button", { name: "Rechercher" })
          ).not.toBeDisabled()
        })
      })
    })

    describe("when request is in error", () => {
      test.skip("onError option function is called", async () => {
        fetchImages.mockReturnValueOnce(Promise.reject())

        const onError = jest.fn()
        const { root } = setup({ initialQuery: "earth", options: { onError } })

        fireEvent.submit(root)

        await waitFor(() => {
          expect(onError).toHaveBeenCalled()
        })
      })

      test.skip("submit button is enabled", async () => {
        const { root } = setup({ initialQuery: "earth" })

        fireEvent.submit(root)

        await waitFor(() => {
          expect(
            getByRole(root, "button", { name: "Rechercher" })
          ).not.toBeDisabled()
        })
      })
    })
  })
})
