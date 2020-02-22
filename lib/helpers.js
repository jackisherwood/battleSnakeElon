// position ==> {x: int, y: int}
exports.getNeighbors = (position) => {
	return [{postion.x, postion.y + 1}, {postion.x, postion.y - 1}, {postion.x + 1, postion.y}, {postion.x - 1, postion.y}]
}