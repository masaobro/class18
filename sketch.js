var PLAY = 1;
var END = 0;
var gameState = PLAY;
var die,jump,checkpoint;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var loadAnimation;
var score;
var gameover,gameoverImage;
var reset,resetImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  gameoverImage = loadImage("gameOver.png");
  resetImage = loadImage("restart.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  checkpoint = loadSound("checkPoint.mp3");
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  var message;
  message = "i belong to setup"
 
  trex = createSprite(50,height-30,20,50);
  trex.addAnimation("running", trex_running);
  
  trex.scale = 0.5;
  
  ground = createSprite(width/2,height-30,width,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  
  invisibleGround = createSprite(width/2,height-20,width,10);
  invisibleGround.visible = false;
  
  // create Obstacles and Cloud groups
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  trex.setCollider("rectangle",0,0,100,80);
  
  trex.debug = false; 
  score = 0;
  gameover = createSprite(width/2,height/2,100,50);
  gameover.addImage("over",gameoverImage);
  gameover.scale = 1.2;
  gameover.visible = false;
  reset = createSprite(width/2,height/2+50,100,100);
  reset.addImage("reset",resetImage);
  reset.scale = 0.5;
  reset.visible = false;
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);
  score = score + Math.round(getFrameRate()/60);
  if(score%500===0&&score>0){
  checkpoint.play();
  }
  if(gameState === PLAY){
    //move the ground
  ground.velocityX = -(4+score/1000);  
     if(touches.length>0 ||keyDown("space")&& trex.y >= height-70) {
    trex.velocityY = -14;
    jump.play();
  }
  
  //spawn the clouds
  spawnClouds();
  
  //spawn obstacles on the ground
  spawnObstacles();
    
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
  if(obstaclesGroup.isTouching(trex)){
  die.play();
  gameState = END 
  }
  }
  else if(gameState === END){
  trex.addAnimation("running" , trex_collided)
    //stop the ground
    ground.velocityX = 0;
    trex.velocityY = 0;
   obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1); 
 obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
   gameover.visible = true;
  reset.visible = true;
  score = 0;
if(mousePressedOver(reset))
  {
    restart();
    console.log(gameState);
  }
  
  }
  
 trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(width,height-30,10,40);
   obstacle.velocityX = -(4+score/1000);

   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 500;
   
   //adding obstacles to the group
   obstaclesGroup.add(obstacle);
 }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(width,100,40,10);
    cloud.y = Math.round(random(height-50,height-100));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 500;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
  }
  
}

function restart()
{
    gameState=PLAY;
obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach(); 
    gameover.visible = false;
   reset.visible = false;
  
  
  
  
}





