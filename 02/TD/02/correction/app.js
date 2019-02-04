class Modal {
  constructor(root) {
    this.root = root
    this.openers = Array.from(document.querySelectorAll(`.js-modal-opener[data-target="${root.id}"]`))
    this.closers = Array.from(root.querySelectorAll('.js-modal-closer'))

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.onRootClick = this.onRootClick.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)

    this.onInit()
  }

  onInit() {
    this.openers.forEach(opener => opener.addEventListener("click", this.open))
    this.closers.forEach(closer => closer.addEventListener("click", this.close))
    this.root.addEventListener("click", this.onRootClick)
    document.addEventListener("keyup", this.onKeyUp)
  }

  destroy() {
    this.openers.forEach(opener => opener.removeEventListener("click", this.open))
    this.closers.forEach(closer => closer.removeEventListener("click", this.close))
    this.root.removeEventListener("click", this.onRootClick)
    document.removeEventListener("keyup", this.onKeyUp)
  }

  open() {
    this.root.classList.add("modal-open")
  }

  close() {
    this.root.classList.remove("modal-open")
  }

  onRootClick(event) {
    if (event.currentTarget === this.root) {
      this.close()
    }
  }

  onKeyUp(event) {
    const ESC = 27

    if (event.keyCode === ESC) {
      this.close()
    }
  }
}

const modalRoots = Array.from(document.querySelectorAll(".js-modal"))
const modals = modalRoots.map(root => new Modal(root))
