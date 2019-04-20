var addElementFunctions = (tag) => {
    tag.setWidth = (width) => {
        tag.style.width = width;
        return tag;
    };
    tag.getWidth = () => {
        return tag.offsetWidth;
    };
    tag.setHeight = (height) => {
        tag.style.height = height;
        return tag;
    };
    tag.getHeight = () => {
        return tag.offsetHeight;
    };
    tag.css = function() {
        if(arguments.length==1){
            return eval("this.style."+arguments[0].trim());
        }else if(arguments.length==2){
            eval("this.style."+arguments[0].trim()+" = '"+arguments[1]+"'");
            return this;
        }
    };
    tag.addClass = (className) => {
        tag.classList.add(className);
        return tag;
    };
    tag.removeClass = (className) => {
        tag.classList.remove(className);
        return tag;
    };
    tag.replaceClass = (oldClass, newClass) => {
        tag.removeClass(oldClass).addClass(newClass);
        return tag;
    };
    tag.hasClass = (className) => {
        return tag.classList.contains(className);
    };
    tag.getParent = () => {
        var parent =  tag.parentElement;
        addElementFunctions(parent);
        return parent;
    };
    tag.getChildren = () => {
        var children =  tag.children;
        for (var i=0; i<children.length; i++){
            addElementFunctions(children[i]);
        }
        return children;
    };
};

var createElement = (tagName) => {
    var tag = document.createElement(tagName);
    return tag;
};