const _ = require('lodash')
import * from "helpers" as helpers

function isValid(boardState, flooded, position) {
	// x, y is in bounds
	// x, y is not a snake part
	// x, y is not in flooded
	return true
}

// board ==> board state
// max ==> int (max flood size for efficiency)
// position ==> {x: int, y: int}
exports.floodFrom = (board, max, position) => {

	let flooded = {}

	// Get volume of space around position (x, y)
	let space = 0 // intial flood value
	// Put (x, y) in queue
	let queue = new Queue()
	queue.enqueue(position)

	while (space < snakeSize + 1 and queue.length > 0) {
		let current = queue.next()
		space++

		flooded[`${position}`] = true
		let isValid = _.partial(isValid, board, flooded)

		let neighbors = _.filter(helpers.getNeighbors(current), isValid)

		// Enqueue valid neighbors
	}

	// Return options with enough space for Elon + 1
	return space
}