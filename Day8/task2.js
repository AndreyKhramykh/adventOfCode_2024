function getResult(arg) {
	const grid = arg.split('\n')
	const gridHeight = grid.length
	const gridWidth = grid[0].length

	const data = []
	for (let x = 0; x < gridHeight; x++) {
		for (let y = 0; y < gridWidth; y++) {
			if (grid[x][y] != '.') {
				data.push({
					char: grid[x][y],
					x: x,
					y: y,
				})
			}
		}
	}

	const result = []
	data.forEach((a) => {
		data.forEach((b) => {
			if (a.char !== b.char || a === b) return
			const heightDistance = b.x - a.x
			const widthDistance = b.y - a.y
			let coord = {
				x: a.x,
				y: a.y,
			}
			while (true) {
				coord = {
					x: coord.x + heightDistance,
					y: coord.y + widthDistance,
				}
				if (
					coord.x < 0 ||
					coord.y < 0 ||
					coord.x >= gridHeight ||
					coord.y >= gridWidth
				) {
					break
				}
				result.push(coord)
			}
		})
	})
	const uniqueResult = [...new Set(result.map((elem) => JSON.stringify(elem)))]
		.length
	console.log(uniqueResult)
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
