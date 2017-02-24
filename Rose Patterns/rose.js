var r;
var x;
var y;
var k = 0;
var con;
function setup(){
  createCanvas(400,400);
	con = true;
}

function draw(){
  background(51);
  translate(width/2, height/2);
	beginShape();

  for(var a=0; a<TWO_PI; a+=0.01 ){
      r = 200*cos(k*a);
      x = r * cos(a);
      y = r * sin(a);
      vertex(x,y);

  }
	endShape(CLOSE);
	if(k >= 100) con = false;
	else if( k<= 0 && con == false) con = true;
	k += con ? 0.05 : -0.05;
}
