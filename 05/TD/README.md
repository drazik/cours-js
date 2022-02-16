# TD 5 : requêtes asynchrones et manipulation du DOM

## Mise en place

Lancer les commandes suivantes dans un PowerShell :

```console
$Env:NODE_TLS_REJECT_UNAUTHORIZED = 0
npm config set strict-ssl false
npm install
npm run test -- --watchAll
```

Ouvrir le dossier du TD dans VS Code.

## Implémentation

L'objectif de ce TD est de développer une mini application sociale qui charge
et affiche une liste de posts lorsqu'elle est chargée, et propose un formulaire
pour ajouter un nouveau statut. L'objectif est de récupérer les posts existants
et de créer les nouveaux avec des requêtes asynchrones.

L'application est divisée en plusieurs composants : 

* `Spinner` : permet d'afficher un élément indiquant le chargement en cours d'une ressource. Ce composant sera utilisé pour indiquer que les posts existants sont en cours de chargement. Ce composant est déjà implémenté et fonctionnel
* `Alert`: permet de créer un bandeau d'alert refermable. Ce composant sera utilisé pour afficher les messages d'erreur
* `Post` : permet de créer la structure HTML décrivant un post
* `PostsList` : permet de gérer la liste des posts. Ce composant est responsable de charger les posts existants et d'afficher les nouveaux posts
* `PostsForm` : permet de créer un nouveau post. Ce composant est responsable de gérer la saisie de l'utilisateur et d'envoyer les données saisies au serveur pour créer les nouvelles données
* `app` : initialise et fait communiquer les composants `PostsList` et `PostForm` pour rendre l'application fonctionnelle.

### Composant `Alert`

Implémentez la fonction `create` de ce module. L'objectif est de créer dynamiquement la structure HTML suivante :

```html
<div class="alert alert-error alert-dismissible" role="alert">
  {message}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
</div>
```

La fonction prend en paramètre le message à afficher, qui doit être affiché à
la place de `{message}` dans la structure précédente.

La fonction renvoie l'élément créé.

### Composant `Post`

Implémentez la fonction `create` de ce module. L'objectif est de créer dynamiquement la structure HTML suivante :

```html
<article class="card">
  <div class="card-body">
    <p class="card-text">{data.body}</p>
  </div>
</article>
```

La fonction prend en paramètre un objet `data` de la forme suivante :

```js
{
  id: 1,
  body: "Texte à afficher"
}
```

### Composant `PostsList`

Le HTML de ce composant est déjà présent dans la page (voir fichier
`index.html`). Par défaut, la liste est vide, c'est un élément
`<section></section>`.

La fonction `init` de ce composant doit implémenter les cas suivants :

* Afficher un spinner lorsque le composant est initialisé
* Envoyer une requête sur l'URL `https://jsonplaceholder.typicode.com/posts` lorsque le composant est initialisé
* Afficher les posts renvoyés par le serveur lorsque celui-ci a renvoyé une réponse en succès
* Afficher une alert avec un message d'erreur lorsque le serveur a renvoyé une réponse en erreur
* Exposer une fonction `preprend` qui prend en paramètre les données d'un post, crée ce post et l'ajoute en 1er élément de la liste

### Composant `PostForm`

Le HTML de ce composant est déjà présent dans la page (voir fichier
`index.html`). C'est un élément `form` dans lequel on trouve un champ
`textarea`. Ce `textarea` a un attribut `name="body"`. Grâce à cet attribut, il
est possible de récupérer une référence vers cet élément directement à partir
du formulaire. Par exemple :

```js
const form = document.querySelector("form")
const bodyTextarea = form.elements.body // "body" correspond à la valeur de l'attribut `name` de la textarea
```

Dans ce formulaire se trouve aussi un élément `<button
type="submit">...</button>`. Ce bouton permet, lorsqu'il est cliqué, d'envoyer
le formulaire (évènement `submit`).

La fonction `init` de ce composant doit implémenter les cas suivants :

* Le bouton submit doit être `disabled` par défaut
* Le bouton submit doit être `disabled` lorsque la saisie de l'utilisateur ne contient que des espaces
* Le bouton submit ne doit pas être `disabled` lorsque la saisie de l'utilisateur contient autre chose que des espaces
* L'envoi du formulaire doit déclencher l'envoi d'une requête asynchrone (`fetch`) vers l'URL `https://jsonplaceholder.typicode.com/posts` avec les caractéristiques suivantes :
  * Méthode `post` 
  * Header `"Content-Type": "application/json; charset=UTF-8"`
  * Body : un objet `{ body: string }` où `body` contient la valeur saisie par l'utilisateur. Penser à `JSON.stringify` cet objet, car `body` ne peut contenir qu'une chaîne de caractères ou un objet `FormData`
* Pendant l'envoi de la requête, le bouton submit doit être `disabled`
* Lorsque le serveur renvoie une réponse en succès, réinitaliser la valeur de la textarea
* La fonction `onSuccess` reçue dans l'objet `options` doit être appelée avec les données reçues du serveur lorsque celui-ci renvoie une réponse en succès. Attention, cette fonction peut ne pas être passée, c'est à dire qu'il est possible que `options.onSuccess` soit égal à `undefined`
* Un message d'erreur doit être affiché lorsque le serveur renvoie une réponse en erreur (en utilisant le module `Alert`)
* Le bouton submit ne doit pas être `disabled` lorsque le serveur renvoie une réponse en erreur
* L'envoi du formulaire doit fermer le message d'erreur présent si il y en a a un

### app

Maintenant que nos différents composants fonctionnent comme attendu, il va être
question de les interfacer entre eux.

Pour que notre application fonctionne, nous avons besoin de :

* Récupérer l'élément racine du composant `PostsList` dans la page
* Initiliser un `PostsList` avec cet élément
* Récupérer l'élément racine du composant `PostForm` dans la page
* Initialiser un `PostForm` avec cet élément
* Passer un objet en 2ème paramètre de `PostForm.init`. Celui-ci doit avoir une propriété `onSuccess` qui est une fonction permettant d'appeler la fonction `preprend` du `PostsList` créé précédemment. De cette manière, lorsque le composant `PostForm` a réussi à créer un nouveau post, cette fonction sera appelée et le post apparaîtra dans la liste

Pour tester votre application dans le navigateur et voir si elle fonctionne ou
non, vous pouvez lancer la commande `npm run start` dans un PowerShell. Un
serveur local sera lancé sur `http://localhost:1234`.
