var person, timer = 0, song, dtimer = 0, gameOver = paused = false;
var difficulty = 1;
var boxes = [], enemies = [];
var bgColor = 0, sb = 0;
var maxSpeed = 0;
function preload() {
  soundFormats('mp3', 'ogg');
  song = loadSound('assets/screm.mp3');
}
function setup() {
  createCanvas(600, 600);
//   song.loop();
  colorMode(HSB,255);
  person = new Person();
  reverb = new p5.Reverb();

  // sonnects soundFile to reverb with a
  // reverbTime of 6 seconds, decayRate of 0.2%
  reverb.process(song, 6, 0.2);
}
// function play(){
//   song.loop();
// }
function draw() {
  if(!(gameOver || paused)){
    if(song.currentTime() >= 7){
      bgColor += 0.5;
      sb = 220;
      if (bgColor > 255) bgColor = 0;
    }
    if(person.vel.x > maxSpeed)
      maxSpeed = person.vel.x;
    background(bgColor, sb, sb);
    var gravity = createVector(0, 0.2)
    person.applyForce(gravity);
    if(boxes.length > 5 + difficulty/128)
          boxes.shift();
    if (person.vel.x != 0 && millis() >= (1000/difficulty)+timer) {
      createBoxes();
      createEnemy();
      timer = millis();
      if(difficulty < 4096 && millis() >= 10000 + dtimer){
          difficulty*=2;
          dtimer = millis();
      }
    }
    translate(-person.pos.x - person.vel.x + 50,0);
    person.update();
    person.edges();
    person.display();
    fill(255,0,255)
    textSize(20);
    text("Use w/a/s/d or left/right/up/down to move", 20, 50);
    text("You can use the space bar to jump too", 20, 100);
    textSize(16);
    text("Difficulty Multiplier: " + difficulty, person.pos.x + 350, 50);
    text("Speed: " + (person.vel.x * 5) + " mph", person.pos.x + 350, 80);
    text("Max Speed: " + (maxSpeed * 5) + " mph", person.pos.x + 350, 110);
    for(let i in boxes){
      boxes[i].display();
      if((person.pos.x > boxes[i].pos.x && person.pos.x < boxes[i].pos.x + boxes[i].width) && (person.pos.y > boxes[i].pos.y && person.pos.y < boxes[i].pos.y + boxes[i].height)
        || (person.pos.x + person.width > boxes[i].pos.x && person.pos.x + person.width < boxes[i].pos.x + boxes[i].width) && (person.pos.y - person.height > boxes[i].pos.y && person.pos.y + person.height < boxes[i].pos.y + boxes[i].height)
        || (person.pos.x + person.width > boxes[i].pos.x && person.pos.x + person.width < boxes[i].pos.x + boxes[i].width) && (person.pos.y - (person.height/2) > boxes[i].pos.y && person.pos.y + (person.height/2) < boxes[i].pos.y + boxes[i].height)){
        person.vel.x = 0;
        gameOver = true;
      }
    }
    for(let j in enemies){
      enemies[j].update();
      enemies[j].applyForce(gravity);
      enemies[j].edges();
      enemies[j].display();
    }
    let startB = new Box(400,height-50);
    startB.display();
  }
  else if(paused){
    song.pause();
    textSize(40);
    fill(255,0,255);
    text("Paused", width/2-75, height/2);
  }
  else if(gameOver){
    //reset game
    textSize(40);
    fill(255,0,255);
    text("Game Over", width/2-75, height/2);
    difficulty = 1;
    song.stop();
    boxes = [];
    bgColor = 0;
    sb = 0;
    person.pos.x = 0;
  }
}

function keyPressed() {
    if(!gameOver){
      if(!song.isPlaying())
          song.loop();
      if (keyCode === LEFT_ARROW || key === 'a' || key === 'A')
        person.applyForce(createVector(-1,0))
      else if (keyCode === RIGHT_ARROW || key === 'd' || key === 'D')
        person.applyForce(createVector(1,0))
      else if (!upBound() && (keyCode === UP_ARROW || key === 'w' || key === 'W' || key === ' ')){
        person.applyForce(createVector(0,-5))
        for( i in enemies){
          let motion = createVector(0, -1 * random(5))
          enemies[i].applyForce(motion);
        }
      }
      else if (!downBound() && (keyCode === DOWN_ARROW || key === 's' || key === 'S'))
        person.applyForce(createVector(0,5))
      else if(key === 'p' || key === 'P')
        paused = !paused;
    }
    else{
      gameOver = false;
    }
    
}

function leftBound(){
  return person.pos.x < 0;
}
function rightBound(){
  return person.pos.x + 20 > width;
}
function upBound(){
  return person.pos.y < 90;
}
function downBound(){
  return person.pos.y > height;
}

function createBoxes(){
    let rec;
    if(song.currentTime() >= 30)
        rec = new Box(person.pos.x + random(800), height + 25 - random(height), 25 + random(100), 25 + random(100));
    else
        rec = new Box(person.pos.x + random(800), height + 25 - random(height));
    boxes.push(rec)
  }
function createEnemy(){
  let e = new Enemy(person.pos.x + random(2000) + 200);
  let motion = createVector(person.vel.x * 0.9, -1 * random(15))
  e.applyForce(motion);
  enemies.push(e);
}

