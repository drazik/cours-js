# TD

Dans ce TD, nous allons créer une application permettant de créer une liste de
courses.

L'application est composée de deux parties :

* Un formulaire permettant à l'utilisateur de saisir les noms des produits à ajouter dans sa liste
* Une liste dans laquelle il est possible d'ajouter, supprimer et cocher des éléments

Chacune de ces parties est appelée "composant". Chaque composant a son propre
fichier, et ses tests (form.js et form.spec.js pour le formulaire; list.js et
list.spec.js pour la liste). Puis ces deux composants sont "assemblés" dans le
fichier app.js.

## Le formulaire

Lancer les tests :

```console
npm run test -- --watchAll src/form.spec.js
```

Ouvrir le fichier `src/form.js` dans votre éditeur, et suivre les indications.
Lorsque tous les tests passent avec succès, votre travail est terminé sur ce
composant.

## La liste

Lancer les tests :

```console
npm run test -- --watchAll src/list.spec.js
```

Ouvrir le fichier `src/list.js` dans votre éditeur, et suivre les indications.
Lorsque tous les tests passent avec succès, votre travail est terminé sur ce
composant.

## Assemblage

Lancer le serveur de développement :

```console
npm run watch
```

Ouvrir un onglet de navigateur sur http://localhost:1234.

Ouvrir le fichier `src/app.js` dans votre éditeur, et suivre les indications.
Tester l'application dans le navigateur au fur et à mesure.
