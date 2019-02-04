class Modal {
  constructor(root) {
    this.root = root

    // Récupération des éléments nécessaires au fonctionnement de la modale
    // ...


    // On attache `this` aux méthodes qui en ont besoin
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)

    this.onInit()
  }

  onInit() {
    // Initialisation des event listeners sur les openers et les closers
    // ...
  }

  destroy() {
    // Suppression des event listeners
    // ...
  }

  open() {
    // ...
  }

  close() {
    // ...
  }
}

const modalRoots = Array.from(document.querySelectorAll(".js-modal"))
const modals = modalRoots.map(root => new Modal(root))
