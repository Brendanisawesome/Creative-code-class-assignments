var score = 0;
var gameState;
var WAITING = 0;
var PLAYING_GAME = 1;
var GAME_OVER = 2;
var PAUSE = 3;
var player;
var selectList;
var sound;
var api_key = "dfd965b2605d61eb8342af83a1ecdbd8";
var city = ['Miami'];
var temp = 0;
var weather = [];
var planet_1;
var planet_2;
var planet_3;
var planet_4; 
var planet_5; 


function preload(){
  player = loadImage('Assets/jetfighter.png',50,50,8);
  planet_1 = loadImage('Assets/planet_19.png');
  planet_2 = loadImage('Assets/planet_26.png');
  planet_3 = loadImage('Assets/planet_20.png');
  planet_4 = loadImage('Assets/planet_27.png');
  planet_5 = loadImage('Assets/planet_31.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
//cnv.mouseClicked(togglePlay);
  fft = new p5.FFT(.8,16);
  gameState = WAITING;
  selectList = select('playlist');
  var url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&APPID="+api_key;
  loadJSON(url, receivedWeather);
}

function draw() {
  if(gameState == WAITING) {
     background(255);
     fill(0);
     text("PICK A SONG TO START", width/2, height/2); 

  //   play();
//     pause();
  if(sound) {
    if (sound.isLoaded()) {
      //start the game
      sound.amp(0.2);
      gameState = PLAYING_GAME;
      //CREATE THE PLAYER
      
    }  
    else {
  
     text("Loading Song, Please Wait", width/2, height/2 + 100);  
    
  
    }

   }
}
   else if(gameState == PLAYING_GAME) {
    if(temp >= 75) {
      background(232,252,10);
      textSize(52);
      text(city, windowWidth/2, 52);
      fill(255,100,0);
    }
    else if(32 < temp < 75){
      background(18,229,252);
      textSize(52);
      text(city, windowWidth/2, 52);
      fill(0,245,65);
    }
    else if(temp <= 32){
      background(0,0,0);
      textSize(52);
      text(city, windowWidth/2, 52);
      fill(0,0,255);
    }
    
    var spectrum = fft.analyze(); 
    noStroke();
//    fill(random(0,255),random(0,255),random(0,255)); // spectrum is green
    for (var i = 0; i< spectrum.length; i++){
      var x = map(i, 0, spectrum.length, 0, width);
      var h = -height + map(spectrum[i], 0, 255, height, 0);
      rect(x, height/2, width / spectrum.length, h/2 )
    }
    for (var i = 0; i< spectrum.length; i++){
      var x = map(i, 0, spectrum.length, 0, width);
      var h = height - map(spectrum[i], 0, 255, height, 0);
      rect(x, height/2, width / spectrum.length, h/2 );
    }
   }
//   generatePlanet();
//   else if(gameState == PAUSE) {
//     pauseGame();
//
//   }
}


function keyPressed() {
  if (gameState == PLAYING_GAME) {
    if(keyCode == UP_ARROW) {
      //MOVE UP
      player.setSpeed(5, 270);
    }
    if (keyCode == DOWN_ARROW) {
      //MOVE DOWN
      player.setSpeed(5, 90);
    }
    if (keyCode == LEFT_ARROW) {
      //MOVE LEFT
      player.setSpeed(5, 180);

    }
    if (keyCode == RIGHT_ARROW) {
      //MOVE RIGHT
      player.setSpeed(5, 0);
    }
    
    
  }
}


function startGame() {
    sl = document.getElementById('playlist');
    sound = loadSound('Assets/' + sl.value);
    generatePlanet();

}
//function pauseGame(){
//  if(sound.isPlaying()){
//    sound.pause();
//  }
//}

function play(){
  if(gameState == WAITING) {
//  sound.play();
    startGame();
  }
//  if(gameState == PAUSE) {
//    if(sound) {
//     if (sound.isLoaded()) {
//      //start the game
//      sound.amp(0.2);
//      sound.play();
//      gameState = PLAYING_GAME;
//     }  
//    startGame();
//    }
//  }
  sound.play();
}
function pause(){
//  if(gameState == PLAYING_GAME){
//  gameState = PAUSE; 
//  } 
  if(sound.isPlaying){
    sound.pause();
  }
}
function receivedWeather(theWeather) {
   temp = theWeather.main.temp;
}
//function generatePlanet(){
  
//var Planet1 = createSprite(random(width), random(height), 10, 10);
//    Planet1.addImage(Planet_1);
//var Planet2 = createSprite(random(width), random(height), 10, 10);
//    Planet2.addImage(Planet_2);
//var Planet3 = createSprite(random(width), random(height), 10, 10);
//    Planet3.addImage(Planet_3);
//var Planet4 = createSprite(random(width), random(height), 10, 10);
//   Planet4.addImage(Planet_4);
//var Planet5 = createSprite(random(width), random(height), 10, 10);
//    Planet5.addImage(Planet_5);
//}