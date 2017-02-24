/* The algorithm used here is called the
*  depth first recursive backtrack alg.
*/

var cols, rows;
var w =40;
var grid = [];
var current; //current cell
var stack = [];

function setup() {
  createCanvas(400, 400);
	cols = floor(width/w);
	rows = floor(height/w);

	for(var i=0; i<rows; i++){
		for(var j=0; j<cols;j++){
      var cell = new Cell(i,j);
      grid.push(cell);
    }
	}

  current = grid[0];
}

function draw() {
  background(220);
  frameRate(5);
  for(var i=0; i<grid.length; i++){
    grid[i].show();
  }
  current.visited = true;
  current.highlight();
  //Step 1
  var next = current.checkNeighbours();
  if(next){
    //Step 2
    stack.push(current);
    //Step 3
    removeWalls(current,next);
    //Step 4
    next.visited = true;
    current=next;
  } else if(stack.length>0){
      current = stack.pop();
  }
}

function Cell(i,j){
	this.i = i;
	this.j = j;
  //sequence in top, right, bottom, left
  this.walls = [true,true,true,true];
  this.visited = false;

  this.highlight = function(){
    var x = this.i*w;
    var y = this.j*w;
    noStroke();
    fill(0,0,255,100);
    rect(x,y,w,w);
  }

  this.show = function(){
    var x = this.i * w;
    var y = this.j * w;
    stroke(255);
    //this. is not optional
    if(this.walls[0]) line(x,y,x+w,y);
    if(this.walls[1]) line(x+w,y,x+w,y+w);
    if(this.walls[2]) line(x,y+w,x+w,y+w);
    if(this.walls[3]) line(x,y,x,y+w);

    if(this.visited){
      noStroke();
      fill(255,0,255,100);
      rect(x,y,w,w);
    }
  }

  this.checkNeighbours = function(){
    var neighbours = [];
    if(this.i>0) {
      var top = grid[(this.i-1)*rows+this.j];
      if(!top.visited) neighbours.push(top);
    }
    if(this.j<cols-1) {
      var right =grid[this.i*rows+this.j+1];
      if(!right.visited) neighbours.push(right);
    }
    if(this.i<rows-1) {
      var bottom = grid[(this.i+1)*rows+this.j];
      if(!bottom.visited) neighbours.push(bottom);
    }
    if(this.j>0) {
      var left = grid[this.i*rows+this.j-1];
      if(!left.visited) neighbours.push(left);
    }

    return neighbours.length>0 ? neighbours[floor(random(0,neighbours.length))] : undefined;

  }
}

function removeWalls(current, next){
  var x = current.i - next.i;
  if(x == 1) {
    current.walls[3] = false;
    next.walls[1] = false;
  }else if(x == -1){
    current.walls[1] = false;
    next.walls[3] = false;
  }

  var y = current.j - next.j;
  if(y == 1){
    current.walls[0] = false;
    next.walls[2] = false;
  }else if(y == -1){
    current.walls[2] = false;
    next.walls[0] = false;
  }
}
