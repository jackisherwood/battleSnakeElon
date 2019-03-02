const _ = require('lodash')

function wallDanger(head, width, height) {
  return head.x == 0 || head.x == width - 1 || head.y == 0 || head.y == height - 1 
}

function posDiff(arr1, arr2) {
  return _.differenceWith(arr1, arr2, (x,y) => {
    return x.x === y.x && x.y === y.y 
  })
}

function removeOOB(arr, width, height) {
  return _.filter(arr, (x) => {
    return x.x >= 0 && x.y >= 0 && x.x < width && x.y < height
  })
}


function absPointDifference(point1, point2) {
  return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y)
}

function smallestDistance(point, pointArray) {
  const headDifference = _.partial(absPointDifference, point)
  let min = _.min(_.map(pointArray, headDifference))
  return min
}

function whatDir(head, next) {
  if(next.x > head.x) {
    return 'right'
  } else if (next.x < head.x) {
    return 'left'
  } else if (next.y < head.y) {
    return 'up'
  } else {
    return 'down'
  }
}

module.exports = { wallDanger, posDiff, removeOOB, whatDir, smallestDistance }
