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
      // figure out the x/y of the screen
      // css territory
      // TODO: fix this ugliness?
      var px = parseInt(player.view.element.style.left);
      var py = parseInt(player.view.element.style.top);
      var boundingRect = worldView.getBoundingClientRect();
      var windowWidth = boundingRect.right - boundingRect.left;
      var windowHeight = boundingRect.bottom - boundingRect.top;
      worldView.scrollLeft = (px - (windowWidth/2));
      worldView.scrollTop = (py - (windowHeight/2));
    }
  };

  var g = 1, // grass
      t = 2, // trees
      w = 3; // water

  //0  1  2  3  4  5  6  7  8  9
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
  var views = [];
  function renderWorld() {
    for (var i = 0; i < views.length; i++) {
      var element = views[i].getElement();
      if (!worldView.contains(element)) {
        worldView.appendChild(element);
      }
    }
  }

  var worldHash = (function() {
    var hash = {};
    var key = function(x, y) {
      return x + "x" + y;
    };
    var get = function(x, y) {
      var thiskey = key(x, y);
      var entities = hash[thiskey];
      if (!entities) {
        entities = [];
        hash[thiskey] = entities;
      }
      return entities;
    };
    return {
      add: function(x, y, entity) {
        get(x, y).entities.push(entity);
      },
      remove: function(x, y, object) {
        var entities = get(x, y);
        var i = entities.indexOf(object);
        if (i >= 0) {
          entities[i] = null;
        }
      },
      entitiesAt: function(x, y) {
        return get(x,y);
      }
    };
  })();

  function createLand() {
    var landSize = {width: 1, height: 1};
    var yl = worldMap.length;
    for (var y = 0; y < yl; y++) {
      var xl = worldMap[y].length
      for (var x = 0; x < xl; x++) {
        var str = worldMap[y][x];
        var land = new LandView({x: x, y: y}, landSize, str);
        views.push(land);
      }
    }
  }

  var worldView;
  window.onload = function() {
    createLand();
    player.view = new PlayerView(player.position, player.size);
    views.push(player.view);
    worldView = document.getElementById("world_view");
    renderWorld();
  }

  var key = {
    up: 38,
    down: 40,
    left: 37,
    right: 39
  };
  document.onkeydown = function(e) {
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
        break;
    }
  };


})();
