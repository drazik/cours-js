# Evaluation

## Mise en place

* Dézipper l'archive envoyée sur Discord **sur le disque C:**
* Ouvrir un Powershell et se déplacer dans le dossier contenant les sources (commande `cd ...`)
* Lancer les commandes suivantes :
  * `$Env:NODE_TLS_REJECT_UNAUTHORIZED = 0`
  * `npm config set strict-ssl false`
  * `npm install`
  * `npm run test -- --watchAll`

Aucune de ces commandes ne doit renvoyer d'erreur. Le résultat final attendu
est le suivant:

```console
 PASS  src/js/Alerter.spec.js

Test Suites: 3 skipped, 1 passed, 1 of 4 total
Tests:       16 skipped, 2 passed, 18 total
Snapshots:   0 total
Time:        1.967 s
Ran all test suites.

Watch Usage
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

Vous pouvez aussi lancer un 2ème Powershell dans lequel vous pouvez lancer le serveur de développement local:

```console
npm run start
```

En cas d'erreur lors de l'exécution de cette commande, vous pouvez lancer la commande suivante:

```console
[System.Environment]::SetEnvironmentVariable('PARCEL_WORKER_BACKEND','process')
```

Puis relancer le serveur.

## Brief

L'objectif est de développer une page web permettant de faire des recherches
d'images dans l'API Images de la NASA. Le résultat final souhaité peut être vu
ici : https://nasa-gallery-nine.vercel.app/. Vous pouvez essayer de rechercher
des objets célestes via leurs noms en anglais, par exemple : "nebula", "orion",
"earth", "moon"...

Vous avez à votre disposition les fichiers suivants :

* `src/index.html`: 
* `src/css/*`: ensemble de fichiers CSS pour le style de la page. Vous n'avez pas à toucher à ces fichiers (mais rien ne vous empêche d'aller les voir par curiosité)
* `src/js/Alerter.js`: composant permettant de gérer une zone de messages d'alertes. On l'utilisera pour afficher les éventuels messages d'erreurs. Il expose une fonction `init` qui renvoie un objet contenant deux fonctions : `push` et `clear`. La fonction `push` prend en paramètre un message à afficher et l'affiche. La fonction `clear` supprime les messages en cours d'affichage
* `src/js/api.js`: module définissant les fonctions permettant de communiquer avec l'API de la NASA. Il n'y a qu'une seule fonction : `fetchImages`. Cette fonction prend en paramètre la recherche qu'on souhaite effectuer. Et elle renvoie les données que le serveur a renvoyé
* `src/js/SearchForm.js`: componsant qui gère la saisie de l'utilisateur et l'envoi de la requête au serveur
* `src/js/Gallery.js`: composant qui gère l'affichage des données renvoyées par le serveur
* `src/js/app.js`: fichier JS chargé par le fichier `index.html`. Ce module a pour but d'instancier les différents composants et de les interfacer pour arriver au résultat final

Parmi tous ces fichiers, certains sont déjà finalisés et ne nécessitent pas de travail de votre part:

* `src/index.html`
* `src/css/*`
* `src/js/Alerter.js`

Nous nous concentrerons donc sur l'implémentation des modules suivants:

* `src/js/api.js`
* `src/js/SearchForm.js`
* `src/js/Gallery.js`
* `src/js/app.js`

Pour chacun de ces modules, vous trouverez un fichier `.spec.js` contenant une
suite de tests automatisés. Dans ces fichiers, tous les tests sont désactivés
par défaut. Pour les activer, vous pouvez remplacer les appels à la fontion
`test.skip(...)` par `test(...)`. Je vous conseille d'activer les tests un par
un afin de ne pas vous faire submerger par une montagne de messages d'erreurs.

## Implémentation du module `src/js/api.js`

Ce module contient les fonctions qui vont permettre à notre application de
communiquer avec l'API Images de la NASA.

Il n'expose qu'une seule fonction : `fetchImages(query)`. Cette fonction prend
en paramètre la chaîne de caractères (string) `query` et doit retourner les
données renvoyées par l'API pour ce terme.

Pour faire une requête sur l'API, l'URL à utiliser est la suivante:

```
https://images-api.nasa.gov/search?q=RECHERCHE&media_type=image
```

Dans cette URL, le mot `RECHERCHE` doit être remplacé par les termes de la
recherche encodés pour être embarqués dans une URL. Pour cela, voir la fonction
[`encoreURIComponent`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent).

## Implémentation du module `src/api/SearchForm.js`

Ce module s'occupe de faire fonctionner le formulaire de recherche. Il expose
une fonction `init` qui prend en paramètre un élément HTML `<form>`, ainsi
qu'un objet d'options qui peut contenir les propriétés `onLoading`, `onSuccess`
et `onError`.

Vous pouvez voir la structure HTML utilisée pour ce composant dans le fichier
`src/index.html` ou dans le fichier `src/js/SearchForm.spec.js`. Le formulaire contient :

* un champ de saisie (`<input />`)
* un bouton d'envoi (`<button type="submit">...</button>`)

Les cas d'usages qu'on souhaite implémenter sont:

* Lors de l'initialisation,
  * si la valeur du champ de saisie est vide ou ne contient que des espaces, alors le bouton d'envoi doit être désactivé (`disabled`)
  * si la valeur du champ de saisie n'est pas vide, alors le bouton d'envoi doit être activé
* Lorsque l'utilisateur tape quelque chose dans le champ de saisie, le bouton d'envoi doit être activé si la saisie contient autre chose que des espaces; désactivé sinon
* Lorsque l'utilisateur envoie le formulaire
  * La fonction `onLoading` contenue dans le paramètre `options` doit être exécutée (si elle existe)
  * Le bouton d'envoi doit être désactivé
  * Une requête doit être envoyée pour récupérer les données correspondant à la saisie de l'utilisateur
  * Si la requête s'est bien passée, la fonction `onSuccess` contenue dans le paramètre `options` doit être exécutée (si elle existe) avec les données renvoyées en paramètre
  * Si la requête ne s'est pas bien passée, la fonction `onError` contenue dans le paramètre `options` doit être exécutée (si elle existe) avec en paramètre l'erreur qui a été levée
  * Dans tous les cas, le bouton d'envoi doit être réactivé

## Implémentation du module `src/api/Gallery.js`

Ce module s'occupe d'afficher les données reçues. Il expose une fonction `init`
qui prend en paramètre un élément HTML `<ul>`.

Cette fonction retourne une fonction `showImages(result)` qui prend en
paramètre le résultat d'une requête à l'API de la NASA. Cette fonction a pour
but d'afficher les éléments contenus dans le résultat de la requête dans
l'élément `root`. Chaque élément doit avoir la structure suivante :

```html
<li>
  <a href="URL DE L'IMAGE" target="_blank">
    <img src="URL DE L'IMAGE" alt="TITRE DE L'IMAGE" />
  </a>
</li>
```

L'URL de l'image est contenue dans la propriété `links[0].href` de chaque
élément renvoyé par l'API. Le titre de l'image est contenu dans la propriété
`data[0].href` de chaque élément renvoyé par l'API.

## Implémentation du module `src/js/app.js`

Ce module a pour but d'interfacer les autres modules entre eux pour arriver au
résultat final.

L'objectif est de:

* Récupérer l'élément racine du composant `Alerter` (élément qui a la classe `alerter`) et initialiser un `Alerter` avec
* Récupérer l'élément racine du composant `Gallery` (élément qui a la classe `gallery`) et initialiser un `Gallery` avec
* Récupérer l'élément racine du composant `SearchForm` (élément qui a la classe `search-form`) et initialiser un `SearchForm` avec
* Utiliser le paramètre `options` du `SearchForm` pour l'interfacer avec les composants `Alerter` et `Gallery` afin de:
  * vider l'`Alerter` lorsqu'on envoie une requête
  * afficher les données reçues dans la `Gallery`
  * afficher un message d'erreur dans l'`Alerter` lorsqu'une erreur est survenue

Vous pouvez tester le résultat directement dans votre navigateur en lançant le serveur de développement local avec la commande `npm run start`.

## Envoyer votre travail

Une fois terminé, faites une archive ZIP du dossier du projet, **sans inclure les fichiers suivants dedans**:

* `.parcel-cache`
* `dist`
* `node_modules`

Envoyez l'archive en message privé sur Discord.
