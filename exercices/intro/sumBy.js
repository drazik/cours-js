const sumBy = (objects, propertyAccessor) => {
	return objects.reduce((sum, object) => {
		return sum + propertyAccessor(object)
	}, 0)
}

const people = [
	{ name: "Cyrille", age: 32 },
	{ name: "Tom", age: 2 },
]

console.log(sumBy(people, (person) => person.age)) // renvoie 34
