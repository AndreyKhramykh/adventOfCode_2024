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
	firstList = firstList.sort((a,b) => a - b)
	secondList = secondList.sort((a,b) => a - b)
	for (let i = 0; i < firstList.length; i++) {
		result.push(Math.abs(firstList[i] - secondList[i]))
	}
	console.log(result.reduce((acc, cur) => acc+cur));
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
