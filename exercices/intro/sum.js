const sum = (numbers) => {
	return numbers.reduce((sum, number) => {
		return sum + number
	}, 0)
}

console.log(sum([1, 2, 3])) // renvoie 6
console.log(sum([-1, 12, -2, 4])) // renvoie 13
