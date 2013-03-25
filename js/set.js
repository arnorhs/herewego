(function() {

  // A very basic, stupid implementation of a set I needed for the keyboard stuff.
  // I couldn't use a normal js object because the objects need to be able to contain
  // functions

  function Set() {
    this.items = [];
  }
  Set.prototype.add = function(item) {
    if (this.items.indexOf(item) < 0) {
      this.items.push(item);
    }
  };
  Set.prototype.remove = function(item) {
    var i = this.items.indexOf(item);
    if (i >= 0) {
      this.items.splice(i, 1);
    }
  };
  Set.prototype.each = function(callback) {
    for (var i = 0, l = this.items.length; i < l; i++) {
      callback.call(window, this.items[i]);
    }
  };
  Set.prototype.clear = function() {
    this.items = [];
  };

  window.Set = Set;

})();
