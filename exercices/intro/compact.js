const isNil = (value) => {
	return value === null || value === undefined
}

const compact = (array) => {
	return array.filter((item) => {
		return !isNil(item)
	})
}

console.log(compact([0, null, 3, undefined])) // renvoie [0, 3]
console.log(compact([1, 2, 3, undefined, "hello", null])) // renvoie [1, 2, 3, "hello"]
