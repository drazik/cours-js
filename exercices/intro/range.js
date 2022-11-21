const range = (start, end, step) => {
	if (end < start) {
		throw new Error("La valeur de départ doit être inférieure à la valeur d'arrivée")
	}

	if (step <= 0) {
		throw new Error("Le pas doit être supérieur à 0")
	}

	const result = []

	for (let i = start; i <= end; i += step) {
		result.push(i)
	}

	return result
}

console.log(range(0, 5, 1)) // renvoie [0, 1, 2, 3, 4, 5]
console.log(range(5, 6, 0.1)) // renvoie [5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6]
