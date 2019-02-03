const createSlider = root => {
  const slidesContainer = root.querySelector('.js-slider-slides')
  const slides = slidesContainer.querySelectorAll('.js-slider-slide')
  const nbSlides = slides.length
  let currentIndex = 0
  const delay = parseInt(root.dataset.delay) || 2000

  const goToNextSlide = () => {
    ++currentIndex // currentIndex = currentIndex + 1

    if (currentIndex === nbSlides) {
      currentIndex = 0
    }

    const transform = -100 * currentIndex
    slidesContainer.style.transform = `translateX(${transform}%)`
  }

  const interval = setInterval(goToNextSlide, delay)

  const destroy = () => clearInterval(interval)

  return {
    destroy: destroy
  }
}

const slidersRoots = Array.from(document.querySelectorAll('.js-slider'))
const sliders = slidersRoots.map(root => createSlider(root))
