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

## Module addPostForm

Lancer les tests du composant : `npm run test -- --watchAll addPostForm`

Vous pouvez vous focaliser sur un seul test en remplaçant `it` par `fit` dans
le fichier `src/addPostForm.spec.js`. De cette manière, vous n'aurez que les
erreurs de ce test qui s'afficheront. N'oubliez pas de remettre `it` une fois
que vous avez réussi à faire passer le test en question.

## Composant postsList

Lancer les tests du composant : `npm run test -- --watchAll postsList`

Vous pouvez vous focaliser sur un seul test en remplaçant `it` par `fit` dans
le fichier `src/postsList.spec.js`. De cette manière, vous n'aurez que les
erreurs de ce test qui s'afficheront. N'oubliez pas de remettre `it` une fois
que vous avez réussi à faire passer le test en question.

## Test de l'application dans le navigateur

Lancer le serveur : `npm run server`. Puis lancer l'app : `npm run watch`.

Se rendre sur http://localhost:1234
