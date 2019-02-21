//Shape
function Shape(position) {
    this.position = position;
};

Shape.prototype.render = function () {};

Shape.prototype.move = function (position) {
    this.position = position;
};

Shape.prototype.resize = function () {};

//Rectangle shape
function Rectangle(position, width, height, color, fill, rectLineWidth) {
    this.type = 'rectangle';
    Shape.call(this, position);
    this.width = width;
    this.height = height;
    this.color = color;
    this.fill = fill;
    this.rectLineWidth = rectLineWidth;
};

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function () {
    if(this.fill){
        drawio.ctx.fillStyle = this.color;
        drawio.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    else {
        drawio.ctx.strokeStyle = this.color;
        drawio.ctx.lineWidth = this.rectLineWidth;
        drawio.ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    }
}

Rectangle.prototype.resize = function (x, y) {
    this.width = x - this.position.x;
    this.height = y - this.position.y;
};

Rectangle.prototype.move = function (x, y) {
    this.position.x = x;
    this.position.y = y;
};

//Circle Shape
function Circle(position, radius, color, fill, circleLineWidth) {
    this.type = 'circle';
    Shape.call(this, position);
    this.radius = radius;
    this.color = color;
    this.fill = fill;
    this.circleLineWidth = circleLineWidth;
};

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.render = function () {
    drawio.ctx.beginPath();
    drawio.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2* Math.PI);
    if(this.fill){
        drawio.ctx.fillStyle = this.color;
        drawio.ctx.fill();
    }
    else {
        drawio.ctx.strokeStyle = this.color;
        drawio.ctx.lineWidth = this.circleLineWidth;
        drawio.ctx.stroke();
    }
}

Circle.prototype.resize = function (x, y) {
    this.radius = Math.sqrt(Math.pow((x - this.position.x), 2) + Math.pow((y - this.position.y), 2));
}

//Text shape
function Text(position, color, textData, textFont, textStyle) {
    this.type = 'text';
    Shape.call(this, position);
    this.color = color;
    this.textData = textData;
    this.textFont = textFont;
    this.textStyle = textStyle;
}

Text.prototype = Object.create(Shape.prototype);
Text.prototype.constructor = Text;

Text.prototype.render = function () {
    drawio.ctx.font = this.textFont;
    drawio.ctx.fillStyle = this.color;
    if(this.textStyle == 'strokeText') {
        drawio.ctx.strokeText(this.textData, this.position.x, this.position.y);
    }
    if(this.textStyle == 'fillText') {
        drawio.ctx.fillText(this.textData, this.position.x, this.position.y);
    }
}

Text.prototype.resize = function (x,y) {
    this.position.x = x;
    this.position.y = y;
}

Text.prototype.move = function() {
    this.position.x = x;
    this.position.y = y;
}
//Line Shape
function Line(position, endPositionX, endPositionY, color, lineLineWidth) {
    this.type = 'line';
    Shape.call(this, position);
    this.endPosition = {x: endPositionX, y: endPositionY};
    this.color = color;
    this.lineLineWidth = lineLineWidth;
}

Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

Line.prototype.render = function () {
    drawio.ctx.strokeStyle = this.color; 
    drawio.ctx.lineWidth = this.lineLineWidth;

    drawio.ctx.beginPath();
    drawio.ctx.moveTo(this.position.x, this.position.y);
    drawio.ctx.lineTo(this.endPosition.x + this.position.x, this.endPosition.y + this.position.y);
    drawio.ctx.stroke();
}

Line.prototype.resize = function (x, y) {
    this.endPosition.x = x - this.position.x;
    this.endPosition.y = y - this.position.y;
}

Line.prototype.move = function (x, y) {
    //move starting pos according to mouse position, which is the x and y,
    //and then move the end position aswell by the difference in old position and new position

    this.endPosition.x = x - this.position.x;
    this.endPosition.y = y - this.position.y;
}

//Pen
function Pen(position, points, color, penLineWidth) {
    this.type = 'pen';
    this.color = color;
    this.penLineWidth = penLineWidth;
    Shape.call(this, position);
    if(points) {
        this.points = points;
    }
    else {
        this.points = [];
    }
   
}

Pen.prototype = Object.create(Shape.prototype);
Pen.prototype.constructor = Pen;

Pen.prototype.render = function () {
    drawio.ctx.strokeStyle = this.color; 
    drawio.ctx.lineWidth = this.penLineWidth;
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

Pen.prototype.move = function (x, y) {
    //This needs a for loop to move all points in the line according to x and y
    //and also the starting position
};

