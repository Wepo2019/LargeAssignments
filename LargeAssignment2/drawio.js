storageDrawio = window.localStorage;

window.drawio = {
    shapes: [],
    deletedShapes: [],
    selectedShape: 'pen',
    selectedFile: null,
    selectedColor: 'black',
    fillShapes: false,
    selectedLineWidth: 1,
    canvas: document.getElementById('my-canvas'),
    ctx: document.getElementById('my-canvas').getContext('2d'),
    selectedElement: null,
    eraseRedo: false,
    textData: '',
    textFont: '10px Arial',
    textStyle: 'strokeText',
    dragging: false,
    availableShapes: {
        PEN: 'pen',
        RECTANGLE: 'rectangle',
        CIRCLE: 'circle',
        TEXT: 'text',
        LINE: 'line',
        MOVE: 'move'
    }
};

$(function() {

    //On load, get all storage keys and generate the possible to load list
    function getLoadList() {
        for (var i = 0; i < storageDrawio.length; i++) {
            var fileName = storageDrawio.key(i);
            var listElement = $('<li class=\'load-list\'></li>').attr('data-name', fileName).html(fileName);
            listElement.on('click', selectedListClicks);
            $('ul').append(listElement);
        }
    }
    
    getLoadList();

    //Render all shapes to the canvas
    function drawCanvas() {
        for(var i = 0; i < drawio.shapes.length; i++) {
            drawio.shapes[i].render();
        }

        if(drawio.selectedElement) {
            drawio.selectedElement.render();
        }
    }

    //Tools and shapes selection
    $('.icon').on('click', function () {
        if($(this).data('shape')== drawio.availableShapes.RECTANGLE || ($(this).data('shape')== drawio.availableShapes.CIRCLE)) {
            $('#visability').removeClass('hide');
        }
        else {
            $('#visability').addClass('hide');
        }
        if($(this).data('shape')) {
            $('.icon').removeClass('selected');
            $(this).addClass('selected');
            drawio.selectedShape = $(this).data('shape');
        }
    });

    //Select a file, load and save functions
    function selectedListClicks(){
        $('li').removeClass('selected');
        $(this).addClass('selected');
        drawio.selectedFile = $(this).data('name');
    };

    $('li').on('click', selectedListClicks);

    $('#save-btn').on('click', function(){
        var listSize = $('li').length;
        var fileName = 'canvas ' + (listSize + 1);
        storageDrawio.setItem(fileName, JSON.stringify(drawio.shapes));
        var listElement = $('<li class=\'load-list\'></li>').attr('data-name', fileName).html(fileName);
        listElement.on('click', selectedListClicks);
        $('ul').append(listElement);
    });

    $('#load-btn').on('click', function(){
        if(!drawio.selectedFile) {
            alert('Please select a file first');
            return;
        }
        drawio.deletedShapes = [];
        var jsonShapes = JSON.parse(storageDrawio.getItem(drawio.selectedFile));
        drawio.shapes = [];

        for( var i = 0; i < jsonShapes.length; i++) {
            switch (jsonShapes[i].type) {
                case drawio.availableShapes.PEN:
                    drawio.shapes.push(new Pen(jsonShapes[i].position, jsonShapes[i].points, jsonShapes[i].color, jsonShapes[i].penLineWidth));
                    break;
                case drawio.availableShapes.RECTANGLE:
                    drawio.shapes.push(new Rectangle(jsonShapes[i].position, jsonShapes[i].width, jsonShapes[i].height, jsonShapes[i].color, jsonShapes[i].fill, jsonShapes[i].rectLineWidth));
                    break;
                case drawio.availableShapes.CIRCLE:
                    drawio.shapes.push(new Circle(jsonShapes[i].position, jsonShapes[i].radius, jsonShapes[i].color, jsonShapes[i].fill, jsonShapes[i].circleLineWidth));
                    break;
                case drawio.availableShapes.TEXT:
                    drawio.shapes.push(new Text(jsonShapes[i].position, jsonShapes[i].color, jsonShapes[i].textData, jsonShapes[i].textFont, jsonShapes[i].textStyle));
                    break;
                case drawio.availableShapes.LINE:
                    drawio.shapes.push(new Line(jsonShapes[i].position, jsonShapes[i].endPosition.x, jsonShapes[i].endPosition.y, jsonShapes[i].color, jsonShapes[i].lineLineWidth));
                    break;
            }
        }

        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        drawCanvas();
    });

    //Delete all saved files
    $('#deleteFile-btn').on('click', function() {
        if(confirm('Are you sure you want to delete all of your saved data?')) {
            storageDrawio.clear();
            $('ul').empty();
        }
        else {
            return;
        }
    });

    //Erase everything on the canvas
    $('#erase-btn').on('click', function(){
        drawio.eraseRedo = true;
        var iteratorValue = drawio.shapes.length;
        for(var i = 0; i < iteratorValue; i++) {
            drawio.deletedShapes.push(drawio.shapes.pop());
        }
        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        drawCanvas();
    });

    //Undo redo functions
    $('#undo-btn').on('click', function(){
        if(drawio.eraseRedo) {
            var iteratorValue = drawio.deletedShapes.length;
            for(var i = 0; i < iteratorValue; i++) {
                drawio.shapes.push(drawio.deletedShapes.pop());
            }
        
            drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
            drawCanvas();
            drawio.eraseRedo = false;
        }
        else {
            if(drawio.shapes.length > 0) {
                drawio.deletedShapes.push(drawio.shapes.pop());
            }
            drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
            drawCanvas();
        }
    });

    $('#redo-btn').on('click', function(){
        if(drawio.deletedShapes.length > 0) {
            drawio.shapes.push(drawio.deletedShapes.pop());
        }
        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        drawCanvas();
    });
    
    //Canvas mouse events
    $('#my-canvas').on('mousedown', function (mouseEvent) {
        switch (drawio.selectedShape) {
            case drawio.availableShapes.PEN:
                drawio.selectedElement = new Pen( {x: mouseEvent.offsetX, y: mouseEvent.offsetY}, null, drawio.selectedColor, drawio.selectedLineWidth);
                break;
            case drawio.availableShapes.RECTANGLE:
                drawio.selectedElement = new Rectangle( {x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0, 0, drawio.selectedColor, drawio.fillShapes, drawio.selectedLineWidth);
                break;
            case drawio.availableShapes.CIRCLE:
                drawio.selectedElement = new Circle( {x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0, drawio.selectedColor, drawio.fillShapes, drawio.selectedLineWidth);
                break;
            case drawio.availableShapes.TEXT:
                drawio.selectedElement = new Text({x: mouseEvent.offsetX, y: mouseEvent.offsetY}, drawio.selectedColor, drawio.textData, drawio.textFont, drawio.textStyle);
                break;
            case drawio.availableShapes.LINE:
                drawio.selectedElement = new Line( {x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0, 0, drawio.selectedColor, drawio.selectedLineWidth);
                break;
            case drawio.availableShapes.MOVE:
                drawio.selectedElement = getShapeFromClick( {x: mouseEvent.offsetX, y: mouseEvent.offsetY} );
                break;
        }
        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        drawCanvas();
    });

    function getShapeFromClick(mousePos) {
        for(var i = 0; i < drawio.shapes.length; i++) {
            //Rectangle
            if((drawio.shapes[i].position.x >= (mousePos.x) && drawio.shapes[i].position.x + drawio.shapes[i].width <= (mousePos.x)) || 
                (drawio.shapes[i].position.y <= (mousePos.y) && drawio.shapes[i].position.y + drawio.shapes[i].height >= (mousePos.y))) {
                    return drawio.shapes[i];
            } //Circle
            else if((drawio.shapes[i].position.x <= (mousePos.x) && drawio.shapes[i].position.x + drawio.shapes[i].radius >= (mousePos.x)) || 
            (drawio.shapes[i].position.y <= (mousePos.y) && drawio.shapes[i].position.y + drawio.shapes[i].radius >= (mousePos.y))) {
                return drawio.shapes[i];
            } //Text
            else if((drawio.shapes[i].position.x <= (mousePos.x) && drawio.shapes[i].position.x + drawio.shapes[i].textWidth >= (mousePos.x)) || 
            (drawio.shapes[i].position.y <= (mousePos.y) && drawio.shapes[i].position.y + drawio.shapes[i].textHeight >= (mousePos.y))) {
                return drawio.shapes[i];
            } //Pen and line
            else if(checkIfTouchingALine(drawio.shapes[i], mousePos)) {
                return drawio.shapes[i];
            }
        }
    }

    function checkIfTouchingALine(shape, mousePos) {
        if(shape.points) {
            //Pen
            for(var i = 0; i < shape.points.length; i++) {
                if((mousePos.x > (shape.points[i].x + 5) || mousePos.x < (shape.points[i].x - 5)) &&
                    (mousePos.y < (shape.points[i].y + 5) || mousePos.y > (shape.points[i].y - 5))) {
                    return true;
                }
            }
            return false;
        }
        else if(shape.type == drawio.availableShapes.LINE){
            //Line
            var points = [];
            points.push( {x: shape.position.x, y: shape.position.y} );
            var newX = shape.position.x;

            //Variables named after the math formula to find all points in a line
            var m = (shape.position.y - shape.endPosition.y)/(shape.position.x - shape.endPosition.x);
            var c = shape.position.y - shape.position.x * m;

            if(shape.endPosition.x)

            while(newX < Math.abs(shape.endPosition.x)) {
                var newY = m * newX + c;
                newX++;
                points.push(newX, newY);
            }

            points.push(shape.endPosition.x, shape.endPosition.y);

            for(var i = 0; i < points.length; i++) {
                if((mousePos.x > (points[i].x + 1) || mousePos.x < (points[i].x - 1)) &&
                    (mousePos.y < (points[i].y + 1) || mousePos.y > (points[i].y - 1))) {
                    return true;
                }
            }
            return false;
        }
    }
   
    $('#my-canvas').on('mousemove', function (mouseEvent) {
        if(drawio.selectedElement) {
            if(drawio.selectedShape == drawio.availableShapes.MOVE) {
                drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
                drawio.selectedElement.move(mouseEvent.offsetX, mouseEvent.offsetY);
                drawCanvas();
            }
            else {
                drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
                drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
                drawCanvas();
            }
        }
    });

    $('#my-canvas').on('mouseup', function () {
        if(drawio.selectedElement && drawio.selectedShape != drawio.availableShapes.MOVE) {
            drawio.shapes.push(drawio.selectedElement);
        }
        drawio.selectedElement = null;
    });

    //Select color
    $('.colorButton').click(function() {
        $('.colorButton').removeClass('selected');
        $(this).addClass('selected');
        drawio.selectedColor = this.id;
    });
    //Fill shapes
    $('#fill').click(function() {
        $('#noFill').removeClass('selected');
        $('#fill').addClass('selected');
        drawio.fillShapes = true;
    });
    
    $('#noFill').click(function() {
        $('#fill').removeClass('selected');
        $('#noFill').addClass('selected');
        drawio.fillShapes = false;
    });

    //Line width
    $('.lineButton').click(function() {
        $('.lineButton').removeClass('selected');
        $(this).addClass('selected');
        drawio.selectedLineWidth = $(this).html();
    });
  
   //Toggles dropdown on and off
    $('.textFunction').click(function() {
        $('.myDropDown').toggle('show');
    }); 
  
    //Input the data from the form
    $('.myDropDown').change(function() {
        drawio.textData = $('#textInput').val();
        drawio.textFont = $('#fontSizeForm').val().concat(' ', $('#textFontForm').val());
        drawio.textStyle = $('#fontStyleForm').val();
    });

    $('#textInput').on('input', function() {
        drawio.textData = $('#textInput').val();
    });

});


