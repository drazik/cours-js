# TD

Après ce que nous venons d'apprendre sur les événements, nous décidons de faire
évoluer notre application de shopping list sur deux points :

* Ajouter un bouton pour soumettre le formulaire. On veut que celui-ci soit
désactivé lorsque l'input est vide (ou ne contient que des espaces), et activé
sinon
* Gérer la suppression des items (click sur la petite croix rouge d'un item) en
utilisant la délégation d'événement : on ne veut qu'un seul gestionnaire
d'évenements, sur la liste, et pas un par item comme c'est le cas jusqu'ici
Dans ce TD, nous allons créer une application permettant de créer une liste de
courses.

Pour rappel, l'application contient deux composants :

* Le formulaire, dont le code est dans le fichier `src/form.js` et les tests dans `src/form.spec.js`
* La liste, dont le code est dans le fichier `src/list.js` et les tests dans `src/list.spec.js`

Chaque évolution est spécifique à un composant. On peut donc travailler sur
chacune d'elle de manière isolée.

## Évolution du formulaire

Après avoir fait quelques tests utilisateurs, nous nous sommes aperçus que de
nombreux des utilisateurs cherchaient un bouton pour pouvoir cliquer dessus
afin de valider leur saisie. Dans la version actuellle de l'application, le
seul moyen de valider la saisie de l'utilisateur est l'appui sur la touche
Entrée.

Les tests contenus dans le fichier `src/form.spec.js` ont été mis à jour pour
nous aider à implémenter cette évolution. Commencez par lancer ces tests :

```
npm run test -- --watchAll form.spec.js
```

Deux cas de test ont été ajoutés pour valider cette fonctionnalité :

* should disable the submit button by default if the input is empty
* should enable the submit button by default if the input has a value

Il va s'agir de faire passer ces deux tests. En réalité, si vous regardez ce que
vous affiche la console, vous verrez que le second passe déjà.

Suivez les instructions contenues dans le fichier `src/form.js` jusqu'à faire
passer ces deux tests.

Une fois que les tests passent, vous pouvez vérifier dans votre navigateur que
cette fonctionnalité est OK en lançant le serveur de développement
(`npm run watch`) puis en allant sur http://localhost:1234 dans votre navigateur.

L'état par défaut du bouton est maintenant le bon, peu importe l'état de l'input.
Mais nous voulons faire évoluer cet état en fonction de la saisie de
l'utilisateur. Pour ça, nous allons avoir besoin d'écouter l'événement `keyup` surl'input, et d'y associer une fonction qui modifie la propriété `disabled` du
bouton en fonction de la valeur de l'input.

Un test a été ajouté pour nous permettre de valider cela :

* should enable the submit button when the user types something

Ce test est pour le moment désactivé. Pour l'activer, modifiez le `xit` en `it`
dans le fichier `src/form.spec.js`. Puis suivez les indications dans `src/form.js`
pour faire passer ce test.

Une fois que le test passe, testez dans votre navigateur. Est-ce que le bouton
s'active bien dès que vous tapez quelque chose dans l'input ? Est-ce qu'il se
désactive lorsque vous videz l'input ?

Le travail sur le composant de formulaire est terminé. Bravo !

## Évolution de la liste

Les tests utilisateurs nous ont montré que notre application souffrait d'un
manque de performance sur des appareils peu performants. Une analyse a été
effectuée, et il a été identifié que le fait d'ajouter un gestionnaire
d'événement pour chaque item de la liste pour gérer leur suppression, et un
autre pour gérer leur sélection est une cause de ce problème de performance.
Pour régler ce problème, on décide d'utiliser la délégation d'évenements, afin
de n'avoir que deux gestionnaires d'événements, rattachés à la liste, plutôt qu'à
chaque item.

Les tests ont été adaptés pour cette modification. Vous pouvez lancer les tests :

```
npm run test -- --watchAll list.spec.js
```

Ils passent d'ores et déjà. C'est normal. Ceux-ci s'assurent que notre application
a le bon comportement. C'est le cas, même si les performances ne sont pas
optimales. Notre but ici est de continuer à faire passer les tests, tout en
changeant notre code (ce qu'on appelle « refactoriser »).

Pour faire cette modification, nous allons utiliser le module
[ftdomdelegate](https://github.com/Financial-Times/ftdomdelegate).

Premièrement, il faut l'ajouter aux dépendances de notre app :

```
npm install ftdomdelegate
```

Cette commande télécharge la dernière version du module dans le dossier
`node_modules` se situant à la racine de votre projet, ajoute une ligne dans le
fichier `package.json` pour indiquer que ftdomdelegate est maintenant une
dépendance du projet, et ajoute aussi des choses au fichier `package-lock.json`,
afin que lorsque quelqu'un d'autre installera les dépendances du projet, cette
personne télécharge la même version de la dépendance que vous.

Vous pouvez maintenant suivre les indications dans le fichier `src/list.js`, ainsi
que la [documentation de ftdomdelegate](https://github.com/Financial-Times/ftdomdelegate#javascript) pour ne plus attacher 2 gestionnaires d'événements à chaque
item de la liste, mais seulement 2 gestionnaires sur la liste elle-même.

Une fois ceci fait, si les tests passent toujours, alors vous pouvez tester votre
travail dans le navigateur : vous devriez toujours pouvoir sélectionner et
supprimer des items de la liste.
