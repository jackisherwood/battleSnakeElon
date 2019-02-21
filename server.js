const bodyParser = require('body-parser')
const express = require('express')
const smorts = require('./smorts.js')

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
    color: '#000000',
  }

  return response.json(data)
})

// Handle POST request to '/move'
app.post('/move', (request, response) => {
  // NOTE: Do something here to generate your move
  console.log(JSON.stringify(request.body, null, 4))
  const body = request.body
  const board = body.board

  const boardHeight = board.height
  const boardWidth = board.width

  const mySnake = body.you
  const health  = mySnake.health
  const myBody  = mySnake.body

  let my_move = 'up';

  if(smorts.wallDanger(myBody[0], boardWidth, boardHeight)) {
    console.log("DANGER")
    my_move = 'left'
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
