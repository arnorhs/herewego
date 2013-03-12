(function() {

  var player = {
    position: {
      x: 6,
      y: 6
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

  // Hash that works as a reverse lookup for game objects at a specific square
  //
  // It would be really inefficient to loop through the whole thing, but it's well
  // suited for looking up all the game objects in a specific square.
  //
  // Random idea: Make it so that each square has a specific land object or even
  // defaulting that square to position 0 in the array
  //
  // TODO: This would be well suited in its own class
  function EntitiesHash() {
    this.hash = {};
  }

  EntitiesHash.getKey = function(position) {
    // packed integer..
    // if we ever need to retrieve it... Well i hope we won't have to
    return position.x | position.y << 12;
  };

  // this function will actually create and retrieve an array, so we can add to
  // it as we like.
  EntitiesHash.prototype._get = function(key) {
    if (!this.hash[key]) {
      this.hash[key] = [];
    }
    return this.hash[key];
  };

  EntitiesHash.prototype.remove = function(position, object) {
    var key = EntitiesHash.getKey(position);
    var arr = this._get(key);
    var index = arr.indexOf(object);
    if (index >= 0) {
      arr.splice(index, 1);
    }
  };

  EntitiesHash.prototype.add = function(position, object) {
    var key = EntitiesHash.getKey(position);
    this._get(key).push(object);
  };

  EntitiesHash.prototype.canPassThroughAll = function(position) {
    var key = EntitiesHash.getKey(position);
    var retval = true;
    this._get(key).forEach(function(item) {
      if (!item.canPassThrough()) {
        retval = false;
      }
    });
    return retval;
  };

  function GameEntity(type, view) {
    this.type = type;
    this.view = view;
  }

  GameEntity.prototype.canPassThrough = function() {
    switch (this.type) {
      case TREE:
      case MOUNTAIN:
      case WATER:
        return false;
    }
    return true;
  }

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

    // create the player view
    player.view = new View(player.position, player.size, PLAYER);
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
    var now = new Date(),
        keyCode = e.keyCode,
        playerMoveSuccessful = false;

    if (now - lastAction < interval) {
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
