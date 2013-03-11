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
                  "ggggggggggggggggggggttttttttggggggggggggggggttttttwwwwwwgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwgg",
                  "tgggggggggggggggggggtttttttgggggggggggggggggggwwwwwwwwwwwwwwgggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwgg",
                  "tgggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwggg",
                  "ttgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwggg",
                  "ttttgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwgggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg",
                  "ttttttgggggggggggggggggggggggggggggttttgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwgggwwgggg",
                  "tttttttttggggggggggggggggggggggggggttttggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwwwwwwwwwwwgggwggggg",
                  "ttttttttttttggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttgggggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "ttttttttgggggggggggggggggggggggggggggggggtttggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttttgggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "ttttttggggggggggggggggggggggggggggggggggttttttggggggggggggggggggggggggggggggggggggggggggggggggggggttttttttgggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "tttttttttgggggggggggggttggggggggggggggggttttttgggggggggggggggggggttggggggggggggggggggggggggggggggggggttttttggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "tttttttgggggggggggggggttggggggggggggggggttttttgggggggggggggggggttttggggggggggggggggggggggggggggggggggttttttggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "ttttttggggggggggggggggttgggggggggggggggggggggggggggggggggggggggttttggggggggggggggggggggggggggggggggggtttttttgggggggggggggggggggggggggggggggggggggggggggggggg",
                  "ttttttttttttgggggggggggggggggggggggggggggggggggggggggggggggggggttggggggggggggggggggggggggggggggggggttttttggggggggggggggggggggggggggggggggggggggggggggggggggg",
                  "ttttttttttttttttggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtttttttttggggggggggggggggggggggggggggggggggggggggggggggggggg",
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
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttggggggggtttttggggggggggggggggggggggwwggggggggggggggggggggggggggggggggggggggggggggg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttggggggggtttttggggggggggggggggggggggwwggggggggggggggggggggggggggggggggggggggggggggg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttggggggggtttttggggggggggggggggggggggwwggggggggggggggggggggggggggggggggggggggggggggg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttggggggggtttttggggggggggggggggggggggwwggggggggggggggggggggggggggggggggggggggggggggg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttggggggggtttttggggggggggggggggggggggwwggggggggggtttgtttttttttttttttttttttttttttttgg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttggggggggtttttgggggggggggggggggggggwwwggggggggggtgtgtgggggggggggggggggtgtgggggggtgg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttggggggggtttttgggggggggggggggggggggwwwggggggggggtgtgtgtggttttttttttgtgtgtgggggggtgg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttggggggggtttttgggggggggggggggggggggwwwggggggggggtgtgtgtggtggggtgtgggtgtgtgtttttgtgg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggttttggggggggtttttggggggggggggggggggggwwwwggggggggggtgtgtttttttttgtgtgggtgggggggggtgtgg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtttttttttttttttttggggggggggggggggggggwwwwggggggggggtgtgggggggtgggtgttttttttgttttgtgtgg",
                  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwggggggggggggtgttttttgttttgtgggggtgggggggtgtgtgg",
                  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwggggggggggggtgtgggtgggggggggggggtgtttttgtgtgtgg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwggggggggggggtgtgtgtgtttttttttttttgtgggggtgtgtgg",
                  "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwggggggggggggtgtgtgtgggggggggggggtgtgtttttgtgtgg",
                  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtgggtggggttttttttttgggtgggggggtgtgg",
                  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggtttttttttttttttttttttttttttttttgtgg",
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

