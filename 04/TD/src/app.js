class SearchForm {
  constructor(root, resultArea) {
    this.root = root
    this.resultArea = resultArea

    this.onSubmit = this.onSubmit.bind(this)

    this.onInit()
  }

  onInit() {
    this.root.addEventListener("submit", this.onSubmit)
  }

  destroy() {
    this.root.removeEventListener("submit", this.onSubmit)
  }

  async onSubmit(event) {
    event.preventDefault()

    const city = this.root.city.value

    this.resultArea.showLoadingMessage()

    this.fetchData(city)
      .then(data => {
        if (data.cod && data.message) {
          throw new Error(data.message)
        }

        this.resultArea.showData(data)
      })
      .catch(err => this.resultArea.showError(err))
  }

  fetchData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},fr&mode=json&units=metric&appid=...`

    return fetch(url)
      .then(response => response.json())
  }
}

class ResultArea {
  constructor(root) {
    this.root = root

    this.showLoadingMessage = this.showLoadingMessage.bind(this)
    this.showData = this.showData.bind(this)
    this.showError = this.showError.bind(this)
  }

  showLoadingMessage() {
    this.root.innerHTML = "Loading..."
  }

  showData(data) {
    console.log(data)
    this.root.innerHTML = ""

    const card = this.createCard(data)
    this.root.append(card)
  }

  createCard(data) {
    const root = document.createElement("div")
    root.className = "card"

    const body = document.createElement("div")
    body.className = "card-body"
    body.style.display = "flex"
    body.style.flexDirection = "column"
    body.style.alignItems = "center"

    root.append(body)

    const title = this.createTitle(data)
    body.append(title)

    const icon = this.createIcon(data.weather[0].icon)
    body.append(icon)

    body.append(this.createInfoElement(
      `${data.weather[0].main} / ${data.weather[0].description}`,
      "h3"
    ))
    body.append(this.createInfoElement(`${Math.ceil(data.main.temp)}°C`, "div"))
    body.append(this.createInfoElement(`${data.main.humidity}% d'humidité`, "div"))

    return root
  }

  createTitle(data) {
    const date = new Date()
    const title = document.createElement("h2")
    title.className = "card-title"
    title.innerHTML = `Météo à ${data.name} le ${date.toLocaleString()}`

    return title
  }

  createIcon(icon) {
    const img = document.createElement("img")
    img.width = 64
    img.height = 64
    img.src = `http://openweathermap.org/img/w/${icon}.png`

    return img
  }

  createInfoElement(content, type) {
    const element = document.createElement(type)
    element.innerHTML = content

    return element
  }

  showError(error) {
    this.root.innerHTML = error
  }
}

const resultAreaRoot = document.querySelector("#result")
const resultArea = new ResultArea(resultAreaRoot)

const searchFormRoot = document.querySelector("#search-form")
const searchForm = new SearchForm(searchFormRoot, resultArea)
