(function() {

  var inited = false,
      percentage,
      attributes,
      time,
      coords;

  function formatStat(stat) {
    return stat.toFixed(0);
  };

  function updatePlayerStats(playerStats) {
    // playerStats should include
    // health, maxHealth, exp, time, position
    if (!inited) {
      percentage = document.getElementById("health").childNodes[0];
      attributes = document.getElementById("attributes");
      time = document.getElementById("time");
      coords = document.getElementById("coords");
      inited = true;
    }
    // Update player health
    percentage.style.width = (playerStats.health * 100 / playerStats.maxHealth) + "%";

    // attributes,.. currently just XP - will probably eventually just be XP and other things will
    // have their own ID
    attributes.textContent = "xp: " + formatStat(playerStats.exp);

    // Time
    var hours = Math.floor(playerStats.time / 60) % (60*24),
        minutes = "" + (playerStats.time % 60);
    if (minutes.length == 1) { // stupid padding
      minutes = "0" + minutes;
    }
    time.textContent = hours + ":" + minutes;

    // Coordinates.. probably will disable once this is a proper game
    coords.textContent = playerStats.position.x + ", " + playerStats.position.y;
  }

  window.HUD = {
    updatePlayerStats: updatePlayerStats
  };

})();
