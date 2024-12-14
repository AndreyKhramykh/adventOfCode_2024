function getResult(arg) {
	function getData(string) {
		let data = string.split('mul(').filter((elem) => elem.includes(')'))
		let newData = []
		let isRecording = true
		for (let i = 0; i < data.length; i++) {
			if (isRecording) {
				newData.push(data[i])
			}
			if (data[i].includes(`don't()`)) {
				isRecording = false
			}
			if (data[i].includes(`do()`)) {
				isRecording = true
			}
		}
		console.log(data);
		return newData
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
	console.log(getAnswer(data))
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
