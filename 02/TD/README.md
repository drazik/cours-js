# TD 2 : modifications dynamique du style des éléments du DOM

## Mise en place

Lancer les commandes suivantes dans un PowerShell :

```console
$Env:NODE_TLS_REJECT_UNAUTHORIZED = 0
npm config set strict-ssl false
npm install
npm run test -- --watchAll
```

Ouvrir le dossier du TD dans VS Code.

## Implémentation

Le but est d'implémenter les fonctions `previous` et `next`. Ces fonctions ont
pour but de modifier dynamiquement le style de l'élément `slidesContainer` afin
d'afficher la slide précédente ou la slide suivante.

Pour cela, il faudra créer une variable contenant l'index de la slide en cours
d'affichage. La valeur initiale de cet index sera `0`.

Le rôle de la fonction `previous` sera de décrémenter cet index (sans qu'il
devienne inférieur à `0`), et le rôle de la fonction `next` sera d'incrémenter
cet index (sans qu'il devienne supérieur à l'index de la dernière slide).

Afin d'afficher la bonne slide, il faudra modifier la propriété
`style.transform` de l'élément `slidesContainer`. La formule à appliquer est la suivante :

```
-100 * index courant %
```

Lorsque l'utilisateur se déplace et arrive sur la 1ère slide, on souhaite
cacher l'élément `controls.previous`. De même, lorsqu'il arrive sur la dernière
slide, on souhaite cacher l'élément `slides.next`. Pour cacher ces éléments, on
peut leur affecter la classe `slider__control--hidden`.

Les éléments `bullets` doivent aussi être mis à jour pour refléter la slide
active. Pour cela, il faudra affecter la classe `slider__bullet--active` sur
l'élément `slider__bullet` correspondant à l'index de la slide courante.
