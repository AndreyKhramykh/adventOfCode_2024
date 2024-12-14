function getResult(arg) {
	let data = arg.split('\n')
	let firstList = []
	let secondList = []
	let result = []
	data.forEach((elem) => {
		let arr = elem.split(' ')
		firstList.push(+arr[0])
		secondList.push(+arr[arr.length - 1])
	})
	for (let j = 0; j < firstList.length; j++) {
		let counter = 0
		for (let i = 0; i < secondList.length; i++) {
			if (firstList[j] == secondList[i]) counter++
		}
		result.push(firstList[j] * counter)
	}

	console.log(result.reduce((acc, cur) => acc + cur))
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
