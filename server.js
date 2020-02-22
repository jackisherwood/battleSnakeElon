const bodyParser = require('body-parser')
const express = require('express')
const smorts = require('./smorts.js')
const _ = require('lodash')
const flooder = require('./lib/floodFill.js')

const app = express()
app.set('port', (process.env.PORT || 8080))

app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.json({status: 1})
})

// Handle POST request to '/start'
app.post('/start', (request, response) => {
  // Response data
  const data = {
    color:   '#A5FBFF',
    secondary_color: '#f4f4f4',
    headType: 'beluga',
    tailType: 'pixel'
  }

  return response.json(data)
})

// Handle POST request to '/move'
app.post('/move', (request, response) => {
  const body = request.body
  const board = body.board
  const food = board.food

  const health  = body.you.health
  const myBody  = body.you.body
  const head = myBody[0]

  const allSnakes = _.flatten(_.map(board.snakes, (x) => x.body))
  const snakeObj = _.reduce(allSnakes, (acc, x) => {
    acc[`${x.x},${x.y}`] = true
    return acc
  }, {})
  // console.log(JSON.stringify(snakeObj, null, 4))
  const snekParts = smorts.posDiff(allSnakes, myBody)
  let moveOptions = smorts.getMoveOptions(allSnakes, head, board.width, board.height)

  // Floodfill
  let newMoveOptions = _.filter(moveOptions, (x) => flooder.floodFrom(board.width, board.height, snakeObj, myBody.length,  x) >= myBody.length + 1)
  if (newMoveOptions.length > 0) {
    moveOptions = newMoveOptions
  }

  // TODO: Be scared of enemy heads

  const headToSnek = smorts.smallestDistance(head, snekParts)
  const hungry = smorts.getHungry(food)

  let my_move = 'up';

  if(headToSnek <= 3) { //scared state
    my_move = smorts.collisionAvoider(moveOptions, snekParts, myBody, head)
  } else if (health <= hungry && food.length > 0) { //hungry state
    my_move = smorts.foodSeeker(moveOptions, food, head)
  } else { //wimpy state
    my_move = smorts.tailChaser(moveOptions, myBody, head)
  }

  if(moveOptions.length == 0) {
    my_move = smorts.whatDir(head, _.last(myBody))
  }

  // Response data
  const data = {
    move: my_move
  }

  return response.json(data)
})

app.post('/end', (request, response) => {
  // NOTE: Any cleanup when a game is complete.
  return response.json({})
})

app.post('/ping', (request, response) => {
  return response.json({});
})

app.listen(app.get('port'), () => {
  console.log('Server listening on port %s', app.get('port'))
})

