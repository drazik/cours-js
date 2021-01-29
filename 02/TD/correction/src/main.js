// 👉 Importer la fonction initApp à partir du module app
import { initApp } from "./app"

// 👉 Récupérer l'élément portant la classe js-form
const formElement = document.querySelector(".js-form")

// 👉 Récupérer l'élément portant la classe js-list
const listElement = document.querySelector(".js-list")

// 👉 Appeler la fonction initApp en lui passant l'élément de formulaire
// et l'élément de liste
initApp(formElement, listElement)
