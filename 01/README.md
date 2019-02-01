# Introduction au JavaScript / Le Document Object Model (DOM)

## Slides

* [Introduction au JavaScript](https://slides.com/drazik/programmation-web-client-riche-introduction-au-javascript/#/)
* [Le Document Object Model (DOM)](https://slides.com/drazik/programmation-web-client-riche-le-dom/#/)

## TL;DR

* Le DOM est la représentation du document HTML sous forme d'un arbre d'objets
* La racine de cet arbre est l'objet `document`
* `document.querySelector` renvoie le premier élément correspondant à un sélecteur CSS (exemple `document.querySelector("#toto")`)
* `document.querySelectorAll` renvoie une `NodeList` contenant tous les éléments correspondant à un sélecteur CSS (exemple `document.querySelectorAll(".titi")`)
* Une `NodeList` ressemble à un tableau mais n'en est pas un. Si on a besoin d'accéder à des méthodes particulières des tableaux (map, reduce, filter...), on peut utiliser `Array.from`
* `element.innerHTML` permet de modifier le contenu HTML de `element`
* `element.textContent` permet de modifier le contenu textuel de `element`
* On peut accéder aux attributs standard d'un élément directement en accédant à la propriété correspondante de l'objet (exemple `<div id="toto" />` => `element.id`)
* Pour les attributs non standard, on utilise plutôt des attributs `data-` et on y accède via `element.dataset` (exemple `<div data-state="ready" />` => `element.dataset.state`)
* `document.createElement` permet de créer un nouvel élément (exemple `document.createElement("div")`)
* `element.append()` permet d'insérer un élément à la fin d'un autre (exemple `list.append(newItem)`)
* `element.prepend()` permet d'insérer un élément au début d'un autre (exemple `list.prepend(newItem)`)
* `element.before()` permet d'insérer un élément avant un autre (exemple `list.before(title)`)
* `element.after()` permet d'insérer un élément après un autre (exemple `list.after(legend)`)
* `element.replaceWith()` permet de remplacer un élément par un autre (exemple `item.replaceWith(newItem)`)
* `element.cloneNode()` permet de cloner un élément. On lui passe `true` en paramètre si on veut aussi cloner le contenu de l'élément
* `element.remove()` permet de supprimer un élément
* `element.className` permet d'accéder à l'attribut `class` d'un élément
* Pour modifier les classes appliquées à un élément, l'API ClassList est toute indiquée :
    * `element.classList.add("toto")` pour ajouter une classe
    * `element.classList.remove("toto")` pour supprimer une classe
    * `element.classList.toggle("toto")` pour ajouter une classe si elle n'existe pas, la supprimer sinon
    * `element.classList.contains("toto")` pour savoir si une classe existe ou non
* Pour modifier le style inline d'un élément, on utilise `element.style` (exemple : `element.style.marginLeft = "16px"`)
