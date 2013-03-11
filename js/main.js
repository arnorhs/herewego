(function() {

  var player = {
    stats: {
      strength: 1,
      dexterity: 1,
      wizdom: 1
    },
    position: {
      x: 6,
      y: 6
    },
    size: {
      width: 1,
      height: 1
    },
    view: null,
    move: function(offset) {
      player.position.x += offset.x,
      player.position.y += offset.y,
      player.view.move(player.position)
      WorldView.centerOnView(player.view);
    }
  };

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

  function createLand() {
    var landSize = {width: 1, height: 1};
    var yl = worldMap.length;
    for (var y = 0; y < yl; y++) {
      var xl = worldMap[y].length
      for (var x = 0; x < xl; x++) {
        WorldView.addView(new View({x: x, y: y}, landSize, "land_" + worldMap[y][x]));
      }
    }
  }

  window.onload = function() {
    createLand();
    player.view = new View(player.position, player.size, "player");
    WorldView.addView(player.view);
    WorldView.init();
  }

  var key = {
    up: 38,
    down: 40,
    left: 37,
    right: 39
  };
  // bad horrible attempt at limiting movement speed
  var lastAction = new Date(),
      interval = 100;
  document.onkeydown = function(e) {
    var now = new Date();
    if (now - lastAction < interval) {
      return false;
    }
    var keyCode = e.keyCode;
    switch (keyCode) {
      case key.up:
        player.move({x:0,y:-1});
        break;
      case key.down:
        player.move({x:0,y:1});
        break;
      case key.left:
        player.move({x:-1,y:0});
        break;
      case key.right:
        player.move({x:1,y:0});
        break;
      default:
        console.log("Key pressed:", e.keyCode, e.keyIdentifier);
        // return so we won't set the lastAction date again
        // maybe it would be better to know if the game time had changed
        return true;
    }
    lastAction = now;
    return false;
  };


})();
