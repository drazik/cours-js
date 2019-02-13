// Le composant SearchForm ne sert qu'un seul but :
// récupérer les données météorologiques sur l'API Open Weather Map
// à partir de la saisie de l'utilisateur
class SearchForm {
  // On passe au constructeur l'élément racine du composant (un <form>)
  // ainsi qu'un objet d'options qui nous permettra de spécifier
  // quoi faire avec les données reçues à partir de l'API
  constructor(root, options = {}) {
    // On stocke les deux paramètres dans des propriétés de l'objet
    this.root = root
    this.options = options

    // On lie la méthode `onSubmit` à son contexte this
    this.onSubmit = this.onSubmit.bind(this)

    this.onInit()
  }

  // Initialisation des événements
  onInit() {
    // On n'a besoin d'écouter que l'événement submit sur l'élément racine (le form)
    this.root.addEventListener("submit", this.onSubmit)
  }

  // Destruction des événements
  destroy() {
    this.root.removeEventListener("submit", this.onSubmit)
  }

  // Méthode exécutée lorsque le formulaire est submit
  async onSubmit(event) {
    // On emêche le navigateur de changer de page
    event.preventDefault()

    // On récupère la saisie de l'utilisateur
    // (valeur du champ portait l'attribut `name="city"`)
    const city = this.root.city.value

    // On indique que la donnée est en cours de chargement
    // Cette méthode est issue des options car ce n'est pas
    // au composant SearchForm de faire l'affichage du message de chargement.
    // Celui-ci indique seulement que le chargement a commencé
    this.options.onLoading()

    // On récupère les données météorologiques pour la ville saisie
    this.fetchData(city)
      .then(data => {
        // Si les données contiennent une erreur, on lève une erreur
        if (data.cod && data.message) {
          throw new Error(data.message)
        }

        // Sinon, on délègue l'affichage des données à la fonction passée en options
        this.options.onReceiveData(data)
      })
      // En cas d'erreur, on délègue l'affichage de celle-ci à la fonction passée en options
      .catch(err => this.onReceiveError(err))
  }

  // Méthode qui récupère les données météorologiques à partir du nom d'une ville
  fetchData(city) {
    // On forme l'URL de l'API à partir de nos paramètres : le nom de la ville et notre clef API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},fr&mode=json&units=metric&appid=${this.options.appID}`

    // On faire une requête sur l'URL formée
    return fetch(url)
      // On sait (via la documentation) que l'API renvoie les données au format JSON
      // On peut donc parser la réponse afin d'obtenir un objet JS en sortie
      .then(response => response.json())
  }
}

// Le composant ResultArea ne sait faire que de l'affichage.
// À partir de données météorologiques ou d'une erreur,
// il sait afficher ce qu'il faut sur la page
class ResultArea {
  // On récupère l'élément dans lequel on veut afficher les données
  // en paramètre du constructeur
  constructor(root) {
    this.root = root

    // Ces méthodes vont être passées à un autre contexte,
    // on a donc besoin de leur attacher le bon this
    this.showLoadingMessage = this.showLoadingMessage.bind(this)
    this.showData = this.showData.bind(this)
    this.showError = this.showError.bind(this)
  }

  // Affichage d'un message de chargement
  showLoadingMessage() {
    this.root.innerHTML = "Loading..."
  }

  // Affichage des données
  showData(data) {
    // On supprime d'abord le contenu précédent
    this.root.innerHTML = ""

    // Puis on insère le nouveau
    this.root.append(this.createCard(data))
  }

  // Méthode qui crée l'élément contenant les informations météorologiques
  createCard(result) {
    // On crée l'élément
    const root = document.createElement("div")
    root.className = "card"

    const body = document.createElement("div")
    body.className = "card-body"
    body.style.display = "flex"
    body.style.flexDirection = "column"
    body.style.alignItems = "center"

    root.append(body)

    // Ajout du titre
    body.append(this.createTitle(result))

    // Ajout de l'icône
    body.append(this.createIcon(result.weather[0].icon))

    // Ajout des autres informations (description; temperature; humidité)
    body.append(this.createInfoElement(
      `${result.weather[0].main} / ${result.weather[0].description}`,
      "h3"
    ))
    body.append(this.createInfoElement(`${Math.ceil(result.main.temp)}°C`, "div"))
    body.append(this.createInfoElement(`${result.main.humidity}% d'humidité`, "div"))

    return root
  }

  // Méthode qui crée l'élément DOM contenant le titre
  createTitle(result) {
    const date = new Date()
    const title = document.createElement("h2")
    title.className = "card-title"
    title.innerHTML = `Météo à ${result.name} le ${date.toLocaleString()}`

    return title
  }

  // Méthode qui crée l'élément DOM de l'icône
  createIcon(icon) {
    const img = document.createElement("img")
    img.width = 64
    img.height = 64
    img.src = `http://openweathermap.org/img/w/${icon}.png`

    return img
  }

  // Méthode qui crée un élément DOM pour une info donnée
  createInfoElement(content, type) {
    const element = document.createElement(type)
    element.innerHTML = content

    return element
  }

  // Méthode qui affiche les erreurs
  showError(error) {
    this.root.innerHTML = error
  }
}

// On commence par instancier un `ResultArea`
const resultAreaRoot = document.querySelector("#result")
const resultArea = new ResultArea(resultAreaRoot)

// Puis on instancie un `SearchForm` en lui passant en options
// les méthodes de l'instance de `ResultArea` pour lui permettre
// de leur déléguer le travail d'affichage des données
const searchFormRoot = document.querySelector("#search-form")
const searchForm = new SearchForm(searchFormRoot, {
  // Fonction à exécuter lorsque le chargement commence
  onLoading: resultArea.showLoadingMessage,
  // Fonction à exécuter lorsque des données sont reçues
  onReceiveData: resultArea.showData,
  // Fonction à exécuter lorsqu'une erreur est levée
  onReceiveError: resultArea.showError,
  // L'app ID afin de pouvoir se connecter à l'API
  appID: "5a0a09001bdc538dfa5e7fcbb053427a"
})
