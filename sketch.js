var player,playerImg;
var obstacleGroup,obstacleImg;
var bg,bgImg;
var bulletImg;
var score=0;
var life=5;
var bulletGroup;
var gameState="PLAY";

function preload(){
bgImg=loadImage("assets/image/bg.jpeg");
playerImg=loadImage("assets/image/player.png");
bulletImg=loadImage("assets/image/cbullet.png");
obstacleImg=loadImage("assets/image/obstacle.png")
}

function setup() {
createCanvas(windowWidth,windowHeight);
bg = createSprite(displayWidth/2-20,displayHeight/2+50,20,20);
bg.addImage(bgImg);
bg.scale=1.2;

player = createSprite(width/2, height/2+250, 0, 0);
player.addImage(playerImg)
player.scale=0.1
player.debug=true;
player.setCollider("rectangle",0,0,800,1500);

obstacleGroup = new Group();
bulletGroup = new Group();
}

function draw() {
  background("white");
  gameState="PLAY"
if(gameState==="PLAY"){
// Keys
if(keyDown("RIGHT")){
  player.x=player.x+5;
}
if(keyDown("LEFT")){
  player.x=player.x-5;
}

obstacleGroup.velocityY=5;


// bullet
if(keyWentDown("space")){
  var bullet = createSprite(0,0,0,0)
  bullet.x=player.x;
  bullet.y=player.y-80;
  bullet.addImage(bulletImg);
  bullet.scale=0.1
  bullet.velocityY=-10;
  // bullet.debug=true;
  bulletGroup.add(bullet)
}
// Calling Asteroids function 
astroids();
// If bullet touches to obstacle
if(obstacleGroup.isTouching(bulletGroup)){
for(var i = 0 ; i<obstacleGroup.length;i++)
obstacleGroup[i].destroy();
for(var b = 0 ; b<bulletGroup.length;b++)
bulletGroup[b].destroy();
}
}
if(obstacleGroup.isTouching(player)){
  gameState="END";
  }
if(gameState==="END"){
  obstacleGroup.velocityY=0;
  life=life-1;
}
// Drawing all Sprites
  drawSprites();
  fill("lightblue")
  textSize(40)
  text("Score:"+score,displayWidth/2+400,50)
  fill("yellow")
  text("Life:"+life,displayWidth/2+400,120)
}

function astroids() {
  if(frameCount%60===0){
  var enemy = createSprite(200,-5,0,0);
  enemy.x=random(500,1000);
  enemy.velocityY=5
   enemy.addImage(obstacleImg)
   enemy.scale=0.3;
   enemy.debug=true;
   enemy.setCollider("rectangle",-50,0,350,300);

   obstacleGroup.add(enemy)
}
}