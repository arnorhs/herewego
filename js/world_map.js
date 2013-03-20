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
    start: {
      map:       ["wwttttmmmmwwwwwwwwwwwwwwwtttttttttttttttttttttttttttttmmmmmmmmmmmmmmmmmmmmmwwwwwwwwwwwwwwwwwwwwwwwwwwmmmmmmmmmmmwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "wwtttttmmmwwww....wwwwwwwwwwwwwtttt.......ttttttttttttttt.mmmmmmmmmmm............wwwwwwwwwwwwwwwwww..mmmmmmmm...wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "wwwtttttt......ttttttttttttwww....................ttttt......mmmm....................wwwwwwwwwwww..mmmmmmm......wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "w.tttt............tttttttwwww................................mm........................wwwwwwww....mmmmmmmmmm...wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "w................ttttttwww............tttt......................mmm.................wwwwwwwwwwwww...tttmmmmm....wwwwwwww...wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "w.....................................tttt.....................mmmmm.m...............wwwwwwwwwwwwww......mmmmm..wwwwwwwwww...wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "w.....r.........................................................mmmmmmm...............wwwwwwwwww.....rrrrttmmmm..wwwwwwwwww.wwwwwwwww...wwwwwwwwwwwwwwwwwwww",
                  "www...r............................................................mmmmm.............wwwwwwwwwwww....rt.rttmmmm...wwwwwwwwwwwwwwwwww.....wwwwwwwwwwwwwwwwwww",
                  "wwww..r.....tttttttttt..............................................mmmmm..........rrrBBBBBBBBBBBrrrrrt.rtt.rrrrrrrBBBBBBBBBBBBBBBBrrr...wwwwwwwww.wwwwwwwww",
                  "wwww..r....tttttttttttt.............................................m..mmm............wwwwwwwwwww.....t.r.t.r.....wwwwwwwwwwwwwwwwww.....wwwwwwww.wwwwwwwwww",
                  "wwwwwwbwwwwtttttttttttt...t..................tttttt....................mmmm...........wwwwwwwwwwwtt..tttr.ttr...wwwwwwwwwwwwwwwwwwwww...wwwwwwwwwwwwwwwwwwww",
                  "mww...r..wwtttttttttttttttt.................tttttttwwwwwwwwwww..........mmm..........wwwwwwwwwwwww...tttr.ttr...wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "mmww..r.....tttttttttttttttt................ttttttwwwwwwwww.............mm...........wwwwwwwwwwwww.....tr.t.r...wwwwwwwwwwwwwwww.wwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "mmm.m.rrrrrrrr......tttttttt................ttttttwwwwww................m..............wwwwwww.www.....trrrrr......wwwwwwwwwwww....wwwwwwwwwwwww..wwwwwwww..",
                  "t.m.mm...m...r......ttttttt...................wwwwwwwwwwwwww...............rrr.........wwwww...www.....tt..........wwwwwwwwwwwww.w.wwwwwwwwwwwww.wwwwwwwww..",
                  "t...mmmmmmmm.r...m..........................wwwwwwwwwwwwww.................rrr.........wwwww...www....ttttt.......mmwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww...",
                  "tt...mm.mmm..r..mmmm......................wwww.............................rrr........wwwwww..wwww..ttttt......m.mmwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww...",
                  "tttt.....m...r..mmmm....................wwwwww..............................r.........w..wwwwwwww.ttttt..m.mmmmmmmmwwww...wwwwwwwwwww.w.wwwwwwwwwwwwwwww....",
                  "tttttt.......r.m.m.m...mmm.........ttttwwwww....tttttt......................r........ww..wwwwww.mmmmmmmmmmmmmmmmmm........wwwwwwwwww.....wwwwwwwwww...ww....",
                  "ttttttttt....r.mmm....mmm..........ttttwww....ttttt.........................r.....wwwwwwww.....mmmmmm..mmmmm.m.mm..........................wwwwwwww...w.....",
                  "tttttttttttt.r......................wwwwww...tttt...........................r....wwwwwww........tttttttt..m.....m...........................................",
                  "tttttttt.....rrrrrrrrrrrr......wwwwwwww..tttttt.............................r...wwww............tttttttttt..................................rrrrr...........",
                  "tttttt.................rr....wwwwwwww...tttttt..............................r....wwww.............tttttttt....................................r.............",
                  "ttttttttt.........www.trr.wwwwwww.......tttttt...................tt.........r....www.................tttttt...................................r....ttt......",
                  "ttttttt........wwwwwwwwbbwwwww..........tttttt.................tttt.........r....wwww................tttttt.........tttt............rrrrrrrrrrrrrrrrrrr.....",
                  "ttttwwwwwwwwwwwwwwwwwwwbbw.....................................tttt.........r.....ww.................ttttttt.......tttt..t..........r.........r..r..r.r.....",
                  "wwwwwwwwwwwwwwwwww.....rr......................................tt...........r.....ww...............tttttt..........t.tttt...........rr....ww..r..r....rt..t.",
                  "wwwwwwwwwttttttt.......rrrrrrrrrrrrrrrrr........................ww.www......rrrrrrBBrrrrrrrrr...ttttttttt........t....t....t........r.....ww.....r....rtt.t.",
                  "tttttttttttttttttt.....................r..............wwwwwww.wwwwwwwwwwww..r.....ww........r......tttt..rrrrrrrrrrrrrrrrrrrrrrrrrrrr.................rtttt.",
                  "ttttttttttttttttttttttttt..............r......wwwwwwwwwwwwwwwwwwwwwwwww.w...r...wwww........r............r.........t.....ttt.t......r.r...............rtttt.",
                  "ttttttttttttttttttttttttttt............r....wwwwwwwwwwww.www.wwttwwww.......r...wwwww.......r............r.......t..tttttt..........rrrrrrr...........rt.t..",
                  "tttttttttttttttttttttttttttt.tt........r....wwwwwwwwwwwww.w.....t.t.............w.wwww......r............r....tttttttt..............r.................r.....",
                  "ttttttttttttttttttttttttttttttttt......r....wwwwwwwww.........tt.....tt.....mmm..wwww.......rrrrrrrrrrrrrr...ttttttttt..............rrrrrrrrrrrrrrrrrrr.....",
                  "ttttttttttttttttttttttttttttttttttttt..r.....wwwwwwwwwwwwww..tt...........m.mmm..wwwm...mm...............r..tttttttttt...................wtttwwwttt.........",
                  "tttttttttttttttttttttttttttttttttt.....r.......wwwwwwwww............t......mmmmmmwwwmmmmmmm..............r..tttttttttttttttttttttt......wwwwwwwwww..........",
                  "ttttttttttttt....ttttttttttttttttt.....r...........................r..t..m.mmmmmmwwwmmmmmmm..............r..tttttttttttttttttttttt.....wwwwwwwwwwwwwwww.....",
                  "tttttttttttt.....tttttttttttttttttttt..rrrrrrrrrrrrrrrrrrrrrrrrrrrrtrrrr.m.mmmmmwwwwmmmmmmmmmm...........r..tttttttttttttttttttttt....wwwwwwwwwwwwww........",
                  "ttttttttttttt....ttttttttttttttt...tt..r...........................tttt..mmmmmmwwwwwmmmmmmmmmmm..........r..tttttttttttttttttttttt........wwwwwww...........",
                  "tttttttttttttttttttttttttttttttt...tt..r..........................t.ttttmmmmmmmwwwwwmmmmmmmmmm...........r..ttttttttttttttttttttt...........................",
                  "tttttttttttttttttttttttttttttttt...t...r..........................tmttttmmmmmmmwwwwwmmmmmmmmmmmmmmm.m....rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr.........",
                  "tttttttttttttttttttttt....ttttttttttt..r........................mttmmmmmmmmmmmwwwwwwmmmmmmmmmmmmm.m.mm......tttttttttttttttttt....................r.........",
                  "ttttttttttttttttttttt.....tttttttttt...rr......................tmmtmmmmmmmmmmwwwwwmmmmmmmmmmmmmmmmmm.m.......ttttttttttttttttt.t............................",
                  "ttttttttttttttttttttt.....ttttttttttt..r........t.........t....ttt.mmmmmmmmmmwwwwwmmmmmmmmmmmmmmmmmmmmm.......tttttttttttttttt.......ttttttttttttt.ttttttt..",
                  "ttttttttttttttttttttt....ttttt....ttt..r...............t........mmtm.mmmmmmmmwwwwmmmmmmm.mmmmmmmmmmmmmm.........ttttttttttttttt......t...t.....t.t.......t..",
                  "ttttt..........ttt.tt..t..........t.t..r.........................tt...mmmmmwwwwwwmmmmm......mmmmmmmmmmm....r....tttttttttttttt.......t.t.t.t.t.t.ttttt.t.t..",
                  "m........ttt.......ttttt...............r....t..t................t.........mwwwwwwmmmm........mmmmmmmmmmmm..r....ttttttttttttttt......t.t.t.t.t.t.....t.t.t..",
                  "m..........tttttttt....................r.....t............t............m..wwwwwmmmmmmm.........mmmm...mmm..r....tttttttttttttttttt...t.t.t.t.t.ttttt.t.t.t..",
                  "m......................................r.................................mwwwww..mmm..................mm...r.......ttttttttttttt.....t.t...t.t.........t.t..",
                  "mm.........wwww...............................tt.t.........t..............www.....................mmmmmm..............tttttt.........t.t.ttttttttttttttt.t..",
                  "mm......t....wwww...............................t..................t......www....................mmmmmmm.............................t.t.t...............t..",
                  "mmm.m....mmmm.................www................t................t.....wwww......ttttt............mmm.....r..w............ttttttttttt.t.ttttttttttttttt.t..",
                  "mmm.mm.mtm..m.m...t...........wwwwwwwww...........rrrrrrr...............wtww.....tttttt....................r..w............t...........t.t...............t..",
                  "mmmmmmmm.m..m................wwwwwwwww............rrrrrrr.......tt..ttt.wtwww....ttttttt...................r..ww...........tttttttttttttttttttttt.tttttttt..",
                  "m.mmmmm..m..m..............t.wwwwwwwww...tt.......rrrrrrr.........t.ttt.wtwww...tttttttt.........rrrrrrrrrrr.www...........t.............................t..",
                  "m..m..mmmmm....t.........ttttwwwwwwwwwtttttt......rrrrrrr........t..ttt.wtww....tttttttt.........r...........www.........ttt.ttttttttttttttttttttttttttttt..",
                  "m.....m.....t.............ttttwwwwwwwwttttt..........r....t.......ttttt.twwww....ttttttt.........r..........wwww.........t.t.t.................t.t.......t..",
                  "mm..m.m.mmmmmmm.t........ttttwwwwwwwwwtttttt......t..rtt..........tttt..twwwww....tttttt.........r..........wwww.........t.t.t.t..tttttttttt.t.t.t.......t..",
                  "mm..m.m.m.mmmm........tttttttttwwwtwwtttttttt........r............ttt...tt.wwww...ttttt..........r..........wwww.........t.t.t.t..t....t.t...t.t.t.ttttt.t..",
                  "mmmm..m....mmmm.......ttttttttttwtttttttttt......t...r................tttt.wwwww..ttttm...m......r.........wwww..........t.t.ttttttttt.t.t...t.........t.t..",
                  "mmm.....mm..m........t.....ttttttttttttttttt.........r................tttttwwwwtttttttt.mm.......r.........wwww..........t.t.......t...t.tttttttt.tttt.t.t..",
                  "mmmmmmmmmm...m......t..tt.......ttt.....tttt.........rt........t...........wwwwww.....m.mmmm.....r.........ww......tt....t.tttttt.tttt.t.....t.......t.t.t..",
                  "mmmmmmmmmmmmm.........t...t.....tt..............rrrrrrrrrrrrrrrrrrrrrrrrrrrBBBrrrrrrr..mmmmmm....r.........ww.....tttt...t.t...t.........ttt.t.ttttt.t.t.t..",
                  "mmmmmmmmmmmmmmmmm...........t...tt..............r........................wwwww......r.m.mmmmm.m..r........www....tttt....t.t.t.t.ttttttttt.ttt.t.....t.t.t..",
                  "mmmmmmmmmmm...mm.........t.t..t.......rrrrrrrrrrr...t...ttt.........tttttwwwwwwww...r....mmm...m.r.....wwwwww..tttttt....t.t.t.t.............t.t.ttttt.t.t..",
                  "mmmmmmmmmmmmmmmmm....tttttt...tt.t..tttt.....ttt......t...ttttttt..tttttwwwwwwwwwww.rrrrrrrrrrrrrr.wwwwwwwww..tttttt.....t...t....tttttttttt...t.......t.t..",
                  "mmmmmmmmmmmmmmmmmmttttttttttttttttttttttttttttttttttttttttttttttttttttwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwtttttttttttttttttttttttt........ttttttttttttt...."],
        buildings: [
          {x: 6, y: 5}, {x: 63, y: 31}, {x: 38, y: 56}, {x: 76, y: 15},
          // house on the side of the road
          {x: 41, y: 41, type: RESTING_HOUSE},
          // single house in the middle of large lake
          {x: 134, y: 8},
          // town above maze
          {x: 134, y: 26, type: RESTING_HOUSE}, {x: 134, y: 28}, {x: 139, y: 30},
          {x: 145, y: 28, type: RESTING_HOUSE}, {x: 142, y: 27, type: RESTING_HOUSE}, {x: 148, y: 26},
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
    this.size = {};
  }

  WorldMap.prototype.getViews = function(callback) {
    var worldMap = mapDefinitions[this.name].map;
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

  WorldMap.prototype.getEntities = function(callback) {
    var buildings = mapDefinitions[this.name].buildings;
    var people = mapDefinitions[this.name].people;
    buildings.forEach(function(building) {
      callback(building, building.type ? building.type : HEALING_HOUSE);
    });
    people.forEach(function(person) {
      callback(person, person.type ? person.type : PERSON_COWBOY);
    });
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

