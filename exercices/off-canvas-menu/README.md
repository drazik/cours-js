# Exercice : off canvas menu

L'objectif de cet exercice est d'implémenter un menu qui apparaît lorsque l'utilisateur click sur un bouton.

Pour récupérer les sources et mettre en place l'environnement de développement, lancer les commandes suivantes

```console
npx degit drazik/cours-js/exercices/off-canvas-menu off-canvas-menu
cd off-canvas-menu
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

Si vous êtes coincé(e), le fichier `menu-finished.js` contient la correction de l'exercice.

## Etape 1 : prise de connaissance du code initial

Les principaux fichiers de cet exercice sont :

- `index.html`
- `style.css`
- `main.js`
- `menu.js`

Dans le fichier `index.html`, on voit que le menu est composé de 5 éléments principaux :

- l'élément qui contient tout le reste (la racine du composant) : l'élément qui a la classe `menu`
- le bouton qui, lorsqu'on click dessus, doit ouvrir le menu : l'élément qui a la classe `menu__trigger`
- l'élément qui doit "s'ouvrir" lorsque le menu est ouvert (le "panel") : l'élément qui a la classe `menu__panel`
- l'élément qui permet de griser l'arrière-plan lorsque le menu est ouvert (on appelle cet élément un "overlay") : l'élément qui a la classe `menu__overlay`
- le bouton qui permet de fermer le menu : l'élément qui a la classe `menu__close`

Dans le fichier `style.css`, on peut voir comment le composant fonctionne. Tout est basé sur la valeur de l'attribut `aria-expanded` sur l'élément racine. Si `aria-expanded` vaut `"true"`, le menu est ouvert, donc l'overlay et le panel sont visibles. Si `aria-expanded` vaut `"false"`, alors le menu est fermé, donc l'overlay et le panel ne sont pas visibles. Le fait que ces éléments soient visible est géré par les propriétés `opacity`, `visibility` et `translate`. Une transition est appliquée pour animer l'apparition et la disparition du menu.

Dans le fichier `main.js`, le module `menu` est importé et une instance du menu est initialisée.

Dans le fichier `menu.js`, la fonction `init` est exportée. C'est ici que vous allez devoir écrire la logique de ce compoosant.

## Etape 2 : implémentationn du module `menu`

Pour implémenter ce composant, vous aurez d'abord besoin de récupérer les différents éléments utiles :

- la racine (reçue en paramètre de la fonction `init`)
- le bouton permettant d'ouvrir le menu
- le panel
- l'overlay

Une fois ces éléments reçus, il faudra ajouter des event listeners afin de :

- ouvrir le menu lorsque l'utilisateur click sur le bouton "trigger"
- fermer le menu lorsque l'utilisateur click sur l'overlay
- fermer le menu lorsque l'utilisateur click sur le bouton "close"
