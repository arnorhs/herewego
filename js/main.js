(function() {

  var player = {
    position: {
      x: 73,
      y: 33
    },
    size: {
      width: 1,
      height: 1
    },
    view: null,
    // returns true if the player managed to move, false otherwise
    move: function(offset) {
      var targetPlayerPosition = {x: player.position.x + offset.x, y: player.position.y + offset.y};

      if (currentMap.inBounds(targetPlayerPosition) && entities.canPassThroughAll(targetPlayerPosition)) {
        // successful player movement
        player.position = targetPlayerPosition;
        player.view.move(player.position)
        WorldView.centerOnView(player.view);
        return true;
      }
      return false;
    }
  };

  var currentMap, entities;
  window.onload = function() {

    entities = new EntitiesHash();

    // create map
    var landSize = {width: 1, height: 1};
    currentMap = WorldMap.getMap("start");
    currentMap.getViews(function(position, type) {
      var view = new View(position, landSize, type);
      var entity = new GameEntity(type, view);
      WorldView.addView(view);
      entities.add(position, entity);
    });

    // makes it so the viewport can't be scrolled past these limits
    WorldView.setViewportOffsetLimits(currentMap.getRect());

    // create the player view
    player.view = new View(player.position, player.size, PLAYER);
    WorldView.addView(player.view);

    // initializing the world basically adds all the stuff to the main div
    WorldView.init();

    WorldView.centerOnView(player.view);
  }

  var key = {
    up: 38,
    down: 40,
    left: 37,
    right: 39
  };
  // bad horrible attempt at limiting movement speed
  var lastAction = new Date();
  document.onkeydown = function(e) {
    var now = new Date(),
        keyCode = e.keyCode,
        playerMoveSuccessful = false;

    if (now - lastAction < PLAYER_MOVEMENT_RATE) {
      return false;
    }

    switch (keyCode) {
      case key.up:
        playerMoveSuccessful = player.move({x:0,y:-1});
        break;
      case key.down:
        playerMoveSuccessful = player.move({x:0,y:1});
        break;
      case key.left:
        playerMoveSuccessful = player.move({x:-1,y:0});
        break;
      case key.right:
        playerMoveSuccessful = player.move({x:1,y:0});
        break;
      default:
        console.log("Key pressed:", e.keyCode, e.keyIdentifier);
        // return so we won't set the lastAction date again
        // maybe it would be better to know if the game time had changed
        return true;
    }
    if (playerMoveSuccessful) {
      lastAction = now;
    }
    return false;
  };


})();
