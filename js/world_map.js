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
                  "ttttttttt..........................ttttwww........................................wwwwwwww...........................................wwwwwwwwwwwwww...w.....",
                  "tttttttttttt........................wwwwww.......................................wwwwwww........tttttttt....................................................",
                  "tttttttt.......................wwwwwwww..ttt....................................wwww............tttttttttt..................................................",
                  "tttttt.......................wwwwwwww...tttttt...................................wwww.............tttttttt..................................................",
                  "ttttttttt.............tt..wbwwwww.......tttttt...................tt..............www.................tttttt.................................................",
                  "ttttttt........wwwwwwwwwwwwbww..........tttttt.................tttt..............wwww................tttttt.................................................",
                  "ttttwwwwwwwwwwwwwwwwwwwwww.....................................tttt...............ww.................ttttttt................................................",
                  "wwwwwwwwwwwwwwwwww.............................................tt.................ww...............tttttt...................................................",
                  "wwwwwwwwwttttttt................................................ww.www............BB............ttttttttt...................................................",
                  "tttttttttttttttttt....................................wwwwwww.wwwwwwwwwwww........ww...............tttt.....................................................",
                  "ttttttttttttttttttttttttt.....................wwwwwwwwwwwwwwwwwwwwwwwww.w.......wwww........................................................................",
                  "ttttttttttttttttttttttttttt.................wwwwwwwwwwww.www.wwttwwww...........wwwww.......................................................................",
                  "tttttttttttttttttttttttttttt.tt.............wwwwwwwwwwwww.w.....t.t.............w.wwww........................tttttttt......................................",
                  "ttttttttttttttttttttttttttttttttt...........wwwwwwwww.........tt.....tt.....mmm..wwww........................ttttttttt......................................",
                  "ttttttttttttttttttttttttttttttttttttt........wwwwwwwwwwwwww..tt...........m.mmm..wwwm...mm..................tttttttttt......................................",
                  "tttttttttttttttttttttttttttttttttt.............wwwwwwwww............t......mmmmmmwwwmmmmmmm.................tttttttttttttttttttttt..........................",
                  "ttttttttttttt....ttttttttttttttttt....................................t..m.mmmmmmwwwmmmmmmm.................tttttttttttttttttttttt..........................",
                  "tttttttttttt.....tttttttttttttttttttt..............................t.....m.mmmmmwwwwmmmmmmmmmm..............tttttttttttttttttttttt..........................",
                  "ttttttttttttt....ttttttttttttttt...tt..............................tttt..mmmmmmwwwwwmmmmmmmmmmm.............tttttttttttttttttttttt..........................",
                  "tttttttttttttttttttttttttttttttt...tt.............................t.ttttmmmmmmmwwwwwmmmmmmmmmm..............ttttttttttttttttttttt...........................",
                  "tttttttttttttttttttttttttttttttt...t..............................tmttttmmmmmmmwwwwwmmmmmmmmmmmmmmm.m.......ttttttttttttttttttt..t..........................",
                  "tttttttttttttttttttttt....ttttttttttt...........................mttmmmmmmmmmmmwwwwwwmmmmmmmmmmmmm.m.mm......tttttttttttttttttt..............................",
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

