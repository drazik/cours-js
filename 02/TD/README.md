# TD 02 : DOM

Dans ce TD, nous allons construire une mini application de liste de courses.

L'application présente à l'utilisateur un formulaire avec un champ de saisie et
un bouton d'envoi. Lorsque l'utilisateur saisit une valeur et envoie le
formulaire, un item est ajouté à la liste.

L'utilisateur peut ensuite cocher les items, ce qui modifie leur état
visuellement, ou les supprimer complètement de la liste.

Le résultat final souhaité peut être visualisé sur https://i6ozb.csb.app/

## Mise en place

Téléchargez les sources avec npx, ou initialisez un CodeSandbox en suivant les
indications de https://github.com/drazik/cours-js#cours-javascript.

N'oubliez pas de lancer un `npm install` pour installer les dépendances du
projet.

## Présentation

L'application est divisée en 3 modules : 

* `list.js` : gère la partie "liste". Ce module expose les fonctions nécessaires à la création d'un nouvel item de la liste à partir d'un label
* `form.js` : gère la partie "formulaire". Ce module gère la saisie de l'utilisateur et prend en paramètre une fonction `onSubmit` qui nous permet de le "brancher" à un autre module
* `app.js` : assemble les modules de liste et de formulaire. Le but de ce module est de connecter la fonction `addItem` retournée par la fonction `initList` du module de liste au paramètre `onSubmit` de la fonction `initForm` du module de formulaire. Ainsi, lorsque l'utilisateur saisit et envoie une valeur, la fonction `addItem` est appelée automatiquement

Votre but est donc d'implémenter chacun de ces modules. Il est préférable de
les implémenter dans l'ordre suivant :

1. `list.js`
2. `form.js`
3. `app.js`

Mais rien n'empêche de les implémenter dans l'ordre de votre choix. Les modules
list et form sont indépendants l'un de l'autre. Seul le module app est
dépendant des deux autres.

### Module list

Le travail de ce module est de créer les éléments permettant d'afficher un
nouvel item dans la liste à partir d'un libellé reçu en paramètre. Il faut donc
faire usage des fonctions vues dans le cours pour créer ces éléments.

La fonction `initList` prend en paramètre un élément du DOM correspondant à la
liste dans laquelle les nouveaux items seront ajoutés.

Pour implémenter le module, vous avez à votre disposition des tests
automatiques, en lançant la commande suivante : 

```
npm run test -- --watchAll src/list.spec.js
```

Vous avez aussi des commentaires vous donnant les différentes étapes à
implémenter dans le fichier `src/list.js`.

### Module form

Ce module gère la saisie de l'utilisateur. Il prend en paramètre un élément du
DOM correspondant au formulaire contenant le champ de saisie et le bouton
d'envoi, ainsi qu'une fonction qui sera appelée lorsque l'utilisateur cliquera
sur le bouton d'envoi.

La fonction `onSubmit` reçue en paramètre permet de rendre ce module
indépendant du reste de l'application. Il ne sait "que" gérer la saisie de
l'utilisateur, et délègue le travail à faire lors de l'envoi du formulaire à un
autre module.

Pour implémenter le module, vous avez à votre disposition des tests
automatiques, en lançant la commande suivante : 

```
npm run test -- --watchAll src/form.spec.js
```

Vous avez aussi des commentaires vous donnant les différentes étapes à
implémenter dans le fichier `src/form.js`.

### Module app

Ce module s'occupe de l'assemblage des modules list et form. Le module list ne
sait gérer que l'ajout d'items à la liste, et le module form ne sait gérer que
la saisie de l'utilisateur. Mais le module list nous permet de créer une
fonction `addItem` qui prend en paramètre un libellé d'un item et qui ajoute un
nouvel item dans la liste. Et le module form prend en paramètre une fonction
appelée lorsque le formulaire est envoyé et qui reçoit en paramètre le libellé
saisit par l'utilisateur. Les deux peuvent donc être assemblés en passant la
fonction `addItem` issue du module list en paramètre de la fonction `initForm`
du module form.

Pour implémenter le module, vous avez à votre disposition des tests
automatiques, en lançant la commande suivante : 

```
npm run test -- --watchAll src/app.spec.js
```

Vous avez aussi des commentaires vous donnant les différentes étapes à
implémenter dans le fichier `src/app.js`.

### Test dans le navigateur

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
