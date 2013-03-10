(function() {

  function View(position, size) {
    this.position = position;
    this.size = size;
    this.createElement();
  }
  View.prototype.getElement = function() {
    return this.element;
  }
  View.prototype.move = function(position) {
    console.log('moving.. ', position);
    this.element.style.left = dimension(position.x);
    this.element.style.top = dimension(position.y);
  };
  View.prototype.createElement = function() {
    console.log('creating element lol');
    var div = document.createElement('div');
    div.style.position = "absolute";
    console.log('setting ', dimension(this.size.width));
    div.style.width = dimension(this.size.width);
    div.style.height = dimension(this.size.height);
    div.style.left = dimension(this.position.x);
    div.style.top = dimension(this.position.y);
    this.element = div;
  };

  window.View = View;
})();
