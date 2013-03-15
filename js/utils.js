(function() {

  window.dimension = function(dimension) {
    return (dimension * UNIT) + "px";
  };

  window.formatStat = function(stat) {
    return stat.toFixed(0);
  };

  window.distanceBetweenPoints = function(position1, position2) {
    var a = Math.pow(position1.x - position2.x, 2);
    var b = Math.pow(position1.y - position2.y, 2);
    return Math.sqrt(a + b);
  }


})();
