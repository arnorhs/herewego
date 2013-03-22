(function() {

  function formatStat(stat) {
    return Math.floor(stat);
  };

  var isShowingDetailedPlayerStats = false;

  function toggleDetailedPlayerStats(stats) {
    if (isShowingDetailedPlayerStats) {
      getModal().style.display = 'none';
      isShowingDetailedPlayerStats = false;
      return;
    }

    isShowingDetailedPlayerStats = true;

    var modal = getModal(300,265);
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
        value.textContent = formatStat(stats[key]);
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
    toggleDetailedPlayerStats: toggleDetailedPlayerStats,
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
