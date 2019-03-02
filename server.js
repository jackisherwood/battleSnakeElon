const bodyParser = require('body-parser')
const express = require('express')
const smorts = require('./smorts.js')
const _ = require('lodash')

const app = express()

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', (process.env.PORT || 3000))

app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.json({status: 1})
})

// Handle POST request to '/start'
app.post('/start', (request, response) => {
  // NOTE: Do something here to start the game

  // Response data
  const data = {
    color:   '#000000',   //'#ADDe86',
    secondary_color: '#f4f4f4',
    headType: 'beluga',
    tailType: 'pixel'
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
  const allSnakes = _.flatten(_.map(board.snakes, (x) => x.body))
  const snekParts = smorts.posDiff(allSnakes, myBody)

  let moveOptions = [{x: head.x, y: head.y + 1}, {x: head.x, y: head.y - 1}, {x: head.x + 1, y: head.y}, {x: head.x - 1, y: head.y}]

  moveOptions = smorts.removeOOB(smorts.posDiff(moveOptions, allSnakes), boardWidth, boardHeight)
  

  const headToSnek = smorts.smallestDistance(head, snekParts)
  let my_move = 'up';

  const hungry = smorts.getHungry(boardFood)
  const distToTail = _.partial(smorts.absPointDifference, _.last(myBody))

  if(headToSnek <= 3) {
    const distToSnek = _.partialRight(smorts.smallestPyDist, snekParts)
    let new_sorted = _.reverse(_.sortBy(moveOptions, distToSnek, (x) => -1 * distToTail(x)))
    my_move = smorts.whatDir(head, new_sorted[0])
  } else if (health <= hungry && boardFood.length > 0) {
    const distToFood = _.partialRight(smorts.smallestDistance, boardFood)
    let sorted = _.sortBy(moveOptions, distToFood)
    my_move = smorts.whatDir(head, sorted[0])
  } else {
    let current_dir = smorts.getCurrentDir(head, myBody[1])
    let dirFromHead = _.partial(smorts.whatDir, head)
    
    let sorted = _.sortBy(moveOptions, distToTail, (x) => {
      let possDir = dirFromHead(x)
      return possDir != current_dir ? 1 : -1
    })

    my_move = smorts.whatDir(head, sorted[0] || _.last(myBody))
    // let possibleDirs = _.map(sorted, dirFromHead)

    // let rightTurn = smorts.rightTurn(current_dir)

    // if(_.includes(possibleDirs, rightTurn)) {
    //   my_move = rightTurn
    // } else if (_.includes(possibleDirs, current_dir)) {
    //   my_move = current_dir
    // } else {
    //   my_move = possibleDirs[0]
    // }


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

