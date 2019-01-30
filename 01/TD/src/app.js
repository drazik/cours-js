class Slider {
  constructor(root) {
    // Initialisation des propriétés de l'objet
    this.root = root
    this.slidesContainer = root.querySelector('.js-slider-slides')
    this.slides = this.slidesContainer.querySelectorAll('.js-slider-slide')
    this.nbSlides = this.slides.length
    this.currentIndex = 0
    this.delay = parseInt(root.dataset.delay) || 2000

    // Le `this` doit être attaché explicitement à certaines méthodes
    // C'est un sujet un peu délicat dont nous parlerons en détail
    this.goToNextSlide = this.goToNextSlide.bind(this)

    this.onInit()
  }

  onInit() {
    // Initialisation des événements, timeout, intervals...
    // Tout ce qui devra être nettoyé à la destruction du composant

    // `setInterval` renvoie un identifiant, qu'on stocke afin de
    // pouvoir l'utiliser pour arrêter l'intervalle si le composant
    // est détruit
    this.interval = setInterval(this.goToNextSlide, this.delay)
  }

  destroy() {
    // Suppression des événements, nettoyage des timeouts et intervalles...
    clearInterval(this.interval)
  }

  goToNextSlide() {
    ++this.currentIndex // currentIndex = currentIndex + 1

    if (this.currentIndex === this.nbSlides) {
      this.currentIndex = 0
    }

    const transform = -100 * this.currentIndex
    this.slidesContainer.style.transform = `translateX(${transform}%)`
  }
}

const slidersRoots = Array.from(document.querySelectorAll('.js-slider'))
const sliders = slidersRoots.map((root, index) => new Slider(root))
