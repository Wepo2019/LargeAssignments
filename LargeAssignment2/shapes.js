
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
