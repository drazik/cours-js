# TD modules

Dans ce TD, nous allons découper le code de l'application météo du TD 3 en
modules. Nous allons utiliser le bundler [Parcel](https://en.parceljs.org/)
afin de réunir tous ces modules dans un seul fichier JS à servir aux
utilisateurs.

## Installation de Parcel

Pour installer Parcel, nous allons passer par npm. Pour cela, nous allons
d'abord initialiser un fichier `package.json` avec la commande `npm init -y`.
Celle-ci crée un fichier `package.json` avec des paramètres par défaut. Nous
pouvons maintenant installer Parcel dans notre projet, avec la commande `npm
install --save-dev parcel-bundler`. Lorsque cette commande sera terminée, vous
verrez apparaître `parcel-bundler` sous les `devDependencies` dans votre
fichier `package.json`.

## Définition des scripts d'utilisation de Parcel

Nous allons utiliser Parcel dans deux contextes distincts :

* Développement : lors de la phase de développement, nous aimerions que la compilation aille très vite, quitte à ne pas appliquer certaines optimisations au code produit par Parcel. C'est le mode par défaut de Parcel, qui y ajoute même du « Hot Module Reload », c'est à dire que notre page web va se recharger automatiquement lorsque nous sauvegarderons des modifications dans notre éditeur
* Production : à l'inverse, le bundle à servir à nos utilisateurs en production doit être le plus compact et le plus optimisé possible, même si le temps de compilation doit être un peu plus long pour ça

Pour le développement, nous allons créer un script `start`. C'est une
convention dans l'ecosystème npm. Dans la partie `scripts` de votre
`package.json`, ajoutez la ligne suivante :

```
"start": "parcel index.html"
```

Puis dans un terminal lancez la commande `npm start`. Parcel vous indique alors :

```
Server running at http://localhost:1234
```

Rendez-vous à l'URL `http://localhost:1234`, vous devriez voir votre
application météo apparaître. Vous pouvez aussi aller voir le dossier `dist`
qui a été créé par Parcel pour stocker les fichiers compilés.

Pour la production, nous allons créer un script `build` (à nouveau, c'est une
convention). Dans la partie `scripts` de votre `package.json`, ajoutez la ligne
suivante :

```
"build": "parcel build index.html"
```

Puis lancez la commande `npm run build` dans un terminal. Retournez voir le
dossier `dist`. Vous constatez que celui-ci contient toujours les fichiers du
`npm start` précédent, mais aussi ceux du `npm run build` que vous venez de
lancer. Pour éviter d'avoir des reliquats de compilations précédentes, nous
allons ajouter un script qui fera un peu de ménage.

Installez `rimraf` avec la commande `npm install --save-dev rimraf`. Puis
ajoutez le script suivant à votre `package.json`:

```
"clean": "rimraf ./dist"
```

Puis lancez la commande `npm run clean`. Vous constatez que le dossier `dist` a
été supprimé. Il ne nous reste plus qu'à lancer ce script avant chacune de nos
deux commandes précédentes :

```
"start": "npm run clean; parcel index.html",
"build": "npm run clean; parcel build index.html"
```

Dorénavant, lorsque vous lancerez `npm start` ou `npm run build`, le dossier
`dist` sera nettoyé d'abord.

Pour la suite du TD, lancez la commande `npm start` et laissez la tourner en
tâche de fond pendant tout le temps où vous developperez.

## Utilisation des modules

Il ne nous reste plus qu'à découper notre code en modules. Généralement, chaque
composant de l'application est écrit dans son propre fichier. Ici, nous avons
deux composants : `SearchForm` et `ResultArea`.

Prenez chaque classe, et déplacez-la dans son propre fichier, qui porte le même
nom que la classe (exemple : `SearchForm` => `SearchForm.js`). Une fois ceci
fait, utilisez la syntaxe `export ...` pour exporter les classes.

Puis utilisez la syntaxe `import { ... } from "..."` pour importer les classes
dans `app.js`. Le reste du code (instanciation des composants) ne change pas.
La seule différence est qu'au lieu d'avoir la définition des classes
`SearchForm` et `ResultArea` dans le fichier `app.js`, on les importe à partir
des fichiers `SearchForm.js` et `ResultArea.js`.

## Conclusion

Depuis le début de ce cours, nous avions développé chaque TD dans un seul
fichier. Cette façon de faire fonctionne pour les petites applications que nous
avions fait jusqu'ici, toutefois ça va vite devenir intenable. Le projet tutoré
ne pourrait jamais être développé dans un seul fichier par exemple.

Le système de modules de JS n'est pas encore tout à fait implémenté dans tous
les navigateurs, par conséquent nous avons besoin de passer par un bundler si
nous voulons découper notre code en modules. Ici nous avons utilisé Parcel,
mais il en existe d'autres (Rollup, Webpack...). Celui-ci nous a permit
d'écrire notre code avec des modules, et il a automatiquement généré un fichier
les regroupant pour que notre application fonctionne dans les navigateurs qui
ne supportent pas les modules.

La principale différence entre Parcel et Webpack est que Parcel ne nécessite
pas de configuration pour fonctionner. Cela ne signifie pas qu'il est mieux que
Webpack. Chacun a simplement ses avantages et ses inconvénients. Par exemple,
Webpack est plus flexible : on peut le configurer selon ses besoins.
