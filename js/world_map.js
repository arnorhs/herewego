(function() {
  "use strict";

  // Map data
  //
  // g: grass
  // t: trees
  // w: water
  // b: vertical bridge
  // B: horizontal bridge
  // m: mountain
  // r: road
  var mapDefinitions = {
    start: {
        buildings: [
          {x: 6, y: 5}, {x: 63, y: 31}, {x: 88, y: 46}, {x: 76, y: 15},
          // house on the side of the road
          {x: 41, y: 41, type: HOUSE_RESTING},
          // single house in the middle of large lake
          {x: 134, y: 8},
          // town above maze
          {x: 134, y: 26, type: HOUSE_RESTING}, {x: 134, y: 28}, {x: 139, y: 30},
          {x: 145, y: 28, type: HOUSE_RESTING}, {x: 142, y: 27, type: HOUSE_RESTING}, {x: 148, y: 26},
          {x: 136, y: 28, type: HOUSE_TOWER}, {x: 148, y: 29, type: HOUSE_FORTRESS},
          // space ships
          {x: 2, y: 57, type: HOUSE_SPACESHIP}, {x: 71, y: 57, type: HOUSE_SPACESHIP}, {x: 101, y: 46, type: HOUSE_SPACESHIP},
          {x: 122, y: 19, type: HOUSE_SPACESHIP}, {x: 44, y: 18, type: HOUSE_SPACESHIP}, {x: 17, y: 3, type: HOUSE_SPACESHIP}
        ],
        people: [
          // town above maze
          {x: 136, y: 26}, {x: 139, y: 31}, {x: 146, y: 26},
        ]
      }
    };

  var types = {
    ".": GRASS,
    t: TREE,
    w: WATER,
    b: BRIDGE_V,
    B: BRIDGE_H,
    m: MOUNTAIN,
    r: ROAD
  };
  function squareToType(square) {
    return types[square];
  }

  // Eventually the map will probably also be managed somewhere else in the
  // game engine - especially if it will become mutable
  function WorldMap(name) {
    this.name = name;
    this.raw = null;
    this.size = {width: 0, height: 0};
  }

  WorldMap.prototype.download = function(callback) {
    var map = this;
    $.ajax({
      url: "maps/" + this.name + ".map",
      dataType: "text",
      success: function(data) {
        map.raw = data.split("\n");
        // I contemplated looping through and removing each empty string, but I think
        // it's just going to be the last one.
        map.raw.pop();
        map.size.width = map.raw[0].length;
        map.size.height = map.raw.length;
        callback.call(map);
      },
      error: function(xhr, type) {
        // TODO handle error?
      }
    });
  };

  WorldMap.prototype.getViews = function(callback) {
    // loop through each tile
    for (var y = 0; y < this.size.height; y++) {
      for (var x = 0; x < this.size.width; x++) {
        callback({x: x, y: y}, squareToType(this.raw[y][x]));
      }
    }
  };

  WorldMap.prototype.getEntities = function(callback) {
    var buildings = mapDefinitions[this.name].buildings,
        people = mapDefinitions[this.name].people;
    buildings.forEach(function(building) {
      callback(building, building.type ? building.type : HOUSE_HEALING);
    });
    people.forEach(function(person) {
      callback(person, person.type ? person.type : PERSON_COWBOY);
    });
  };

  WorldMap.prototype.getRect = function() {
    return {
      x: 0,
      y: 0,
      width: this.size.width,
      height: this.size.height
    };
  };

  WorldMap.prototype.inBounds = function(position) {
    return position.x >= 0 && position.x < this.size.width && position.y >= 0 && position.y < this.size.height;
  };

  // note: WorldMap on window is not the same as the WorldMap function class
  window.WorldMap = {
    // expects a callback
    getMap: function(name) {
      return new WorldMap(name);
    }
  }
})();
