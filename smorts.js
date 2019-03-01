const _ = require('lodash')

function wallDanger(head, width, height) {
  return head.x == 0 || head.x == width - 1 || head.y == 0 || head.y == height - 1 
}

function posDiff(arr1, arr2) {
  return _.differenceWith(arr1, arr2, _.isEqual)
}

function removeOOB(arr, width, height) {
  return _.filter(arr, (x) => {
    return x.x >= 0 && x.y >= 0 && x.x < width && x.y < height
  })
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

function distToFood(x, y, currPos) {//calls with x position, and y position of food and head position
  const xVal = Math.abs(currPos.x - x)
  const yVal = Math.abs(currPos.y - y)

  //return Math.sqrt( Math.pow(xVal, 2) + Math.pow(yVal, 2));
  return xVal + yVal
}

function smallestDistIndex(currPos, foodArr) {//calls with current position and food array
  let minLength = 100000
  let indx = 0
  for(let i=0; i<foodArr.length; i++) {
    let n = distToFood(foodArr[i].x, foodArr[i].x, currPos) 
    if( n < minLength){
      minLength = n
      indx = i
    }
  }
  return i
}



module.exports = { wallDanger, posDiff, removeOOB, whatDir }