function getResult(arg) {
	function getData(arg) {
		let array = arg.split('\n').map((line) => line.split(''))
		let targetChoords = {}
		targetChoords.x = array.findIndex((arr) => arr.includes('^'))
		targetChoords.y = array[targetChoords.x].findIndex(
			(elem) => elem != '#' && elem != '.'
		)
		return [array, targetChoords]
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
	const [data, startChoords] = getData(arg)
	while (data[startChoords.x] && data[startChoords.x][startChoords.y]) {
		if (data[startChoords.x][startChoords.y] != 'X') {
			counter++
		}
		let nextX = startChoords.x + directions[currentDirection].x
		let nextY = startChoords.y + directions[currentDirection].y
		if (data[nextX] && data[nextX][nextY] == '#') {
			currentDirection = switchDirection(currentDirection)
		}
		data[startChoords.x][startChoords.y] = 'X'
		startChoords.x += directions[currentDirection].x
		startChoords.y += directions[currentDirection].y
	}
	console.log('resust', counter)
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
