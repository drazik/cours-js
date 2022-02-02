# TD 3 : événements

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

Le but est d'implémenter les fonctions `goTo`, `mount` et `unmount`.

* `goTo` permet de se déplacer directement à la slide correspondant à un index donné. Elle sera utilisée lors du click sur les bullets
* `mount` permet d'ajouter des gestionnaires d'événement sur les boutons previous / next, ainsi que sur les bullets
* `unmount` permet de supprimer les gestionnaires d'événement créés par `mount`

Implémentez chacune de ces fonctions, une par une, en vous appuyant sur les tests unitaires.

Tips:

* Pour savoir quel est l'index de la bullet sur laquelle l'utilisateur a cliqué, souvenez-vous que vous pouvez accéder à l'élément sur lequel un événement a été levé grâce à la propriété `target` de l'objet `Event` reçu par la fonction liée à un gestionnaire d'événement. Souvenez-vous aussi que vous avez à votre disposition le tableau `elements.bullets`, issu de l'appel à la fonction `getElements`
