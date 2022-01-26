/**
 * @param {HTMLElement} root
 */
export const init = (root) => {
  const elements = getElements(root)

  const previous = () => {
    // TODO
  }

  const next = () => {
    // TODO
  }

  return { elements, previous, next }
}

/**
 * @param {HTMLElement} root
 */
const getElements = (root) => {
  const slidesContainer = root.querySelector(".slider__slides")

  return {
    root: root,
    bullets: Array.from(root.querySelectorAll(".slider__bullet")),
    controls: {
      previous: root.querySelector(".slider__control--previous"),
      next: root.querySelector(".slider__control--next"),
    },
    slidesContainer,
    slides: Array.from(slidesContainer.querySelectorAll(".slider__slide")),
  }
}

/**
 * @typedef {Object} SliderElements
 * @property {HTMLElement} root
 * @property {HTMLElement[]} bullets
 * @property {SliderControls} controls
 * @property {HTMLElement} slidesContainer
 * @property {HTMLElement[]} slides
 */

/**
 * @typedef {Object} SliderControls
 * @property {HTMLElement} previous
 * @property {HTMLElement} next
 */
