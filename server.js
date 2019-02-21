const bodyParser = require('body-parser')
const express = require('express')
const smorts = require('./smorts.js')
const _ = require('lodash')

const app = express()

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', (process.env.PORT || 3000))

app.use(bodyParser.json())

// Handle POST request to '/start'
app.post('/start', (request, response) => {
  // NOTE: Do something here to start the game

  // Response data
  const data = {
    color: '#F0F0F0',
    secondary_color: '#bfff00'
  }

  return response.json(data)
})

// Handle POST request to '/move'
app.post('/move', (request, response) => {
  // NOTE: Do something here to generate your move
  // console.log(JSON.stringify(request.body, null, 4))
  const body = request.body
  const board = body.board

  const boardHeight = board.height
  const boardWidth = board.width

  const mySnake = body.you
  const health  = mySnake.health
  const myBody  = mySnake.body
  const head = myBody[0]

  console.log("BODY: " + JSON.stringify(myBody))

  let moveOptions = [{x: head.x, y: head.y + 1}, {x: head.x, y: head.y - 1}, {x: head.x + 1, y: head.y}, {x: head.x - 1, y: head.y}]

  moveOptions = smorts.removeOOB(smorts.posDiff(moveOptions, myBody), boardWidth, boardHeight)

  console.log(">>>>>>>>")
  console.log(moveOptions)

  let my_move = 'up';

  console.log("Current head: " + JSON.stringify(head))
  console.log("Moving to: " + JSON.stringify(moveOptions[0]))

  my_move = smorts.whatDir(head, moveOptions[0])

  // Response data
  const data = {
    move: my_move, // one of: ['up','down','left','right']
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
