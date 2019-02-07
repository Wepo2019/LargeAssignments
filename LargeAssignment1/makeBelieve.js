(function () {

    function MakeBelieveElement(nodes) {
        this.nodes = nodes;
    }

    //1. & 2 & 3.
    var innerMakeBelieve = function(query) {
        return new MakeBelieveElement(document.querySelectorAll(query));
    }

    //4.
    MakeBelieveElement.prototype.parent = function(optionalSelector = null) {
        var parents = [];

        if (optionalSelector != null) {
            var selectorQuery = innerMakeBelieve(optionalSelector);
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
            var queryGrandParent = innerMakeBelieve(optionalSelector);
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
            return;
        }

        var ancestors = [];

        var curr = this.nodes[0].parentNode.parentNode;
        while(curr != undefined || curr != null) {
            ancestors.push(curr.parentNode);
            curr = curr.parentNode;
        }

        var desiredAncestor = innerMakeBelieve(requiredSelector).nodes[0];

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

        return new MakeBelieveElement(this.nodes);
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
                this.nodes[i].appendChild(item.parentNode);
            }
        }
        else {
            console.log("Invalid parameter!: Must be a valid html syntax or object!");
        }

        return new MakeBelieveElement(this.nodes);
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
                this.nodes[i].insertBefore(item.parentNode, this.nodes[i].childNodes[0]);
            }
        }
        else {
            console.log("Invalid parameter!: Must be a valid html syntax or object!");
        }

        return new MakeBelieveElement(this.nodes);
    };

    //11.
    //TODO: SKOÐA
    MakeBelieveElement.prototype.delete = function() {
        /*var parents = [];

        for(var i = 0; i < this.nodes.length; i++) {
            parents[i] = this.nodes[i];
        }

        for(var j = 0; j < this.nodes.length; j++) {
            parents[j].removeChild(this.nodes[j]);
        }
        */
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].remove();
        }
    };
    
    //12.
    innerMakeBelieve.ajax = function(obj)  {
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
        var request = new XMLHttpRequest();
        
        var method = 'GET';
        if(obj.method)
            method = obj.method;

        if(!obj.url) {
            console.log("Cannot make a request without a url!");
            return;
        }
            
        request.open(method, obj.url); 

        setHeaders(request, obj);

        //Default Data
        var data = {};
        if (obj.data) {
            data = obj.data;
        }

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

        //Callback functions based on state of request
        request.onreadystatechange = function() {
            if(request.readyState === XMLHttpRequest.DONE) {
                var resp = request.getResponseHeader('Content-Type').indexOf('xml') !== -1 ? request.responseXML : request.responseText;

                if(isSuccess(request.status)){
                    if(obj.success) {
                        obj.success(resp);
                    }
                }
                else {
                    if(obj.fail) {
                        obj.fail(request.responseText);
                        //Should we return here?
                    }
                }
            }
        }

        //If there is a beforeSend function, call it
        if(obj.beforeSend){
            obj.beforeSend();
        }

        request.send(JSON.stringify(data));
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
    MakeBelieveElement.prototype.onSubmit = function (evt) {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].addEventListener('submit', evt);
        }

        return new MakeBelieveElement(this.nodes);
    }

    //16.
    MakeBelieveElement.prototype.onInput = function (evt) {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].addEventListener('input', evt);
        }

        return new MakeBelieveElement(this.nodes);
    }

    window.__ = innerMakeBelieve;

})();

//var bla = document.createElement('p').appendChild(document.createTextNode('what am i!'));
//__('.dog').toggleClass('cat').toggleClass('dog').toggleClass('mom');

//console.log(__('body'));
//__('body').css('background-color', 'blue');

//console.log(__('.cat').parent().grandParent().parent());

/*******   TESTS   *******/
//Q.1, Q.2
//var inputs = __('#Q2');
//console.log(inputs);
//Q.3
//skoða
//Q.4
//var emptyparent = __('#password').parent();
//console.log(emptyparent);
//var formparent = __('#password').parent('#my-input');
//console.log(formparent);
//Q.5
//var GParent = __('#password').grandParent();
//console.log(GParent);
//var IdGParent = __('#password').grandParent('#grandfather');
//console.log(IdGParent);
//Q.6
//var root = __('#password').ancestor('.root');
//console.log(root);
//var ancestor = __('#password').ancestor('.ancestor');
//console.log(ancestor);
//var ancestorsib = __('#password').ancestor('.ancestor-sib');
//console.log(ancestorsib);
// TODO: SKOÐA
//var chainancestorrootparent = __('.ancestor').parent();
//console.log(chainancestorrootparent);
//Q.7
//__('#password').onClick(function (evt) {
//    console.log(evt.target.value);
//});
//ChainTest
//__('#password').onClick(function (evt) {
//    console.log(evt.target.value);
//}).css('background-color', 'blue');
//Q.8
//__('#paragraph-2').insertText('The Best, The Best, The Best of you!!!!!');
//__('#paragraph-1').insertText('Its all goin down right now!');
//Q.9
//__('.the-appender').append(document.createElement('p').appendChild(document.createTextNode('Hi!')));
//__('.the-appender').append('<p>ROCK YOU LIKE A HURRICAIN</p>');
//Q.10
//__('.the-prepender').prepend('<p>You're the pretender</p>');
//__('.the-prepender').prepend(
//document.createElement('p')
//    .appendChild(
//    document.createTextNode('Pretender paragraph!')
//)
//);
//Q.11
//__('.the-prepender').delete();
//__('.the-appender').delete();
//Q.12
/*
__.ajax({
    url: 'https://serene-island-81305.herokuapp.com/api/200',
    method: 'GET',
    timeout: 10,
    data: {
        //name: "Hjortur"
        },
        headers: [
            { 'Content-Type': 'application/json' }
    
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
*/
//Q.13
//__('body').css('background-color', 'blue');
//Q.14
//__('body').toggleClass('bla');
//Q.15
//__('#my-input').onSubmit(function (evt) {
//    //????
//});
//Q.16
//__('#password').onInput(function (evt) {
//    console.log(evt.target.value);
//});