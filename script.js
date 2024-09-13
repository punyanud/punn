//ตั้งค่าหน้าจอเกม
let board;
let boardWidth = 800;
let boardHeight = 300;
let context;

//ตั้งค่าตัวละคร
let playerWidth = 85;
let playerHeight = 85;
let playerX = 50;
let playerY = 215;
let playerImg;
let player = {
    x:playerX,
    y:playerY,
    width:playerWidth,
    height:playerHeight
}
let gameOver = false;
let score = 0;
let time = 0;

//สร้างอุปสรรค
let boxImg;
let boxWidth = 80;
let boxHeight = 80;
let boxX = 700;
let boxY = 220;

// set อุปสรรค
let boxesArray = [];
let boxSpeed = -8;

//Gravity & velocity
let velocityY = 0;
let gravity = 0.25;

let life =3;

//การกำหนดเหตุการณ์เริ่มต้นเกม
window.onload = function() {
    board = document.getElementById('board');
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext('2d');

    //player
    playerImg = new Image();
    playerImg.src = "pikachu.png";
    playerImg.onload = function() {
       context.drawImage(playerImg , player.x , player.y , player.width , player.height);
    }

    //animation frame
    requestAnimationFrame(update);

    //ดักจับกระโดด
    document.addEventListener("keydown", movePlayer);

    //สร้าง box
    boxImg = new Image();
    boxImg.src = "R.png";
    setInterval(createBox , 2000);

    context.font = "normal bold 20px Arial";
    context.textAlign = "left";
      context.fillText("Life :" + life, 10 , 60);

      lifeIMG = new Image();
      lifeIMG.src = "88.png";

      if(life > 0){
        for(let i = life ; i > 0 ; i --){
         
            context.drawImage(lifeIMG,(((30+(10+10)*i))-50),80,50,50);
            
        }
    }

}

//update
function update() {
    requestAnimationFrame(update);

    if (gameOver) {
        return;
    }

    context.clearRect(0 , 0, board.width , board.height);
    velocityY += gravity;

    //Create play object
    player.y = Math.min(player.y + velocityY, playerY);
    context.drawImage(playerImg , player.x , player.y , player.width , player.height);

    //Create Array Box
    for(let i = 0 ; i < boxesArray.length ; i++ ) {
        let box = boxesArray[i];
        box.x += boxSpeed;
        context.drawImage(box.img , box.x , box.y , box.width , box.height);

        //ตรวจสอบเงื่อนไขการชนของอุปสรรค
        if(onCollision(player,box)) {
            life--;
            if(life <= 0){
            gameOver = true;

            //การแจ้งเตือน
            context.font = "bold 40px Arial";
            context.textAlign = "center";
            context.fillText("Game Over!",boardWidth/2 , boardHeight/2);
            context.font = "bold 30px Arial";
            context.fillText("Score : " + (score+1) ,boardWidth/2 , 200);
            }else{
                boxesArray = [];
                score = 0;
                time = 0;
                player.y = playerY;
            }
        }
         context.font = "normal bold 20px Arial";
          context.textAlign = "left";
         context.fillText("Life :" + life, 10 , 60);

    }
    if(life > 0){
        for(let i = life ; i > 0 ; i --){
         
            context.drawImage(lifeIMG,(((30+(10+10)*i))-50),80,50,50);
            
        }
    }
    

    //นับคะแนน

    if(time>=60){
        gameOver = true;
        context.font = "bold 40px Arial";
            context.textAlign = "center";
            context.fillText("Win!",boardWidth/2 , boardHeight/2);
            context.font = "bold 30px Arial";
            context.fillText("Score : " + (score+1) ,boardWidth/2 , 200);
    }
score++;
context.font = "normal bold 20px Arial";
context.textAlign = "left";
context.fillText("Score :" + score, 10 , 30);

//เวลา
time += 0.01;
context.font = "normal bold 20px Arial";
context.textAlign = "right";
context.fillText("Time : " + (time.toFixed(2)), 765 , 30);
}

// เคลื่อนตัวละคร
function movePlayer(e) {
    if(gameOver) {
        return;
    }

    if(e.code == "Space" && player.y == playerY) {
        velocityY = -10;
    }
}

function createBox() {
    if(gameOver) {
        return;
    }

    let box = {
        img:boxImg,
        x:boxX,
        y:boxY,
        width:boxWidth,
        height:boxHeight
    }

    boxesArray.push(box);

    if(boxesArray.length > 5) {
        boxesArray.shift;
    }
}

function onCollision(obj1 , obj2) {
    return obj1.x < (obj2.x + obj2.width) &&
           (obj1.x + obj1.width) > obj2.x //ชนกันในแนวนอน
           &&
           obj1.y < (obj2.y + obj2.height) &&
           (obj1.y + obj1.height) > obj2.y //ชนกันในแนวตั้ง
}

//restart game
function restartGame() {
    location.reload();
}