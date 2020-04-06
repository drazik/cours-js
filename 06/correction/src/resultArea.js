function createMainResultElement(result) {
  // Créer une div avec le className "media"
  let root = document.createElement("div")
  root.className = "media"

  // Créer un élément img avec le className "mr-3" et src correspondant à n'importe
  // quelle image contenue dans result
  let img = document.createElement("img")
  img.className = "mr-3"
  img.src = result.artist.image.find(e => e["size"] === "mega")["#text"];
  img.alt = ""

  // Créer une div avec le className "media-body"
  let body = document.createElement("div")
  body.className = "media-body"

  // Créer un h2 avec le className "mt-0" et mettre dedans le nom de l'artiste
  let title = document.createElement("h2")
  title.className = "mt-0"
  title.append(result.artist.name)

  // Créer une div avec le className "mt-2 mb-2"
  let tagsContainer = document.createElement("div")
  tagsContainer.className = "mt-2 mb-2"

  result.artist.tags.tag.forEach(tag => {
    // Créer un élément a avec le className "badge badge-pill badge-info", un
    // href correspondant à l'url du tag et mettre dedans le nom du tag
    let link = document.createElement("a")
    link.className = "badge badge-pill badge-info"
    link.href = tag.url
    link.append(tag.name)

    // Mettre link dans tagsContainer
    tagsContainer.append(link)
  })

  // Créer un élément p avec le className "mt-4"
  let bio = document.createElement("p")
  bio.className = "mt-4"

  // Mettre la bio de l'artiste dans le innerHTML de bio
  bio.innerHTML = result.artist.bio.summary

  // Mettre title, tagsContainer et bio dans body
  body.append(title, tagsContainer, bio)

  // Mettre img et body dans root
  root.append(img, body)

  return root
}

function createSimilarArtistElement(artist) {
  // Créer une div avec le className "col-sm"
  let root = document.createElement("div")
  root.className = "col-sm"

  // Créer une div avec le className "card"
  let card = document.createElement("div")
  card.className = "card"

  // Créer un élément img avec le className "card-img-top"
  let img = document.createElement("img")
  img.className = "card-img-top"

  // Mettre dans img.src une image contenue dans l'objet artist
  img.src = artist.image[0]["#text"]

  // Créer une div avec le className "card-body"
  let body = document.createElement("div")
  body.className = "card-body"

  // Créer un h5 avec le className "card-title"
  let title = document.createElement("h5")
  title.className = "card-title"

  // Mettre le nom de l'artiste dans title
  title.append(artist.name)

  // Créer un élément a avec le className "btn btn-primary"
  let link = document.createElement("a")
  link.className = "btn btn-primary"

  // Mettre l'url de l'artiste dans link.href
  link.href = artist.url

  // Mettre "Voir sur last.fm" dans link
  link.append("Voir sur last.fm")

  // Mettre title et link dans body
  body.append(title, link)

  // Mettre img et body dans card
  card.append(img, body)

  // Mettre card dans root
  root.append(card)

  return root
}

/**
 * Initialise la zone de résultat
 *
 * @param {HTMLElement} rootElement
 * @return {Object} Un objet exposant les fonctions showLoading, showResult et showError
 */
export function initResultArea(rootElement) {
  // Récupérer l'élément qui porte l'ID main-result dans rootElement
  let mainArea = rootElement.querySelector("#main-result")

  // Récupérer l'élément qui porte l'ID similar-artists dans rootElement
  let similarArea = rootElement.querySelector("#similar-artists")

  function emptyAreas() {
    mainArea.innerHTML = ""
    similarArea.innerHTML = ""
  }

  function showLoading() {
    // Vider le contenu de mainArea et similarArea
    emptyAreas()
    
    // Mettre "Chargement..." dans mainArea
    mainArea.append("Chargement...")
  }

  function showResult(result) {
    // Vider le contenu de mainArea et similarArea
    emptyAreas()

    // Appeler la fonction createMainResultElement en lui passant result
    let element = createMainResultElement(result)

    // Mettre elemtn dans mainArea
    mainArea.append(element)

    // Pour chaque artiste similaire contenu dans result, appeler la fonction
    // createSimilarArtistElement et mettre le résultat dans similarArea
    result.artist.similar.artist.forEach(similarArtist => {
      similarArea.append(createSimilarArtistElement(similarArtist))
    })
  }

  function showError(error) {
    // Vider le contenu de mainArea et similarArea
    emptyAreas()

    // Mettre l'erreur dans mainArea
    mainArea.append(error)
  }

  return { showLoading, showResult, showError }
}
