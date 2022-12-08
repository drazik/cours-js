# Exercice : chargement asynchrone d'une liste d'articles

L'objectif de cet exercice est d'implémenter un module qui charge une liste d'articles à partir d'un serveur et les affiche dans la page.

Pour récupérer les sources et mettre en place l'environnement de développement, lancer les commandes suivantes

```console
npx degit drazik/cours-js/exercices/posts-list posts-list
cd posts-list
npm install
```

Pour lancer le serveur de développement :

```
npm run dev
```

Si vous êtes coincé(e), le fichier `posts-list-finished.js` contient la correction de l'exercice.

## Etape 1 : prise de connaissance du code initial

Les principaux fichiers de cet exercice sont :

- `index.html`
- `style.css`
- `main.js`
- `posts-list.js`
- `mocks/handlers.js`

Le fichier `index.html` contient la structure de base de la page : le titre et un élément vide dans lequel on va devoir afficher les articles récupérés à partir du serveur.

Le fichier `style.css` contient les styles de la page. Ceux-ci sont déjà écrits. Il faudra mettre les différentes classes sur les bons éléments.

Le fichier `main.js` importe le module `posts-list`, récupère l'élément qui a l'attribut `data-component` avec la valeur `posts-list` et appelle la fonction `init` du module `posts-list` en lui passant cet élément en paramètre.

Le fichier `posts-list` exporte une fonction `init` dans laquelle nous devrons implémenter la logique de ce module.

Le fichier `mocks/handlers.js` contient la logique du serveur. Celui-ci met à notre disposition une route `/posts` qui nous renvoie une liste de posts au format JSON.

## Etape 2 : implémentation du module `posts-list`

Ce module doit :

- charger les articles en utilisant la fonction `fetch`
- pendant le chargement, afficher un message "Chargement des articles en cours..."
- une fois le chargement terminé :
	- si le serveur a renvoyé une réponse en succès : afficher les articles
	- si le serveur a renvoyé une réponse en erreur : afficher un message "Une erreur est survenue lors du chargement des articles."

Le serveur est un "faux serveur". Les données sont récupérables sur `http://localhost:5173/posts`. Mais si vous essayez d'entrer cette URL dans votre navigateur, vous n'obtiendrez pas les données. C'est normal. Ce serait le cas sur un vrai serveur, mais ici nous simulons un serveur en JS côté client.

Mais le serveur répond tout de même aux appels avec la fonction `fetch`.

Le serveur renvoie du JSON représentant un tableau d'objets ayant la forme suivante :

```ts
type Post = {
	id: string
	title: string
	publishedAt: string
	excerpt: string
}
```

Dans un premier temps, envoyez donc une requête au serveur avec la fonction `fetch`, et tentez d'afficher les données reçues dans la console (avec `console.log`).

Dans un second temps, à partir des données reçues, créez un élément HTML pour chaque article et insérez cet élément dans l'élément `<div data-component="posts-list"></div>` déjà présent dans la page.

La structure HTML d'un article devra être la suivante :

```html
<article class="post">
	<time class="post-date" datetime="post.publishedAt">new Date(post.publishedAt).toLocaleDateString()</time>
	<h2 class="post-title">post.title</h2>
	<p>post.excerpt</p>
</article>
```

Une fois que vous avez ceci, au lieu de mettre les éléments dans l'élément `<div data-component="posts-list"></div>`, créez un élément intermédiaire `<div class="posts-list"></div>` et mettez-y les éléments, de manière à ce que les articles s'affichent sous forme d'une grille. La structure HTML de la grille d'article devra être la suivante :

```html
<div class="posts-list">
	<article class="post">...</article>
	<article class="post">...</article>
	<article class="post">...</article>
	<!-- ... -->
</div>
```
