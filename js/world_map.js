(function() {

  // Map data
  //
  // g: grass
  // t: trees
  // w: water
  var worldMap = ["ggttttgggggggwwwwwwwwwwwwgggggggggggggggggggggggtttttttttgggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "ggtttttgggggggggggwwwwwwwwwwwwwgggggggggggggggggtttttttttgggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "gggttttttggggggttttttttttttwwwggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "ggttttggggggggggggtttttttwwwwgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "gggggggggggggggggttttttwwwggggggggggggttttggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "wgggggggggggggggggggggggggggggggggggggttttggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "wgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwgggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "wwwgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwgggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "wwwwggggggggttttttttttggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwgggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "wwwwgggggggttttttttttttgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwgggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "wwwwgggggggttttttttttttgggtggggggggggggggggggttttttgggggggggggggggggggggggggggggggggggwwwwwwwwwwwgggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "gwwggggggggttttttttttttttttgggggggggggggggggtttttttwwwwwwwwwwwggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "ggwwggggggggttttttttttttttttggggggggggggggggttttttwwwwwwwwwgggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                  "ggggggggggggggggggggttttttttggggggggggggggggttttttwwwwwwggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg",
                  "tgggggggggggggggggggtttttttgggggggggggggggggggwwwwwwwwwwwwwwggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg",
                  "tgggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg",
                  "ttggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg",
                  "ttttggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg",
                  "ttttttgggggggggggggggggggggggggggggttttgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg",
                  "tttttttttggggggggggggggggggggggggggttttgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg",
                  "ttttttttttttggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttgggggggggggggggggggggggggggggggggggggggggggggggg",
                  "ttttttttgggggggggggggggggggggggggggggggggtttggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttgggggggggggggggggggggggggggggggggggggggggggggggg",
                  "ttttttggggggggggggggggggggggggggggggggggttttttggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttgggggggggggggggggggggggggggggggggggggggggggggggg",
                  "tttttttttgggggggggggggttggggggggggggggggttttttgggggggggggggggggggttgggggggggggggggggggggggggggggttttttttttttgggggggggggggggggggggggggggggggggggggggggggggggg",
                  "tttttttgggggggggggggggttggggggggggggggggttttttgggggggggggggggggttttgggggggggggggggggggggggggggggttttttttttttgggggggggggggggggggggggggggggggggggggggggggggggg",
                  "ttttttggggggggggggggggttgggggggggggggggggggggggggggggggggggggggttttgggggggggggggggggggggggggggggttttttttttttgggggggggggggggggggggggggggggggggggggggggggggggg",
                  "ttttttttttttgggggggggggggggggggggggggggggggggggggggggggggggggggttgggggggggggggggggggggggggggggggttttttttttttgggggggggggggggggggggggggggggggggggggggggggggggg",
                  "ttttttttttttttttggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttgggggggggggggggggggggggggggggggggggggggggggggggg",
                  "ttttttttttttttttttggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "tttttttttttttttttttttttttgggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "tttttttttttttttttttttttttttgggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "ttttttttttttttttttttttttttttgttgggggggggggggwwwwwwwwwwwwwwwgggggggggggggggggggggggggggggggggggggggggggggggggttttttttttgggggggggggggggggggggggggggggggggggggg",
                  "tttttttttttttttttttttttttttttttttgggggggggggwwwwwwwwwgggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttgggggggggggggggggggggggggggggggggggggg",
                  "tttttttttttttttttttttttttttttttttttttggggggggwwwwwwwwwwwwwwgggggggggggggggggggggggggggggggggggggggggggggggggttttttttttgggggggggggggggggggggggggggggggggggggg",
                  "ttttttttttttttttttttttttttttttttttgggggggggggggwwwwwwwwwggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttttttttttttgggggggggggggggggggggggggg",
                  "tttttttttttttggggtttttttttttttttttggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttttttttttttgggggggggggggggggggggggggg",
                  "ttttttttttttgggggttttttttttttttttttttgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttttttttttttgggggggggggggggggggggggggg",
                  "tttttttttttttggggtttttttttttttttgggttgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttttttttttttgggggggggggggggggggggggggg",
                  "ttttttttttttttttttttttttttttttttgggttgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttttttttttttgggggggggggggggggggggggggg",
                  "ttttttttttttttttttttttttttttttttgggtggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttttttttttttgggggggggggggggggggggggggg",
                  "ttttttttttttttttttttttggggtttttttttttgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttttttttttttgggggggggggggggggggggggggg",
                  "tttttttttttttttttttttgggggttttttttttggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttttttttttttgggggggggggggggggggggggggg",
                  "tttttttttttttttttttttgggggtttttttttttgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttttttttttttgggggggggggggggggggggggggg",
                  "tttttttttttttttttttttggggtttttggggtttgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttttttttgggggggggggggggggggggggggg",
                  "tttttggggggggggtttgttggtggggggggggtgtgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttttttttgggggggggggggggggggggggggg",
                  "gggggggggtttgggggggtttttggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttttttttgggggggggggggggggggggggggg",
                  "gggggggggggttttttttgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttttttttttgggggggggggggggggggggggggg",
                  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtttttttttttttttttggggggggggggggggggggggwwggggggggggggggggggggggggggggggggggggggggggggg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtttttttttttttttttggggggggggggggggggggggwwggggggggggggggggggggggggggggggggggggggggggggg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtttttttttttttttttggggggggggggggggggggggwwggggggggggggggggggggggggggggggggggggggggggggg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtttttttttttttttttggggggggggggggggggggggwwggggggggggggggggggggggggggggggggggggggggggggg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtttttttttttttttttggggggggggggggggggggggwwggggggggggggggggggggggggggggggggggggggggggggg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtttttttttttttttttgggggggggggggggggggggwwwggggggggggggggggggggggggggggggggggggggggggggg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtttttttttttttttttgggggggggggggggggggggwwwggggggggggggggggggggggggggggggggggggggggggggg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtttttttttttttttttgggggggggggggggggggggwwwggggggggggggggggggggggggggggggggggggggggggggg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtttttttttttttttttggggggggggggggggggggwwwwggggggggggggggggggggggggggggggggggggggggggggg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtttttttttttttttttggggggggggggggggggggwwwwggggggggggggggggggggggggggggggggggggggggggggg",
                  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwggggggggggggggggggggggggggggggggggggggggggggggg",
                  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwggggggggggggggggggggggggggggggggggggggggggggggg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwggggggggggggggggggggggggggggggggggggggggggggggg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwggggggggggggggggggggggggggggggggggggggggggggggg",
                  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
                  ];

  // ====================== VIEW STUFF =========================

  function readMapDefinition(worldMap, callback) {
    var yl = worldMap.length;
    for (var y = 0; y < yl; y++) {
      var xl = worldMap[y].length
      for (var x = 0; x < xl; x++) {
        callback({x: x, y: y}, "land_" + worldMap[y][x]);
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

