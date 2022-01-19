/**
 * @param {HTMLElement} root
 */
export const init = (root) => {
  const elements = getElements(root);

  return { elements };
};

/**
 * @param {HTMLElement} root
 */
const getElements = (root) => {
  return {
    root: null,
    bullets: null,
    controls: {
      previous: null,
      next: null,
    },
    slidesContainer: null,
    slides: null,
  };
};

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
