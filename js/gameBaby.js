var canvas, context, myInterval;
var colisao = false;
var score = 0;
var vida = 3;
var lifeScore = 3;

var babyX = 0;
var babyY = -100;
var babyVelocity = 0;

var obstacleX = 0;
var obstacleY = -100;
var obstacleVelocity = 0;

var btnPlay = document.getElementById('buttonPlay');

var paddle1X = 250;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 0; 

function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft - 59;
    // var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        // y:mouseY
    };
}
window.onload = function(){
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    // var framesPerSecond = 30;

    //posicao cursos do mouse
    canvas.addEventListener('mousemove',function(evt){
        var mousePos = calculateMousePos(evt);
        paddle1X = mousePos.x-(PADDLE_WIDTH/2);
    });
    setInterval(instrucao, 3000);
    setTimeout(iniciar, 3000);

    btnPlay.style.display ='none';
    gameLoop();
}
function iniciar(){
    babyX = 960;
    babyY = - 10;
    babyVelocity = 5;

    obstacleX = 960;
    obstacleY = - 10;
    obstacleVelocity = 3;
}
function instrucao(){
    $("#instrucao").fadeOut('slow');
}
function gameLoop(){
    drawImg(0, 0, 'img/bg1.png');
    drawEverything();
    moveEverything();
    drawText(lifeScore, 150, 50);
    drawText("Score", canvas.width - 200, 50);
    drawText(score, canvas.width - 70, 50);
    drawText("Vidas", 30, 50);
    drawImg(babyX, babyY, 'img/baby2.png');
    drawImg(obstacleX, obstacleY, 'img/obstacle.png');
    drawImg(paddle1X, 450, 'img/berco.png');
    requestAnimationFrame(gameLoop);
}

function moveEverything(){
    if(babyY <= canvas.height){
        babyY += babyVelocity;
    }else{
        babyX = Math.random() * 940;
        babyY = -10;
        colisao = false;
    }
    if(obstacleY <= canvas.height){
        obstacleY += obstacleVelocity;
    }else{
        obstacleX = Math.random() * 940;
        obstacleY = -10;
        colisao = false;
    }

    //colisao
    if((babyX > paddle1X && babyX < paddle1X + PADDLE_WIDTH) && babyY >= canvas.height-150 &&colisao == false){
        score++;
        vida = vida;
        colisao = false;
        babyY += 1000;
    }
    
    if((obstacleX > paddle1X && obstacleX < paddle1X + PADDLE_WIDTH) && obstacleY >= canvas.height-150 &&colisao == false){
        lifeScore--;
        vida--;
        colisao = false;
        obstacleY += 1000;
    }
    if(vida == 0){
        babyY += 5000;
        paddle1X += 1000;
        obstacleY += 5000;
        paddle1X += 1000;
        // context.restore();
        // clearInterval(myInterval);
        // clear();
        btnPlay.style.display ='block';
    }
}    
function drawEverything(){
    colorRect(paddle1X + 8,450,PADDLE_WIDTH,PADDLE_HEIGHT,'white');
}
function colorCircle(centerX, certerY, radius, drawColor){
    context.fillStyle = drawColor;
    context.beginPath();
    context.arc(centerX,certerY,radius,0,Math.PI*2, true);
    context.fill();
}
function colorRect(leftX, topY, width,height, drawColor){
    context.fillStyle = drawColor;
    context.fillRect(leftX, topY, width,height);
}
function drawImg(posX, posY, url){
    var img = new Image();
    img.onload = function(){
        context.drawImage(img, posX, posY);
    }
    img.src = url;
    return img;
}
function clear(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    // commtens
}
function drawText(element, x, y){
    context.font = "28pt Tahoma";
    context.fillText(element, x, y);
    context.strokeStyle = '#fff';
    window.requestAnimationFrame(drawText);
}
