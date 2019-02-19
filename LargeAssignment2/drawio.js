window.drawio = {
    shapes: [],
    selectedShape: 'pen', //breyta seinna í pen 
    canvas: document.getElementById('my-canvas'),
    ctx: document.getElementById('my-canvas').getContext('2d'),
    selectedElement: null,
    availableShapes: {
        PEN: 'pen',
        RECTANGLE: 'rectangle',
        CIRCLE: 'circle',
        LINE: 'line'
    }
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
        });

        $('#my-canvas').on('mouseup', function () {
            drawio.shapes.push(drawio.selectedElement);
            console.log(drawio.shapes);
            drawio.selectedElement = null;
        });

});





