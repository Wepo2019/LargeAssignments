window.drawio = {
    shapes: [],
    selectedShape: 'pen',
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
    //Create a move "shape" that when selected will let you  move the object you have selected
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
            $('.icon').removeClass('selected');
            $(this).addClass('selected');
            drawio.selectedShape = $(this).data('shape');
        });

        
        $('button').on('click', function(){
            $('button').removeClass('selected');
            $(this).addClass('selected');
            //drawio
        });

        $('#save').on('click', function(){
            //Save array of shapes into localStorage
            //Dont clear the canvas
        });

        $('#load').on('click', function(){
            //Clear canvas
            //Load currently selected localStorage object into canvas
        });
       

        $('#my-canvas').on('mousedown', function (mouseEvent) {
            switch (drawio.selectedShape) {
                case drawio.availableShapes.PEN:
                    drawio.selectedElement = new Pen( {x: mouseEvent.offsetX, y: mouseEvent.offsetY});
                    break;
                case drawio.availableShapes.RECTANGLE:
                    drawio.selectedElement = new Rectangle( {x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0, 0);
                    break;
                case drawio.availableShapes.CIRCLE:
                    drawio.selectedElement = new Circle( {x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0);
                    break;
                case drawio.availableShapes.TEXT:
                    drawio.selectedElement = new Text({x: mouseEvent.offsetX, y: mouseEvent.offsetY});
                    break;
                case drawio.availableShapes.LINE:
                    drawio.selectedElement = new Line( {x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0, 0);
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

});





