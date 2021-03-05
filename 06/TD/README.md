# TD 6 : Single Page Application

Le but de ce TD est de développer une application client de type Single Page Application (SPA) composée de 3 routes : 

* `/register` : formulaire d'inscription
* `/login` : formulaire de connexion
* `/` : page protégée nécessitant que l'utilisateur soit connecté pour être visible

L'application client communique avec un serveur dont l'implémentation est
disponible dans le dossier `server`. Ce serveur implémente deux endpoints :

* `/register` : enregistre un utilisateur en base de données
* `/login` : authentifie un utilisateur

Chacun de ces endpoints prend en entrée des données au format JSON ou FormData,
et renvoie en sortie des données au format JSON. Plus de détails sur les
données d'entrée et de sortie sont fournis un peu plus bas.

Côté client, nous souhaitons implémenter la logique suivante :

Lorsque l'utilisateur arrive sur l'application, on lui affiche la page demandée :

* Si l'URL est `/`, on affiche la page d'accueil
* Si l'URL est `/login`, on affiche la page de login
* Si l'URL est `/register`, on affiche la page d'inscription

Toutefois, lorsque l'utilisateur arrive sur la page d'accueil, si il n'est pas
connecté, il doit être redirigé automatiquement sur la page de login. Une fois connecté, il est redirigé automatiquement sur la page d'accueil.

Si l'utilisateur n'a pas de compte, un lien d'inscription lui est proposé.
Celui-ci l'emmène sur la page d'inscription. Une fois inscrit, l'utilisateur
est automatiquement redirigé sur la page de connexion.

## Mise en place

Téléchargez les sources avec npx, ou initialisez un CodeSandbox en suivant les
indications de https://github.com/drazik/cours-js#cours-javascript.

Les sources sont composées de deux dossiers : client et server. Il vous faudra
d'abord installer les dépendances de chaque partie :

```
cd client
npm install

cd ../server
npm install
```

Une fois ceci fait, il vous faudra lancer le serveur. Pour cela, ouvrez un terminal et tapez dedans : 

```
cd server
node ace serve
```

Cette commande lance le serveur et vous indique l'URL sur laquelle vous pouvez
le contacter. Par défaut, ça devrait être `http://127.0.0.1:3333`. Pour
vérifier que cela fonctionne, entre cette URL dans un onglet de votre
navigateur. Si vous voyez s'afficher un message "It works", c'est que le
serveur fonctionne correctement.

Pour lancer le serveur de l'app client, vous pouvez lancer les commandes suivantes dans un autre terminal :

```
cd client
npm run start
```

## Organisation du code de l'application client

L'application client est composée de :

* un point d'entrée : le fichier `client/src/main.js`
* un ensemble de pages dans le dossier `client/src/pages`. Chaque page est composée de deux fichiers : un fichier HTML décrivant sa structure initiale, et un fichier JS qui décrit son comportement
* un ensemble de composants dans le dossier `client/src/components`. Ces composants décrivent le comportement de morceaux génériques de l'interface (formulaire avec messages d'erreur, bouton de déconnexion...)
* un "service" regroupant les fonctions liées à l'authentification dans le fichier `client/src/services/auth.js`. Celui-ci contient quelques fonctions permettant de manipuler le token d'authentification retourné par le serveur lors de la connexion

## Composant App

Les pages et les composants sont déjà développés et fonctionnels. Le but est de
les assembler via un routeur pour arriver à orchestrer les pages selon les
conditions décrites en introduction.

Tout ce fonctionnement est encapsulé dans le composant `App`
(`client/src/components/App.js`). Ce composant expose une fonction `init` qui
prend en paramètre un élément HTML destiné à contenir l'application, ainsi
qu'un routeur, qui est une instance de
[Navigo](https://github.com/krasimir/navigo).

L'objectif de ce composant est d'utiliser les différentes méthodes du routeur
ainsi que les différents modules de pages (voir `client/src/pages`) pour
implémenter les règles de routing de notre application.

Les règles sont les suivantes : 

* Lorsque l'utilisateur arrive sur la page d'accueil, si il est connecté il accède à la page, sinon il doit être redirigé vers la page de connexion
* Lorsque l'utilisateur arrive sur la page de connexion, on lui affiche la page dans tous les cas
* Lorsque l'utilisateur arrive sur la page d'inscription, on lui affiche la page dans tous les cas
* Lorsque l'utilisateur demande une page ne correspondant à aucune des routes précédentes, on lui affiche la page "notFound"

Pour implémenter ces règles, vous avez à votre disposition :

* Les commentaires du fichier `client/src/components/App.js` pour vous guider
* Les tests automatiques du fichier `client/src/components/App.spec.js` que vous pouvez lancer avec la commande `npm run test -- --watchAll App.spec.js`
* [La documentation de Navigo](https://github.com/krasimir/navigo/blob/master/DOCUMENTATION.md)

Pour tester l'application dans votre navigateur, vous pouvez lancer la commande
`npm run start` puis ouvrir un onglet sur l'URL indiquée.
