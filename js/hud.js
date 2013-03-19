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

  var isShowingDetailedPlayerStats = false;

  function toggleDetailedPlayerStats(stats) {
    if (isShowingDetailedPlayerStats) {
      getModal().style.display = 'none';
      isShowingDetailedPlayerStats = false;
      return;
    }

    isShowingDetailedPlayerStats = true;

    var modal = getModal(300,235);
    var modalContainer = modal.childNodes[0];
    modalContainer.textContent = "";

    for (var key in stats) {
      if (stats.hasOwnProperty(key)) {
        // each row
        var row = document.createElement("div");
        row.className = "row";

        // the property field
        var property = document.createElement("div");
        property.className = "property";
        property.textContent = key;
        row.appendChild(property);

        // the value field
        var value = document.createElement("div");
        value.className = "value";
        value.textContent = stats[key];
        row.appendChild(value);

        // append the whole thing
        modalContainer.appendChild(row);
      }
    }
    modal.style.display = 'block';
  }

  function getModal(width, height) {
    var modal = document.getElementById("modal");
    if (width && height) {
      modal.style.width = width + "px";
      modal.style.height = height + "px";
      modal.style.marginTop = "-" + (width/2) + "px";
      modal.style.marginLeft = "-" + (height/2) + "px";
    }
    return modal;
  }

  window.HUD = {
    updatePlayerStats: updatePlayerStats,
    toggleDetailedPlayerStats: toggleDetailedPlayerStats,
  };

})();
