const bodyParser = require('body-parser')
const express = require('express')
const smorts = require('./smorts.js')
const _ = require('lodash')

const app = express()
app.set('port', (process.env.PORT || 3000))

app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.json({status: 1})
})

// Handle POST request to '/start'
app.post('/start', (request, response) => {
  // Response data
  const data = {
    color:   '#000000',
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
  const snekParts = smorts.posDiff(allSnakes, myBody)
  
  const moveOptions = smorts.getMoveOptions(allSnakes, head, board.width, board.height)

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
  // Used for checking if this snake is still alive.
  return response.json({});
})

app.listen(app.get('port'), () => {
  console.log('Server listening on port %s', app.get('port'))
})

