(function() {

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

  window.EntitiesHash = EntitiesHash;
  window.GameEntity = GameEntity;

})();
