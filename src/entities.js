(function() {
  "use strict";

  // Hash that works as a reverse lookup for game objects at a specific square
  //
  // It would be really inefficient to loop through the whole thing, but it's well
  // suited for looking up all the game objects in a specific square.

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

  // Moving in the hash will propogate into: removing and adding to hash, moving
  // the entity and ultimately the view
  EntitiesHash.prototype.move = function(entity, targetPosition) {
    var oldPosition = entity.position;
    this.remove(oldPosition, entity);
    this.add(targetPosition, entity);
    entity.move(targetPosition);
    // TODO trigger callback or something that will let the controller know that
    // the entity has moved, so the world view can be updated
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

  function GameEntity(type, position, size) {
    this.type = type;
    this.position = position;
    this.size = size;
    this.view = new View(position, size, type);
    this.dead = false;
    this._attr = defaultAttributesForType(type);
  }

  GameEntity.prototype.move = function(targetPosition) {
    this.position = targetPosition;
    this.view.move(targetPosition);
  };

  // used to get/set arbitrary attributes on entities
  GameEntity.prototype.attr = function(key, value) {
    if (value === undefined) {
      return this._attr[key];
    } else {
      this._attr[key] = value;
    }
  };

  GameEntity.prototype.canPassThrough = function() {
    switch (this.type) {
      case TREE:
      case MOUNTAIN:
      case WATER:
      case PERSON_COWBOY:
        return false;
    }
    return true;
  }

  GameEntity.prototype.enemyCanSpawn = function() {
    switch (this.type) {
      case TREE:
      case MOUNTAIN:
      case WATER:
      case HOUSE_HEALING:
      case HOUSE_RESTING:
      case HOUSE_SPACESHIP:
      case HOUSE_TOWER:
      case HOUSE_FORTRESS:
        return false;
      case PERSON_COWBOY:
      case PLAYER:
      case ALIEN:
        return false;
    }
    return true;
  }

  GameEntity.prototype.isHouse = function() {
    switch (this.type) {
      case HOUSE_HEALING:
      case HOUSE_RESTING:
      case HOUSE_SPACESHIP:
      case HOUSE_TOWER:
      case HOUSE_FORTRESS:
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

  // TODO this probably shouldn't change the type.. probably just set the dead property
  GameEntity.prototype.setDead = function() {
    this.dead = true;
    var newType;
    switch (this.type) {
      case ALIEN:
        newType = ALIEN_DEAD;
    }
    this.view.changeType(newType);
    this.type = newType;
  }

  // Expects a victim, and emits an event with the damage dealt
  GameEntity.prototype.attack = function(victim) {
    // attacker
    var attacker = this,
        strength = attacker.attr('strength'),
        weaponDamage = attacker.attr('weapon').damage,
        maxDamage = (strength * 3) + weaponDamage;

    // how much of the damage is random? 0-1
    var accuracy = 0.4,
        fixedDamage = maxDamage * accuracy,
        randomDamage = Math.random() * maxDamage * (1 - accuracy),
        damage = fixedDamage + randomDamage;

    // victim
    victim.setHealth(victim.attr('health') - damage);

    if (victim.dead) {
      // give experience points to attacker
      this.addExp(this.experienceForKilling(victim));
    }
  };

  GameEntity.prototype.experienceForKilling = function(victim) {
    // pretty simple right now.. i'm sure this can change later
    return (victim.attr("level") || 1) / (this.attr("level") || 1);
  };

  GameEntity.prototype.setHealth = function(newHealth) {
    var oldHealth = this.attr('health');
    if (oldHealth == newHealth) return;
    this.attr('health', newHealth);
    if (newHealth <= 0) {
      this.setDead();
    }
    Whisper.say("entity_health_change", this, newHealth - oldHealth);
  };

  GameEntity.prototype.addExp = function(exp) {
    var newExp = this.attr('exp') + exp,
        oldLevel = this.attr('level'),
        newLevel = 1 + Math.floor(newExp / 10);
    this.attr('exp', newExp);
    this.attr('level', newLevel);
    if (newLevel > oldLevel) {
      Whisper.say("entity_level_up", this);
    }
  };

  window.EntitiesHash = EntitiesHash;
  window.GameEntity = GameEntity;

})();
