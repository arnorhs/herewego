(function() {

  // Map data
  //
  // g: grass
  // t: trees
  // w: water
  // b: vertical bridge
  // B: horizontal bridge
  // m: mountain
  var mapDefinitions = {
    start:       ["ggttttmmmmgggwwwwwwwwwwwwgggggggggggggggggggggggtttttttttggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwgggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "ggtttttmmmggggggggwwwwwwwwwwwwwgggggggggggggggggtttttttttggggggggggggggggggggggggggggwwwwwwwwwwwwwwgggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "gggttttttggggggttttttttttttwwwgggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwgggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "ggttttggggggggggggtttttttwwwwggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwgggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "gggggggggggggggggttttttwwwggggggggggggttttggggggggggggggggggggggmmmgggggggggggggggggwwwwwwwwwwwwwgggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "wgggggggggggggggggggggggggggggggggggggttttgggggggggggggggggggggmmmmmgmgggggggggggggggwwwwwwwwwwwwwwgggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "wgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggmmmmmmmgggggggggggggggwwwwwwwwwwggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "wwwggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggmmmmmgggggggggggggwwwwwwwwwwwwgggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "wwwwggggggggttttttttttggggggggggggggggggggggggggggggggggggggggggggggmmmmmgggggggggggggBBBBBBBBBBBgggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "wwwwgggggggttttttttttttgggggggggggggggggggggggggggggggggggggggggggggmggmmmggggggggggggwwwwwwwwwwwgggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "wwwwwwbwwwwttttttttttttgggtggggggggggggggggggttttttggggggggggggggggggggmmmmgggggggggggwwwwwwwwwwwgggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "mwwggggggwwttttttttttttttttgggggggggggggggggtttttttwwwwwwwwwwwggggggggggmmmggggggggggwwwwwwwwwwwwwggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "mmwwggggggggttttttttttttttttggggggggggggggggttttttwwwwwwwwwgggggggggggggmmgggggggggggwwwwwwwwwwwwwggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "mmmgmgggggggggggggggttttttttggggggggggggggggttttttwwwwwwggggggggggggggggmggggggggggggggwwwwwwwgwwwgggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwgg",
                  "tgmgmmggggggggggggggtttttttgggggggggggggggggggwwwwwwwwwwwwwwgggggggggggggggggggggggggggwwwwwgggwwwgggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwgg",
                  "tgggmmmmggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwgggggggggggggggggggggggggggggwwwwwgggwwwggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwggg",
                  "ttgggmmgggggggggggggggggggggggggggggggggggwwwwggggggggggggggggggggggggggggggggggggggggwwwwwwggwwwwgggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwggg",
                  "ttttggggggggggggggggggggggggggggggggggggwwwwwwggggggggggggggggggggggggggggggggggggggggwggwwwwwwwwggggggggggggggggggwwwwgggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg",
                  "ttttttgggggggggggggggggggggggggggggttttwwwwwgggggggggggggggggggggggggggggggggggggggggwwggwwwwwwgggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwgggwwgggg",
                  "tttttttttggggggggggggggggggggggggggttttwwwgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwgggwggggg",
                  "ttttttttttttggggggggggggggggggggggggwwwwwwggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttgggggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "ttttttttgggggggggggggggggggggggwwwwwwwwggtttggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttgggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "ttttttgggggggggggggggggggggggwwwwwwwwgggttttttggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttgggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "tttttttttgggggggggggggttggwbwwwwwgggggggttttttgggggggggggggggggggttggggggggggggggggggggggggggggggggggttttttggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "tttttttggggggggwwwwwwwwwwwwbwwggggggggggttttttgggggggggggggggggttttggggggggggggggggggggggggggggggggggttttttggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "ttttwwwwwwwwwwwwwwwwwwwwwwgggggggggggggggggggggggggggggggggggggttttggggggggggggggggggggggggggggggggggtttttttgggggggggggggggggggggggggggggggggggggggggggggggg",
                  "wwwwwwwwwwwwwwwwwwgggggggggggggggggggggggggggggggggggggggggggggttggggggggggggggggggggggggggggggggggttttttggggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "wwwwwwwwwtttttttggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtttttttttggggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "ttttttttttttttttttggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwggggggggggggggggggggggggggttttggggggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "tttttttttttttttttttttttttgggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "tttttttttttttttttttttttttttgggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "ttttttttttttttttttttttttttttgttgggggggggggggwwwwwwwwwwwwwwwgggggggggggggggggggggggggggggggggggggggggggggggggggttttttttgggggggggggggggggggggggggggggggggggggg",
                  "tttttttttttttttttttttttttttttttttgggggggggggwwwwwwwwwgggggggggggggggggggggggmmmggggggggggggggggggggggggggggggtttttttttgggggggggggggggggggggggggggggggggggggg",
                  "tttttttttttttttttttttttttttttttttttttggggggggwwwwwwwwwwwwwwgggggggggggggggmgmmmgggmmmgggmmggggggggggggggggggttttttttttgggggggggggggggggggggggggggggggggggggg",
                  "ttttttttttttttttttttttttttttttttttgggggggggggggwwwwwwwwwgggggggggggggggggggmmmmmmgggmmmmmmmgggggggggggggggggttttttttttttttttttttttgggggggggggggggggggggggggg",
                  "tttttttttttttggggtttttttttttttttttgggggggggggggggggggggggggggggggggggggggmgmmmmmmmmmmmmmmmmgggggggggggggggggttttttttttttttttttttttgggggggggggggggggggggggggg",
                  "ttttttttttttgggggttttttttttttttttttttggggggggggggggggggggggggggggggggggggmgmmmmmmmmmmmmmmmmmmmggggggggggggggttttttttttttttttttttttgggggggggggggggggggggggggg",
                  "tttttttttttttggggtttttttttttttttgggttggggggggggggggggggggggggggggggggggggmmmmmmmmmmmmmmmmmmmmmmgggggggggggggttttttttttttttttttttttgggggggggggggggggggggggggg",
                  "ttttttttttttttttttttttttttttttttgggttgggggggggggggggggggggggggggggggmmmmmmmmmmmmmmmmmmmmmmmmmmggggggggggggggtttttttttttttttttttttggggggggggggggggggggggggggg",
                  "ttttttttttttttttttttttttttttttttgggtggggggggggggggggggggggggggggggmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmgmgggggggtttttttttttttttttttggtgggggggggggggggggggggggggg",
                  "ttttttttttttttttttttttggggtttttttttttgggggggggggggggggggggggggggmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmgmgmmggggggttttttttttttttttttgggggggggggggggggggggggggggggg",
                  "tttttttttttttttttttttgggggttttttttttggggggggggggggggggggggggggggmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmgmgggggggtttttttttttttttttgtgggggggggggggggggggggggggggg",
                  "tttttttttttttttttttttgggggtttttttttttggggggggggggggggggggggggggggggmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmgggggggttttttttttttttttgggggggggggggggggggggggggggggg",
                  "tttttttttttttttttttttggggtttttggggtttgggggggggggggggggggggggggggmmgmgmmmmmmmmmmmmmmmmmmmgmmmmmmmmmmmmmmgggggggggtttttttttttttttggggggggggggggggggggggggggggg",
                  "tttttggggggggggtttgttggtggggggggggtgtgggggggggggggggggggggggggggggggggmmmmmmmmmmmmmmmmggggggmmmmmmmmmmmgggggggggttttttttttttttgggggggggggggggggggggggggggggg",
                  "gggggggggtttgggggggtttttggggggggggggggggggggggggggggggggggggggggggggggggggmmmmmmmmmmmggggggggmmmmmmmmmmmmgggggggtttttttttttttttggggggggggggggggggggggggggggg",
                  "gggggggggggttttttttggggggggggggggggggggggggggggggggggggggggggggggggggggmgggggmmmmmmmmmgggggggggmmmmgggmmmgggggggttttttttttttttttttgggggggggggggggggggggggggg",
                  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggmgmmgmggmmmggggggggggggggggggmmgggggggggggtttttttttttttgggggggggggggggggggggggggggg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggmmmmmmggggggggggggggttttttgggggggggggggggggggggggggggggggg",
                  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggmmmmmmmgggggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "ggggggggggggggggggggggggggggggwwwgggggggggggggggggggggggggggggggggggggttttggggggggtttttggggggggggggmmmgggggggwwggggggggggggggggggggggggggggggggggggggggggggg",
                  "ggggggggggggggggggggggggggggggwwwwwwwwwgggggggggggggggggggggggggggggggttttggggggggtttttggggggggggggggggggggggwwggggggggggggggggggggggggggggggggggggggggggggg",
                  "mggggggggggggggggggggggggggggwwwwwwwwwggggggggggggggggggggggggggggggggttttggggggggtttttggggggggggggggggggggggwwggggggggggggggggggggggggggggggggggggggggggggg",
                  "mggggggggggggggggggggggggggtgwwwwwwwwwgggttgggggggggggggggggggggggggggttttggggggggtttttggggggggggggggggggggggwwggggggggggggggggggggggggggggggggggggggggggggg",
                  "mggggggggggggggggggggggggttttwwwwwwwwwttttttggggggggggggggggggggggggggttttggggggggtttttggggggggggggggggggggggwwggggggggggtttgtttttttttttttttttttttttttttttgg",
                  "mgggggggggggggggggggggggggttttwwwwwwwwtttttgggggggggggggggggggggggggggttttggggggggtttttgggggggggggggggggggggwwwggggggggggtgtgtgggggggggggggggggtgtgggggggtgg",
                  "mmggmggggggggggggggggggggttttwwwwwwwwwttttttggggggggggggggggggggggggggttttggggggggtttttgggggggggggggggggggggwwwggggggggggtgtgtgtggttttttttttgtgtgtgggggggtgg",
                  "mmggmgggggggggggggggggtttttttttwwwtwwttttttttgggggggggggggggggggggggggttttggggggggtttttgggggggggggggggggggggwwwggggggggggtgtgtgtggtggggtgtgggtgtgtgtttttgtgg",
                  "mmmmggggggggggggggggggttttttttttwttttttttttgggggggggggggggggggggggggggttttggggggggtttttggggggggggggggggggggwwwwggggggggggtgtgtttttttttgtgtgggtgggggggggtgtgg",
                  "mmmgggggmmggmgggggggggttttttttttttttttttttttggggggggggggggggggggggggggtttttttttttttttttggggggggggggggggggggwwwwggggggggggtgtgggggggtgggtgttttttttgttttgtgtgg",
                  "mmmmmmmmmmgggmggggggggtttgggggggtttgggggttttgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwggggggggggggtgttttttgttttgtgggggtgggggggtgtgtgg",
                  "mmmmmmmmmgmmmggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwggggggggggggtgtgggtgggggggggggggtgtttttgtgtgtgg",
                  "mmmmmmmmmmmgmmggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwggggggggggggtgtgtgtgtttttttttttttgtgggggtgtgtgg",
                  "mmmmmmmmmmmgggmmggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwggggggggggggtgtgtgtgggggggggggggtgtgtttttgtgtgg",
                  "mmmmmmmmmmmmmmmmmggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtgggtggggttttttttttgggtgggggggtgtgg",
                  "mmmmmmmmmmmmmmmmmmgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtttttttttttttttttttttttttttttttgtgg",
    ]};

  var types = {
    g: GRASS,
    t: TREE,
    w: WATER,
    b: BRIDGE_V,
    B: BRIDGE_H,
    m: MOUNTAIN
  };
  function squareToType(square) {
    return types[square];
  }

  // Eventually the map will probably also be managed somewhere else in the
  // game engine - especially if it will become mutable
  function WorldMap(name) {
    this.name = name;
    this.size = {};
  }

  WorldMap.prototype.getViews = function(callback) {
    var worldMap = mapDefinitions[this.name];
    var yl = worldMap.length;
    var xl = worldMap[0].length; // assuming each row is equally long for now

    // grab size of map from height and first column width
    this.size = {x: xl, y: yl};

    // loop through each tile
    for (var y = 0; y < yl; y++) {
      for (var x = 0; x < xl; x++) {
        callback({x: x, y: y}, squareToType(worldMap[y][x]));
      }
    }
  };

  WorldMap.prototype.inBounds = function(position) {
    return position.x >= 0 && position.x < this.size.x && position.y >= 0 && position.y < this.size.y;
  };

  // note: WorldMap on window is not the same as the WorldMap function class
  window.WorldMap = {
    // expects a callback
    getMap: function(name) {
      return new WorldMap(name);
    },
    create: function(callback) {
      readMapDefinition(worldMap, callback);
    }
  }
})();

