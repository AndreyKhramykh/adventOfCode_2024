function getResult(arg) {
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
