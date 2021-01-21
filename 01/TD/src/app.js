import { initGame } from "./game.js"

const gameElement = document.querySelector(".js-game")
const min = 1
const max = 100

initGame(gameElement, { min, max })
