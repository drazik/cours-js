# TD

Aujourd'hui, nous souhaitons mettre à profit ce que nous avons apprit sur
la programmation asynchrone pour faire une application dans laquelle
l'utilisateur peut créer des posts et les commenter.

Pour cela, nous avons à notre disposition une API.

On veut :

* lister tous les posts et leurs commentaires : GET /posts
* un formulaire pour pouvoir écrire un post : POST /posts ({ author, title, content })
* sous chaque post, un formulaire pour pouvoir écrire un commentaire : POST /posts/idPost/comments ({ author, content })
* pouvoir supprimer un post : DELETE /posts/idPost
* pouvoir supprimer un commentaire : DELETE /posts/idPost/comments/idComment
