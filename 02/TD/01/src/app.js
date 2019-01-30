class Slider {
  constructor(root) {
    this.root = root
    this.slidesContainer = root.querySelector(".js-slider-slides")
    this.nbSlides = this.slidesContainer.querySelectorAll(".js-slider-slide").length
    this.currentIndex = 0

    this.goToNextSlide = this.goToNextSlide.bind(this)
    this.goToPreviousSlide = this.goToPreviousSlide.bind(this)

    this.onInit()
  }

  onInit() {
    this.interval = setInterval(this.goToNextSlide, 2000)

    this.createControls()
  }

  createControls() {
    this.previousButton = document.createElement("button")
    this.previousButton.innerHTML = "Previous"
    this.root.append(this.previousButton)
    this.previousButton.addEventListener("click", this.goToPreviousSlide)

    this.nextButton = document.createElement("button")
    this.nextButton.innerHTML = "Next"
    this.root.append(this.nextButton)
    this.nextButton.addEventListener("click", this.goToNextSlide)
  }

  destroy() {
    this.stop()
  }

  stop() {
    if (this.interval !== null) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  goToNextSlide() {
    this.stop()

    ++this.currentIndex

    if (this.currentIndex === this.nbSlides) {
      this.currentIndex = 0
    }

    this.moveSlides()
  }

  goToPreviousSlide() {
    this.stop()

    --this.currentIndex

    if (this.currentIndex < 0) {
      this.currentIndex = this.nbSlides - 1
    }

    this.moveSlides()
  }

  moveSlides() {
    const transform = `${this.currentIndex * -100}%`
    this.slidesContainer.style.transform = `translateX(${transform})`
  }
}

const sliderRoots = Array.from(document.querySelectorAll('.js-slider'))
const sliders = sliderRoots.map(root => new Slider(root))
