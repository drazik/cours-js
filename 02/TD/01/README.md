# TD événements / Partie 1

L'objectif de cette première partie est d'ajouter des boutons permettant de
contrôler le Slider développé lors du TD précédent. Un bouton « précédent » et
un bouton « suivant » permettront de passer d'une slide à l'autre lorsque
l'utilisateur clique dessus.

Le code source est disponible dans le dossier [`src`](src). Celui-ci reprend la
correction du TD précédent. Les deux implémentations proposées (orientée objet
et fonctionnelle) sont proposées. Vous pouvez partir de l'une ou de l'autre
selon votre préférence.

## 1ère étape : créer dynamiquement les boutons « précédent » et « suivant »

Tout d'abord, il faut créer les boutons. Ces boutons ne vont pas être intégrés
directement dans le HTML, et ce pour une seule raison : si l'utilisateur a
désactivé JavaScript, on ne veut pas lui afficher des boutons avec lesquels il
ne peut pas intéragir.

Utilisez donc `document.createElement()` pour créer les deux boutons, et
appliquez la méthode `append` à la racine du slider pour ajouter les deux
boutons au DOM.

Le résultat est le suivant :

![](with-buttons.png)

## 2ème étape : implémenter une méthode `goToPreviousSlide`

Actuellement, nous ne sommes capables que de passer à la slide suivante grâce à
`goToNextSlide`. Il nous faut une fonction équivalente pour passer à la slide
précédente. La logique est la même que `goToNextSlide`.

## 3ème étape : attacher les méthodes aux boutons

Lorsqu'on clique sur le bouton « précédent », on veut exécuter la méthode
`goToPreviousSlide`, et lorsqu'on clique sur le bouton « suivant », on veut
exécuter la méthode `goToNextSlide`. Lors de la création des deux boutons, il
faut donc leur attacher chacun un event listener sur l'élément `click` et la
méthode correspondant au bouton.

Lorsqu'on clique sur un bouton, on veut arrêter l'interval.

## Conclusion

Nous avons maintenant un composant de slider plutôt complet : celui-ci passe à
la slide suivante automatiquement tant qu'on n'intéragis pas avec lui. Dès que
l'utilisateur demande explicitement à changer de slide en cliquant sur un
bouton, le slider réagit en conséquence, et arrêter de défiler automatiquement.
