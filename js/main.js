(function() {

  var currentMap,
      entities = new EntitiesHash();
  var player = {
    state: S_IDLE,
    movementRate: function() {
      switch (player.state) {
        case S_ATTACKING:
          return 800;
        case S_MOVING:
          return 140;
      }
      return 0;
    },
    getDetailedStats: function() {
      var keys = ["level", "exp", "strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
      var stats = {};
      keys.forEach(function(key) {
        stats[key] = player.entity.attr(key);
        if (!stats[key]) {
          stats[key] = 0;
        }
      });
      return stats;
    },
    entity: null,
    move: function(offset) {
      var targetPlayerPosition = {
        x: player.entity.position.x + offset.x,
        y: player.entity.position.y + offset.y
      };

      if (!player.entity.dead && currentMap.inBounds(targetPlayerPosition) && entities.canPassThroughAll(targetPlayerPosition)) {
        var enemy = entities.getEnemy(targetPlayerPosition);
        if (enemy) {
          player.state = S_ATTACKING;
          var enemyType = enemy.type;

          var enemyDamage = player.entity.attack(enemy);
          WorldView.animateDamage(enemy, enemyDamage);

          if (!enemy.dead) {
            var playerDamage = enemy.attack(player.entity);
            WorldView.animateDamage(player.entity, playerDamage);
            if (player.entity.dead) {
              // game over
            }
          } else {
            // enemy died, give exp
            var newExp = player.entity.attr('exp') + experienceForKillingType(enemyType);
            var newLevel = 1 + Math.floor(newExp / 10);
            player.entity.attr('exp', newExp);
            player.entity.attr('level', newLevel);
          }
        } else {
          // successful player movement
          player.state = S_MOVING;
          entities.move(player.entity, targetPlayerPosition);
          WorldView.centerOnPosition(player.entity.position);
        }

        // give him more health if he touches a healing house
        var house = entities.getHouse(targetPlayerPosition);
        if (house) {
          if (house.type == HEALING_HOUSE) {
            player.entity.attr('health', player.entity.attr('maxHealth'));
          } else if (house.type == RESTING_HOUSE) {
            // rest or something
          }
        }
        updatePlayerStats();
      }
    }
  };

  function updatePlayerStats() {
    HUD.updatePlayerStats({
      health: player.entity.attr("health"),
      maxHealth: player.entity.attr("maxHealth"),
      exp: player.entity.attr("exp"),
      worldTime: WorldTime.formatTime(WorldTime.getCurrent()),
      position: player.entity.position
    });
  }

  function addEntity(type, position, size) {
    var entity = new GameEntity(type, position, size);
    WorldView.addView(entity.view);
    entities.add(position, entity);
    return entity;
  }

  window.onload = function() {

    // create map
    var landSize = {width: 1, height: 1};
    currentMap = WorldMap.getMap("start");
    currentMap.getViews(function(position, type) {
      addEntity(type, position, landSize);
    });

    // makes it so the viewport can't be scrolled past these limits
    WorldView.setViewportOffsetLimits(currentMap.getRect());

    // create the player
    player.entity = addEntity(PLAYER, INITIAL_PLAYER_POSITION, {width: 1, height: 1});

    // make all buildings
    currentMap.getEntities(function(position, type) {
      addEntity(type, position, {width: 1, height: 1});
    });

    // initializing the world view basically adds all the stuff to the main div
    WorldView.init();

    WorldView.centerOnPosition(player.entity.position);
    updatePlayerStats();

    WorldTime.init();
    WorldTime.addTickHandler(function() {
      // figure out if we should spawn an alien
      if (Math.random() > 0.7) {
        var alienPosition = {
          x: Math.floor(Math.random() * currentMap.getRect().width),
          y: Math.floor(Math.random() * currentMap.getRect().height)
        };
        if (entities.enemyCanSpawn(alienPosition)) {
          addEntity(ALIEN, alienPosition, {width: 1, height: 1});
          console.log("added an alien: ", alienPosition.x + "," + alienPosition.y);
          WorldView.redraw();
        }
      }
      updatePlayerStats();
    });
  }

  var key = {
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    s: 83
  };

  var lastAction = new Date();
  document.onkeydown = function(e) {
    var now = new Date(),
        keyCode = e.keyCode;

    if (now - lastAction < player.movementRate()) {
      return false;
    }

    player.state = S_UNKNOWN;

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
      case key.s:
        HUD.toggleDetailedPlayerStats(player.getDetailedStats());
        break;
      default:
        console.log("Key pressed:", e.keyCode, e.keyIdentifier);
        return true;
    }
    if (player.state == S_MOVING || player.state == S_ATTACKING) {
      lastAction = now;
    }
    return false;
  };


})();
