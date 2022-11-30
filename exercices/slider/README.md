# Exercice JS : slider

L'objectif est de manipuler le DOM via JavaScript afin de mettre en place les bases d'un widget de type slider (aussi appelé carousel). [Voir un exemple de slider](https://getbootstrap.com/docs/4.3/components/carousel/#with-indicators).

Nous allons :

- récupérer les éléments utiles pour faire fonctionner le slider
- manipuler le style et les attributs de ces éléments pour mettre en place la fonctionnalité de base du slider (passage d'une slide à une autre)

Pour récupérer les sources et mettre en place l'environnement de développement, lancer les commandes suivantes

```console
npx degit drazik/cours-js/exercices/slider slider
cd slider
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

## Etape 1 : prise de connaissance du code initial

```
.
├── index.html # Fichier HTML contenant la structure de la page
├── main.js # Fichier JS principal, importé par index.html. Aura pour rôle d'utiliser le module slider
├── package.json # Description de notre projet : scripts et dépendances notamment
├── package-lock.json
├── public
│   └── vite.svg
├── README.md
├── src
│   └── slider.js # Module slider, dans lequel nous allons travailler principalement
├── style.css
└── vite.config.js # Configuration de Vite (cf https://vitejs.dev/)
```

Les principaux fichiers sont :

- `index.html` : contient la structure HTML du widget slider, importe le fichier `style.css` et le fichier `main.js`
- `main.js` : récupère l'élément racine du slider et appelle la fonction `init` du module slider en lui passant la référence de cet élément
- `src/slider.js` : logique du composant slider (décrite ci-après)

## Etape 2 : prise de connaissance du module slider

Dans ce module, on trouve principalement la fonction `init` qui est la seule fonction exportée. Cette fonction prend en paramètre un élément HTML qui sera considéré comme la racine de la structure du slider (d'où son nom `root`).

Cette fonction renvoie un objet avec deux propriétés :

- `elements`: un objet contenant une référence vers les différents éléments composant le slider
- `goTo`: une fonction prenant en paramètre un nombre correspondant à l'index de la slide qu'on veut afficher

Cette fonction doit pouvoir s'utiliser ainsi : 

```js
import * as Slider from "src/slider"

// Récupération de l'élément racine du slider
const sliderRoot = document.querySelector(".slider")

// Instantiation du slider
const slider = Slider.init(sliderRoot)

// Utilisation du slider, par exemple pour afficher la slide à l'index 3
slider.goTo(3)
```

Notre objectif à partir de là est triple :

- implémenter la récupération des éléments pour alimenter la propriété `elements` de la valeur retournée par `Slider.init`
- initialiser l'état de chacun de ces éléments :
	- appliquer la classe `slider__bullet--active` sur la bullet correspondant à la slide visible (par défaut la première, soit l'index 0)
	- désactiver le bouton "previous" et/ou le bouton "next" (appelés "contrôles") si on est déjà sur la première ou la dernière slide
	- initialiser la translation du conteneur des slides (voir ci-après pour plus de détails)
- implémenter la fonction `goTo` permettant de changer la slide affichée (et changer l'état des bullets et des contrôles)

## Etape 3 : implémentation de la récupération des éléments

Pour pouvoir mettre à jour l'affichage du slider, nous avons besoin d'avoir accès à certains éléments composant le slider:

- la racine du composant : pour pouvoir rechercher les autres éléments à l'intérieur de cet élément, et pas dans tout le document
- le conteneur des slides : c'est le fait de translater cet élément horizontalement qui va nous permettre d'afficher une slide ou une autre
- les bullets : la bullet correspondant à la slide en cours d'affichage doit avoir un style particulier pour ressortir visuellement
- les contrôles : ce sont les boutons previous et next. Le bouton previous doit être désactivé lorsqu'on est sur la première slide; le bouton next doit être désactivé lorsqu'on est sur la dernière slide
- les slides : on ne modifie pas l'affichage de ces éléments, mais ils seront utiles pour savoir combien on a de slides au total (et donc savoir si on est sur la dernière ou non, par exemple)

Pour récupérer ces éléments, la fonction `init` du module slider appelle une autre fonction : `getElements`. Elle passe à cette fonction son paramètre `root`. L'objectif de la fonction `getElements` est de renvoyer un objet de la forme suivante :

```
{
	root: HTMLElement,
	bullets: Array<HTMLButtonElement>,
	controls: {
		previous: HTMLButtonElement,
		next: HTMLButtonElement
	},
	slidesContainer: HTMLElement,
	slides: Array<HTMLElement>,
}
```

Chacune de ces propriétés doit contenir les choses suivantes :

- `root` : la racine du composant (elle nous est donné en paramètre, donc il suffit d'y mettre le paramètre reçu par `getElements`)
- `bullets` : un tableau des bullets
- `controls.previous` : le bouton "previous"
- `controls.next` : le bouton "next"
- `slidesContainer` : l'élément qui contient toutes les slides
- `slides` : un tableau de toutes les slides

Pour vous aider à déterminer si vous avez récupéré les bons éléments, une suite de tests automatisés est disponible dans le fichier `src/slider.js` : https://github.com/drazik/cours-js/blob/master/exercices/slider/src/slider.js#L79-L120. Pour lancer les tests, vous pouvez ouvrir un terminal (PowerShell sur Windows), vous déplacer dans le dossier du projet puis lancer la commande `npm run test`. Pour activer un test, il faut remplacer `it.skip` par `it`. Une fois que vous avez activé un test, le terminal doit vous indiquer que le test échoue. Lisez ce que ce test vérifie et tentez de le faire passer en récupérant le (ou les) bon(s) élément(s).

## Etape 4 : initialisation de l'état des éléments

Maintenant que nous avons une référence vers chacun des éléments utiles à faire fonctionner notre slider, nous allons initialiser l'état de chacun d'eux.

Voici ce qu'on souhaite initialiser :

- le bouton "previous" est désactivé (`disabled = true`)
- le bouton "next" est désactivé si il n'y a qu'une seule slide (on est alors à la fois sur la première et la dernière) par défaut
- la première bullet possède la classe `slider__bullet--active`
- les autres bullets ne possèdent pas cette classe
- le conteneur de slides est translaté de 0%

A nouveau, une suite de tests automatisés vous aidera à implémenter ces fonctionnalités : https://github.com/drazik/cours-js/blob/master/exercices/slider/src/slider.js#L122-L153.

## Etape 5 : implémentation de la fonction `goTo`

Cette fonction permet de passer d'une slide à une autre via un index qu'elle reçoit en paramètre. Cette fonction doit :

- Vérifier que l'index reçu en paramètre est compris entre 0 et l'index de la dernière slide (soit la taille de `elements.slides` - 1)
- Si ce n'est pas le cas, alors la fonction lève une erreur (`throw new Error("message d'erreur")`)
- Si c'est le cas :
	- translater le conteneur de slides pour que la slide demandée devienne visible
	- mettre la classe `slider__bullet--active` sur la bullet correspondant à la slide active, et l'enlever sur les autres
	- désactiver le bouton "previous" si on est sur la 1ère slide
	- désactiver le bouton "next" si on est sur la dernière slide

Une autre suite de test vous aidera à valider votre travail : https://github.com/drazik/cours-js/blob/master/exercices/slider/src/slider.js#L155-L235.

## Etape 6 : tester le slider dans le navigateur

Pour lancer l'application dans votre navigateur, vous pouvez lancer la commande `npm run dev` dans un terminal. Cette commande vous affichera une URL sur laquelle vous pouvez aller pour voir le slider (par défaut `http://localhost:5173/`).

Une fois sur cette page, si on tente de cliquer sur les différents éléments, il ne se passe rien. C'est normal, puisque nous n'avons pas encore vu comment réagir aux événements (click, etc). En revanche, puisque notre fonction `Slider.init` renvoie un objet contenant la fonction `goTo`, on peut récupérer cette fonction et l'appeler.

Si on jette un oeil au fichier [`main.js`](https://github.com/drazik/cours-js/blob/master/exercices/slider/main.js#L9-L11), on voit qu'on initialiser un slider, qu'on récupère l'objet retourné par `Slider.init` dans une variable `slider`, puis qu'on met cette variable slider dans une variable globale : `window.__slider__`. Cela signifie qu'on peut taper dans la console du navigateur `window.__slider__`, et voir que ça nous renvoie l'objet retourné par `Slider.init`. On a donc accès à `window.__slider__.goTo`, et on peut donc l'appeler en lui passant un index pour faire bouger le slider :

```js
window.__slider__.goTo(1) // afficher la slide à l'index 1
window.__slider__.goTo(0) // revenir à la slide à l'index 0
window.__slider__.goTo(2) // erreur car il n'y a pas de slide à l'index 2 (il n'y a que deux slides)
```

## Conclusion

Notre slider est fonctionnel, dans le sens où l'affichage initial est géré, et nous avons une fonction qu'on peut appeler pour passer d'une slide à une autre. Il ne nous manque plus que de savoir gérer des événements pour pouvoir changer de slide lorsqu'on click sur le bouton previous, next ou sur une des bullets. Cette évolution sera le sujet d'un prochain exercice.
