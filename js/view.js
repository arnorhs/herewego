(function() {

  var classes = {};
  classes[PLAYER] = 'player';
  classes[GRASS] = 'land_grass';
  classes[TREE] = 'land_tree';
  classes[WATER] = 'land_water';
  classes[BRIDGE_V] = 'land_bridge_v';
  classes[BRIDGE_H] = 'land_bridge_h';
  classes[MOUNTAIN] = 'land_mountain';
  classes[ROAD] = 'land_road';
  classes[PERSON_COWBOY] = 'person_cowboy';
  classes[ALIEN] = 'enemy_alien';
  classes[DEAD_ALIEN] = 'enemy_alien_dead';
  classes[HEALING_HOUSE] = 'healing_house';
  classes[RESTING_HOUSE] = 'resting_house';

  function View(position, size, type) {
    this.position = position;
    this.size = size;
    this.type = type;
    this.createElement();
  }
  View.prototype.move = function(position) {
    this.position = position;
  };
  View.prototype.changeType = function(type) {
    this.type = type;
    this.element.className = classes[type];
  };
  View.prototype.createElement = function() {
    var div = document.createElement('div');
    div.style.position = "absolute";
    div.style.width = dimension(this.size.width);
    div.style.height = dimension(this.size.height);
    div.className = classes[this.type];
    this.element = div;
  };

  window.View = View;
})();
