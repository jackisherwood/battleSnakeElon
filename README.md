# **BattleSnake**

## **Introduction**
We are a group of 3 UVic students who decided to join in the [Battle Snake](https://play.battlesnake.io/) competition for 2019. This was all of our first year competing and we are by no means the golden example of how to do this.

## **Explanation**
We split the work into 2 files, *server.js* and *smorts.js*. *server.js* is the processing and I/O of our snake, we take in the data provided, hand-off to the "intelligence" of the snake, and then output back our response. *smorts.js* is where we keep the functions that control the "intelligence". 

### ***server.js***
 *server.js* needs to respond to 4 different input commands:
1. /start
2. /move
3. /end
4. /ping

**/start**: The only thing we changed is the colour of our snake, and the styling of our snake.

**/move**:This is where we had almost all of our code. Our snake had 3 behaviours: "scared", "hungry", and "wimpy". Our snake only looks at the 3 squares a head of it (not 4 because body takes 1 up). It uses a couple algorithms to determine which of the 3 options are ideal. The most basic avoidance algorithm we have looks at the square 1 in front of the head and if it is a snake body (including its own), or a wall then it will take another option.

*Scared*:\
Since we started a lot later than we should have, and we did not want to bite off more than we could chew, we opted not to implement any pathfinding algorithm and to keep it very simple. This behaviour is constantly being run, and behaves as follows. If there is a snake (head, body, or tail) within 3 squares of the head of our snake, we calculate the best option taking into consideration distance from the enemy snake. This calculation is all we have for snake avoidance other than looking 1 square ahead.

*Hungry*:\
Our hungry behaviour is very simple. We have a dynamiclly calculated hunger level that changes in accordance to how much food is on the board, lower amount of food means higher hunger level. The algorithm for finding food is similiar to avoiding snakes, but a square closer to food is now favoured.

*Wimpy*:\
The Wimpy behaviour is the bread and butter of this snake. It is acivated when no snake is near, and we are not hungry. The snake chases its own tail based on an alogithm that calculates the ideal next move to the snake's own tail. The snake uses this behaviour for majority of it's lifespan.

**/end**: All that end gives is a blank response, this is where you can write code for when the snake dies. Since we stored no game state we did nothing here.

**/ping**: This is used to check whether the server is responsive, the response is blank.

### ***smorts.js***
smorts.js is the file where all the functions are located. We have the 3 main behaviour algorithms in here, as well as all the helper functions the algorithms use. Most of the functions utilize lodash, which helped us a huge amount.

## **Installation**
Not much is needed to run this snake (not sure why you would want to).\
Clone the repo:
```bash
git clone https://github.com/jackisherwood/battleSnakeElon.git
```

\
Install the `node_modules`:
```bash
npm install
```

\
And to run all that is needed is:
```bash
node server.js
```

\
Although 
```bash
nodemon server.js
```
is recommended if you want to make any changes.

\
The program will print out:
```bash
Server listening on port 3000
```
Now Elon is up and running!

## **Conclusion**
We all learned different things from this experience, and we cannot deny we were all nervous when our snake had it's first match. We will return next year (2020) and hopefully put more time into it.


##### Contributors:
[jackisherwood](https://github.com/jackisherwood)\
[isaacdonaldson](https://github.com/isaacdonaldson)\
[nolanfitz](https://github.com/nolanfitz)
