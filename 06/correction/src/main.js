import "bootstrap/dist/css/bootstrap.css"

// Importer initResultArea du module resultArea.js
import { initResultArea } from "./resultArea"

// Importer initSearchForm du module searchForm.js
import { initSearchForm } from "./searchForm"

// Récupérer l'élément portant l'ID result-area dans le document
let resultAreaElement = document.querySelector("#result-area")

// Récupérer l'élément portant l'ID search-form dans le document
let searchFormElement = document.querySelector("#search-form")

// Lancer la fonction initResultArea en lui donnant en paramètre l'élément correspondant
let resultArea = initResultArea(resultAreaElement)

// Lancer la fonction initSearchForm en lui donnant en paramètre l'élément
// correspondant ainsi que les 3 fonctions exposées par le résultat de initResultArea
initSearchForm(
  searchFormElement,
  resultArea.showResult,
  resultArea.showError,
  resultArea.showLoading
)
