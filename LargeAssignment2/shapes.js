//Shape
function Shape(position) {
    this.position = position;
};

Shape.prototype.render = function () {};

Shape.prototype.move = function (position) {
    this.position = position;
};

Shape.prototype.resize = function () {};

// Rectangle shape
function Rectangle(position, width, height, color) {
    Shape.call(this, position);
    this.width = width;
    this.height = height;
    this.color = color;
};

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function () {
    drawio.ctx.strokeStyle = this.color; //ekki rétt
    drawio.ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
}

Rectangle.prototype.resize = function (x, y) {
    this.width = x - this.position.x;
    this.height = y - this.position.y;
};

//Circle Shape
function Circle(position, radius, color) {
    Shape.call(this, position);
    this.radius = radius;
    this.color = color;
};

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.render = function () {
    drawio.ctx.strokeStyle = this.color; 
    drawio.ctx.beginPath();
    drawio.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2* Math.PI);
    drawio.ctx.stroke();
}

Circle.prototype.resize = function (x, y) {
    this.radius = Math.sqrt(Math.pow((x - this.position.x), 2) + Math.pow((y - this.position.y), 2));
}

//Text shape
// er ekki að saveast í shape array*
//Og hélst ekki á sínu stað canvas
function Text(position) {
    Shape.call(this, position);
    var userInput = prompt('What is your name?');
    //console.log(userInput);
    this.text = userInput;
}

Text.prototype = Object.create(Shape.prototype);
Text.prototype.constructor = Text;

Text.prototype.render = function () {
    drawio.ctx.fillText(this.text, this.position.x, this.position.y);
}

//Virkar ekki að færa ???
Text.prototype.resize = function (x,y) {
    this.width = x - this.position.x;
    this.height = y - this.position.y;
}

//Line Shape
function Line(position, endPositionX, endPositionY, color) {
    Shape.call(this, position);
    this.endPosition = {x: endPositionX, y: endPositionY};
    this.color = color;
}

Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

Line.prototype.render = function () {
    drawio.ctx.strokeStyle = this.color; 
    drawio.ctx.beginPath();
    drawio.ctx.moveTo(this.position.x, this.position.y);
    drawio.ctx.lineTo(this.endPosition.x + this.position.x, this.endPosition.y + this.position.y);
    drawio.ctx.stroke();
}
Line.prototype.resize = function (x, y) {
    this.endPosition.x = x - this.position.x;
    this.endPosition.y = y - this.position.y;
}

//Pen
function Pen(position, color) {
    Shape.call(this, position);
    this.points = [];
    this.color = color;
}

Pen.prototype = Object.create(Shape.prototype);
Pen.prototype.constructor = Pen;

Pen.prototype.render = function () {
    drawio.ctx.strokeStyle = this.color; 
    drawio.ctx.beginPath();
    for(var i = 0; i < this.points.length; i++) {
        const p = this.points[i];
        drawio.ctx.lineTo(p.x, p.y);
    }
    drawio.ctx.stroke();
}

Pen.prototype.resize = function (x, y) {
    this.points.push( {x: x, y: y} );
}

