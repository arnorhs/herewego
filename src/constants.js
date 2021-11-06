(function() {
  "use strict";
  var i;

  window.UNIT = 48;

  window.INITIAL_PLAYER_POSITION = { x: 73, y: 33 };

  // player states
  i = 1;
  window.S_IDLE = i++;
  window.S_MOVING = i++;
  window.S_ATTACKING = i++;

  // define entity types - probably should define
  i = 1;
  window.PLAYER = i++;
  window.ALIEN = i++;
  window.PERSON_COWBOY = i++;
  window.ALIEN_DEAD = i++;
  window.HOUSE_HEALING = i++;
  window.HOUSE_RESTING = i++;
  window.HOUSE_SPACESHIP = i++;
  window.HOUSE_TOWER = i++;
  window.HOUSE_FORTRESS = i++;
  window.GRASS = i++;
  window.SAND = i++;
  window.TREE = i++;
  window.WATER = i++;
  window.BRIDGE_V = i++;
  window.BRIDGE_H = i++;
  window.MOUNTAIN = i++;
  window.ROAD = i++;
})();
