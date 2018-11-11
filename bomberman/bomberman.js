var canvas = document.querySelector('canvas');

canvas.width = 750;
canvas.height = 550;

var c = canvas.getContext('2d');


class Player{
	constructor(x,y){
	this.start_x = x;
	this.start_y = y;
	this._size = 35;
	this.speed = 3;
	this.end_x = this.start_x+this._size;
	this.end_y = this.start_y+this._size;
}
	draw(){
		c.beginPath();
		c.rect(this.start_x,this.start_y,this._size,this._size);
		c.stroke();
		c.fillStyle = "red";
		c.fill();
		c.closePath();
	}

	update(){
		this.draw();
	}

	moveRight(){
		var collisionRightFlag = 0;
		if(this.end_x+this.speed < canvas.width){
			for(var i = 0; i < blockArray.length; i++){
				// if player will hit block when going to the right 
				if(((blockArray[i].start_y<this.end_y && blockArray[i].end_y > this.start_y)||(blockArray[i].end_y>this.start_y && blockArray[i].start_y<this.start_y)) && this.end_x+this.speed>blockArray[i].start_x && blockArray[i].end_x > this.end_x+this.speed){
				collisionRightFlag = 1;
				}
			}
			if(collisionRightFlag == 0){
				this.start_x+=this.speed;
				this.end_x=this.start_x+this._size;
				}

			}

		else{
			this.start_x+=canvas.width-(this.end_x);
			this.end_x=this.start_x+this._size;
			}
	}

	moveLeft(){
		var collisionLeftFlag = 0;
		if(this.start_x-this.speed > 0){
			for(var i = 0; i < blockArray.length; i++){
				if(((blockArray[i].start_y<this.end_y && blockArray[i].end_y > this.start_y)||(blockArray[i].end_y>this.start_y && blockArray[i].start_y<this.start_y)) && this.start_x-this.speed<blockArray[i].end_x && blockArray[i].start_x < this.start_x-this.speed){
				collisionLeftFlag = 1;
				}
			}
			if(collisionLeftFlag == 0){
				this.start_x-=this.speed;
				this.end_x=this.start_x+this._size;
			}
			
		}
		else{
			this.start_x=0;
			this.end_x=this.start_x+this._size;
		}
	}

	moveUp(){
		var collisionUpFlag = 0;
		if(this.start_y-this.speed > 0){
			for(var i = 0; i < blockArray.length; i++){
				if(((blockArray[i].start_x<this.end_x && blockArray[i].end_x > this.start_x)||(blockArray[i].end_x>this.start_x && blockArray[i].start_x<this.start_x)) && this.start_y-this.speed<blockArray[i].end_y && blockArray[i].start_y < this.start_y-this.speed){
				collisionUpFlag = 1;
				}
			}
			if(collisionUpFlag == 0){
				this.start_y-=this.speed;
				this.end_y=this.start_y+this._size;
			}
			
		}
		else{
			this.start_y=0;
			this.end_y=this.start_y+this._size;
		}
	}

	moveDown(){
			var collisionDownFlag = 0;
		if(this.end_y+this.speed < canvas.height){
			for(var i = 0; i < blockArray.length; i++){
				// if player will hit block when going down
				if(((blockArray[i].start_x<this.end_x && blockArray[i].end_x > this.start_x)||(blockArray[i].end_x>this.start_x && blockArray[i].start_x<this.start_x)) && this.end_y+this.speed>blockArray[i].start_y && blockArray[i].end_y > this.end_y+this.speed){
				collisionDownFlag = 1;
				}
			}
			if(collisionDownFlag == 0){
				this.start_y+=this.speed;
				this.end_y=this.start_y+this._size;
				}

			}

		else{
			this.start_y+=canvas.height-(this.end_y);
			this.end_y=this.start_y+this._size;
			}
	}
}

var keyState = {}; 

document.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);    
document.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);

function init(player){
if(keyState[37]){
	player.moveLeft();
}

if(keyState[38]){
	player.moveUp();
}

if(keyState[39]){
	player.moveRight();
}

if(keyState[40]){
	player.moveDown();
}

setTimeout(init,10,player);
};

class Block{
constructor(x,y){
	this.start_x = x;
	this.start_y = y;
	this.h = 50;
	this.w = 50;
	this.end_x = this.start_x+this.w;
	this.end_y = this.start_y+this.h;
}

	draw(){
		c.beginPath();
		c.rect(this.start_x,this.start_y,this.h,this.w);
		c.stroke();
		c.fillStyle = "black";
		c.fill();
		c.closePath();
	}

	update(){
		this.draw();
	}
}

const player1 = new Player(0,0);

var blockArray = [];
var numberOfRows = 11;
var numberOfColums = 15;

for(var i = 1; i < numberOfRows-1; i+=2){
	for(var j = 1; j < numberOfColums-1; j+=2){
		var x = 50*j;
		var y = 50*i;
		blockArray.push(new Block(x, y));
	}
}


function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0,canvas.width, canvas.height);

	for(var i = 0; i < blockArray.length; i++){
		blockArray[i].update();
	}

	player1.update();
	
}

init(player1);
animate();