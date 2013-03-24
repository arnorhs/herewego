(function() {
  "use strict";

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
    lastActionDate: 0,
    canMove: function(targetPlayerPosition) {
      return (new Date() - player.lastActionDate) > player.movementRate() &&
             !player.entity.dead &&
             currentMap.inBounds(targetPlayerPosition) &&
             entities.canPassThroughAll(targetPlayerPosition);
    },
    move: function(offset) {
      var now = new Date();

      var targetPlayerPosition = {
        x: player.entity.position.x + offset.x,
        y: player.entity.position.y + offset.y
      };

      if (!player.canMove(targetPlayerPosition)) return;

      var enemy = entities.getEnemy(targetPlayerPosition);
      if (enemy) {
        player.state = S_ATTACKING;

        player.entity.attack(enemy);

        if (!enemy.dead) {
          enemy.attack(player.entity);
          if (player.entity.dead) {
            // game over
          }
        }
      } else {
        // successful player movement
        player.state = S_MOVING;
        entities.move(player.entity, targetPlayerPosition);
        WorldView.centerOnPosition(player.entity.position);
        HUD.updateCoords(player.entity.position);
      }

      // give him more health if he touches a healing house
      var house = entities.getHouse(targetPlayerPosition);
      if (house) {
        if (house.type == HOUSE_HEALING) {
          player.entity.setHealth(player.entity.attr('maxHealth'));
        }
      }
      player.lastActionDate = now;
      updateDashboard();
    }
  };

  Whisper.listen("entity_health_change", function(entity, healthChange) {
    var formatted = (healthChange < 0 ? "-" : "+") + healthChange.toFixed(1);
    WorldView.animateTextPop(entity.view, healthChange < 0 ? "#f44" : "#4f4", formatted);
  });

  Whisper.listen("entity_level_up", function(entity) {
    setTimeout(function() {
      var formatted = "Level up: " + entity.attr("level");
      WorldView.animateTextPop(entity.view, "#c93", formatted);
    }, 500);
  });

  Whisper.listen("time_tick", function(time) {
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
    HUD.updateTime(WorldTime.formatTime(WorldTime.getCurrent()));
    Light.setLuminosity(WorldTime.getLuminosity());
  });

  function updateDashboard() {
    HUD.updateDashboard({
      health: player.entity.attr("health"),
      maxHealth: player.entity.attr("maxHealth"),
      exp: player.entity.attr("exp")
    });
  }

  function addEntity(type, position, size) {
    var entity = new GameEntity(type, position, size);
    WorldView.addView(entity.view);
    entities.add(position, entity);
    return entity;
  }

  $(function() {
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
    Light.setLuminosity(WorldTime.getLuminosity());

    // initializing the world view basically adds all the stuff to the main div
    WorldView.init();

    WorldView.centerOnPosition(player.entity.position);
    updateDashboard();
    HUD.updateCoords(player.entity.position);

    WorldTime.init();
    HUD.updateTime(WorldTime.formatTime(WorldTime.getCurrent()));
  });

  var key = {
    up: 38, down: 40, left: 37, right: 39,
    w: 87, a: 65, s: 83, d: 68,
    k: 75, j: 74, h: 72, l: 76,
    tab: 9,
    m: 77
  };

  document.onkeydown = function(e) {
    if (e.metaKey) {
      return true;
    }
    switch (e.keyCode) {
      case key.up:
      case key.w:
      case key.k:
        player.move({x:0,y:-1});
        break;
      case key.down:
      case key.s:
      case key.j:
        player.move({x:0,y:1});
        break;
      case key.left:
      case key.a:
      case key.h:
        player.move({x:-1,y:0});
        break;
      case key.right:
      case key.d:
      case key.l:
        player.move({x:1,y:0});
        break;
      case key.tab:
        Modal.playerStats(player.getDetailedStats());
        break;
      case key.m:
        HUD.showMap(currentMap);
        break;
      default:
        console.log("Key pressed:", e.keyCode, e.keyIdentifier);
        return true;
    }
    return false;
  };

  document.onkeyup = function(e) {
    if (e.metaKey) return true;
    switch (e.keyCode) {
      case key.m:
        HUD.hideMap();
        break;
      default:
        return true;
    }
    return false;
  };

})();
