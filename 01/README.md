# TD Introduction à JavaScript dans le navigateur

Pour ce premier TD, nous allons réaliser un mini-jeu dans lequel nous générons
un nombre aléatoire compris entre 0 et 100 et demandons à l'utilisateur de
tenter de le deviner. Celui-ci sera guidé après chaque saisie par un message du
type "c'est plus" / "c'est moins". Lorsqu'il aura trouvé le nombre, on lui
proposera de rejouer.

## Initialisation de l'environnement

### NodeJS / npm

Pour travailler sur ce TD, vous aurez besoin d'un environnement NodeJS
fonctionnel sur votre machine. Pour cela, rendez vous sur
https://nodejs.org/en/ afin de télécharger l'installateur de NodeJS, puis
lancez-le.

Une fois l'installation terminée, ouvrez un terminal (Powershell sur Windows),
puis tapez les commandes suivantes :

```bash
node -v
npm -v
npx -v
```

Chacune de ces commandes doit vous retourner un numéro de version, sans erreur.

### Sources du TD

Pour récupérer les fichiers du TD, placez-vous dans le dossier dans lequel vous
souhaitez créer le dossier du TD, puis tapez la commande suivante :

```bash
npx degit drazik/cours-js/01/TD td-01
```

Vous pouvez remplacer `td-01` par le nom de votre choix. Ce sera le nom du
dossier dans lequel les sources vont être téléchargées.

### Installation des modules

Tapez la commande `npm install` afin de télécharger et installer les modules
npm utilisés par le TD.

## Implémentation du module `utils`

En premier lieu, implémentez la fonction `generateRandomNumber` au
sein du module `utils` (fichier `src/utils.js`).

Afin de valider votre code, une suite de tests automatiques vous est fournie. Vous pouvez lancer ces tests en tapant la commande suivante :

```bash
npm run test -- --watchAll src/utils.spec.js
```

Cette commande lance les tests en mode "watch". C'est à dire qu'elle ne vous
rend pas la main car elle observe le fichier `src/utils.spec.js` afin de
relancer automatiquement la suite de tests à chaque fois que vous effectuerez
une modification dessus.

Vous verrez que les tests de ce module sont actuellement tous en echec.
L'environnement de test vous explique pour chaque test l'erreur qu'il a
rencontré. Par exemple : 


```
  ● generateRandomNumber › Lorsque Math.random renvoie une valeur entre 0 et 1 › renvoie la valeur associée dans l'intervalle entre le minimum et le maximum passés à la fonction

    expect(received).toBe(expected) // Object.is equality

    Expected: 25
    Received: undefined

      27 |     it("renvoie la valeur associée dans l'intervalle entre le minimum et le maximum passés à la fonction", () => {
      28 |       randomSpy.mockReturnValue(0.25)
    > 29 |       expect(generateRandomNumber(1, 100)).toBe(25)
         |                                            ^
      30 |
      31 |       randomSpy.mockReturnValue(0.5)
      32 |       expect(generateRandomNumber(1, 100)).toBe(50)

      at Object.<anonymous> (src/utils.spec.js:29:44)
```

Ce message vous indique que le test s'attendait à ce que l'appel à la fonction
`generateRandomNumber(1, 100)` retourne la valeur `25`.

Votre but est de faire passer tous les tests de ce module. Vous aurez alors l'affichage suivant :

```
 PASS  src/utils.spec.js
  generateRandomNumber
    Lorsque Math.random renvoie 0
      ✓ renvoie la valeur minimum passée à la fonction (1 ms)
    Lorsque Math.random renvoie 1
      ✓ renvoie la valeur maximum passée à la fonction
    Lorsque Math.random renvoie une valeur entre 0 et 1
      ✓ renvoie la valeur associée dans l'intervalle entre le minimum et le maximum passés à la fonction

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        2.415 s
Ran all test suites matching /src\/utils.spec.js/i.
```

Si vous souhaitez désactiver un test temporairement, vous pouvez modifier la
fonction `it` correspondant à ce test en `xit`. A l'opposé, si vous souhaitez
vous focaliser sur un test et désactiver tous les autres, vous pouvez modifier
la fonction `it` correspondant à ce test en `fit`. Pensez à réactiver les tests
désactivés après.

Pour plus d'informations sur l'environnement de tests, voir https://jestjs.io/

N'hésitez pas à chercher sur Google pour trouver la formule permettant de
générer un nombre aléatoire entre deux bornes en JavaScript.

## Implémentation du module `game`

C'est le module `game` qui contient toute la logique du jeu. Celui-ci expose
une fonction `initGame` qui prend en paramètre un élément HTML (nous en
parlerons plus longuement lors de la prochaine séance) correspondant à
l'élément "racine" de notre widget de jeu.

A partir de cet élément, la fonction récupère les autres éléments essentiels : 

* le formulaire contenant le champ de saisie et le bouton "OK"
* le champ de saisie
* le bouton "OK"
* l'élément dans lequel on va afficher le résultat de chaque essai
* le bouton "rejouer"

Tout ceci est déjà fonctionnel. Votre rôle est d'implémenter la logique qui
s'exécute lorsque l'utilisateur saisit une nombre et envoie le formulaire. Pour
cela, vous pouvez suivre les commentaires précédés d'un "👉" dans le fichier
`src/game.js`. De plus, de la même manière que pour le module `utils`, une suite de tests vous permettra de valider votre travail. Pour lancer la suite de tests, utilisez la commande suivante :

```
npm run test -- --watchAll src/game.spec.js
```

Cette suite de tests contient plus de test que celle du module `utils`. Pensez
à utiliser les fonctions `xit` et `fit` afin de désactiver temporairement
certains tests et vous concentrer sur d'autres.

## Test du jeu dans le navigateur

Une fois que vous avez réussi à faire passer les tests des deux modules, il est
temps de tester le jeu en condition réelle ! Pour ça, tapez la commande suivante :

```
npm run start
```

Cette commande fait appel à Parcel, que nous avions déjà évoqué lors du cours
CDIN pour ses fonctionnalités de rechargement automatique dans le navigateur à
chaque modification d'un fichier source. Ici, Parcel nous est utile car il va
"bundler" notre code, c'est à dire regrouper tous nos modules dans un fichier,
que le navigateur est capable de comprendre et d'exécuter.

Si tout se passe bien, la commande doit vous lancer un serveur sur
`http://localhost:1234`. Entrez cette URL dans votre navigateur et essayez de
jouer au jeu.
