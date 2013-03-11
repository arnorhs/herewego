(function() {

  function View(position, size, type) {
    this.position = position;
    this.size = size;
    this.type = type;
    this.createElement();
  }
  View.prototype.getElement = function() {
    return this.element;
  }
  View.prototype.move = function(position) {
    this.element.style.left = dimension(position.x);
    this.element.style.top = dimension(position.y);
  };
  View.prototype.createElement = function() {
    var div = document.createElement('div');
    div.style.position = "absolute";
    div.style.width = dimension(this.size.width);
    div.style.height = dimension(this.size.height);
    div.style.left = dimension(this.position.x);
    div.style.top = dimension(this.position.y);
    div.className = this.type;
    this.element = div;
  };

  window.View = View;
})();
