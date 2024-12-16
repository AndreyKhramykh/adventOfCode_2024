function getResult(arg) {
	function getData(data) {
		return data.split('\n').map((elem) => elem.split(''))
	}
	let data = getData(arg)
	let directions = [
		{ direction: 'right', stepX: 1, stepY: 0 },
		{ direction: 'left', stepX: -1, stepY: 0 },
		{ direction: 'up', stepX: 0, stepY: -1 },
		{ direction: 'down', stepX: 0, stepY: 1 },
		{ direction: 'up_right', stepX: 1, stepY: -1 },
		{ direction: 'up_left', stepX: -1, stepY: -1 },
		{ direction: 'down_right', stepX: 1, stepY: 1 },
		{ direction: 'down_left', stepX: -1, stepY: 1 },
	]
	let keyWord = 'XMAS'
	let result = 0

	function searchingWords(startLetter, i, j) {
		let searchingWord = ''
		if (startLetter == 'X') searchingWord = keyWord
		if (startLetter == 'S') searchingWord = keyWord.split('').reverse().join('')
		let hitCounter = 0
		for (let d = 0; d < directions.length; d++) {
			let currentWord = ''
			for (let l = 0; l < searchingWord.length; l++) {
				let stepY = directions[d].stepY * l + i
				let stepX = directions[d].stepX * l + j
				if (
					stepY >= 0 &&
					stepX >= 0 &&
					stepY < data.length &&
					stepX < data[i].length
				) {
					let currentLetter = data[stepY][stepX]
					currentWord += currentLetter
				}
			}
			if (currentWord == searchingWord) {
				hitCounter++
			}
		}
		return hitCounter / 2
	}

	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < data[0].length; j++) {
			if (data[i][j] == 'X' || data[i][j] == 'S') {
				result += searchingWords(data[i][j], i, j)
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
