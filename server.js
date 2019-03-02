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
    color: '#babe11',
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
  const boardFood = board.food

  const mySnake = body.you
  const health  = mySnake.health
  const myBody  = mySnake.body
  const head = myBody[0]
  const snekParts = _.flatten(_.map(board.snakes, (x) => x.body))

  let moveOptions = [{x: head.x, y: head.y + 1}, {x: head.x, y: head.y - 1}, {x: head.x + 1, y: head.y}, {x: head.x - 1, y: head.y}]

  moveOptions = smorts.removeOOB(smorts.posDiff(moveOptions, snekParts), boardWidth, boardHeight)

  let my_move = 'up';

  if (health <= 50) {
    const distToFood = _.partialRight(smorts.smallestDistance, boardFood)
    let sorted = _.sortBy(moveOptions, distToFood)
    my_move = smorts.whatDir(head, sorted[0])
  } else {
    let current_dir = smorts.getCurrentDir(head, myBody[1])

    let dirFromHead = _.partial(smorts.whatDir, head)
    let possibleDirs = _.map(moveOptions, dirFromHead)

    let rightTurn = smorts.rightTurn(current_dir)

    if(_.includes(possibleDirs, rightTurn)) {
      my_move = rightTurn
    } else if (_.includes(possibleDirs, current_dir)) {
      my_move = current_dir
    } else {
      my_move = possibleDirs[0]
    }
  }

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

