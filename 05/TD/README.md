# TD 05 : React

Dans ce TD, nous allons développer une application permettant d'afficher la
météo des jours à venir pour une ville donnée. Pour récupérer les données
météorologiques, nous utiliserons l'API "5 day weather forecast" du service
[Open Weather Map](https://openweathermap.org/).

Voici ce que nous voulons faire : TODO

Lorsque l'utilisateur saisit le nom d'une ville, on envoie une requête
asynchrone à l'API, qui nous renvoie un résultat (des données de prévisions
météorologiques ou une erreur). Pendant qu'on attend le résultat, on affiche un
spinner pour indiquer que le chargement est en cours. Une fois qu'on a reçu le
résultat, si on a des données, on les affiche; si c'est une erreur, on affiche
le message d'erreur.

L'application est développée avec la librairie React et découpée en plusieurs
composants qu'il convient d'implémenter.

## Mise en place

Téléchargez les sources avec npx, ou initialisez un CodeSandbox en suivant les
indications de https://github.com/drazik/cours-js#cours-javascript.

N'oubliez pas de lancer un `npm install` pour installer les dépendances du
projet.

## Présentation


## Test dans le navigateur

Pour tester le résultat dans le navigateur, lancez la commande :

```
npm run start
```

Cette commande lance un serveur de développement local avec rafraîchissement
automatique lorsque vous sauvegardez un fichier source. Rendez vous sur
`http://localhost:3000` dans votre navigateur pour y voir le résultat.
