function getResult(arg) {
	function getData(data) {
		return data.split('\n').map((elem) => elem.split(''))
	}
	let data = getData(arg)
	let directions = [
		{ direction: 'up_right', stepX: 1, stepY: -1 },
		{ direction: 'up_left', stepX: -1, stepY: -1 },
		{ direction: 'down_right', stepX: 1, stepY: 1 },
		{ direction: 'down_left', stepX: -1, stepY: 1 },
	]
	let possibleCombinations = ['MSMS', 'SMSM', 'SSMM', 'MMSS']
	let result = 0

	function searchingXmas(i, j) {
		let hitCounter = 0
		let currentWord = ''
		for (let d = 0; d < directions.length; d++) {
			if (
				directions[d].stepY + i >= 0 &&
				directions[d].stepX + j >= 0 &&
				directions[d].stepY + i < data.length &&
				directions[d].stepX + j < data[i].length
			) {
				let currentLetter =
					data[directions[d].stepY + i][[directions[d].stepX + j]]
				currentWord += currentLetter
			}
		}
		if (possibleCombinations.includes(currentWord)) {
			hitCounter++
		}
		return hitCounter
	}

	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < data[0].length; j++) {
			if (data[i][j] == 'A') {
				result += searchingXmas(i, j)
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
