# TD 4 : création dynamique d'éléments dans le DOM

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

Dans les TD précédents, l'ensemble des éléments nécessaires au fonctionnement
du slider étaient pré-existants dans le fichier `index.html`. Lorsque notre
script JS était exécuté, ces éléments étaient déjà disponibles. On récupérait
ces éléments et on les modifiait pour faire fonctionner le slider. 

Dans ce TD, notre but est de créer dynamiquement les éléments intéractifs du slider : 

* Bullets
* Boutons précédent et suivant

La raison derrière ce changement, est une volonté de ne pas afficher d'éléments
intéractifs inopérants sur la page si notre script JS échoue à être chargé, ou
si il plante à l'exécution.

Le but est d'implémenter la fonction `createElements`. Cette fonction reçoit en paramètre l'élément racine du slider, et doit créer les éléments suivants :

* conteneur des bullets : un élément `<div class="slider__bullets"></div>`. Cet élément contiendra les bullets
* les bullets : un tableau d'éléments `<button type="button" class="slider__bullet">go to slide {INDEX DE LA SLIDE}</button>`. Remplacer la chaîne `{INDEX DE LA SLIDE}` par l'index de la slide dans le tableau (`0`, `1`, `2`, ...)
* les boutons précédent (`<div class="slider__control slider__control--previous">Previous</div>`) et suivant (`<div class="slider__control slider__control--next">Next</div>`)

Implémentez cette fonction en utilisant les méthodes vues dans le cours :

* `document.createElement()`
* `prepend()` / `append()` / `after()` / `before()` / `replaceWith()`
* `innerHTML` / `innerText` / `textContent`

Attention, les tests sont tous désactivés par défaut dans ce TD car sans les
éléments qu'on souhaite créer, le slider ne peut pas fonctionner, donc
l'ensemble des tests échoue. Pour se focaliser sur les tests à faire passer
pour valider ce TD, recherchez `TODO` dans le fichier `slider.spec.js` et
activez les tests que vous trouvez. Une fois que ces tests passent, essayez de
réactiver tous les autres.
