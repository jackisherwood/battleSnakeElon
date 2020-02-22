// position ==> {x: int, y: int}
exports.getNeighbors = (position) => {
	return [{x: position.x, y: position.y + 1}, {x: position.x, y: position.y - 1}, {x: position.x + 1, y: position.y}, {x: position.x - 1, y: position.y}]
}