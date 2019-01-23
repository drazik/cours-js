# TD Document Object Model

Dans ce TD, nous allons réaliser un slider :

![](./example.gif)

Ce slider fonctionne automatiquement : il passe à la slide suivante selon un intervalle donné, et lorsqu'il est arrivé à la dernière slide, il revient à la première.

Les sources HTML et CSS vous sont données dans le dossier `src`. Nous allons
les passer en revue ensemble.

## 1ère étape : récupération des éléments utiles

Pour faire fonctionner le slider, vous avez besoin de plusieurs choses :

* L'élément DOM « racine » du slider
* L'élément DOM qui contient les slides
* Le nombre total de slides
* L'index de la slide en cours d'affichage

Récupérez ces éléments grâce aux fonctions vues en cours (`document.querySelector`, `document.querySelectorAll`...), et affichez-les dans la console avec `console.log`.

Par exemple :

```js
const container = document.querySelector('.js-container')
console.log(container)
```

Une fois que vous avez tous ces éléments, vous pouvez passer à la suite.

## 2ème étape : exécuter une fonction à intervalle régulier

Pour cela, commencez par écrire une fonction `goToNextSlide` qui ne fait qu'afficher la date courante avec `console.log(new Date())`. Ensuite, passez cette fonction à la fonction `setInterval` :

```js
const FIVE_SECONDS = 5000
setInterval(goToNextSlide, FIVE_SECONDS)
```

Vérifiez qu'un message s'affiche bien dans votre console à intervalle régulier.

## 3ème étape : implémenter la fonction `goToNextSlide`

Cette fonction incrémente l'index de la slide en cours d'affichage, et modifie le style de l'élément DOM qui contient les slides afin de le décaler comme il faut pour afficher la bonne slide.

Une fois que le bon index est calculé. Il ne vous reste plus qu'à modifier le style le l'élément qui contient les slides pour lui appliquer la transformation suivante :

```
transform : translateX((index * -100)%)
```

Pour cela, passez par la propriété `style.transform` de l'élément : `element.style.transform = ...`

Une fois ceci fait avec succès, la première version de votre slider est fonctionnelle.

## 4ème étape : refactoring

Notre composant fonctionne. Nous allons maintenant le remanier un peu pour
mieux l'isoler et ainsi le rendre plus simple à maintenir et à utiliser. Il y a
pour ça deux approches possibles.

### Méthode « orienté objet »

Nous allons définir une classe et allons utiliser un schéma bien précis. Ce
schéma va nous permettre d'initialiser une instance de notre composant en lui
passant simplement son élément « racine ». À partir de celui-ci, l'instance
retrouvera les différents éléments dont elle a besoin et s'initialisera
correctement. Elle proposera aussi une méthode `destroy` permettant d'arrêter
le slider et de faire le ménage afin de ne pas utiliser des ressources pour
rien.

```js
class Slider {
  constructor(root) {
    // Initialisation des propriétés de l'objet
    this.root = root
    // ...

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
    this.interval = setInterval(this.goToNextSlide, 5000)
  }

  destroy() {
    // Suppression des événements, nettoyage des timeouts et intervalles...
    clearInterval(this.interval)
  }

  goToNextSlide() {
    // Notre fonction principale, à mettre à jour pour qu'elle utilise
    // les propriétés de l'objet, plutôt que des variables globales
  }
}
```

Ce schéma permet d'initialiser un ou plusieurs sliders indépendants sur la même
page :

```js
const sliderRoots = Array.from(document.querySelectorAll('.js-slider'))
const sliders = sliderRoots.map(root => new Slider(root))

// Plus tard, si on a besoin de détruire les sliders :
sliders.forEach(slider => slider.destroy())
```

### Méthode « fonctionnelle »

Cette méthode n'utilise pas une classe mais seulement des fonctions, d'où son
nom. Ici le but est d'initialiser le composant, toujours à partir de son
élément « racine », mais cette fois-ci plutôt que de créer une instance d'un
objet, on ne renvoie qu'une fonction qui permettra de détruire le composant :

```js
function createSlider(root) {
  // Initialisation des variables à partir de `root`

  function goToNextSlide() {
    // La fonction principale
  }

  // Initialisation des événements, timeouts, intervalles
  const interval = setInterval(goToNextSlide, 5000)

  function destroy() {
    // Nettoyage des événements, timeouts, intervalles
    clearInterval(interval)
  }

  return destroy
}
```

Cette méthode permet de ne pas avoir à se soucier de la résolution du `this`,
puisqu'elle n'en utilise pas. Notre composant s'utiliserait de la façon suivante :

```js
const sliderRoots = Array.from(document.querySelectorAll('.js-slider'))
const slidersDestroy = sliderRoots.map(root => createSlider(root))

// Plus tard, si on a besoin de détruire les sliders :
slidersDestroy.forEach(destroy => destroy())
```

## Conclusion

Lors de ce TD, vous avez donc développé un premier composant en JavaScript. Celui-ci était relativement simple, mais il vous aura permis de voir plusieurs choses :

* JavaScript est un langage qui se prête autant aux patterns orientés objets
qu'aux patterns fonctionnels
* Un schéma clair afin de développer des composants isolés et réutilisables
(que ce soit avec une méthode ou l'autre)

## Bonus : améliorations possibles

* Rendre la durée de l'intervalle paramétrable : pensez aux attributs `data-*`
* Rendre le slider infini : lorsqu'une slide est passée, on la déplace après
les autres slides dans le DOM. Ainsi, visuellement, le slider ne fait que
passer à la slide suivante, sans jamais revenir brutalement à la première
slide. Il faudra faire attention au décalage et aux transitions
