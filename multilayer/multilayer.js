var canvas1 = document.getElementById('dessin1');
var context1 = canvas1.getContext('2d');

var canvas2 = document.getElementById('dessin2');
var context2 = canvas2.getContext('2d');

context1.beginPath();
context1.arc(100, 100, 50, 0, 2 * Math.PI);
context1.fill();
context1.closePath();

context2.beginPath();
context2.fillStyle = 'red';
context2.arc(200, 200, 50, 0, 2 * Math.PI);
context2.fill();
context2.closePath();


document.getElementById('clearCanvas1').onclick = function(){
    context1.clearRect(0,0,canvas.width, canvas.height);
};