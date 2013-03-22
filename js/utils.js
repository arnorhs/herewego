(function() {

  window.dimension = function(dimension) {
    return (dimension * UNIT) + "px";
  };

  window.distanceBetweenPoints = function(position1, position2) {
    var a = Math.pow(position1.x - position2.x, 2);
    var b = Math.pow(position1.y - position2.y, 2);
    return Math.sqrt(a + b);
  }

  window.formatStat = function(stat) {
    return Math.floor(stat);
  };


})();
