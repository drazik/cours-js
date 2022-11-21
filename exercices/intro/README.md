# Exercices intro JavaScript

## `isNil`

Ecrire une fonction isNil qui prend en paramètre une valeur et renvoie
true si cette valeur est égale à null ou undefined.

Exemples :

```js
console.log(isNil(null)) // => true 
console.log(isNil(undefined)) // => true 
console.log(isNil("hello world")) // => false
console.log(isNil(0)) // false
console.log(isNil("")) // false
```

## `compact`

Ecrire une fonction compact. Qui prend en paramètre un tableau quelconque,
et renvoie un nouveau tableau contenant uniquement les items pour lesquels
isNil(item) renvoie true.

Exemples :

```js
console.log(compact([0, null, 3, undefined])) // renvoie [0, 3]
console.log(compact([1, 2, 3, undefined, "hello", null])) // renvoie [1, 2, 3, "hello"]
```

## `range`

Ecrire une fonction `range` qui prend 3 paramètres :

- start
- end
- step

La fonction renvoie un tableau de tous les nombres entre `start` et `end` (inclus) avec un pas égal à `step`.

Exemples :

```js
console.log(range(0, 5, 1)) // renvoie [0, 1, 2, 3, 4, 5]
console.log(range(5, 6, 0.1)) // renvoie [5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6]
```

Si `start` est supérieur à `end`, la fonction doit lever une erreur. Pour lever une erreur, vous pouvez utiliser `throw new Error("Message d'erreur")`. Plus d'infos sur `throw` sur [la page dédiée du MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw).

De même, si `step` est inférieur à 0, une erreur doit être levée.

## `range` (amélioré)

Faire évoluer la fonction `range` de l'exercice précédent pour lui permettre de gérer correctemeent le cas où `end` est supérieur à `start`. La fonction doit renvoyer un tableau des nombres en remontant de `end` jusqu'à `start` (toujours avec le pas spécifié en 3ème paramètre -step-).

Exemples :

```js
console.log(range(5, 0, 1)) // renvoie [5, 4, 3, 2, 1, 0]
console.log(range(6, 5, 0.1)) // renvoie [6, 5.9, 5.8, 5.7, 5.6, 5.5, 5.4, 5.3, 5.2, 5.1, 5]
```

## `sum`

Ecrire une fonction `sum` qui prend en paramètre un tableau de nombres et renvoie la somme de ces nombres.

Exemples :

```js
console.log(sum([1, 2, 3])) // renvoie 6
console.log(sum([-1, 12, -2, 4])) // renvoie 13
```

Indice : regardez du côté de la [méthode `reduce` des tableaux](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce).

## `sumBy`

Ecrire une fonction `sumBy`. Cette fonction prend en paramètre :

- `objects` : un tableau d'objets
- `propertyAccessor` : une fonction prenant en paramètre un item du tableau et qui doit renvoyer la propriété à prendre en compte pour effectuer la somme


Exemples :

```js
const people = [
	{ name: "Cyrille", age: 32 },
	{ name: "Tom", age: 2 },
]

console.log(sumBy(people, (person) => person.age)) // renvoie 34
```

Indices :

- Utilisez à nouveau la [méthode `reduce` des tableaux](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- `propertyAccessor` est une fonction. Elle doit être appelée sur chaque item du tableau pour obtenir la valeur à ajouter
