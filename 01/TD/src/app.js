import { initGame } from './game.js'

let form = document.querySelector('form')
let result = document.querySelector('.js-result')
let min = 1
let max = 100

initGame(form, result, min, max)
