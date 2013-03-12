(function() {

  var player = {
    stats: {
      strength: 1,
      dexterity: 1,
      wizdom: 1
    },
    position: {
      x: 6,
      y: 6
    },
    size: {
      width: 1,
      height: 1
    },
    view: null,
    move: function(offset) {
      var targetPlayerPosition = {x: player.position.x + offset.x, y: player.position.y + offset.y};

      if (currentMap.inBounds(targetPlayerPosition)) {
        // successful player movement
        player.position = targetPlayerPosition;
        player.view.move(player.position)
        WorldView.centerOnView(player.view);
      }
    }
  };

  var currentMap;
  window.onload = function() {
    // create map
    var landSize = {width: 1, height: 1};
    currentMap = WorldMap.getMap("start");
    currentMap.getViews(function(position, type) {
      WorldView.addView(new View(position, landSize, type));
    });

    // create the player view
    player.view = new View(player.position, player.size, "player");
    WorldView.addView(player.view);

    // initializing the world basically adds all the stuff to the main div
    WorldView.init();
  }

  var key = {
    up: 38,
    down: 40,
    left: 37,
    right: 39
  };
  // bad horrible attempt at limiting movement speed
  var lastAction = new Date(),
      interval = 100;
  document.onkeydown = function(e) {
    var now = new Date();
    if (now - lastAction < interval) {
      return false;
    }
    var keyCode = e.keyCode;
    switch (keyCode) {
      case key.up:
        player.move({x:0,y:-1});
        break;
      case key.down:
        player.move({x:0,y:1});
        break;
      case key.left:
        player.move({x:-1,y:0});
        break;
      case key.right:
        player.move({x:1,y:0});
        break;
      default:
        console.log("Key pressed:", e.keyCode, e.keyIdentifier);
        // return so we won't set the lastAction date again
        // maybe it would be better to know if the game time had changed
        return true;
    }
    lastAction = now;
    return false;
  };


})();
