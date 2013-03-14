(function() {

  window.dimension = function(dimension) {
    return (dimension * UNIT) + "px";
  };

  window.formatStat = function(stat) {
    return stat.toFixed(0);
  };

})();
