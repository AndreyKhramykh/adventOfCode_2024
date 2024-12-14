function getResult(arg) {
	function getData(string) {
		return string.split('mul(').filter((elem) => elem.includes(')'))
	}
	let data = getData(arg)
	let regex = /^\d+$/
	function getNumbers(string) {
		let numbers = []
		for (let i = 0; i < string.length; i++) {
			if (string[i] == ')') {
				break
			}
			numbers.push(string[i])
		}
		let result = numbers.join('').split(',')
		let checkForError = (arg) => {
			if (arg.length > 2) return
			if (arg.filter((elem) => regex.test(elem)).length != 2) return
			return arg
		}
		return checkForError(result)
	}
	const getAnswer = (array) => {
		return array
			.map((elem) => getNumbers(elem))
			.filter((elem) => elem != undefined)
			.map((arr) => arr.reduce((acc, curr) => acc * curr))
			.reduce((acc, curr) => acc + curr)
	}
	console.log(data)
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