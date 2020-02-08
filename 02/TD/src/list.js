/**
 * Crée un nouvel élément DOM pour un item de la liste
 *
 * @param {string} itemLabel - Le label de l'item
 *
 * @return {HTMLLiElement} L'élément créé
 */
export function createItemNode(itemLabel) {
  // 👉 Créer un élément de type li
  // let item = ...

  // 👉 Affecter la classe list__item à l'élément
  // item.className = ...

  // 👉 Créer un élément de type label
  // let label = ...
  
  // 👉 Créer un élément de type input
  // let input = ...

  // 👉 Affecter le type checkbox à l'input
  // input.type = ...

  // 👉 Créer un élément de type button
  // let button = ...

  // 👉 Affecter le type button au button

  // 👉 Affecter la classe list__remote-btn au button

  // 👉 Ajouter la chaîne '❌' dans le button
  // button.append(...)

  // 👉 Affecter la valeur 'Supprimer' à l'attribut aria-label du button

  // 👉 Ajouter l'input dans le label
  // label.append(...)

  // 👉 Ajouter itemLabel dans le label

  // 👉 Ajouter le label dans l'item

  // 👉 Ajouter le button dans l'item

  /**
   * Ajoute ou supprime l'état sélectionné à l'item
   *
   * @param {Event} e
   */
  function handleSelect(e) {
    // 👉 Ajouter la classe list__item--selected à l'item si e.target.value
    // vaut true. La retirer sinon
  }

  /**
   * Supprime l'item
   */
  function handleRemove() {
    // 👉 Supprimer l'item du DOM
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
    // let item = ...

    // 👉 Ajouter l'item à la liste
  }

  return { addItem }
}
