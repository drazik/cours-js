# TD 1 : introduction à JS et premières manipulations du DOM

## Initialisation de l'environnement

### Sources du TD

Pour récupérer les fichiers du TD, ouvrez un terminal et placez-vous dans le
dossier dans lequel vous souhaitez créer le dossier du TD (idéalement pas dans
le disque réseau `Z:`) avec la commande `cd`, puis tapez la commande suivante :

```bash
npx degit drazik/cours-js/01/TD/base td-01
```

Vous pouvez remplacer `td-01` par le nom de votre choix. Ce sera le nom du
dossier dans lequel les sources vont être téléchargées.

### Installation des modules

Tapez la commande `npm install` afin de télécharger et installer les modules
npm utilisés par le TD.

### Lancement du serveur de développement local

Tapez la commande `npm run start` puis accédez à `http://localhost:1234` dans
un navigateur. La page `index.html` doit s'afficher.

### Lancement des tests automatiques

Tapez la commande `npm run test -- --watchAll`. Le retour de cette commande
doit vous indiquer que tous les tests sont "skipped". Nous les activerons un
par un dans la suite du TD.

## Implémentation

Le TD consiste à implémenter la fonction `getElements` située dans le fichier
`src/slider.js`. Le rôle de cette fonction est de récupérer dans la page un
certain nombre d'éléments qui composent le composant de slider que nous allons
développer dans ce TD ainsi que le suivant.

Pour implémenter cette fonction, une suite de tests automatiques est à votre
disposition. Ces tests se situent dans le fichier `src/slider.spec.js`. Ils
permettent de s'assurer que la fonction `getElements` renvoie les bons éléments
et ainsi valider votre travail de manière continue.

Les éléments à récupérer sont les suivants:

* Bullets (classe `slider__bullet`): il y en a plusieurs
* Slides container (class `slider__slides`): il n'y en a qu'un seul
* Slides (class `slider__slide`): il y en a plusieurs, à récupérer à partir de l'élément "Slides container"
* Control previous (class `slider__control--previous`): il n'y en a qu'un seul
* Control next (class `slider__control--next`): il n'y en a qu'un seul

Chaque test assure qu'un de ces éléments est bien récupéré. Les tests sont
désactivés par défaut. Pour les activer, changez la fonction `test.skip` en
`test`. Activez un test, faites-le passer, puis activez en un suivant. Si vous
activez tout d'un coup, plein d'erreurs vont s'afficher et ce sera compliqué
pour vous de vous concentrer sur l'implémentation d'un test.
