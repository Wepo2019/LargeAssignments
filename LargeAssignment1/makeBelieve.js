(function (globalObj) {

    function MakeBelieveElement(nodes) {
        this.nodes = nodes;
    }

    MakeBelieveElement.prototype.getLength = function() {
        return this.nodes.length;
    };

    //1. & 2.
    function query(cssSelector) {
        return new MakeBelieveElement(document.querySelectorAll(cssSelector));
    }

    globalObj.__ = query;

    //3.
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

    MakeBelieveElement.prototype.grandParent = function(optionalSelector = null) {
        var grandParent;
        if(optionalSelector != null) {
            var grandChildren = query(optionalSelector);
            grandParent = grandChildren.nodes[0].parentNode.parentNode;
        } 
        else {
            grandParent = this.nodes[0].parentNode.parentNode;
        }

        return new MakeBelieveElement(grandParent);
    };
})(window);

var parent = __('.kid').parent('.item');
console.log(parent);
//console.log(__('.kid'));

//nodelist vs array, includes, see if you can used nodelist[i] something to compare to stuff in array
//check if you can even