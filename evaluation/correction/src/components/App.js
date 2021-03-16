import * as Result from "./Result"
import * as SearchForm from "./SearchForm"

export const init = (container) => {
  const result = Result.init(container.querySelector("#result"))
  const searchForm = SearchForm.init(container.querySelector("form"), {
    onLoading: result.showLoading,
    onSuccess: result.showArtist,
    onError: result.showError,
  })

  const destroy = () => {
    searchForm.destroy()
    result.destroy()
  }

  return { destroy }
}
