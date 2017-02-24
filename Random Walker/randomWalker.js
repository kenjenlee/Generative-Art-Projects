var x;
var y;

function setup() {
  createCanvas(400,400);
  background(51);
  x=200;
  y=200;
}

function draw() {
  stroke(floor(random(256)), floor(random(256)), floor(random(256)));
  strokeWeight(3);
  point(x,y);

  // minimum is 0 for random by default
  var r = floor(random(4));

  switch (r) {
    case 0:
      x+=10;
      break;
    case 1:
      x-=10;
      break;
    case 2:
      y+=10;
      break;
    case 3:
      y-=10;
      break;
  }
	//prevents coordinate from going out of canvas
	x = abs(x%400);
	y = abs(y%400);
}
