const _ = require('lodash')
const helpers = require('./helpers.js')

function valid(width, height, snakeParts, flooded, position) {
	// x, y is in bounds
	if (position.x < 0 || position.y < 0 || position.x >= width || position.y >= height) return false
	// x, y is not a snake part
	if (snakeParts[`${position.x},${position.y}`]) return false
	// x, y is not in flooded
	if (flooded[`${position.x},${position.y}`]) return false

	console.log(`valid `)

	return true
}

// board ==> board state
// max ==> int (max flood size for efficiency)
// position ==> {x: int, y: int}
exports.floodFrom = (width, height, snakeParts, max, position) => {
	let flooded = {}

	let space = 0 // intial flood value
	let stack = [position]

	while ((space < max + 1) && (stack.length > 0)) {
		let current = stack.pop()
		space++
		flooded[`${current.x},${current.y}`] = true

		let isValid = _.partial(valid, width, height, snakeParts, flooded)
		let pushToStack = _.partialRight(_.forEach, (x) =>  stack.push(x))

		let neighbors = helpers.getNeighbors(current)

		let validNeighbors = _.filter(neighbors, isValid)

		pushToStack(validNeighbors)
	}

	return space
}