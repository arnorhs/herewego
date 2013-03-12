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
    start:       ["..ttttmmmm...wwwwwwwwwwww.......................ttttttttt............................wwwwwwwwwwwwwwww...........wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "..tttttmmm........wwwwwwwwwwwww.................ttttttttt............................wwwwwwwwwwwwww.............wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "...tttttt......ttttttttttttwww.......................................................wwwwwwwwwwww...............wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "..tttt............tttttttwwww..........................................................wwwwwwww.................wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  ".................ttttttwww............tttt......................mmm.................wwwwwwwwwwwww...............wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "w.....................................tttt.....................mmmmm.m...............wwwwwwwwwwwwww.............wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "w...............................................................mmmmmmm...............wwwwwwwwww................wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "www................................................................mmmmm.............wwwwwwwwwwww...............wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "wwww........tttttttttt..............................................mmmmm.............BBBBBBBBBBB...............wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "wwww.......tttttttttttt.............................................m..mmm............wwwwwwwwwww...............wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "wwwwwwbwwwwtttttttttttt...t..................tttttt....................mmmm...........wwwwwwwwwww...............wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "mww......wwtttttttttttttttt.................tttttttwwwwwwwwwww..........mmm..........wwwwwwwwwwwww..............wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "mmww........tttttttttttttttt................ttttttwwwwwwwww.............mm...........wwwwwwwwwwwww..............wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "mmm.m...............tttttttt................ttttttwwwwww................m..............wwwwwww.www.................wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww..",
                  "t.m.mm..............ttttttt...................wwwwwwwwwwwwww...........................wwwww...www.................wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww..",
                  "t...mmmm....................................wwwwwwwwwwwwww.............................wwwww...www..................wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww...",
                  "tt...mm...................................wwww........................................wwwwww..wwww.................wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww...",
                  "tttt....................................wwwwww........................................w..wwwwwwww..................wwww...wwwwwwwwwwwwwwwwwwwwwwwwwwwwww....",
                  "tttttt.............................ttttwwwww.........................................ww..wwwwww...........................wwwwwwwwwwwwwwwwwwwwwwwww...ww....",
                  "ttttttttt..........................ttttwww...........................................................................................wwwwwwwwwwwwww...w.....",
                  "tttttttttttt........................wwwwww......................................................tttttttt....................................................",
                  "tttttttt.......................wwwwwwww..ttt....................................................tttttttttt..................................................",
                  "tttttt.......................wwwwwwww...tttttt....................................................tttttttt..................................................",
                  "ttttttttt.............tt..wbwwwww.......tttttt...................tt..................................tttttt.................................................",
                  "ttttttt........wwwwwwwwwwwwbww..........tttttt.................tttt..................................tttttt.................................................",
                  "ttttwwwwwwwwwwwwwwwwwwwwww.....................................tttt..................................ttttttt................................................",
                  "wwwwwwwwwwwwwwwwww.............................................tt..................................tttttt...................................................",
                  "wwwwwwwwwttttttt................................................................................ttttttttt...................................................",
                  "tttttttttttttttttt....................................wwwwwwwwwwwwwwwwwww..........................tttt.....................................................",
                  "ttttttttttttttttttttttttt.....................wwwwwwwwwwwwwwwwwwwwwwwwwww...................................................................................",
                  "ttttttttttttttttttttttttttt.................wwwwwwwwwwwwwwwwwwwwwwwww.......................................................................................",
                  "tttttttttttttttttttttttttttt.tt.............wwwwwwwwwwwwwww...................................................tttttttt......................................",
                  "ttttttttttttttttttttttttttttttttt...........wwwwwwwww.......................mmm..............................ttttttttt......................................",
                  "ttttttttttttttttttttttttttttttttttttt........wwwwwwwwwwwwww...............m.mmm...mmm...mm..................tttttttttt......................................",
                  "tttttttttttttttttttttttttttttttttt.............wwwwwwwww...................mmmmmm...mmmmmmm.................tttttttttttttttttttttt..........................",
                  "ttttttttttttt....ttttttttttttttttt.......................................m.mmmmmmmmmmmmmmmm.................tttttttttttttttttttttt..........................",
                  "tttttttttttt.....tttttttttttttttttttt....................................m.mmmmmmmmmmmmmmmmmmm..............tttttttttttttttttttttt..........................",
                  "ttttttttttttt....ttttttttttttttt...tt....................................mmmmmmmmmmmmmmmmmmmmmm.............tttttttttttttttttttttt..........................",
                  "tttttttttttttttttttttttttttttttt...tt...............................mmmmmmmmmmmmmmmmmmmmmmmmmm..............ttttttttttttttttttttt...........................",
                  "tttttttttttttttttttttttttttttttt...t..............................mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm.m.......ttttttttttttttttttt..t..........................",
                  "tttttttttttttttttttttt....ttttttttttt...........................mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm.m.mm......tttttttttttttttttt..............................",
                  "ttttttttttttttttttttt.....tttttttttt............................mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm.m.......ttttttttttttttttt.t............................",
                  "ttttttttttttttttttttt.....ttttttttttt..............................mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm.......tttttttttttttttt.......ttttttttttttt.ttttttt..",
                  "ttttttttttttttttttttt....ttttt....ttt...........................mm.m.mmmmmmmmmmmmmmmmmmm.mmmmmmmmmmmmmm.........ttttttttttttttt......t...t.....t.t.......t..",
                  "ttttt..........ttt.tt..t..........t.t.................................mmmmmmmmmmmmmmmm......mmmmmmmmmmm.........tttttttttttttt.......t.t.t.t.t.t.ttttt.t.t..",
                  ".........ttt.......ttttt..................................................mmmmmmmmmmm........mmmmmmmmmmmm.......ttttttttttttttt......t.t.t.t.t.t.....t.t.t..",
                  "...........tttttttt....................................................m.....mmmmmmmmm.........mmmm...mmm.......tttttttttttttttttt...t.t.t.t.t.ttttt.t.t.t..",
                  ".........................................................................m.mm.m..mmm..................mm...........ttttttttttttt.....t.t...t.t.........t.t..",
                  "..................................................................................................mmmmmm..............tttttt.........t.t.ttttttttttttttt.t..",
                  ".................................................................................................mmmmmmm.............................t.t.t...............t..",
                  "..............................www.....................................tttt........ttttt............mmm.......ww............ttttttttttt.t.ttttttttttttttt.t..",
                  "..............................wwwwwwwww...............................tttt........ttttt......................ww............t...........t.t...............t..",
                  "m............................wwwwwwwww................................tttt........ttttt......................ww............tttttttttttttttttttttt.tttttttt..",
                  "m..........................t.wwwwwwwww...tt...........................tttt........ttttt......................ww............t.............................t..",
                  "m........................ttttwwwwwwwwwtttttt..........................tttt........ttttt......................ww..........ttt.ttttttttttttttttttttttttttttt..",
                  "m.........................ttttwwwwwwwwttttt...........................tttt........ttttt.....................www..........t.t.t.................t.t.......t..",
                  "mm..m....................ttttwwwwwwwwwtttttt..........................tttt........ttttt.....................www..........t.t.t.t..tttttttttt.t.t.t.......t..",
                  "mm..m.................tttttttttwwwtwwtttttttt.........................tttt........ttttt.....................www..........t.t.t.t..t....t.t...t.t.t.ttttt.t..",
                  "mmmm..................ttttttttttwtttttttttt...........................tttt........ttttt....................wwww..........t.t.ttttttttt.t.t...t.........t.t..",
                  "mmm.....mm..m.........tttttttttttttttttttttt..........................ttttttttttttttttt....................wwww..........t.t.......t...t.tttttttt.tttt.t.t..",
                  "mmmmmmmmmm...m........ttt.......ttt.....tttt...............................................................ww............t.tttttt.tttt.t.....t.......t.t.t..",
                  "mmmmmmmmm.mmm..............................................................................................ww............t.t...t.........ttt.t.ttttt.t.t.t..",
                  "mmmmmmmmmmm.mm............................................................................................www............t.t.t.t.ttttttttt.ttt.t.....t.t.t..",
                  "mmmmmmmmmmm...mm..........................................................................................www............t.t.t.t.............t.t.ttttt.t.t..",
                  "mmmmmmmmmmmmmmmmm........................................................................................................t...t....tttttttttt...t.......t.t..",
                  "mmmmmmmmmmmmmmmmmm.......................................................................................................tttttttttt........ttttttttttttt....",
    ]};

  var types = {
    ".": GRASS,
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

