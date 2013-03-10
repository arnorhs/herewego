(function() {

  var View = window.View;

  function LandView(position, size, type) {
    this.type = type;
    View.call(this, position, size);
  }

  // inherit puke.. need better methods to do this...
  for (var key in View.prototype) {
    LandView.prototype[key] = View.prototype[key];
  }
  LandView.prototype.createElement = function() {
    View.prototype.createElement.apply(this, arguments);
    this.element.className = "land_" + this.type;
  }

  window.LandView = LandView;
})();
