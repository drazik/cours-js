# Exercice JS : slider avec événements

Cet exercice est la suite de l'exercice [slider](https://github.com/drazik/cours-js/tree/master/exercices/slider). L'objectif est d'ajouter des gestionnaires d'événements afin que le click sur les différents boutons permette de passer d'une slide à une autre.

Pour récupérer les sources et mettre en place l'environnement de développement, lancer les commandes suivantes

```console
npx degit drazik/cours-js/exercices/slider-avec-evenements slider-avec-evenements
cd slider-avec-evenements
npm install
```

Pour lancer les tests :

```console
npm run test
```

Pour lancer le serveur de développement :

```console
npm run dev
```

Si vous souhaitez lancer les tests et le serveur de développement en parallèle, c'est possible, il faut juste que vous lanciez une console pour chaque commande.

Si vous êtes coincé(e), le fichier `src/slider-finished` contient la correction de l'exercice.

## Etape 1 : gestion du click sur le bouton "next"

Dans la fonction `Slider.init`, ajoutez un gestionnaire d'événement pour réagir au click sur le bouton next. La fonction associée à cet événement doit passer à la slide suivante. Pour cela, n'oubliez pas qu'on a déjà la fonction `goTo` pour passer à une slide via un index, ainsi que la variable `index` qui stocke l'index de la slide courante.

Une suite de tests automatisés vous permet de valider votre implémentation : TODO. Vous pouvez aussi lancer un serveur de développement avec la commande `npm run dev`, et essayer de cliquer sur le bouton pour vérifier que la slide change bien.

## Etape 2 : gestion du click sur le bouton "previous"

Dans la fonction `Slider.init`, ajoutez un gestionnaire d'événement pour réagir au click sur le bouton previous. La fonction associée à cet événement doit passer à la slide précédente. Pour cela, n'oubliez pas qu'on a déjà la fonction `goTo` pour passer à une slide via un index, ainsi que la variable `index` qui stocke l'index de la slide courante.

Une suite de tests automatisés vous permet de valider votre implémentation : TODO. Vous pouvez aussi lancer un serveur de développement avec la commande `npm run dev`, et essayer de cliquer sur le bouton pour vérifier que la slide change bien.

## Etape 3 : gestion du click sur les bullets

Dans la fonction `Slider.init`, ajoutez un gestionnaire d'événement pour réagir au click sur chaque élément du tableau de bullets (`elements.bullets`). La fonction associée à cet événement doit passer à la slide correspondant à la bullet qui a été clickée.

Pour cela, vous pouvez utiliser la fonction `goTo`. Il faudra récupérer l'index correspondant à la bullet qui a été clickée. Pour cela n'oubliez pas que la méthode `forEarch` des tableaux passe l'index de chaque élément en paramètre de la fonction qu'elle reçoit.

Par exemple :

```js
const elements = ["hello", "world"]

elements.forEach((element, index) => {
	console.log(element, index)
})

/*
Affiche dans la console :
hello 0
world 1
*/
```

Voir [la documentation de `Array.forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

Une suite de tests automatisés vous permet de valider votre implémentation : TODO. Vous pouvez aussi lancer un serveur de développement avec la commande `npm run dev`, et essayer de cliquer sur les bullets pour vérifier que la slide change bien.
