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

Ces deux composants sont interfacés l'un avec l'autre via les options de
`SearchForm`. Ces options permettent de garder une distinction claire au niveau
des responsabilités de chaque composant : `SearchForm` offre une interface
permettant de réagir à des événements (`onLoading`, `onReceiveData`,
`onError`), mais il ne s'occupe pas lui-même de l'affichage des données. Ce
travail est effectué par `ResultArea`. On crée donc d'abord une instance de
`ResultArea`, afin de passer des méthodes de ce composant à l'instance de
`SearchForm`.

## 3ème étape : implémenter le composant `SearchForm`

### Prise de connaissance de l'API Open Weather Map

`SearchForm` a pour rôle de requêter [l'API Open Weather
Map](https://openweathermap.org/api). Prenez d'abord un instant pour lire la
page [« How to start »](https://openweathermap.org/appid) de la documentation.
Pour les moins anglophiles, voici un résumé :

* Pour pouvoir requêter l'API, il faut avoir une clef d'API. C'est ce que vous avez obtenu à l'étape 1 du TD. Vous devez avoir une clef de la forme `b1b15e88fa797225412429c1c50c122a1`
* La clef API doit être passée via le paramètre `appid` à chaque requête (exemple : `https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=b1b15e88fa797225412429c1c50c122a1`)

Plus précisément, nous allons utiliser l'API [« Current Weather Data
»](https://openweathermap.org/current). Jettez un oeil à la documentation. À nouveau, pour les moins anglophiles, un résumé :

* L'URL de cette API est `https://api.openweathermap.org/data/2.5/weather`
* Pour spécifier la ville à rechercher, il faut utiliser le paramètre `q` : `https://api.openweathermap.org/data/2.5/weather?q=London`
* Par défaut, le unités utilisées ne sont pas celles du système métrique (température en degrés Farenheit, par exemple). Pour utiliser le système métrique, il faut ajouter le paramètre `units=metric` : `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric`
* Enfin, il ne faut évidemment pas oublier de spécifier votre clef API : `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=b1b15e88fa797225412429c1c50c122a1`

L'URL sur laquelle nous ferons nos requêtes est donc la suivante :
`https://api.openweathermap.org/data/2.5/weather?q={NOM_DE_LA_VILLE},fr&units=metric&appid={API_KEY}`.
`{NOM_DE_LA_VILLE}` et `{API_KEY}` devront être remplacés respectivement par la
ville saisie par l'utilisateur, et la clef API que vous avez généré lors de
votre inscription sur Open Weather Map. N'hésitez pas à remplacer ces
paramètres à la main et à tester l'URL dans votre navigateur ou dans Postman. Vous devriez récupérer une réponse au format JSON. Par exemple :

```json
{
  "message": "accurate",
  "cod": "200",
  "count": 1,
  "list": [
    {
      "id": 2643743,
      "name": "London",
      "coord": {
        "lat": 51.5085,
        "lon": -0.1258
      },
      "main": {
        "temp": 7,
        "pressure": 1012,
        "humidity": 81,
        "temp_min": 5,
        "temp_max": 8
      },
      "dt": 1485791400,
      "wind": {
        "speed": 4.6,
        "deg": 90
      },
      "sys": {
        "country": "GB"
      },
      "rain": null,
      "snow": null,
      "clouds": {
        "all": 90
      },
      "weather": [
        {
          "id": 701,
          "main": "Mist",
          "description": "mist",
          "icon": "50d"
        },
        {
          "id": 300,
          "main": "Drizzle",
          "description": "light intensity drizzle",
          "icon": "09d"
        }
      ]
    }
  ]
}
```

### Implémentation de `SearchForm`

Ce composant récupère le `<form>` via le paramètre `root` de son constructeur.
Son rôle est d'écouter l'événement `submit` sur cet élément, afin de récupérer
la saisie de l'utilisateur et de lancer la requête à l'API via la fonction
`fetch`. Il reçoit aussi dans son constructeur un objet `options` contenant les
propriétés `onLoading`, `onReceiveData` et `onReceiveError`, qui sont des
fonctions.

`onLoading` devra être exécutée lors du lancement de la requête;
`onReceiveData` devra être exécutée lorsque la réponse est revenue et qu'elle
contient effectivement des données (qu'on passera en paramètre à la fonction);
et `onReceiveError` devra être exécutée lorsque la réponse est revenue avec une
erreur (qu'on passera en paramètre à la fonction).

Pour le moment, les fonctions correspondantes de `ResultArea` ne sont pas
encore implémentées, donc rien ne s'affichera dans la page. Toutefois, vous
pouvez utiliser `console.log` pour afficher les données reçues et les erreurs
dans la console.

N'hésitez pas à vous inspirer de l'exemple vu en cours sur l'API Github :
https://codesandbox.io/s/zqq8kykov4

## 4ème étape : implémenter le composant `ResultArea`

Ce composant récupère la `<div id="result">` via le paramètre `root` de son constructeur. Son rôle est de gérer l'affichage de la zone de résultat. Il peut y avoir 3 cas :

* Message de chargement : méthode `showLoading`
* Données : méthode `showResults`
* Erreur : méthode `showError`

Chacune de ces méthodes est appelée au bon moment par le composant
`SearchForm`, grâce au système d'options que nous avons précédemment décrit.
Ainsi, `showResults` recevra en paramètre un objet de données météorologiques;
et `showError` recevra en paramètre un objet d'erreur.

Ce composant gère l'affichage du résultat. Il n'écoute aucun événement, en
revanche il est interfacé avec `SearchForm` via les options de ce dernier de
sorte que lorsque une requête est sur le point d'être envoyée, la méthode
`showLoadingMessage` de `ResultArea` est appelée; lorsque la réponse de la
requête asynchrone est arrivée la méthode `showResult` de `ResultArea` est
appelée; et lorsqu'une erreur survient, la méthode `showError` de `ResultArea`
est appelée.

`showLoading` et `showError` sont les méthodes les plus simples : la première
affiche simplement un message de chargement, et la seconde affiche l'erreur
qu'elle reçoit en paramètre.

`showResult` nécessite plus de travail. Son but est de créer différents
éléments HTML afin d'afficher les données météorologiques qu'elle reçoit en
paramètre. Regardez les données que vous recevez et laissez libre court à votre
imagination. Sachez seulement que si vous souhaitez afficher une icône, vous
pouvez utiliser la propriété `icon` des données que vous recevez en la mettant
dans l'URL suivante à la place de `{ICON}` :
`http://openweathermap.org/img/w/{ICON}.png`.

À nouveau, n'hésitez pas à vous inspirer de l'exemple vu en cours :
https://codesandbox.io/s/zqq8kykov4

## Conclusion

Ce TD a réunit tout ce que nous avons vu ensemble depuis le début de notre cours :

* Manipulation du DOM
* Événements
* Requêtes asynchrones

Vous vous êtes certainement rendu(e)s compte que manipuler le DOM de manière
impérative en créant des éléments en JS est bien plus fastidieux que de faire
du HTML. Ce sera le point de départ de notre prochain cours d'introduction à
React, dans lequel nous verrons comment cette librairie nous permet de
manipuler le DOM dynamiquement et de manière déclarative.

## Améliorations possibles

### Faire moins d'appels à l'API

[La documentation de l'API](https://openweathermap.org/appid), dans la partie «
Tips on how to use API effectively », nous indique que les données sont
rafraîchies toutes les 10 minutes du côté d'Open Weather Map. Par conséquent,
il ne sert à rien de faire plus d'un appel à l'API par tranche de 10 minutes.
Une amélioration possible pour éviter de faire des requêtes inutiles est donc
de créer un cache.

Un cache consiste à stocker des données en mémoire afin de servir deux buts :

* Répondre plus rapidement à une requête si on connait déjà le résultat
* Ne pas utiliser de ressources inutilement pour recalculer une donnée qu'on connait

Afin d'implémenter ce cache, le plus simple est de gérer un objet faisant la
correspondance entre un nom de ville et les données et la date à laquelle
celles-ci ont été récupérées. Cet objet ressemblerait à :

```js
const cache = {
  paris: {
    data: { // données reçues via l'API },
    updatedAt: // un objet Date() créé lorsque les données ont été reçues
  }
}
```

Ainsi, lorsque l'on est sur le point d'envoyer une requête à l'API, il faudra
d'abord regarder dans le cache si on a une donnée pour la ville demandée par
l'utilisateur. Si c'est le cas, il faudra vérifier que celle-ci a été récupérée
il y a moins de 10 minutes. Si c'est le cas, on ne fait pas la requête et on
utilise directement la donnée en cache. Sinon, on envoie a requête et on met à
jour le cache lorsqu'on a reçu les nouvelles données.

```
const city = // récupération de la saisie de l'utilisateur

if (la donnée est dans le cache) {
  return la donnée du cache
} else {
  fetch(/* ... */).then(() => {
    // utilisation de la donnée et mise à jour du cache
  })
}
```

### Ajouter différentes fonctionnalités de l'API

Nous avons utilisé l'API « Current Weather » d'Open Weather Map. Mais il y a
d'autres API ouvertes gratuitement. Ainsi, il est possible d'ajouter des
boutons radio au formulaire pour que l'utilisateur puisse choisir ce qu'il veut
voir : la météo actuelle, l'évolution de la météo toutes les 3 heures sur 5
jours, une prévision par jour tous les 16 jours... En fonction du choix de
l'utilisateur, la requête et l'affichage des données sont différents.
