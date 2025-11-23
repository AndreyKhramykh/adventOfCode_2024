function getResult(arg) {
	const array = arg.split('').map((elem) => +elem)
	function isEven(num) {
		return num % 2 === 0
	}
	function getData(arg) {
		const data = []
		let currentID = 0
		for (let i = 0; i < arg.length; i++) {
			for (let j = 0; j < arg[i]; j++) {
				if (isEven(i)) {
					data.push(currentID)
				} else {
					data.push('.')
				}
			}
			if (isEven(i)) {
				currentID++
			}
		}
		return data
	}

	function hasNumber(array) {
		return array.some((item) => typeof item == 'number')
	}
	function getCompressedData(data) {
		for (let i = 0; i < data.length; i++) {
			if (data[i] == '.' && hasNumber(data.slice(i))) {
				for (let y = data.length - 1; y >= 0; y--) {
					if (typeof data[y] == 'number') {
						data[i] = data[y]
						data[y] = '.'
						break
					}
				}
			}
		}
		return data
	}

	console.log(
		getCompressedData(getData(array)).reduce((acc, curr, index) => {
			return typeof curr == 'number' ? acc + curr * index : acc
		})
	)
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
