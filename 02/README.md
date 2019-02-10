# Les événements

## Slides

* Les événements : [en ligne](https://slides.com/drazik/programmation-web-client-riche-les-evenements/#/) / [PDF](les-evenements.pdf)

## TL;DR

* Un événement peut être déclenché lors de l'interaction avec un élément (click, drag...), mais pas que
* Pour réagir à un événement, on utilise la méthode `addEventListener` des éléments du DOM (exemple : `element.addEventListener("click", () => console.log("you clicked!"))`)
* Il est possible d'ajouter plusieurs listeners sur un même élément (même sur le même type d'événement)
* Pour supprimer un listener, on utilise `removeEventListener`. Les paramètres qu'on lui passent doivent être exactement les mêmes que ceux passés à `addEventListener` (exemple : `element.addEventListener("click", handler); element.removeEventListener("click", handler)`)
* Le handler se voit automatiquement passer en premier paramètre un objet décrivant l'événement qui a mené à son exécution. Cet objet contient des propriétés propres à l'événement (coordonnées de la souris, touche appuyée...)
* L'objet Event permet aussi d'empêcher le comportement par défaut du navigateur, avec `event.preventDefault`
* Un événement traverse plusieurs phases :
    * Capture : il part du haut de l'arbre DOM pour descendre jusqu'à l'élément sur lequel l'événement a été déclenché
    * Target : il arrive à l'élément sur lequel l'événement a été déclenché
    * Bubbling : il remonte jusqu'en haut de l'arbre DOM
* Il est possible de savoir quel élément a déclenché l'événement, et sur quel élément l'évenement est écouté avec `event.target` et `event.currentTarget`
* La délégation d'événement est très utile lorsqu'on a une liste dynamique d'éléments : on ajoute un listener sur l'élément qui les contient, et on n'a plus besoin d'ajouter un supprimer de listener sur chaque élément de la liste
