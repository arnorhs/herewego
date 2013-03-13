(function() {

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
    start:       ["..ttttmmmm...wwwwwwwwwwww.......................ttttttttt............................wwwwwwwwwwwwwwww...........wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "..tttttmmm........wwwwwwwwwwwww.................ttttttttt............................wwwwwwwwwwwwww.............wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "...tttttt......ttttttttttttwww.......................................................wwwwwwwwwwww...............wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "..tttt............tttttttwwww..........................................................wwwwwwww.................wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  ".................ttttttwww............tttt......................mmm.................wwwwwwwwwwwww...............wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "w.....................................tttt.....................mmmmm.m...............wwwwwwwwwwwwww.............wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "w.....r.........................................................mmmmmmm...............wwwwwwwwww................wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "www...r............................................................mmmmm.............wwwwwwwwwwww...............wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "wwww..r.....tttttttttt..............................................mmmmm.............BBBBBBBBBBB...............wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "wwww..r....tttttttttttt.............................................m..mmm............wwwwwwwwwww...............wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "wwwwwwbwwwwtttttttttttt...t..................tttttt....................mmmm...........wwwwwwwwwww...............wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "mww...r..wwtttttttttttttttt.................tttttttwwwwwwwwwww..........mmm..........wwwwwwwwwwwww..............wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "mmww..r.....tttttttttttttttt................ttttttwwwwwwwww.............mm...........wwwwwwwwwwwww..............wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "mmm.m.rrrrrrrr......tttttttt................ttttttwwwwww................m..............wwwwwww.www.................wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww..",
                  "t.m.mm.......r......ttttttt...................wwwwwwwwwwwwww...............rrr.........wwwww...www.................wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww..",
                  "t...mmmm.....r..............................wwwwwwwwwwwwww.................rrr.........wwwww...www..................wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww...",
                  "tt...mm......r............................wwww.............................rrr........wwwwww..wwww.................wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww...",
                  "tttt.........r..........................wwwwww..............................r.........w..wwwwwwww..................wwww...wwwwwwwwwwwwwwwwwwwwwwwwwwwwww....",
                  "tttttt.......r.....................ttttwwwww................................r........ww..wwwwww...........................wwwwwwwwwwwwwwwwwwwwwwwww...ww....",
                  "ttttttttt....r.....................ttttwww..................................r.....wwwwwwww...........................................wwwwwwwwwwwwww...w.....",
                  "tttttttttttt.r......................wwwwww..................................r....wwwwwww........tttttttt....................................................",
                  "tttttttt.....rrrrrrrrrrrr......wwwwwwww..ttt................................r...wwww............tttttttttt..................................................",
                  "tttttt.................rr....wwwwwwww...tttttt..............................r....wwww.............tttttttt..................................................",
                  "ttttttttt.............tt..wbwwwww.......tttttt...................tt.........r....www.................tttttt.................................................",
                  "ttttttt........wwwwwwwwwwwwbww..........tttttt.................tttt.........r....wwww................tttttt.................................................",
                  "ttttwwwwwwwwwwwwwwwwwwwwww.....................................tttt.........r.....ww.................ttttttt................................................",
                  "wwwwwwwwwwwwwwwwww.............................................tt...........r.....ww...............tttttt...................................................",
                  "wwwwwwwwwttttttt................................................ww.www......rrrrrrBBrrrrrrrrr...ttttttttt...................................................",
                  "tttttttttttttttttt....................................wwwwwww.wwwwwwwwwwww........ww........r......tttt.....................................................",
                  "ttttttttttttttttttttttttt.....................wwwwwwwwwwwwwwwwwwwwwwwww.w.......wwww........r...............................................................",
                  "ttttttttttttttttttttttttttt.................wwwwwwwwwwww.www.wwttwwww...........wwwww.......r...............................................................",
                  "tttttttttttttttttttttttttttt.tt.............wwwwwwwwwwwww.w.....t.t.............w.wwww......r.................tttttttt......................................",
                  "ttttttttttttttttttttttttttttttttt...........wwwwwwwww.........tt.....tt.....mmm..wwww.......rrrrrrrrrrrrrr...ttttttttt......................................",
                  "ttttttttttttttttttttttttttttttttttttt........wwwwwwwwwwwwww..tt...........m.mmm..wwwm...mm...............r..tttttttttt......................................",
                  "tttttttttttttttttttttttttttttttttt.............wwwwwwwww............t......mmmmmmwwwmmmmmmm..............r..tttttttttttttttttttttt..........................",
                  "ttttttttttttt....ttttttttttttttttt....................................t..m.mmmmmmwwwmmmmmmm..............r..tttttttttttttttttttttt..........................",
                  "tttttttttttt.....tttttttttttttttttttt..............................t.....m.mmmmmwwwwmmmmmmmmmm...........r..tttttttttttttttttttttt..........................",
                  "ttttttttttttt....ttttttttttttttt...tt..............................tttt..mmmmmmwwwwwmmmmmmmmmmm..........r..tttttttttttttttttttttt..........................",
                  "tttttttttttttttttttttttttttttttt...tt.............................t.ttttmmmmmmmwwwwwmmmmmmmmmm...........r..ttttttttttttttttttttt...........................",
                  "tttttttttttttttttttttttttttttttt...t..............................tmttttmmmmmmmwwwwwmmmmmmmmmmmmmmm.m....rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr.........",
                  "tttttttttttttttttttttt....ttttttttttt...........................mttmmmmmmmmmmmwwwwwwmmmmmmmmmmmmm.m.mm......tttttttttttttttttt....................r.........",
                  "ttttttttttttttttttttt.....tttttttttt...........................tmmtmmmmmmmmmmwwwwwmmmmmmmmmmmmmmmmmm.m.......ttttttttttttttttt.t............................",
                  "ttttttttttttttttttttt.....ttttttttttt...........t.........t....ttt.mmmmmmmmmmwwwwwmmmmmmmmmmmmmmmmmmmmm.......tttttttttttttttt.......ttttttttttttt.ttttttt..",
                  "ttttttttttttttttttttt....ttttt....ttt..................t........mmtm.mmmmmmmmwwwwmmmmmmm.mmmmmmmmmmmmmm.........ttttttttttttttt......t...t.....t.t.......t..",
                  "ttttt..........ttt.tt..t..........t.t............................tt...mmmmmwwwwwwmmmmm......mmmmmmmmmmm.........tttttttttttttt.......t.t.t.t.t.t.ttttt.t.t..",
                  ".........ttt.......ttttt....................t..t................t.........mwwwwwwmmmm........mmmmmmmmmmmm.......ttttttttttttttt......t.t.t.t.t.t.....t.t.t..",
                  "...........tttttttt..........................t............t............m..wwwwwmmmmmmm.........mmmm...mmm.......tttttttttttttttttt...t.t.t.t.t.ttttt.t.t.t..",
                  ".........................................................................mwwwww..mmm..................mm...........ttttttttttttt.....t.t...t.t.........t.t..",
                  ".............ww...............................tt.t.........t..............www.....................mmmmmm..............tttttt.........t.t.ttttttttttttttt.t..",
                  "........t.....w.................................t..................t......www....................mmmmmmm.............................t.t.t...............t..",
                  "..............................www................t................t.....wwww......ttttt............mmm.......ww............ttttttttttt.t.ttttttttttttttt.t..",
                  "....w..mt.....m...t...........wwwwwwwww..............t..................wtww......ttttt......................ww............t...........t.t...............t..",
                  "m.....mm....t................wwwwwwwww.................t........tt..ttt.wtwww.....ttttt......................ww............tttttttttttttttttttttt.tttttttt..",
                  "m...w....t.................t.wwwwwwwww...tt.......................t.ttt.wtwww.....ttttt......................ww............t.............................t..",
                  "m..............t.........ttttwwwwwwwwwtttttt.........t...........t..ttt.wtww......ttttt......................ww..........ttt.ttttttttttttttttttttttttttttt..",
                  "m...........t.............ttttwwwwwwwwttttt...............t.......ttttt.twwww.....ttttt.....................www..........t.t.t.................t.t.......t..",
                  "mm..m...........t........ttttwwwwwwwwwtttttt......t...tt..........tttt..twwwww....ttttt.....................www..........t.t.t.t..tttttttttt.t.t.t.......t..",
                  "mm..m.................tttttttttwwwtwwtttttttt.....................ttt...tt.wwww...ttttt.....................www..........t.t.t.t..t....t.t...t.t.t.ttttt.t..",
                  "mmmm..................ttttttttttwtttttttttt......t....................tttt.wwwww..ttttt....................wwww..........t.t.ttttttttt.t.t...t.........t.t..",
                  "mmm.....mm..m.........tttttttttttttttttttttt..........................tttttwwwwtttttttt....................wwww..........t.t.......t...t.tttttttt.tttt.t.t..",
                  "mmmmmmmmmm...m........ttt.......ttt.....tttt...............................wwwwww..........................ww............t.tttttt.tttt.t.....t.......t.t.t..",
                  "mmmmmmmmm.mmm..............................................................wwww............................ww............t.t...t.........ttt.t.ttttt.t.t.t..",
                  "mmmmmmmmmmm.mm...........................................................wwwww............................www............t.t.t.t.ttttttttt.ttt.t.....t.t.t..",
                  "mmmmmmmmmmm...mm.........................................................wwwwwwwwwww......................www............t.t.t.t.............t.t.ttttt.t.t..",
                  "mmmmmmmmmmmmmmmmm.......................................................wwwwwwwww........................................t...t....tttttttttt...t.......t.t..",
                  "mmmmmmmmmmmmmmmmmm........................................................wwwwwwwwww.....................................tttttttttt........ttttttttttttt....",
    ]};

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

  WorldMap.prototype.getRect = function() {
    return {
      x: 0,
      y: 0,
      width: this.size.x,
      height: this.size.y
    };
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

