function createMainResultElement(result) {
  // Créer une div avec le className "media"
  // let root = ...

  // Créer un élément img avec le className "mr-3" et src correspondant à n'importe
  // quelle image contenue dans result
  // let img = ...

  // Créer une div avec le className "media-body"
  // let body = ...

  // Créer un h2 avec le className "mt-0" et mettre dedans le nom de l'artiste
  // let title = ...

  // Créer une div avec le className "mt-2 mb-2"
  // let tagsContainer = ...

  result.artist.tags.tag.forEach(tag => {
    // Créer un élément a avec le className "badge badge-pill badge-info", un
    // href correspondant à l'url du tag et mettre dedans le nom du tag
    // let link = ...

    // Mettre link dans tagsContainer
    // ...
  })

  // Créer un élément p avec le className "mt-4"
  // let bio = ...

  // Mettre la bio de l'artiste dans le innerHTML de bio
  // bio.innerHTML = ...

  // Mettre title, tagsContainer et bio dans body
  // ...

  // Mettre img et body dans root
  // ...

  return root
}

function createSimilarArtistElement(artist) {
  // Créer une div avec le className "col-sm"
  // let root = ...

  // Créer une div avec le className "card"
  // let card = ...

  // Créer un élément img avec le className "card-img-top"
  // let img = ...

  // Mettre dans img.src une image contenue dans l'objet artist
  // img.src = ...

  // Créer une div avec le className "card-body"
  // let body = ...

  // Créer un h5 avec le className "card-title"
  // let title = ...

  // Mettre le nom de l'artiste dans title
  // ...

  // Créer un élément a avec le className "btn btn-primary"
  // let link = ...

  // Mettre l'url de l'artiste dans link.href
  // link.href = ...

  // Mettre "Voir sur last.fm" dans link
  // ...

  // Mettre title et link dans body
  // ...

  // Mettre img et body dans card
  // ...

  // Mettre card dans root
  // ...

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
  // let mainArea = ...

  // Récupérer l'élément qui porte l'ID similar-artists dans rootElement
  // let similarArea = ...

  function showLoading() {
    // Vider le contenu de mainArea et similarArea
    // ...
    
    // Mettre "Chargement..." dans mainArea
    // ...
  }

  function showResult(result) {
    // Vider le contenu de mainArea et similarArea
    // ...

    // Appeler la fonction createMainResultElement en lui passant result
    // let element = ...

    // Mettre elemtn dans mainArea
    // ...

    // Pour chaque artiste similaire contenu dans result, appeler la fonction
    // createSimilarArtistElement et mettre le résultat dans similarArea
    // ...
  }

  function showError(error) {
    // Vider le contenu de mainArea et similarArea
    // ...

    // Mettre l'erreur dans mainArea
    // ...
  }

  return { showLoading, showResult, showError }
}
