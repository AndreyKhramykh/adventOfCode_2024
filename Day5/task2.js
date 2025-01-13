function getResult(arg) {
	function getData(partNumber) {
		let data = arg.split('\n')
		let index = data.indexOf('')
		return partNumber > 0 ? data.slice(index + 1) : data.slice(0, index)
	}
	function getRules(array) {
		let resultObject = {}
		array.forEach((elem) => {
			const [key, value] = elem.split('|')
			resultObject[key] ??= { before: [], after: [] }
			resultObject[value] ??= { before: [], after: [] }
			resultObject[key].before.push(+value)
			resultObject[value].after.push(+key)
		})
		return resultObject
	}
	const listsArray = getData(0)
	const updatesArray = getData(1)
	const rulesList = getRules(listsArray)

	let result = []
	for (let i = 0; i < updatesArray.length; i++) {
		let errorCounter = 0
		let line = updatesArray[i].split(',')
		for (let j = 0; j < line.length; j++) {
			let currentValue = line[j]
			let index = line.indexOf(currentValue)
			let currentRule = rulesList[currentValue]
			let leftPart = line.slice(0, index)
			let rightPart = line.slice(index + 1)
			leftPart.forEach((elem) => {
				if (!currentRule.after.includes(+elem)) {
					errorCounter++
				}
			})
			rightPart.forEach((elem) => {
				if (!currentRule.before.includes(+elem)) {
					errorCounter++
				}
			})
		}
		if (errorCounter) {
			result.push(line)
		}
	}
	function sortByRules(array, rules) {
		return array.sort((a, b) => {
			if (rules[a].after.includes(+b)) return 1
			return -1
		})
	}

	result = result
		.map((line) => sortByRules(line, rulesList))
		.map((elem) => (elem = +elem[Math.floor(elem.length / 2)]))
		.reduce((acc, curr) => acc + curr)
	console.log(result)
}

const fs = require('node:fs')

const samplePath = 'sample.txt'
const fullPath = 'full.txt'

fs.readFile(fullPath, 'utf-8', (error, data) => {
	if (error) {
		console.log(`output->error`, error)
	}
	getResult(data)
})
