var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var gravity = 1;
var yFriction = 0.92;
var xFriction = 0.97;

function Circle(x,y,dx,dy,radius){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;

	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		var grd = c.createRadialGradient(this.x, this.y, this.radius/100, (this.x), (this.y), this.radius/1.2);
		grd.addColorStop(0, "#F368db");
		grd.addColorStop(1, "#FF414c");
		c.fillStyle = grd;
		c.fill();

	}

	this.update = function(){
		if(this.x + this.radius >= innerWidth || this.x - this.radius <= 0){
			this.dx = -this.dx;
		}

		if(this.y + this.radius + this.dy >= innerHeight){
			this.dy = -this.dy * yFriction;
			this.dx = this.dx * xFriction;
		}
		else{
			this.dy += gravity;
		}

		this.x += this.dx;
		this.y += this.dy;

		this.draw();
	}
}

var circleArray = [];
var numberOfCircles = 60;
var minRadius = 10;
var maxRadius = 40;

for(var i = 0; i < numberOfCircles; i++){
	
	var radius = (Math.random() * (maxRadius - minRadius)) + minRadius;
	var x = Math.random() * (innerWidth-radius*2)+radius;
	var dx = (Math.random() -0.5) * 20;
	var y = Math.random() * (innerHeight-radius*2)+radius;
	var dy = radius/maxRadius;

	circleArray.push(new Circle(x, y, dx, dy, radius));

}


function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth, innerHeight);

	for(var i = 0; i < circleArray.length; i++){
		circleArray[i].update();
	}
	
}

animate();