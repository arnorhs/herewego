(function() {
  "use strict";

  // main lighting canvas context
  var ctx, canvas,
      // last shadows drawn, if they need to be redrawn - obviously should be wrapped
      // in some class of some sorts
      lastShadowCollection, lastLightSource,
      luminosity = 0;

  function addGradient(position) {
    var gradient = ctx.createRadialGradient(position.x, position.y, 0, position.x, position.y, 400);
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(0.1, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,' + luminosity.toFixed(2) + ')');
    ctx.fillStyle = gradient;
    ctx.rect(0,0,window.innerWidth, window.innerHeight);
    ctx.fill();
  }

  // This function basically goes through all the objects that block light
  // and draws a shape from the edges of it to further away with a black
  // shadow, towards the angle away from the player
  function drawShadows(shadowCollection, ls) {
    if (luminosity == 0) {
      return;
    }
    // remember.. this is ugly. TODO
    lastShadowCollection = shadowCollection;
    lastLightSource = ls;
    // figure out what the maximum distance to a shadow is
    ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
    // TODO turn off this shadow if it's at 0 opacity.. requires some refactoring of these draw things
    ctx.fillStyle = "rgba(0,0,0," + (0.3 * (luminosity > 0.5 ? (luminosity - 0.5)*2 : 0)) + ")";
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
          var ratio = (point.x + i - ls.x) / (point.y - ls.y);
          var x = (point.x > ls.x) ? rightBounds : leftBounds,
              y = ((x - ls.x) / ratio) + ls.y;
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
    addGradient(ls);
  }

  // currently only a position.. but i think it makes sense to add a strength to it etc later
  // It accepts a game unit position, but uses pixel positions after that
  function LightSource(position) {
    this.x = position.x * UNIT;
    this.y = position.y * UNIT;
  }

  // used to store an object that can cast shadows
  function ShadowCaster(position, size, lightSource) {
    // convert from game sizes to pixel sizes
    position = {
      x: position.x * UNIT,
      y: position.y * UNIT
    };
    size = {
      width: size.width * UNIT,
      height: size.height * UNIT
    };
    // we can figure out the greatest degrees by using:
    // (b^2 + c^2 - a^2)/(2bc)
    //
    // TODO: This is pretty horrible..
    // Should probably be using a convex hull algorithm.
    // even a Gift Wrapping algorithm would do the trick, or if we start doing something
    // more complicated a QuickHull algorithm
    // http://westhoffswelt.de/blog/0040_quickhull_introduction_and_php_implementation.html/
    var a, b;
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
            b = distanceBetweenPoints(lightSource, points[j]),
            c = distanceBetweenPoints(lightSource, points[i]);
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

  // exports
  window.ShadowCaster = ShadowCaster;
  window.LightSource = LightSource;
  window.Light = {
    init: function() {
      canvas = document.getElementById("light_canvas");
      ctx = canvas.getContext('2d');
    },
    setLuminosity: function(lum) {
      luminosity = 1 - lum;
    },
    setCanvasSize: function(size) {
      canvas.width = size.width;
      canvas.height = size.height;
      if (lastShadowCollection && lastLightSource) {
        drawShadows(lastShadowCollection, lastLightSource);
      }
    },
    drawShadows: drawShadows
  };

})();
