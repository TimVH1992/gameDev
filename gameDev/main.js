const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

/* To keep constantly updating the canvas drawing on each frame,
we need to define a drawing function that will run over and over again,
with a different set of variable values each time to change
sprite positions, etc. You can run a function over and over again using
a JavaScript timing function 
such as setInterval() or requestAnimationFrame(). */

// canvas variabelen
    let x = canvas.width / 2;
    let y = canvas.width / 2;

// bal variabelen
    let dx = 2;
    let dy = -2;
    const ballRadius = 10;

// paddle variabelen
    let paddleHeight = 10;
    let paddleWidth = 75;
    let paddleX = (canvas.width - paddleWidth) / 2;

// paddle bewegingsvariabelen
    let rightPressed = false;
    let leftPressed = false;

// brick variabelen
    let brickRowCount = 3;
    let brickColumnCount = 5;
    let brickWidth = 75;
    let brickHeight = 20;
    let brickPadding = 10;
    let brickOffsetTop = 30;
    let brickOffsetLeft = 30; 
    
// gameplay variabelen   
    let score = 0;
    let lives = 3;
    

    const bricks = [];
        for (let i = 0; i < brickColumnCount; i++) {
            bricks[i] = [];
            for (let j = 0; j < brickRowCount; j++) {
                bricks[i][j] = { x: 0, y: 0, status: 1 }; 
            }
        }
        // berekening voor de x en de y waarden van de bricks


// draw functions for all elements
function drawBall() {
    if (y + dy < ballRadius){
    dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        } else {
        
        lives--;
        if(!lives){
        alert("GAME OVER");
        document.location.reload();
        
        } else {
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 2;
            dy = 2;
            paddleX = (canvas.width-paddleWidth) / 2;
        }
    }
}
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius){
    dx = -dx;
    }
    x += dx;
    y += dy;

    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for(let i = 0; i < brickColumnCount; i++) {
        for (let j= 0; j < brickRowCount; j++) {
            if(bricks[i][j].status == 1) {
            let brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
            let brickY = (i * (brickHeight + brickPadding)) + brickOffsetTop;

            bricks[i][j].x = brickX;
            bricks[i][j].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            // ctx.rect(brickX + 80, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
        }
    }
}

// 2. event listeners voor keyup en keydown events
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if
    (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } 
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } 
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function collisionDetection() {
    for(let i = 0; i < brickColumnCount; i++) {
        for (let j = 0; j < brickRowCount; j++) {
            let b = bricks[i][j];
            // berekeningen
            if(b.status == 1) { 
            if (x > b.x && x < b.x + brickWidth && y + ballRadius > b.y && y - ballRadius < b.y + brickHeight) {
                dy = -dy;
                b.status = 0;
                score++;
                if(score == brickRowCount * brickColumnCount) {
                    alert("YOU WIN, CONGRATULATIONS!");
                    document.location.reload();

                }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width -65, 20);
}

function draw() {
    // drawing code
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    
    drawBall();
// 3. de eigenschap om de paddle links en rechts te laten bewegen 
        if (rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 7;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }
    drawPaddle();
    collisionDetection();
    drawScore();
    drawLives();
    requestAnimationFrame(draw);
}

// loop to keep drawing untill a stop command
draw();

