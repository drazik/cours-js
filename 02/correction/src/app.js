// 👉 importer les fonctions initForm et initList à partir des fichiers form.js
// et list.js
import { initForm } from './form'
import { initList } from './list'

/**
 * Initialise l'app
 *
 * @param {HTMLFormElement} formElement - Le formulaire d'ajout d'un item
 * @param {HTMLUListElement} listElement - La liste contenant les items
 */
function init(formElement, listElement) {
  // 👉 initialiser la liste en appelant la fonction initList en lui passant
  let list = initList(listElement)

  // 👉 initialiser le formulaire en appelant la fonction initForm
  initForm(formElement, list.addItem)
}

// 👉 Récupérer l'élément portant la classe js-form
let formElement = document.querySelector('.js-form')

// 👉 Récupérer l'élément portant la classe js-list
let listElement = document.querySelector('.js-list')

init(formElement, listElement)
