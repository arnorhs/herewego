(function() {

  // Map data
  //
  // g: grass
  // t: trees
  // w: water
  // b: vertical bridge
  // B: horizontal bridge
  // m: mountain
  var worldMap = ["ggttttmmmmgggwwwwwwwwwwwwgggggggggggggggggggggggtttttttttggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwgggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
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
                  "tttttttttttttttttttttttttttttttttgggggggggggwwwwwwwwwggggggggggggggggggggggggggggggggggggggggggggggggggggggggtttttttttgggggggggggggggggggggggggggggggggggggg",
                  "tttttttttttttttttttttttttttttttttttttggggggggwwwwwwwwwwwwwwgggggggggggggggggggggggggggggggggggggggggggggggggttttttttttgggggggggggggggggggggggggggggggggggggg",
                  "ttttttttttttttttttttttttttttttttttgggggggggggggwwwwwwwwwggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttttttttttttgggggggggggggggggggggggggg",
                  "tttttttttttttggggtttttttttttttttttggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttttttttttttgggggggggggggggggggggggggg",
                  "ttttttttttttgggggttttttttttttttttttttgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttttttttttttgggggggggggggggggggggggggg",
                  "tttttttttttttggggtttttttttttttttgggttgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttttttttttttgggggggggggggggggggggggggg",
                  "ttttttttttttttttttttttttttttttttgggttgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtttttttttttttttttttttggggggggggggggggggggggggggg",
                  "ttttttttttttttttttttttttttttttttgggtggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtttttttttttttttttttggtgggggggggggggggggggggggggg",
                  "ttttttttttttttttttttttggggtttttttttttgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttttttttgggggggggggggggggggggggggggggg",
                  "tttttttttttttttttttttgggggttttttttttgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtttttttttttttttttgtgggggggggggggggggggggggggggg",
                  "tttttttttttttttttttttgggggtttttttttttgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttttttgggggggggggggggggggggggggggggg",
                  "tttttttttttttttttttttggggtttttggggtttgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtttttttttttttttggggggggggggggggggggggggggggg",
                  "tttttggggggggggtttgttggtggggggggggtgtgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttttgggggggggggggggggggggggggggggg",
                  "gggggggggtttgggggggtttttggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtttttttttttttttggggggggggggggggggggggggggggg",
                  "gggggggggggttttttttgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttttttttgggggggggggggggggggggggggg",
                  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtttttttttttttgggggggggggggggggggggggggggg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttgggggggggggggggggggggggggggggggg",
                  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "ggggggggggggggggggggggggggggggwwwgggggggggggggggggggggggggggggggggggggttttggggggggtttttggggggggggggggggggggggwwggggggggggggggggggggggggggggggggggggggggggggg",
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
                  ];

  // ====================== VIEW STUFF =========================

  var hash = {
    g: 'land_grass',
    t: 'land_tree',
    w: 'land_water',
    b: 'land_bridge_v',
    B: 'land_bridge_h',
    m: 'land_mountain'
  };
  function squareToName(square) {
    return hash[square];
  }
  function readMapDefinition(worldMap, callback) {
    var yl = worldMap.length;
    for (var y = 0; y < yl; y++) {
      var xl = worldMap[y].length
      for (var x = 0; x < xl; x++) {
        callback({x: x, y: y}, squareToName(worldMap[y][x]));
      }
    }
  }

  window.WorldMap = {
    // expects a callback
    create: function(callback) {
      readMapDefinition(worldMap, callback);
    }
  }
})();

