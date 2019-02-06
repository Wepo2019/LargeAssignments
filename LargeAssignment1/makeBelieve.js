(function () {

    function MakeBelieveElement(nodes) {
        this.nodes = nodes;
    }

    MakeBelieveElement.prototype.getLength = function() {
        return this.nodes.length;
    };

    //1. & 2 & 3.
    var innerMakeBelieve = function(query) {
        return new MakeBelieveElement(document.querySelectorAll(query));
    }

    //4.
    MakeBelieveElement.prototype.parent = function(optionalSelector = null) {
        var parents = [];

        if(optionalSelector != null) {
            var selectorQuery = query(optionalSelector);
            for(var i = 0; i < this.nodes.length; i++) {
                for(var j = 0; j < selectorQuery.nodes.length; j++) {
                    if(this.nodes[i].parentNode == selectorQuery.nodes[j]) {
                        if(!parents.includes(this.nodes[i].parentNode)) {
                            parents[i] = this.nodes[i].parentNode;
                        }
                    }
                }
            }
        }
        else {
            for(var i = 0; i < this.nodes.length; i++) {
                if(!parents.includes(this.nodes[i].parentNode)) {
                    parents[i] = this.nodes[i].parentNode;
                }
            }
        }

        return new MakeBelieveElement(parents);
    };

    //5.
    MakeBelieveElement.prototype.grandParent = function(optionalSelector = null) {
        var grandParent = [];

        if(optionalSelector != null) {
            var queryGrandParent = query(optionalSelector);
            for(var i = 0; i < queryGrandParent.nodes.length; i++) {
                if(this.nodes[0].parentNode.parentNode == queryGrandParent.nodes[i]) {
                    grandParent[0] = this.nodes[0].parentNode.parentNode;
                    break;
                }
            }
        } 
        else {
            console.log(this);
            grandParent[0] = this.nodes[0].parentNode.parentNode;
        }

        return new MakeBelieveElement(grandParent);
    };

    //6.
    MakeBelieveElement.prototype.ancestor = function(requiredSelector = null) {
        //Return an empty object if there is no parameter.            
        if(requiredSelector == null) {
            console.log("Parameter required!");
            return new MakeBelieveElement();
        }

        var ancestors = [];

        var curr = this.nodes[0].parentNode.parentNode;
        while(curr != undefined || curr != null) {
            ancestors.push(curr.parentNode);
            curr = curr.parentNode;
        }

        var desiredAncestor = query(requiredSelector).nodes[0];

        for(var i = 0; i < ancestors.length; i++) {
            if(ancestors[i] == desiredAncestor) {
                return new MakeBelieveElement(ancestors[i]);
            }
        }

        return new MakeBelieveElement();
    };

    //7.
    MakeBelieveElement.prototype.onClick = function(evt) {
        for(var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].addEventListener('click', evt);
        }
    };

    //8.
    MakeBelieveElement.prototype.insertText = function(text) {
        for(var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].innerHTML = text;
        }

        return new MakeBelieveElement(this.nodes);
    };

    //9.
    MakeBelieveElement.prototype.append = function(item) {
        if(typeof item == 'string') {
            var parser = new DOMParser();
            var html = parser.parseFromString(item, 'text/html');

            for(var i = 0; i < this.nodes.length; i++) {
                this.nodes[i].appendChild(html.body.childNodes[0]);
            }
        }
        else if(typeof item == 'object') {
            for(var i = 0; i < this.nodes.length; i++) {
                this.nodes[i].appendChild(item);
            }
        }
        else {
            console.log("Invalid parameter!: Must be a valid html syntax or object!");
        }
    };

    //10.
    MakeBelieveElement.prototype.prepend = function(item) {
        if(typeof item == 'string') {
            var parser = new DOMParser();
            var html = parser.parseFromString(item, 'text/html');

            for(var i = 0; i < this.nodes.length; i++) {
                this.nodes[i].insertBefore(html.body.childNodes[0], this.nodes[i].childNodes[0]);
            }
        }
        else if(typeof item == 'object') {
            for(var i = 0; i < this.nodes.length; i++) {
                this.nodes[i].insertBefore(item, this.nodes[i].childNodes[0]);
            }
        }
        else {
            console.log("Invalid parameter!: Must be a valid html syntax or object!");
        }
    };

    //11.
    MakeBelieveElement.prototype.delete = function() {
        var parents = [];

        for(var i = 0; i < this.nodes.length; i++) {
            parents[i] = this.nodes[i];
        }

        for(var j = 0; j < this.nodes.length; j++) {
            parents[j].removeChild(this.nodes[j]);
        }
    };
    
    //12.
    innerMakeBelieve.ajax = function(obj)  {

        var request = new XMLHttpRequest();

        //Functions definitions:
        function isSuccess(status) {
            return status >= 200 && status < 400;
        }
        
        function setHeaders(request, obj) {
            if ('headers' in obj)  {
                for (var i = 0; i < obj.headers.length; i++) {
                    var header = obj.headers[i];
                    var key = Object.keys(header)[0];
                    request.setRequestHeader(key, header[key]);
                }
            }
        }

        //Actions:
        request.open(obj.method, obj.URL); 

        setHeaders(request, obj);

        //Setting timeout of request
        if(typeof obj.timeout == 'number' && obj.timeout > 0) {
            var convertedTime = (obj.timeout * 1000);
            request.timeout = convertedTime;
        }

        //Do something when timeout occurs
        request.ontimeout = function(evt) {
            console.log("Request timed out after: " + obj.timeout + "seconds!");
            return;
        }

        request.onreadystatechange = function() {
            if(request.readyState === XMLHttpRequest.DONE && isSuccess(status)) {
                var resp = request.getResponseHeader('Content-Type').indexOf('xml') !== -1 ? request.responseXML : request.responseText;
                obj.success(resp);
            }
            else {
                obj.fail(request.responseText);
            }
        }

        if(obj.beforeSend){
            obj.beforeSend();
        }

        console.log(request);
        request.send(JSON.stringify(obj.data));
    }

    //13.
    MakeBelieveElement.prototype.css = function(change, values) {
        var formatArr = [];
        var upper = false;

        for(var i = 0; i < change.length; i++) {
            if(change[i] == '-') {
                upper = true;
                continue;
            }

            if(upper) {
                var capitalLetter = change[i].toUpperCase();
                formatArr.push(capitalLetter);
                upper = false;
                continue;
            }

            formatArr.push(change[i]);
        }

        var formattedChange = formatArr.join("");
        
        for(var j = 0; j < this.nodes.length; j++) {
            this.nodes[j].style[formattedChange] = values;
        }

        return new MakeBelieveElement(this.nodes);
    };

    //14.
    MakeBelieveElement.prototype.toggleClass = function(tClass) {
        for(var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].classList.toggle(tClass);
        }

        return new MakeBelieveElement(this.nodes);
    };

    //15.
    

    window.__ = innerMakeBelieve;

})();

__.ajax({

    url: 'https://serene-island-81305.herokuapp.com/api/200',
    method: 'GET', 
    timeout: 10,
    data: {
        name: "Hjortur"
    },
    headers: [
        { Authorization : 'Basic YWxhZGRpbjpvcGVuc2VzYW1l' }

    ],
    success: function (resp) {
        console.log("Success " + resp);
    },
    fail: function (error) {
        console.log("Error " + error);
    },
    beforeSend: function (xhr) {
        console.log("Before sending, we did something");
    }
});


//var bla = document.createElement('p').appendChild(document.createTextNode('what am i!'));
//__('.dog').toggleClass('cat').toggleClass('dog').toggleClass('mom');

//console.log(__('body'));
//__('body').css('background-color', 'blue');

//console.log(__('.cat').parent().grandParent().parent());

//__('.the-appender').append(document.createElement('p').appendChild(document.createTextNode('Hi!')));

//__('.the-appender').append('<p>ROCK YOU LIKE A HURRICAIN</p>');
/*
__('#password').onClick(function (evt) {
    console.log(evt.target.value);
__('#paragraph-1').insertText('Its all goin down right now!');
});
*/
