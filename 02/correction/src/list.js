/**
 * Crée un nouvel élément DOM pour un item de la liste
 *
 * @param {string} itemLabel - Le label de l'item
 *
 * @return {HTMLLiElement} L'élément créé
 */
export function createItemNode(itemLabel) {
  // 👉 Créer un élément de type li
  let item = document.createElement('li')

  // 👉 Affecter la classe list__item à l'élément
  item.className = 'list__item'

  // 👉 Créer un élément de type label
  let label = document.createElement('label')
  
  // 👉 Créer un élément de type input
  let input = document.createElement('input')

  // 👉 Affecter le type checkbox à l'input
  input.type = 'checkbox'

  // 👉 Créer un élément de type button
  let button = document.createElement('button')

  // 👉 Affecter le type button au button
  button.type = 'button'

  // 👉 Affecter la classe list__remote-btn au button
  button.className = 'list__remove-btn'

  // 👉 Ajouter la chaîne '❌' dans le button
  button.append('❌')

  // 👉 Affecter la valeur 'Supprimer' à l'attribut aria-label du button
  button.setAttribute('aria-label', 'Supprimer')

  // 👉 Ajouter l'input dans le label
  label.append(input)

  // 👉 Ajouter itemLabel dans le label
  label.append(itemLabel)

  // 👉 Ajouter le label dans l'item
  item.append(label)

  // 👉 Ajouter le button dans l'item
  item.append(button)

  /**
   * Ajoute ou supprime l'état sélectionné à l'item
   *
   * @param {Event} e
   */
  function handleSelect(e) {
    // 👉 Ajouter la classe list__item--selected à l'item si e.target.value
    // vaut true. La retirer sinon
    item.classList.toggle('list__item--selected', e.target.checked)
  }

  /**
   * Supprime l'item
   */
  function handleRemove() {
    // 👉 Supprimer l'item du DOM
    item.remove()
  }

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
    // 👉 Créer l'item en appelant la fonction createItemNode en lui passant le
    // label
    let item = createItemNode(label)

    // 👉 Ajouter l'item à la liste
    listElement.append(item)
  }

  return { addItem }
}
