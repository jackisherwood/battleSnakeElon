
function wallDanger(head, width, height) {
  return head.x == 0 || head.x == width - 1 || head.y == 0 || head.y == height - 1 
}

module.exports = { wallDanger }