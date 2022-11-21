const range = (start, end, step) => {
	if (step <= 0) {
		throw new Error("Le pas doit être supérieur à 0")
	}

	const reversed = end < start

	const s = reversed ? end : start
	const e = reversed ? start : end

	const result = []

	for (let i = s ; i <= e; i += step) {
		result.push(i)
	}

	return reversed ? result.reverse() : result
}

console.log(range(0, 5, 1)) // renvoie [0, 1, 2, 3, 4, 5]
console.log(range(5, 6, 0.1)) // renvoie [5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6]
console.log(range(5, 0, 1)) // renvoie [5, 4, 3, 2, 1, 0]
console.log(range(6, 5, 0.1)) // renvoie [6, 5.9, 5.8, 5.7, 5.6, 5.5, 5.4, 5.3, 5.2, 5.1, 5]
