(function() {
  "use strict";

  var mapShown = false, $mapCanvas;

  function showMap(currentMap) {
      if (mapShown) return;
      if (!$mapCanvas) {
        $mapCanvas = $('#map_canvas');
        var element = $mapCanvas.get(0),
            ctx = element.getContext('2d'),
            rect = currentMap.getRect(),
            hash = {};
        element.width = rect.width;
        element.height = rect.height;
        $mapCanvas.css({width: rect.width, height: rect.height});
        hash[TREE] = "#0a0";
        hash[SAND] = "#f0f0c9";
        hash[GRASS] = "#6d6";
        hash[ROAD] = "#ca3";
        hash[MOUNTAIN] = "#bcd";
        hash[WATER] = "#48C";
        currentMap.getViews(function(position, type) {
          ctx.fillStyle = hash[type];
          ctx.fillRect(position.x, position.y, 1, 1);
        });
      }
      $mapCanvas.show();
      mapShown = true;
  }

  function hideMap() {
    $mapCanvas.hide();
    mapShown = false;
  }

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
    },
    showMap: showMap,
    hideMap: hideMap
  };

})();
