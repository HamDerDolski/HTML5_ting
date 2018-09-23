var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

function Circle(x,y,dx,dy,radius){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;

	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		c.lineWidth = 8;
		c.strokeStyle = "magenta";
		c.stroke();
		c.fillStyle = "yellow"
		c.fill();
	}

	this.update = function(){
		if(this.x + this.radius >= innerWidth || this.x - this.radius <= 0){
			this.dx = -this.dx;
		}

		if(this.y + this.radius >= innerHeight || this.y - this.radius <= 0){
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		this.draw();
	}
}

var circleArray = [];
var numberOfCircles = 100;

for(var i = 0; i < numberOfCircles; i++){
	
	var radius = 20;
	var x = Math.random() * (innerWidth-radius*2)+radius;
	var dx = (Math.random() -0.5) * 10;
	var y = Math.random() * (innerHeight-radius*2)+radius;
	var dy = (Math.random() -0.5) * 10;

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
