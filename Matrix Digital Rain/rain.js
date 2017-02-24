var symbolSize = 16;
var streams = [];
var fadeInterval = 1.6;
function setup(){
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0); //black
  textSize(symbolSize);
  var x=0;
  for(var i=0; i<width/symbolSize; i++){
    var stream = new Stream();
    stream.generateSymbols(x, random(-1000,0));
    streams.push(stream);
    x += symbolSize;

  }
}

function draw(){
  //defalt opacity is 255
  background(0, 150);
  streams.forEach(function(stream) {
    stream.render();
  });
}

function Symbol(x, y, speed, first, opacity){
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.switchInterval = round(random(2,20));
  this.first = first;
  this.opacity = opacity;
  //use unicode to represent katakana
  this.setToRandomSymbol = function(){
    if(frameCount% this.switchInterval ==0){
      var charType = round(random(0,4))
      if(charType >1){
        //randomly retrieve a katakana char
        this.value = String.fromCharCode(
          0x30A0 + round(random(0,96))
          //there are 96 characters in total,
          //the first one has unicode 0x30A0
          );
      }else{
        this.value = round(random(0,9));
      }
    }
  }

  this.rain = function(){
    this.y = this.y >= height ? 0 : this.y+speed;
  }

}

function Stream(){
  this.symbols = [];
  this.symbolCount = round(random(5,30));
  this.speed = random(5,16);

  this.generateSymbols = function(x,y){
    //get random number 0,1,2,3,4 and evaluate if it is 1
    var first = round(random(0,4)) == 1;
    var opacity = 255;
    for(var i=0; i<this.symbolCount; i++){
      var symbol = new Symbol(x,y,this.speed, first, opacity);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y-=symbolSize;
      opacity -= (255 /this.symbolCount) / fadeInterval;
      first = false;
    }
  }

  this.render = function(){
    this.symbols.forEach(function(symbol){
      if(symbol.first) fill(180, 255, 180, symbol.opacity);
      else fill(0, 255, 70, symbol.opacity);
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }
}
