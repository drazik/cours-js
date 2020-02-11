/**
 * Crée un nouvel élément DOM pour un item de la liste
 *
 * @param {string} itemLabel - Le label de l'item
 *
 * @return {HTMLLiElement} L'élément créé
 */
export function createItemNode(itemLabel) {
  let item = document.createElement('li')
  item.className = 'list__item js-list-item'

  let label = document.createElement('label')
  
  let input = document.createElement('input')
  input.type = 'checkbox'
  input.className = 'js-list-item-checkbox'

  let button = document.createElement('button')
  button.type = 'button'
  button.className = 'list__remove-btn js-list-item-remove'
  button.append('❌')
  button.setAttribute('aria-label', 'Supprimer')

  label.append(input)
  label.append(itemLabel)

  item.append(label)
  item.append(button)

  /**
   * Ajoute ou supprime l'état sélectionné à l'item
   *
   * @param {Event} e
   */
  function handleSelect(e) {
    item.classList.toggle('list__item--selected', e.target.checked)
  }

  /**
   * Supprime l'item
   */
  function handleRemove() {
    item.remove()
  }

  // 👉 Supprimer ces event listeners
  input.addEventListener('change', handleSelect)
  button.addEventListener('click', handleRemove)


  return item
}

/**
 * Initialise la liste
 *
 * @param {HTMLUListElement} listElement - La liste d'items
 *
 * @return {Object}
 */
export function initList(listElement) {
  /**
   * Crée un nouvel item et l'ajoute à la liste
   *
   * @param {string} label
   */
  function addItem(label) {
    let item = createItemNode(label)

    listElement.append(item)

    return item
  }

  // 👉 Ajouter une délégation d'événement sur `listElement`, pour l'événement
  // `change`, sur les éléments qui ont la classe `js-list-item-checkbox`
  // ...


  // 👉 Ajouter une délégation d'événement sur `listElement`, pour l'événement
  // `click`, sur les éléments qui ont la classe `js-list-item-remove`
  // ...

  return { addItem }
}
