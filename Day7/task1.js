function getResult(arg) {
	function getData(input) {
		let lines = input.split('\n')
		const results = lines.map((line) => +line.split(':')[0])
		const numberLines = lines.map((line) =>
			line
				.split(':')[1]
				.trim()
				.split(' ')
				.map((num) => +num)
		)
		return [results, numberLines]
	}
	const operators = ['+', '*']
	const taskResult = []
	const [resultsArray, numberLines] = getData(arg)
	function findCombinations(numberLines) {
		const combinationQuant = Math.pow(operators.length, numberLines.length - 1)
		const possibleCombinations = []
		for (let c = 0; c < combinationQuant; c++) {
			let temporary = c
			const currentCombination = []
			for (let i = 0; i < numberLines.length - 1; i++) {
				currentCombination.push(operators[temporary % operators.length])
				temporary = Math.floor(temporary / operators.length)
			}
			possibleCombinations.push(currentCombination)
		}
		return possibleCombinations
	}
	function isCalculating(numberLines, possibleCombinations, target) {
		for (c = 0; c < possibleCombinations.length; c++) {
			let result = numberLines[0]
			for (j = 0; j < possibleCombinations[c].length; j++) {
				if (possibleCombinations[c][j] == '+') result += numberLines[j + 1]
				if (possibleCombinations[c][j] == '*') result *= numberLines[j + 1]
			}
			if (result == target) return true
		}
		return false
	}
	for (let i = 0; i < resultsArray.length; i++) {

		if (
			isCalculating(
				numberLines[i],
				findCombinations(numberLines[i]),
				resultsArray[i]
			)
		) {
			taskResult.push(resultsArray[i])
		}
	}
	console.log(taskResult.reduce((acc, curr) => acc + curr));

}

const fs = require('node:fs')

const samplePath = 'sample.txt'
const fullPath = 'full.txt'

fs.readFile(samplePath, 'utf-8', (error, data) => {
	if (error) {
		console.log(`output->error`, error)
	}
	getResult(data)
})
