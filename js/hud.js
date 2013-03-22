(function() {

  window.HUD = {
    updateDashboard: function(playerStats) {
      // playerStats should include: health, maxHealth, exp
      $("#health > .percent").css("width", (playerStats.health * 100 / playerStats.maxHealth) + "%");
      $("#xp").html("xp: " + formatStat(playerStats.exp));
    },
    updateTime: function(newTime) {
      $("#time").html(newTime);
    },
    updateCoords: function(position) {
      // Coordinates.. probably will disable once this is a proper game
      $("#coords").html(position.x + ", " + position.y);
    }
  };

})();
