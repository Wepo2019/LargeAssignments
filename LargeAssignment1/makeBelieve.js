(function (globalObj) {

    function MakeBelieveElement(nodes) {
        this.nodes = nodes;
    }

    MakeBelieveElement.prototype.getLength = function() {
        return this.nodes.length;
    };

    //1. & 2 & 3.
    function query(cssSelector) {
        return new MakeBelieveElement(document.querySelectorAll(cssSelector));
    }

    globalObj.__ = query;

    //4.
    MakeBelieveElement.prototype.parent = function(optionalSelector = null) {
        var parents = [];

        if(optionalSelector != null) {
            var selectorQuery = query(optionalSelector);
            for(var i = 0; i < this.nodes.length; i++) {
                for(var j = 0; j < selectorQuery.nodes.length; j++) {
                    if(this.nodes[i].parentNode == selectorQuery.nodes[j]) {
                        if(!parents.includes(this.nodes[i].parentNode)){
                            parents[i] = this.nodes[i].parentNode;
                        }
                    }
                }
            }
        }
        else {
            for(var i = 0; i < this.nodes.length; i++) {
                if(!parents.includes(this.nodes[i].parentNode)){
                    parents[i] = this.nodes[i].parentNode;
                }
            }
        }

        return new MakeBelieveElement(parents);
    };

    //5.
    MakeBelieveElement.prototype.grandParent = function(optionalSelector = null) {
        var grandParent;
        if(optionalSelector != null) {
            var queryGrandParent = query(optionalSelector);
            for(var i = 0; i < queryGrandParent.nodes.length; i++) {
                if(this.nodes[0].parentNode.parentNode == queryGrandParent.nodes[i]) {
                    grandParent = this.nodes[0].parentNode.parentNode;
                    break;
                }
            }
        } 
        else {
            grandParent = this.nodes[0].parentNode.parentNode;
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

        for(var j = 0; j < this.nodes.length; i++) {
            parents[i].removeChild(this.nodes[i]);
        }
    };


})(window);

//var bla = document.createElement('p').appendChild(document.createTextNode('what am i!'));
if(typeof bla === 'object')
    console.log('heyy');

__('.the-appender').prepend(document.createElement('p').appendChild(document.createTextNode('Hi!')));

__('.the-appender').prepend('<p>ROCK YOU LIKE A HURRICAIN</p>');
/*
__('#password').onClick(function (evt) {
    console.log(evt.target.value);
__('#paragraph-1').insertText('Its all goin down right now!');
});
*/
