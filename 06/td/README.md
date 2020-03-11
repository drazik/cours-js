# TD noté

Dans ce TP, nous allons développer une application permettant de récupérer des
données sur des artistes et groupes musicaux. Pour cela, nous allons utiliser
l'API de [Last.fm](https://www.last.fm/home).

Le but de l'application est de permettre à l'utilisateur de taper le nom
d'un(e) artiste dans un champ de saisie, puis de cliquer sur un bouton pour
récupérer des infos sur cet(te) artiste : image, bio, tags, artistes
similaires...

L'API de Last.fm nécessite de créer un compte et une application sur leur site
afin de récupérer une clef d'API qui est nécessaire pour pouvoir faire des
appels à l'API. Toutefois, dans le but de ne pas perdre de temps avec des
détails qui ne concernent pas directement le sujet de ce TD, vous n'avez pas
besoin de créer un compte sur l'API Last.fm. Vous recevrez via Slack une liste
de 20 clefs API. Prenez celle qui figure à côté de votre nom.

## 1ère étape : analyse des sources

Vous pouvez télécharger les sources ici : [td.zip](../td.zip).

Dézippez cette archive sur le disque C: de votre machine. Vous retrouverez une structure habituelle. Dans le dossier src, il y a :

* Un fichier `index.html` : la structure générale de l'app y figure déjà. Ce fichier n'a pas besoin d'être modifié.
* Un fichier `main.js` : ce fichier ne fait qu'importer le CSS de bootstrap pour le moment. Il faudra initialiser les différents modules nécessaires au fonctionnement de l'app dans ce fichier
* Un fichier `api.js` et `api.spec.js` : c'est le module qui s'occupera de faire les appels fetch sur l'API de Last.fm
* Un fichier `searchForm.js` et `searchForm.spec.js` : dans ce fichier, il sera question de suivre les indications pour développer le module correspondant au formulaire de recherche
* Un fichier `resultArea` et `resultArea.spec.js` : dans ce fichier, il sera question de suivre les indications pour développer le module correspondant à la zone d'affichage du résultat de la recherche
* Un fichier `data.json` : ce fichier n'est utilisé que pour simuler l'API Last.fm dans les tests, vous n'avez pas besoin d'y toucher

## 2ème étape : installation des dépendances

Lancez un terminal, déplacez-vous (avec la commande `cd`) dans le dossier
contenant le projet, puis lancez `npm install`.

## 2ème étape : implémentation du module api.js

Commencez par lancer les tests pour ce module en lançant la commande `npm run
test -- --watchAll api`.

Ouvrez le fichier `src/api.js`. Dans ce fichier, collez la clef d'API qui
correspond à votre nom dans la liste envoyée sur Slack. Puis suivez les
indications en commentaires ainsi que les erreurs des tests qui échouent pour
implémenter la fonction `getArtistInfo`. Cette fonction fait un appel GET à
l'API Last.fm avec fetch, puis elle parse la réponse en JSON. Si les données
contiennent un champ `error`, alors elle `throw` une nouvelle erreur ayant pour
message le champ `message` des données, sinon elle renvoie les données.

## 3ème étape : implémentation du module resultArea.js

Commencez par lancer les tests pour ce module en lançant la commande `npm run
test -- --watchAll resultArea`, puis ouvrez le fichier `src/resultArea.js` et
suivez les indications qui s'y trouvent en commentaires.

Le rôle de ce module est de manipuler le DOM de la page pour refléter l'état de l'application :

* Chargement en cours
* Données reçues
* Erreur reçue

Pour cela, la fonction `initResultArea` crée 3 fonctions : `showLoading`,
`showResult` et `showError`.

La zone de résultat est découpée en 2 sous-zones :

* La zone principale (main-area)
* La zone des artistes similaires (similar-artists)

Lors du chargement, la zone principale doit afficher "Chargement..." et la zone des artistes similaires doit être vide.

Lors d'une erreur, la zone principale doit afficher le message de l'erreur et la zone des artistes similaires doit être vide.

Lorsqu'il y a un résultat, chaque zone doit afficher les données qui lui correspondent :

* La zone principale affiche les informations de l'artiste lui-même : image, nom, tags associés, biographie
* La zone des artistes similaires affiche l'image, le nom et un lien "Voir sur last.fm" pour chaque artiste similaire

Le DOM de la zone principale lorsqu'un résultat est affiché doit être celui-ci :

```html
<div class="media">
  <img src="{IMAGE DE L'ARTISTE}" alt="" class="mr-3" />
  <div class="media-body">
    <h2 class="mt-0">{NOM DE L'ARTISTE}</h2>
    <div class="mt-2 mb-2">
      <a href="{URL TAG 1}" class="badge badge-pill badge-info">{TAG 1}</a>
      <a href="{URL TAG 2}" class="badge badge-pill badge-info">{TAG 2}</a>
      <a href="{URL TAG 3}" class="badge badge-pill badge-info">{TAG 3}</a>
      <a href="{URL TAG 4}" class="badge badge-pill badge-info">{TAG 4}</a>
      <a href="{URL TAG 5}" class="badge badge-pill badge-info">{TAG 5}</a>
    </div>
    <p class="mt-4">
      {RÉSUMÉ DE LA BIO DE L'ARTISTE}
    </p>
  </div>
</div>
```

Le DOM de chaque artiste similaire lorsqu'un résultat est affiché doit être celui-ci :

```html
<div class="col-sm">
  <div class="card">
    <img src="{IMAGE DE L'ARTISTE SIMILAIRE}" class="card-img-top" alt="" />
    <div class="card-body">
      <h5 class="card-title">{NOM DE L'ARTISTE SIMILAIRE}</h5>
      <a href="{URL DE L'ARTISTE SIMILAIRE}" class="btn btn-primary">Voir sur Last.fm</a>
    </div>
  </div>
</div>
```

Référez-vous au fichier `src/data.json` pour voir à quoi ressemble un résultat renvoyé par l'API de Last.fm.

## 4ème étape : implémentation du module searchForm.js

Commencez par lancer les tests pour ce module en lançant la commande `npm run
test -- --watchAll searchForm`, puis ouvrez le fichier `src/searchForm.js` et
suivez les indications qui s'y trouvent en commentaires.

Ce module s'occupe de récupérer la saisie de l'utilisateur et de l'utiliser
pour récupérer les informations sur l'artiste voulu via la fonction
`getArtistInfo` du module api.

Il ne s'occupe pas lui-même même de l'affichage correspondant à chaque étape et
état de la requête. Pour cela, `initSearchForm` prend en paramètre 3 fonctions
: `onSuccess`, `onError` et `onLoading`.

`onLoading` est à appeler lorsque la requête est lancée; `onSuccess` est à
appeler lorsque la reponse à la requête est arrivée et que ce n'est pas une
erreur et elle prend en paramètre les données reçues; `onError` est à appeler
lorsque la réponse à la requête est arrivée et que c'est une erreur et elle
prend en paramètre l'erreur reçue.

Le bouton submit doit être désactivé lorsque le champ de saisie est vide ou que
la requête est en état de chargement, et activé dans tous les autres cas.

## 5ème étape : assemblement des modules dans main.js

Ouvrez le fichier `main.js` et suivez les indications. Le but est d'initialiser les deux modules (resultArea et searchForm). `initSearchForm` prendra en paramètre les fonctions exposées par le module `resultArea` :

* `onSuccess` : `showResult`
* `onError` : `showError`
* `onLoading` : `showLoading`

Vous pouvez maintenant lancer la commande `npm run watch` et aller sur
`http://localhost:1234` dans votre navigateur pour voir et tester votre
application, et éventuellement faire quelques retouches si besoin.

## 6ème étape : envoi du résultat

Une fois terminé, vous pouvez créer un fichier ZIP avec vos sources. N'incluez
pas les dossiers `node_modules`, `dist` et `.cache` dans l'archive. Envoyez le
ZIP par Slack ou par mail.
