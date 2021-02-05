# TD 03 : Evénements

Dans ce TD, nous allons développer un formulaire d'inscription.

L'application présente à l'utilisateur un formulaire avec divers champs de saisie :

* Adresse e-mail
* Mot de passe
* Nom
* Prénom
* Avatar
* Description

Les champs "Adresse e-mail", "Mot de passe", "Nom" et "Prénom" sont requis.

Le champ "Avatar" propose une prévisualisation de l'image sélectionnée par l'utilisateur.

Le champ "Description" propose un compteurs de caractères restants.

Le résultat final souhaité peut être visualisé sur https://s4t0k.csb.app/

## Mise en place

Téléchargez les sources avec npx, ou initialisez un CodeSandbox en suivant les
indications de https://github.com/drazik/cours-js#cours-javascript.

N'oubliez pas de lancer un `npm install` pour installer les dépendances du
projet.

## Présentation

L'application est divisée en 3 modules : 

* `avatar.js` : gère la sélection, la prévisualisation et la suppression de l'avatar
* `description.js` : gère l'affichage du nombre de caractères restants pour la description
* `form.js` : gère la validation du formulaire

Votre but est donc d'implémenter chacun de ces modules. Les modules étants tous
indépendants, il n'y a pas d'ordre précis.

Chacun des modules a son lot de tests automatiques.

## Module avatar

Pour implémenter le module, vous avez à votre disposition des tests
automatiques, en lançant la commande suivante : 

```
npm run test -- --watchAll src/avatar.spec.js
```

Ce module propose les fonctionnalités suivantes : 

* Lorsque l'utilisateur sélectionne une image, la preview affiche cette image et un bouton "supprimer" apparaît
* Lorsque l'utilisateur click sur le bouton "Supprimer", la preview et l'input sont réinitialisés

Vous pouvez suivre les cas de test ainsi que les commentaires dans le fichier `avatar.js` pour implémenter le module.

## Module description

Pour implémenter le module, vous avez à votre disposition des tests
automatiques, en lançant la commande suivante : 

```
npm run test -- --watchAll src/description.spec.js
```

Ce module propose les fonctionnalités suivantes : 

* A l'initialisation du module, un élément contenant le nombre de caractères restants est créé et affiché
* Lorsque l'utilisateur tape ou supprime des caractères dans le champ de saisie, le compteur de caractères restants est mis à jour

Vous pouvez suivre les cas de test ainsi que les commentaires dans le fichier `description.js` pour implémenter le module.

## Module form

Pour implémenter le module, vous avez à votre disposition des tests
automatiques, en lançant la commande suivante : 

```
npm run test -- --watchAll src/form.spec.js
```

Ce module propose les fonctionnalités suivantes : 

* Lorsque l'utilisateur envoie le formulaire, on vérifie si celui-ci est valide. Si ce n'est pas le cas, on annule le comportement par défaut
* Lorsque l'utilisateur envoie le formulaire, on affiche les messages d'erreurs potentiels

Vous pouvez suivre les cas de test ainsi que les commentaires dans le fichier `form.js` pour implémenter le module.

Les messages d'erreurs sont implémentés en utilisant
[Bootstrap](https://getbootstrap.com/docs/5.0/forms/validation/). Pour qu'ils
s'affichent, il s'agit donc d'ajouter la classe `was-validated` sur le
formulaire.

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
