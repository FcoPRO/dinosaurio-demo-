
var trex ,trex_running,trex_RIP;
var suelo, suelo_img;
var sueloinvisible;
var nubes, nube_img;
var cactus, cactus1, cactus2, cactus3, cactusm1, cactusm2, cactusm3;
var loadcactus = 0;
var score = 0;
var gamestate = "PLAY";
var game_sprite, game_over;
var grupocactus;
var gruponubes;
var restart, restart_boton;
var sonido_de_salto,sonido_de_muerte,sonido_de_checkpoint;

function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
  suelo_img=loadImage("ground2.png")
  nube_img=loadImage("cloud.png")
  cactusm1=loadImage("obstacle1.png")
  cactusm2=loadImage("obstacle2.png")
  cactusm3=loadImage("obstacle3.png")
  cactus1=loadImage("obstacle4.png")
  cactus2=loadImage("obstacle5.png")
  cactus3=loadImage("obstacle6.png")
  trex_RIP=loadImage("trex_collided.png")
  game_over=loadImage("gameOver.png")
  restart_boton=loadImage("restart.png")
  sonido_de_salto=loadSound("jump.mp3")
  sonido_de_muerte=loadSound("die.mp3")
  sonido_de_checkpoint=loadSound("checkPoint.mp3")

}

function setup(){
  createCanvas(windowWidth,windowHeight);
  

 trex=createSprite(50,height-70,20,50);
 trex.scale=0.5
 trex.setCollider("circle",0,0,20);
 trex.debug=true;
 trex.addAnimation("running",trex_running);
 trex.addAnimation("collided",trex_RIP);


 suelo=createSprite(width/2,height-20,width,20);
 suelo.addImage(suelo_img);

 grupocactus=new Group();
 gruponubes=new Group();

 sueloinvisible=createSprite(width/2,height-20,width,10);
 sueloinvisible.visible=false;

 game_sprite=createSprite(width/2,height-400,400,10);
 game_sprite.addImage(game_over);
 game_sprite.visible=false;
 game_sprite.scale=1.2

 restart=createSprite(width/2,height-300,10,10);
 restart.addImage(restart_boton);
 restart.scale=0.7
 restart.visible=false;

}

function draw(){
  background("white")
  text("puntuación: "+score,480,40);
  

  if(gamestate==="PLAY"){
    suelo.velocityX=-(5 + score/100);

    if(touches.length>0 || keyDown("space") && trex.y>height-50) {
      trex.velocityY=trex.velocityY-10;
      sonido_de_salto.play();
      touches=[];
    }

    trex.velocityY=trex.velocityY+2;

    score=score+Math.round(getFrameRate()/60);
    if(score>0 && score%100===0){
      sonido_de_checkpoint.play();

    }

    

    if(suelo.x<0) {
      suelo.x=suelo.width/2;
    }

    spawnclouds();
    spawncactus();

    if(grupocactus.isTouching(trex)){
      gamestate="END"
      sonido_de_muerte.play();
    }

  } else if(gamestate==="END"){
    suelo.velocityX=0;
    trex.velocityY=0;
    grupocactus.setVelocityXEach(0);
    gruponubes.setVelocityXEach(0);
    game_sprite.visible=true;
    restart.visible=true;
    trex.changeAnimation("collided", trex_RIP);
    grupocactus.setLifetimeEach(-1);
    gruponubes.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
      resetear();
    }
  }

  
drawSprites();

trex.collide(sueloinvisible); 



}

function spawnclouds(){
  if(frameCount % 65 === 0 ){
    nubes=createSprite(width+20,random(100,200),40,10);
    nubes.addImage(nube_img)
    nubes.velocityX=-(2 + score/100);
    nubes.lifetime=210;
    nubes.depth=trex.depth;
    trex.depth=trex.depth+1;
    gruponubes.add(nubes);
  }
  



}

function spawncactus(){
  if(frameCount % 80 === 0 ){
    cactus=createSprite(600,height-24,20,50);
    cactus.velocityX=-(5 + score/100);
    loadcactus = Math.round(random(1,6));
    cactus.lifetime=130;
    grupocactus.add(cactus);
    if(loadcactus == 1) {
      cactus.addImage(cactus1)
      cactus.scale=0.4;
    }
    if(loadcactus == 2) {
      cactus.addImage(cactus2)
      cactus.scale=0.4;
    }
    if(loadcactus == 3) {
      cactus.addImage(cactus3)
      cactus.scale=0.4;
    }
    if(loadcactus == 4) {
      cactus.addImage(cactusm1)
      cactus.scale=0.4;
    }
    if(loadcactus == 5) {
      cactus.addImage(cactusm2)
      cactus.scale=0.4;
    }
    if(loadcactus == 6) {
      cactus.addImage(cactusm3)
      cactus.scale=0.4;
    }
  }

}

 function resetear(){
  gamestate="PLAY";
  trex.changeAnimation("running", trex_running);
  trex.y=100;
  score=0;
  grupocactus.setLifetimeEach(130);
  gruponubes.setLifetimeEach(210);
  restart.visible=false;
  game_sprite.visible=false;
  grupocactus.destroyEach();
  gruponubes.destroyEach();
 }