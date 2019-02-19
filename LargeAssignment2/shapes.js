
function Shape(position) {
    this.position = position;
};

Shape.prototype.render = function () {};

Shape.prototype.move = function (position) {
    this.position = position;
};

Shape.prototype.resize = function () {};


// Rectangle shape
function Rectangle(position, width, height) {
    Shape.call(this, position);
    this.width = width;
    this.height = height;
};

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function () {
    drawio.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
}

Rectangle.prototype.resize = function (x, y) {
    this.width = x - this.position.x;
    this.height = y - this.position.y;
};

//Circle Shapße
function Circle(position, radius) {
    Shape.call(this, position);
    this.radius = radius;
};

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.render = function () {
    drawio.ctx.beginPath();
    drawio.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2* Math.PI);
    drawio.ctx.stroke();
}

Circle.prototype.resize = function (x, y) {
    this.radius = Math.sqrt(Math.pow((x - this.position.x), 2) + Math.pow((y - this.position.y), 2));
}

//Line Shape

function Line(position, endPosition) {
    Shape.call(this, position);
    this.endPosition = endPosition;
}

Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

Line.prototype.render = function () {
    drawio.ctx.beginPath();
    drawio.ctx.lineTo(this.position.x, this.position.y)
    drawio.ctx.stroke();
}
Line.prototype.resize = function (x, y) {
    drawio.ctx.beginPath();
    drawio.ctx.lineTo(x, y);
    drawio.ctx.stroke();
}
//Pen
function Pen(position) {
    Shape.call(this, position);
    this.points = [];
}

Pen.prototype = Object.create(Shape.prototype);
Pen.prototype.constructor = Pen;

Pen.prototype.render = function () {
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

