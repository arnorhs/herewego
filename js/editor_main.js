(function() {
  "use strict";

  /* This is all basically a giant hack - put some pieces from the game source together
   * to create this super basic ugly editor */

  window.UNIT = 5;

  var size;
  var $canvas, canvas, ctx, canvasPos;

  var frame; // animation frame callback

  var currentMap;

  function addEntity(type, position, size) {
    var view = new View(position, size, type);
    //WorldView.addView(view);
  }

  function updateSizes() {
    size = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    if (currentMap) {
      canvas.width = currentMap.getRect().width * UNIT;
      canvas.height = currentMap.getRect().height * UNIT;
    } else {
      //canvas.width = size.width;
      //canvas.height = size.height;
    }
  }


  var colors = {};
  colors[TREE] = "#0a0";
  colors[GRASS] = "#6d6";
  colors[SAND] = "#f0f0c9";
  colors[ROAD] = "#ca3";
  colors[MOUNTAIN] = "#bcd";
  colors[WATER] = "#48C";
  colors[BRIDGE_V] = "#fd3";
  colors[BRIDGE_H] = "#df3";
  var square = {}
  square[GRASS] = ".";
  square[SAND] = "s";
  square[TREE] = "t";
  square[WATER] = "w";
  square[BRIDGE_V] = "b";
  square[BRIDGE_H] = "B";
  square[MOUNTAIN] = "m";
  square[ROAD] = "r";
  function typeToSquare(type) {
    return square[type];
  }
  function draw() {
    currentMap.getViews(function(position, type) {
      ctx.fillStyle = colors[type];
      ctx.fillRect(position.x*UNIT, position.y*UNIT, UNIT, UNIT);
    });
  }

  var currentType = GRASS;
  function drawSpot(x, y) {
    if (currentMap.raw[y] && x < currentMap.raw[y].length) {
      currentMap.raw[y] = currentMap.raw[y].slice(0, x) + typeToSquare(currentType) + currentMap.raw[y].slice(x+1);
      ctx.fillStyle = colors[currentType];
      ctx.fillRect(x*UNIT, y*UNIT, UNIT, UNIT);
    }
  }

  var mouseDown = false;
  function translateMousePosition(x) {
    return (x / UNIT) << 0;
  }
  document.onmousemove = function(e) {
    if (mouseDown) {
      drawSpot(translateMousePosition(e.offsetX), translateMousePosition(e.offsetY));
    }
  };
  document.onmousedown = function(e) {
    mouseDown = true;
    drawSpot(translateMousePosition(e.offsetX), translateMousePosition(e.offsetY));
    return false;
  };
  document.onmouseup = function(e) {
    mouseDown = false;
    return false;
  };


  document.onkeydown = function(e) {
    var k = e.keyCode;
    switch (k) {
      case 84:
        currentType = TREE; break;
      case 82:
        currentType = ROAD; break;
      case 190:
      case 71:
        currentType = GRASS; break;
      case 83:
        currentType = SAND; break;
      case 77:
        currentType = MOUNTAIN; break;
      case 87:
        currentType = WATER; break;
      case 66:
        currentType = e.shiftKey ? BRIDGE_H : BRIDGE_V; break;
    }
    updateCurrentType();
  };

  function updateCurrentType() {
    $("#selected_type").html(typeToSquare(currentType));
  }

  $(function() {

    // canvas
    $canvas = $('#canvas');
    canvas = $canvas.get(0)
    ctx = canvas.getContext('2d');
    canvasPos = $canvas.offset();

    window.onresize = function() {
      updateSizes();
      draw();
    };

    var $te;
    $('#export').click(function() {
      if ($te) {
        $te.remove();
        $te = null;
        return;
      }
      $te = $("<textarea>");
      $te.html(currentMap.export());
      $te.appendTo('.tools');
      $te.get(0).setSelectionRange(0,999999999);
      $te.focus();
    });

    // create map
    currentMap = WorldMap.getMap("start");
    currentMap.download(function() {
      var landSize = {width: 1, height: 1};
      currentMap.getViews(function(position, type) {
        addEntity(type, position, landSize);
      });

      // make all buildings
      currentMap.getEntities(function(position, type) {
        addEntity(type, position, {width: 1, height: 1});
      });

      updateCurrentType();
      updateSizes();

      draw();
    });

  });

})();
