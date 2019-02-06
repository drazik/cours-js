# TD programmation asynchrone

Dans ce TD, nous allons réaliser une petite application de prévision météo.

L'utilisateur aura un champ texte dans lequel il pourra taper le nom d'une
ville, et nous ferons un appel à l'API [Open Weather
Map](https://openweathermap.org/) pour récupérer les informations
météorologiques de cette ville et lui afficher.

## 1ère étape : créer un compte sur Open Weather Map pour récupérer une clé API

Rendez-vous sur [le formulaire
d'inscription](https://home.openweathermap.org/users/sign_up) d'Open Weather
Map et remplissez-le.

Ensuite, allez dans l'onglet API keys, et vérifiez qu'une clef "Default" a été
créée pour vous. Gardez cet onglet ouvert ou recopiez la clef dans un fichier
pour pouvoir la retrouver facilement plus tard.

Cette clef va nous permettre d'utiliser l'API Open Weather Map. Nous la
spécifierons à chaque requête que nous ferons sur cette API. Elle permet à Open
Weather Map de nous identifier et de s'assurer que nous ne dépassons pas le
quota de requêtes qui nous est alloué (60 requêtes par minute maximum pour un
compte gratuit).

## 2ème étape : prendre connaissance avec les sources

Comme d'habitude, vous trouverez dans [src](src) les sources du TD.

Le fichier `index.html` comporte la structure de l'application : un bloc comportant un formulaire, et un bloc (vide au départ) qui accueillera le résultat de nos requêtes.

Le fichier `app.js` comporte la logique de notre application. Nous avons 2 composants dedans :

* `SearchForm` : ce composant aura pour but de gérer le formulaire de recherche. Il écoutera l'événement `submit` et lancera la requête vers l'API Open Weather Map afin de récupérer les informations météorologiques
* `ResultArea` : ce composant aura pour but de gérer l'affichage des données récupérées par le formulaire de recherche

Ces deux composants sont interfacés l'un avec l'autre via les options de `SearchForm`.

## 3ème étape : implémenter le composant `SearchForm`

Ce composant doit écouter l'événement `submit` sur le formulaire, et faire une
requête vers l'API Open Weather Map avec la fonction `fetch` sur l'URL
`https://api.openweathermap.org/data/2.5/weather?q={NOM_DE_LA_VILLE},fr&mode=json&units=metric&appid={API_KEY}`

Il vous faudra évidemment remplacer `{NOM_DE_LA_VILLE}` par le nom de la ville
saisi par l'utilisateur, et `{API_KEY}` par la clef API que vous avez récupéré
lors de votre inscription sur Open Weather Map.

Vous pouvez tester cette URL en la tapant directement dans votre navigateur et
en regardant ce qui s'affiche dans la page.

N'hésitez pas à vous inspirer de l'exemple vu en cours sur l'API Github :
https://codesandbox.io/s/xpzq894lww?from-embed

Vous serez arrivé au bout de cette étape lorsque vous aurez réussi à afficher
dans la console les informations météorologiques issues d'une requête `fetch`
sur l'API Open Weather Map à partir du nom de la ville saisie par
l'utilisateur.

## 4ème étape : implémenter le composant `ResultArea`

Ce composant gère l'affichage du résultat. Il n'écoute aucun événement, en
revanche il est interfacé avec `SearchForm` via les options de ce dernier de
sorte que lorsque une requête est sur le point d'être envoyée, la méthode
`showLoadingMessage` de `ResultArea` est appelée; lorsque la réponse de la
requête asynchrone est arrivée la méthode `showResult` de `ResultArea` est
appelée; et lorsqu'une erreur survient, la méthode `showError` de `ResultArea`
est appelée.

Ainsi, nous avons deux composants aux rôles bien distincts, mais qui sont
capables de s'interfacer ensemble.

La méthode `showLoadingMessage` modifie le contenu de la zone de résultat pour
afficher un message type `"Chargement en cours..."`.

La méthode `showResult` prend en paramètre les données retournées par l'appel à
l'API, crée les éléments HTML à partir de ces données et les affichent dans la
zone de résultat.

La méthode `showError` prend ne paramètre une erreur retournée par l'appel à
l'API et l'affiche dans le zone de résultat.

À nouveau, n'hésitez pas à vous inspirer de l'exemple vu en cours :
https://codesandbox.io/s/xpzq894lww?from-embed

## Conclusion

TODO
