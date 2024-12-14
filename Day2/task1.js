function getResult(arg) {
	let data = arg.split('\n')
	let result = 0
	let validValues = [1, 2, 3]
	for (let j = 0; j < data.length; j++) {
		let arr = []
		for (let i = 0; i < data[j].split(' ').length; i++) {
			if (
				!validValues.includes(
					Math.abs(+data[j].split(' ')[i] - +data[j].split(' ')[i + 1])
				)
			) {
				break
			} else {
				arr.push(+data[j].split(' ')[i] - +data[j].split(' ')[i + 1])
			}
		}
		if (arr.every((elem) => elem < 0) || arr.every((elem) => elem > 0)) {
			if (arr.length == data[j].split(' ').length - 1) {
				result++	
			}
		}
	}

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
