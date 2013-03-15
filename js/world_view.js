(function() {

  var views = [],
      rootView,
      viewportSize,
      viewportOffset = {x: 0, y: 0},
      currentMapRect,
      centerPosition;

  function recalculateViewportSize() {
    // pixel sizes
    var boundingRect = rootView.getBoundingClientRect();
    var windowWidth = boundingRect.right - boundingRect.left;
    var windowHeight = boundingRect.bottom - boundingRect.top;
    viewportSize = {
      width: Math.ceil(windowWidth / UNIT),
      height: Math.ceil(windowHeight / UNIT)
    };
  }

  function isInViewport(position) {
    return position.x >= viewportOffset.x &&
           position.x < viewportOffset.x + viewportSize.width &&
           position.y >= viewportOffset.y &&
           position.y < viewportOffset.y + viewportSize.height;
  }

  function LightSource(position, fillStrength, range) {
    this.position = position
    this.fillStrength = fillStrength;
    this.range = range;
  }

  LightSource.prototype.calculateOpacity = function(position) {
    var distance = Math.min(Math.max(distanceBetweenPoints(this.position, position), this.fillStrength), this.range);
    return 1 - ((distance - this.fillStrength) / (this.range - this.fillStrength));
  }

  function rearrangeViews() {
    var d = new Date();
    var vl = views.length;
    var viewsToShow = [];
    var lightSource = new LightSource(centerPosition, 4, Math.ceil(viewportSize.width / 2));

    for (var i = 0; i < vl; i++) {
      var view = views[i];
      if (isInViewport(view.position)) {
        view.element.style.left = dimension(view.position.x - viewportOffset.x);
        view.element.style.top = dimension(view.position.y - viewportOffset.y);
        if (!rootView.contains(view.element)) {
          rootView.appendChild(view.element);
        }
        // set the opacity based on the distance to the player
        view.element.style.opacity = lightSource.calculateOpacity(view.position);

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
  }

  window.WorldView = {
    init: function() {
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
