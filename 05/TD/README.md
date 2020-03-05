# TD

```console
# Pour lancer tous les tests
npm run test

# Pour lancer tous les tests en mode watch
npm run test -- --watchAll

# Pour lancer les tests sur un module spécifique
npm run test -- module.spec.js

# Pour lancer les tests en mode wathc sur un module spécifique
npm run test -- --watchAll module.spec.js

# Pour tester l'app dans le navigateur
# Lancer le serveur
npm run server

# Lancer l'app
npm run watch
```

## Composant AddPostForm

Lancer les tests du composant : `npm run test -- --watchAll AddPostForm`

Vous pouvez vous focaliser sur un seul test en remplaçant `it` par `fit` dans
le fichier `src/AddPostForm.spec.js`. De cette manière, vous n'aurez que les
erreurs de ce test qui s'afficheront. N'oubliez pas de remettre `it` une fois
que vous avez réussi à faire passer le test en question.

## Composant PostsList

Lancer les tests du composant : `npm run test -- --watchAll PostsList`

Vous pouvez vous focaliser sur un seul test en remplaçant `it` par `fit` dans
le fichier `src/PostsList.spec.js`. De cette manière, vous n'aurez que les
erreurs de ce test qui s'afficheront. N'oubliez pas de remettre `it` une fois
que vous avez réussi à faire passer le test en question.

## Composant App

Lancer les tests du composant : `npm run test -- --watchAll App`

Vous pouvez vous focaliser sur un seul test en remplaçant `it` par `fit` dans
le fichier `src/App.spec.js`. De cette manière, vous n'aurez que les
erreurs de ce test qui s'afficheront. N'oubliez pas de remettre `it` une fois
que vous avez réussi à faire passer le test en question.

## Test de l'application dans le navigateur

Lancer le serveur : `npm run server`. Puis lancer l'app : `npm run watch`.
