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
                        parents[i] = this.nodes[i].parentNode;
                    }
                }
            }
        }
        else {
            for(var i = 0; i < this.nodes.length; i++) {
                parents[i] = this.nodes[i].parentNode;
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


})(window);

var test = __('.cat').grandParent('.kidasd');
console.log(test);