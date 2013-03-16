(function() {

  var views = [],
      rootView,
      viewportSize,
      viewportOffset = {x: 0, y: 0},
      currentMapRect,
      centerPosition;

  function recalculateViewportSize() {
    viewportSize = {
      width: Math.ceil(window.innerWidth/ UNIT),
      height: Math.ceil(window.innerHeight / UNIT)
    };
  }

  function isInViewport(position) {
    return position.x >= viewportOffset.x &&
           position.x < viewportOffset.x + viewportSize.width &&
           position.y >= viewportOffset.y &&
           position.y < viewportOffset.y + viewportSize.height;
  }

  function LightSource(position, fillStrength, range) {
    this.position = {
      x: (position.x - viewportOffset.x) * UNIT,
      y: (position.y - viewportOffset.y) * UNIT
    };
    this.fillStrength = fillStrength;
    this.range = range;
  }

  // compiles an object square to 4 coordinates
  function ShadowCaster(position, size, lightSource) {
    // we can figure out the greatest degrees by using:
    // (b^2 + c^2 - a^2)/(2bc)
    var a, b;
    // convert to canvas sizes
    position = {
      x: (position.x - viewportOffset.x) * UNIT,
      y: (position.y - viewportOffset.y) * UNIT
    };
    size = {
      width: size.width * UNIT,
      height: size.height * UNIT
    };
    var points = [
      {x: position.x, y: position.y},
      {x: position.x + size.width, y: position.y},
      {x: position.x + size.width, y: position.y + size.height},
      {x: position.x, y: position.y + size.height}
    ];
    var minDegrees = 100, maxPoints;
    for (var i = 0; i < points.length-1; i++) {
      for (var j = i+1; j < points.length; j++) {
        // the missing corner is A
        // sizes of sides
        var a = distanceBetweenPoints(points[i], points[j]),
            b = distanceBetweenPoints(lightSource.position, points[j]),
            c = distanceBetweenPoints(lightSource.position, points[i]);
        var degrees = (Math.pow(b,2) + Math.pow(c,2) - Math.pow(a,2)) / (2 * b * c);
        degrees = Math.pow(Math.acos(degrees), -1);
        if (degrees <= minDegrees) {
          maxPoints = [points[i], points[j]];
          minDegrees = degrees;
        }
      }
    }
    this.points = maxPoints;
    this.position = position;
    this.size = size;
  }

  function rearrangeViews() {
    var d = new Date();
    var vl = views.length;
    var viewsToShow = [];
    var shadowCollection = [];
    var lightSource = new LightSource({x: centerPosition.x + 0.5, y: centerPosition.y + 0.5}, 4, Math.ceil(viewportSize.width / 2));

    for (var i = 0; i < vl; i++) {
      var view = views[i];
      if (isInViewport(view.position)) {
        view.element.style.left = dimension(view.position.x - viewportOffset.x);
        view.element.style.top = dimension(view.position.y - viewportOffset.y);
        if (!rootView.contains(view.element)) {
          rootView.appendChild(view.element);
        }
        if ([TREE, MOUNTAIN].indexOf(view.type) >= 0) {
          shadowCollection.push(new ShadowCaster(view.position, view.size, lightSource));
        }
        viewsToShow.push(view);
      } else {
        if (rootView.contains(view.element)) {
          rootView.removeChild(view.element);
        }
      }
    }

    // sort the views based on type
    viewsToShow.sort(function(a, b) {
      if (a.type > b.type) {
        return -1;
      } else if (a.type < b.type) {
        return 1;
      } else {
        return 0;
      }
    });

    vl = viewsToShow.length;
    for (var i = 0; i < vl; i++) {
      rootView.appendChild(viewsToShow[i].element);
    }

    drawShadows(shadowCollection, lightSource);
    console.log("Rendered frame", new Date() - d);
  }

  // This function basically goes through all the objects that block light
  // and draws a shape from the edges of it to further away with a black
  // shadow, towards the angle away from the player
  var ctx;
  function drawShadows(shadowCollection, ls) {
    // figure out what the maximum distance to a shadow is
    ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    var leftBounds = 0,
        rightBounds = window.innerWidth;
    // we create 3 copies of the same light with a slight offset
    for (var i = -8; i <= 8; i += 8) {
      shadowCollection.forEach(function(shadowCaster) {
        ctx.beginPath();
        // move to the last point we'll be drawing to, which will be the first point
        // then go through the points and compute those that are the furthest away
        // reverse the array, so we'll end in the right place and loop through the
        // original points, so we end where we began
        ctx.moveTo(shadowCaster.points[0].x, shadowCaster.points[0].y);
        shadowCaster.points.forEach(function(point) {
          var ratio = (point.x + i - ls.position.x) / (point.y - ls.position.y);
          var x = (point.x > ls.position.x) ? rightBounds : leftBounds,
              y = ((x - ls.position.x) / ratio) + ls.position.y;
          ctx.lineTo(x, y);
        });
        shadowCaster.points.reverse();
        shadowCaster.points.forEach(function(point) {
          ctx.lineTo(point.x, point.y);
        });
        ctx.fill();
      });
    }
    ctx.beginPath();
    // now we need to loop through all the original objects to remove them.. so you see all the tops of all objects
    shadowCollection.forEach(function(shadowCaster) {
      ctx.clearRect(shadowCaster.position.x, shadowCaster.position.y, shadowCaster.size.width, shadowCaster.size.height);
    });
    addGradient(ls.position);
  }

  function addGradient(position) {
    var gradient = ctx.createRadialGradient(position.x, position.y, 0, position.x, position.y, 400);
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(0.1, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = gradient;
    ctx.rect(0,0,window.innerWidth, window.innerHeight);
    ctx.fill();
  }

  window.WorldView = {
    init: function() {
      var canvas = document.getElementById("light_canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx = canvas.getContext('2d');

      rootView = document.getElementById("world_view");
      recalculateViewportSize();
    },
    setViewportOffsetLimits: function(rect) {
      currentMapRect = rect;
    },
    addView: function(view) {
      views.push(view);
    },
    centerOnView: function(view) {
      var x = view.position.x - Math.floor(viewportSize.width / 2),
          y = view.position.y - Math.floor(viewportSize.height / 2);
      centerPosition = {x: view.position.x, y: view.position.y};
      // watch out not to scroll out of bounds. We add a unit in size from the map bounds
      // because we render the last tile on x/y out of bounds of the viewport (see the
      // Math.ceil() call in recalculateViewportSize()
      viewportOffset = {
        x: Math.max(currentMapRect.x, Math.min(x, (currentMapRect.width + 1) - viewportSize.width)),
        y: Math.max(currentMapRect.y, Math.min(y, (currentMapRect.height + 1) - viewportSize.height))
      };
      rearrangeViews();
    }
  };
})();
