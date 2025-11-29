function getResult(arg) {
	function getData(input) {
		let blocksData = []
		let isBlock = true
		let id = 0
		let index = 0
		for (let i = 0; i < input.length; i++) {
			let size = +input[i]
			blocksData.push({
				blockName: isBlock ? id : '.',
				size: isBlock ? size * String(id).length : size,
			})
			id += isBlock ? 0 : 1
			isBlock = !isBlock
			index++
		}
		return blocksData
	}
	function getCompressedData(data) {
		function removeItem(array, fromIndex, toIndex) {
			function mergeDots(array, index) {
				let collected = [index]
				let i = index - 1
				while (i >= 0 && array[i].blockName === '.') {
					collected.push(i)
					i--
				}
				i = index + 1
				while (i < array.length && array[i].blockName === '.') {
					collected.push(i)
					i++
				}
				collected.sort((a, b) => a - b)
				let totalSize = collected.reduce((sum, curr) => {
					return sum + array[curr].size
				}, 0)

				let firstIndex = collected[0]
				collected.forEach((index) => (array[index].size = 0))
				array[firstIndex].size = totalSize
				return collected
			}
			array[toIndex].size -= array[fromIndex].size
			const insertItem = { blockName: '.', size: array[fromIndex].size }
			const item = array.splice(fromIndex, 1, insertItem)[0]
			mergeDots(array, fromIndex)
			array.splice(toIndex, 0, item)
		}
		function mergeAroundInPlace(arr, index) {
			const current = arr[index]
			const prev = arr[index - 1]
			const next = arr[index + 1]
			let ids = [current.id]
			if (prev?.id !== undefined) ids.push(prev.id)
			if (next?.id !== undefined) ids.push(next.id)
			const minId = Math.min(...ids)

			let totalSize = current.size
			if (prev && prev.blockName === current.blockName) totalSize += prev.size
			if (next && next.blockName === current.blockName) totalSize += next.size
			if (next && next.blockName === current.blockName) arr.splice(index + 1, 1)
			if (prev && prev.blockName === current.blockName) {
				arr.splice(index - 1, 1)
				index--
			}
			current.size = totalSize
		}
		function dataToString(data) {
			data = data.filter(
				(object) => {
					if (object.size != 0) {
						return object
					}
				} 
			)
			let result = data
				.map((item) =>
					String(item.blockName).repeat(
						item.size / String(item.blockName).length
					)
				)
				.join('')
				.split('')
				.map((item) => (item != '.' ? Number(item) : '.'))
			return result
		}
		for (let i = data.length - 1; i >= 0; i--) {
			if (typeof data[i].blockName == 'number') {
				for (let j = 0; j < data.length; j++) {
					if (
						data[j].blockName == '.' &&
						data[i].size <= data[j].size &&
						i >= j
					) {
						removeItem(data, i, j)
						mergeAroundInPlace(data, j)
						break
					}
				}
			}
		}
		return dataToString(data)
	}
	let result = 0
	getCompressedData(getData(arg)).forEach((item, index) => {
		if (item !== '.') {
			result += item * index
		}
	})
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
