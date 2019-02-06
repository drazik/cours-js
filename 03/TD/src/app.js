class SearchForm {
  constructor(root, options = {}) {
    this.root = root
    this.options = options

    this.onInit()
  }

  onInit() {
    // ...
  }

  destroy() {
    // ...
  }
}

class ResultArea {
  constructor(root) {
    this.root = root
  }

  showLoadingMessage() {
    // ...
  }

  showResult() {
    // ...
  }

  showError() {
    // ...
  }
}

const resultAreaRoot = document.querySelector("#result")
const resultArea = new ResultArea(resultAreaRoot)

const searchFormRoot = document.querySelector("#search-form")
const searchForm = new SearchForm(searchFormRoot, {
  onLoading: resultArea.showLoadingMessage,
  onReceiveData: resultArea.showResult,
  onReceiveError: resultArea.showError
})
