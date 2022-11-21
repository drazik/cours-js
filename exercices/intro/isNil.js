const isNil = (value) => {
	return value === null || value === undefined
}

console.log(isNil(null)) // => true 
console.log(isNil(undefined)) // => true 
console.log(isNil("hello world")) // => false
console.log(isNil(0)) // false
console.log(isNil("")) // false
