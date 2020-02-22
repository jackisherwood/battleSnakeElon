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

	let space = 0 // intial flood value
	let stack = [postion]

	while (space < snakeSize + 1 && stack.length > 0) {
		let current = stack.pop()
		space++
		flooded[`${current}`] = true

		let isValid = _.partial(isValid, board, flooded)
		let pushToStack = _.partial(_.forEach, (x) =>  stack.push(x))

		let validNeighbors = _.filter(isValid, helpers.getNeighbors(current))

		pushToStack(validNeighbors)
	}

	// Return options with enough space for Elon + 1
	return space
}