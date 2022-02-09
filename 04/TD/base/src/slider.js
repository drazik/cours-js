/**
 * @param {HTMLElement} root
 * @returns {Slider}
 */
export const init = (root) => {
  const elements = getElements(root)
  let currentIndex = 0

  const previous = () => {
    if (currentIndex === 0) {
      return
    }

    currentIndex -= 1

    update(elements, currentIndex)
  }

  const next = () => {
    if (currentIndex === elements.slides.length - 1) {
      return
    }

    currentIndex += 1

    update(elements, currentIndex)
  }

  /**
   * @param {number} index
   */
  const goTo = (index) => {
    if (index < 0) {
      throw new Error("Given an index lesser than 0")
    }

    if (index > elements.slides.length - 1) {
      throw new Error("Given an index higher than total number of slides")
    }

    currentIndex = index

    update(elements, currentIndex)
  }

  const handleBulletClick = (e) => {
    const index = elements.bullets.indexOf(e.target)
    goTo(index)
  }

  const mount = () => {
    elements.controls.previous.addEventListener("click", previous)
    elements.controls.next.addEventListener("click", next)
    elements.bullets.forEach((bullet) =>
      bullet.addEventListener("click", handleBulletClick)
    )

    update(elements, currentIndex)
  }

  const unmount = () => {
    elements.controls.previous.removeEventListener("click", previous)
    elements.controls.next.removeEventListener("click", next)
    elements.bullets.forEach((bullet) =>
      bullet.removeEventListener("click", handleBulletClick)
    )
  }

  mount()

  return { elements, previous, next, goTo, unmount }
}

/**
 * @param {HTMLElement} root
 * @returns {SliderElements}
 */
const getElements = (root) => {
  createElements(root)

  const slidesContainer = root.querySelector(".slider__slides")
  const slides = Array.from(slidesContainer.querySelectorAll(".slider__slide"))

  const bullets = Array.from(root.querySelectorAll(".slider__bullet"))

  const controls = {
    previous: root.querySelector(".slider__control--previous"),
    next: root.querySelector(".slider__control--next"),
  }

  return {
    root: root,
    bullets: bullets,
    controls: controls,
    slidesContainer: slidesContainer,
    slides: slides,
  }
}

/**
 * @param {HTMLElement} root
 */
const createElements = (root) => {
  // TODO
}

/**
 * @param {SliderElements} elements
 * @param {number} currentIndex
 */
const update = (elements, currentIndex) => {
  elements.slidesContainer.style.transform =
    "translateX(" + -100 * currentIndex + "%)"

  const controlHiddenClass = "slider__control--hidden"

  elements.controls.previous.classList.toggle(
    controlHiddenClass,
    currentIndex === 0
  )

  elements.controls.next.classList.toggle(
    controlHiddenClass,
    currentIndex === elements.slides.length - 1
  )

  elements.bullets.forEach((bullet, i) => {
    bullet.classList.toggle("slider__bullet--active", currentIndex === i)
  })
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

/**
 * @typedef {Object} Slider
 * @property {SliderElements} elements
 * @property {() => void} previous
 * @property {() => void} next
 * @property {(index: number) => void} goTo
 * @property {() => void} unmount
 */
