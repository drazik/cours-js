# TD 04 : Requêtes asynchrones

Dans ce TD, nous allons améliorer le formulaire d'inscription du TD 03 en y ajoutant
une requête asynchrone vers un serveur lorsque le formulaire est envoyé.

Lorsque le serveur réussi à traiter avec succès la requête, on affiche un
message de succès. Lorsqu'il renvoie une erreur, on affiche le message d'erreur
qu'il nous fournit, ou un message d'erreur générique.

## Mise en place

Téléchargez les sources avec npx, ou initialisez un CodeSandbox en suivant les
indications de https://github.com/drazik/cours-js#cours-javascript.

N'oubliez pas de lancer un `npm install` pour installer les dépendances du
projet.

## Présentation

L'application est divisée en deux parties : le client et le serveur.

Le client est l'application qui présente le formulaire à l'utilisateur. Le
serveur est un serveur d'exemple qui persiste les données dans une fausse base
de données. Ce n'est pas une implémentation production-ready.

Par rapport à la correction du TD 03, il y a deux nouveaux modules :

* `api.js` : gère la communication avec le serveur. Ce module doit être implémenté par vos soins
* `alert.js` : gère l'affichage d'un élément d'alerte (succès ou erreur). Ce module est déjà implémenté

Votre but est donc d'implémenter le module `api.js` et de modifier le module
`form.js` de manière à envoyer une requête au serveur lorsque le formulaire est
envoyé.

Chacun des modules a son lot de tests automatiques.

## Module api

Pour implémenter le module, vous avez à votre disposition des tests
automatiques, en lançant la commande suivante : 

```
npm run test -- --watchAll src/api.spec.js
```

Ce module expose une fonction `registerUser` qui prend en paramètre un objet de
type `FormData`. Elle envoie une requête asynchrone de type POST sur le serveur
afin que celui-ci persiste un nouvel utilisateur dans la base de données.

## Module form

Pour implémenter le module, vous avez à votre disposition des tests
automatiques, en lançant la commande suivante : 

```
npm run test -- --watchAll src/form.spec.js
```

C'est le même module que celui du TD 03, sauf que maintenant nous souhaitons
envoyer une requête au serveur lorsque le formulaire est envoyé.

Lorsque la réponse de la requête nous parvient, on souhaite afficher un message
de succès ou un message d'erreur. Le module api est implémenté de manière à
renvoyer une Promise résolue avec un objet si la requête est en succès, et
rejetée avec  une erreur si la requête est en erreur. Vous pouvez donc utiliser
l'API des Promise (`.then` et `.catch`).

## Test dans le navigateur

Nous avons maintenant 3 modules fonctionnels. Il ne nous reste plus qu'à les
utiliser pour que notre application fonctionne réellement. Pour cela, ouvrez
les fichiers `index.html` et `src/main.js`. Suivez les indications du fichier
`main.js` tout en ayant un oeil sur le fichier `index.html` pour avoir en tête
la structure HTML qui s'y trouve.

Pour tester le résultat dans le navigateur, lancez la commande :

```
npm run start
```

Et rendez vous sur `http://localhost:1234` dans votre navigateur.
