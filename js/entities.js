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

  EntitiesHash.prototype.getHouse = function(position) {
    var house = null;
    this._get(EntitiesHash.getKey(position)).forEach(function(item) {
      if (item.isHouse()) {
        house = item;
      }
    });
    return house;
  };

  EntitiesHash.prototype.getEnemy = function(position) {
    var enemy = null;
    this._get(EntitiesHash.getKey(position)).forEach(function(item) {
      if (item.isEnemy()) {
        enemy = item;
      }
    });
    return enemy;
  };

  EntitiesHash.prototype.canPassThroughAll = function(position) {
    var can = true;
    this._get(EntitiesHash.getKey(position)).forEach(function(item) {
      if (!item.canPassThrough()) {
        can = false;
      }
    });
    return can;
  };

  EntitiesHash.prototype.enemyCanSpawn = function(position) {
    var can = true;
    this._get(EntitiesHash.getKey(position)).forEach(function(item) {
      if (!item.enemyCanSpawn()) {
        can = false;
      }
    });
    return can;
  };

  function GameEntity(type, view) {
    this.dead = false;
    this.type = type;
    this.view = view;
    this._attr = defaultAttributesForType(type);
  }

  // used to get/set arbitrary attributes on entities
  GameEntity.prototype.attr = function(key, value) {
    if (value === undefined) {
      return this._attr[key];
    } else {
      this._attr[key] = value;
    }
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

  GameEntity.prototype.enemyCanSpawn = function() {
    switch (this.type) {
      case TREE:
      case MOUNTAIN:
      case WATER:
      case HOUSE:
        return false;
      case PLAYER:
      case ALIEN:
        if (!this.dead) {
          return false;
        }
    }
    return true;
  }

  GameEntity.prototype.isHouse = function() {
    switch (this.type) {
      case HOUSE:
        return true;
    }
    return false;
  }

  GameEntity.prototype.isEnemy = function() {
    switch (this.type) {
      case ALIEN:
        return true;
    }
    return false;
  }

  GameEntity.prototype.setDead = function() {
    this.dead = true;
    var newType;
    switch (this.type) {
      case ALIEN:
        newType = DEAD_ALIEN;
    }
    this.view.changeType(newType);
    this.type = newType;
  }

  window.EntitiesHash = EntitiesHash;
  window.GameEntity = GameEntity;

})();
