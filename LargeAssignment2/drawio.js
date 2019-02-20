storageDrawio = window.localStorage;

window.drawio = {
    shapes: [],
    deletedShapes: [],
    selectedShape: 'pen',
    selectedColor: 'black',
    canvas: document.getElementById('my-canvas'),
    ctx: document.getElementById('my-canvas').getContext('2d'),
    selectedElement: null,
    availableShapes: {
        PEN: 'pen',
        RECTANGLE: 'rectangle',
        CIRCLE: 'circle',
        TEXT: 'text',
        LINE: 'line'
    }
    //To do:
    //Create a move "shape" that when selected will let you move the object you have selected
    //Filled boolean that will toggle shapes between stroke and fill?
};

$(function() {

    function drawCanvas() {
        if(drawio.selectedElement) {
            drawio.selectedElement.render();
        }
        
        for(var i = 0; i < drawio.shapes.length; i++) {
            drawio.shapes[i].render();
        }
    }

    $('.icon').on('click', function () {
        if($(this).data('shape')) {
            $('.icon').removeClass('selected');
            $(this).addClass('selected');
            drawio.selectedShape = $(this).data('shape');
        }
    });

        $('#save').on('click', function(){
            //Save array of shapes into localStorage
            //Dont clear the canvas
        });

        $('#load').on('click', function(){
            //Clear canvas
            //Load currently selected localStorage object into canvas
        });
       
      
    $('button').on('click', function(){
        $('button').removeClass('selected');
        $(this).addClass('selected');
        //drawio
    });

    $('#save-btn').on('click', function(){
        //Save array of shapes into localStorage
        //Dont clear the canvas
        storageDrawio.setItem('saved', JSON.stringify(drawio.shapes));
    });

    $('#load-btn').on('click', function(){
        //Clear canvas
        //Load currently selected localStorage object into canvas
        //make a list or something where saved files are listed and loop through them before saving to save a new thing with a different name
        //then in load, put a selected class on the one we want to load and load the name we gave that element when we added it to the list
        var jsonShapes = JSON.parse(storageDrawio.getItem('saved'));
        console.log(jsonShapes);
        console.log(jsonShapes.length);
        drawio.shapes = [];

        for( var i = 0; i < jsonShapes.length; i++) {
            switch (jsonShapes[i].type) {
                case drawio.availableShapes.PEN:
                    drawio.shapes.push(new Pen(jsonShapes[i].position, jsonShapes[i].points));
                    break;
                case drawio.availableShapes.RECTANGLE:
                    drawio.shapes.push(new Rectangle(jsonShapes[i].position, jsonShapes[i].width, jsonShapes[i].height));
                    break;
                case drawio.availableShapes.CIRCLE:
                    drawio.shapes.push(new Circle(jsonShapes[i].position, jsonShapes[i].radius));
                    break;
                case drawio.availableShapes.TEXT:
                    drawio.shapes.push(new Text(jsonShapes[i].position, jsonShapes[i].text));
                    break;
                case drawio.availableShapes.LINE:
                    drawio.shapes.push(new Line(jsonShapes[i].position, jsonShapes[i].endPosition.x, jsonShapes[i].endPosition.y));
                    break;
            }
        }

        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        drawCanvas();
    });

    $('#undo-btn').on('click', function(){
        //Take newest shape from shapes array and push it into a deleted shapes array
        if(drawio.shapes.length > 0) {
            drawio.deletedShapes.push(drawio.shapes.pop());
        }
        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        drawCanvas();
    });

    $('#redo-btn').on('click', function(){
        //Take the newest shape from deleted shapes and push it into the shapes array
        if(drawio.deletedShapes.length > 0) {
            drawio.shapes.push(drawio.deletedShapes.pop());
        }
        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        drawCanvas();
    });
    

    $('#my-canvas').on('mousedown', function (mouseEvent) {
        switch (drawio.selectedShape) {
            case drawio.availableShapes.PEN:
                drawio.selectedElement = new Pen( {x: mouseEvent.offsetX, y: mouseEvent.offsetY}, null, drawio.selectedColor);
                break;
            case drawio.availableShapes.RECTANGLE:
                drawio.selectedElement = new Rectangle( {x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0, 0, drawio.selectedColor);
                break;
            case drawio.availableShapes.CIRCLE:
                drawio.selectedElement = new Circle( {x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0, drawio.selectedColor);
                break;
            case drawio.availableShapes.TEXT:
                drawio.selectedElement = new Text({x: mouseEvent.offsetX, y: mouseEvent.offsetY});
                break;
            case drawio.availableShapes.LINE:
                drawio.selectedElement = new Line( {x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0, 0, drawio.selectedColor);
                break;
        }
    });

    $('#my-canvas').on('mousemove', function (mouseEvent) {
        if(drawio.selectedElement) {
            drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
            drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
            drawCanvas();
        }
        //Need to consider the case when the move tool is selected
    });

    $('#my-canvas').on('mouseup', function () {
        //Check if selected element is null, we dont want to push null
        if(drawio.selectedElement) {
            drawio.shapes.push(drawio.selectedElement);
        }
        console.log(drawio.shapes);
        drawio.selectedElement = null;
    });

        // Select color
    $('.colorButton').click(function() {
        $('.colorButton').removeClass('selected');
        $(this).addClass('selected');
        drawio.selectedColor = this.id;
        console.log(drawio.selectedColor);
    });
    
});
        



