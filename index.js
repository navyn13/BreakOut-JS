const grid = document.querySelector('.grid')
grid.style.left = '380px'
grid.style.top = '150px'

let score=0 

const boardWidth = 560
const boardHeight = 400
const diameter = 30

const random=2



let xDirection = random
let yDirection = random

let userStart = [230, 10]
let currentPosition = userStart

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + 100, yAxis]
        this.topRight = [xAxis + 100, yAxis + 25]
        this.topLeft = [xAxis, yAxis + 25]
    }
}
// block storing co-ordinates of game blocks
const blocks = [
    new Block(10, 365),
    new Block(120, 365),
    new Block(230, 365),
    new Block(340, 365),
    new Block(450, 365),

    new Block(10, 330),
    new Block(120, 330),
    new Block(230, 330),
    new Block(340, 330),
    new Block(450, 330),

    new Block(10, 295),
    new Block(120, 295),
    new Block(230, 295),
    new Block(340, 295),
    new Block(450, 295),

    new Block(10, 260),
    new Block(120, 260),
    new Block(230, 260),
    new Block(340, 260),
    new Block(450, 260),


]

// create game blocks
for (var i = 0; i < blocks.length; i++) {
    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0] + 'px'
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'
    grid.appendChild(block)

}

// create user block 
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

// move user block
function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 15
                user.style.left = currentPosition[0] + 'px'
                drawUser()
                break;
            }
        case 'ArrowRight':
            if (currentPosition[0] < 450) {
                currentPosition[0] += 15
                user.style.left = currentPosition[0] + 'px'
                drawUser()
                break;
            }
    }
}
document.addEventListener('keydown', moveUser)

let ballStart = [265, 35]
let ballCurrentPosition = ballStart
// create  ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawball()
grid.appendChild(ball)



function drawball() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}
// move ball

function moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawball()
    checkForCollision()
}
let timerId = setInterval(moveBall, 15)

// check for collision

function checkForCollision() {
    // check for block hit
    for(let i=0; i<blocks.length; i++){
        if(ballCurrentPosition[0]> blocks[i].bottomLeft[0] && ballCurrentPosition[0]<blocks[i].bottomRight[0] &&
            (ballCurrentPosition[1]+ diameter)>=blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1]
            ){
                const allBlocks = Array.from(document.querySelectorAll('.block'))
                allBlocks[i].classList.remove('block')
                blocks.splice(i,1)
                changeDirection()
                score++
                if(score===20){
                    alert('YOU WON THE GAME')
                    clearInterval(timerId)
                }
            }
    }
    // user hit
    if(ballCurrentPosition[0]>currentPosition[0]-15 && ballCurrentPosition[0]<currentPosition[0]+ 100 && ballCurrentPosition[1]<=35){
        changeDirection()
    }
    // wall collision
    if (ballCurrentPosition[0] >= boardWidth - diameter || ballCurrentPosition[0] <= 0 || ballCurrentPosition[1] > boardHeight - diameter) {
        changeDirection()
    }
    // game over
    if(ballCurrentPosition[1] <= 0){
        clearInterval(timerId)
        alert('YOU LOSE')
    }
}

// create funtion to change direction
function changeDirection(){
    if (xDirection === random && yDirection === random) {
        yDirection = -random
        return
      }
      if (xDirection === random && yDirection === -random) {
        xDirection = -random
        return
      }
      if (xDirection === -random && yDirection === -random) {
        yDirection = random
        return
      }
      if (xDirection === -random && yDirection === random) {
        xDirection = random
        return
      }
    
    
}