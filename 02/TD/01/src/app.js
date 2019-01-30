class Slider {
  constructor(root) {
    this.root = root
    this.slidesContainer = root.querySelector(".js-slider-slides")
    this.nbSlides = this.slidesContainer.querySelectorAll(".js-slider-slide").length
    this.currentIndex = 0

    this.goToNextSlide = this.goToNextSlide.bind(this)

    this.onInit()
  }

  onInit() {
    this.interval = setInterval(this.goToNextSlide, 2000)
  }

  destroy() {
    clearInterval(this.interval)
  }

  goToNextSlide() {
    ++this.currentIndex

    if (this.currentIndex === this.nbSlides) {
      this.currentIndex = 0
    }

    const transform = `${this.currentIndex * -100}%`
    this.slidesContainer.style.transform = `translateX(${transform})`
  }
}

const sliderRoots = Array.from(document.querySelectorAll('.js-slider'))
const sliders = sliderRoots.map(root => new Slider(root))
