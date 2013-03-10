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
    }
  };

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

  var worldView;
  window.onload = function() {
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
