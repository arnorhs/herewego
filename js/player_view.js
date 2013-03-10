(function() {

  var View = window.View;

  function PlayerView(position, size) {
    View.apply(this, arguments);
  }

  // inherit puke.. need better methods to do this...
  for (var key in View.prototype) {
    PlayerView.prototype[key] = View.prototype[key];
  }
  PlayerView.prototype.createElement = function() {
    View.prototype.createElement.apply(this, arguments);
    this.element.className = "player";
  }

  window.PlayerView = PlayerView;
})();
