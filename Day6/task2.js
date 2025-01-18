function getResult(arg) {
	function getData(arg) {
		let array = arg.split('\n').map((line) => line.split(''))
		return array
	}
	function getChoords(array) {
		let targetChoords = {}
		targetChoords.x = array.findIndex((arr) => arr.includes('^'))
		targetChoords.y = array[targetChoords.x].findIndex((elem) => elem == '^')
		return targetChoords
	}
	const possibleDirections = {
		up: { x: -1, y: 0 },
		right: { x: 0, y: 1 },
		down: { x: 1, y: 0 },
		left: { x: 0, y: -1 },
	}
	const directions = Object.values(possibleDirections)
	function switchDirection(currDirection) {
		return (currDirection + 1) % directions.length
	}
	let currentDirection = 0
	let counter = 0
	let data = getData(arg)
	let startChoords = getChoords(data)

	for (let x = 0; x < data.length; x++) {
		for (let y = 0; y < data[x].length; y++) {
			if (data[x][y] !== '.') continue
			data[x][y] = '#'
			if (isLoopClosed(data, startChoords, currentDirection)) {
				counter++
			}
			data[x][y] = '.'
		}
	}

	function isLoopClosed(data, startChoords, currentDirection) {
		const visitedPointsChoords = new Set()
		let x = startChoords.x
		let y = startChoords.y
		let dir = currentDirection
		while (true) {
			let visitedPoint = `${x},${y},${dir}`
			if (visitedPointsChoords.has(visitedPoint)) {
				return true
			}
			visitedPointsChoords.add(visitedPoint)

			
			let nextX = x + directions[dir].x
			let nextY = y + directions[dir].y
			if (data[nextX] && data[nextX][nextY] == '#') {
				dir = switchDirection(dir)
			} else {
				x += directions[dir].x
				y += directions[dir].y	
			}

			if (
				nextX < 0 ||
				nextX >= data.length ||
				nextY < 0 ||
				nextY >= data[0].length
			) {
				return false
			}

		}
	}
	console.log('result', counter)
}

const fs = require('node:fs')
const { get } = require('node:http')

const samplePath = 'sample.txt'
const fullPath = 'full.txt'

fs.readFile(fullPath, 'utf-8', (error, data) => {
	if (error) {
		console.log(`output->error`, error)
	}
	getResult(data)
})
