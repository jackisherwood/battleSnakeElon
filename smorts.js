const _ = require('lodash')

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

function pyDiff(point1, point2) {
  return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2))
}

function smallestPyDist(point, pointArray) {
  const headDifference = _.partial(pyDiff, point)
  let min = _.min(_.map(pointArray, headDifference))
  return min
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

function getHungry(food) {
  let hungryMod = 40 - (food.length * 4)

  if(hungryMod < 0) {
    hungryMod = 0
  } else if (hungryMod > 40) {
    hungryMod = 40
  }

  return 50 + hungryMod
}

function getCurrentDir(head, prev) {
  let xDir = head.x - prev.x
  let yDir = head.y - prev.y
  if(xDir < 0) {
    return "left"
  } else if(xDir > 0) {
    return "right"
  } else if(yDir < 0) {
    return "up"
  } else {
    return "down"
  }
}

function collisionAvoider(moveOptions, snekParts, myBody, head) {
  const distToSnek = _.partialRight(smallestPyDist, snekParts)
  const distToTail = _.partial(absPointDifference, _.last(myBody))
  const sorted = _.reverse(_.sortBy(moveOptions, distToSnek, (x) => distToTail(x)))

  return whatDir(head, sorted[0])
}

function tailChaser(moveOptions, myBody, head) {
  const current_dir = getCurrentDir(head, myBody[1])
  const distToTail = _.partial(absPointDifference, _.last(myBody))
  const sorted = _.sortBy(moveOptions, distToTail, (x) => whatDir(head, x) != current_dir ? 1 : -1)

  return whatDir(head, sorted[0] || _.last(myBody))
}

function foodSeeker(moveOptions, boardFood, head) {
  const distToFood = _.partialRight(smallestDistance, boardFood)
  const sorted = _.sortBy(moveOptions, distToFood)

  return whatDir(head, sorted[0])
}

function getMoveOptions(allSnakes, head, width, height) {
  const genOptions = [{x: head.x, y: head.y + 1}, {x: head.x, y: head.y - 1}, {x: head.x + 1, y: head.y}, {x: head.x - 1, y: head.y}]
  return removeOOB(posDiff(genOptions, allSnakes), width, height)
}

module.exports = { posDiff, smallestDistance, getHungry,
                   tailChaser, foodSeeker, collisionAvoider, getMoveOptions, whatDir }
