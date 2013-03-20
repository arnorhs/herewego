(function() {

  var views = [],
      rootView,
      viewportSize,
      viewportOffset = {x: 0, y: 0},
      currentMapRect,
      centerPosition;

  function recalculateViewportSize() {
    // this viewport size is in pixels
    var width = window.innerWidth,
        height = window.innerHeight;
    viewportSize = {
      width: Math.ceil(width / UNIT),
      height: Math.ceil(height / UNIT)
    };
    Light.setCanvasSize({
      width: width,
      height: height
    });
  }

  function isInViewport(position) {
    return position.x >= viewportOffset.x &&
           position.x < viewportOffset.x + viewportSize.width &&
           position.y >= viewportOffset.y &&
           position.y < viewportOffset.y + viewportSize.height;
  }

  function redrawViews() {
    var d = new Date();
    var vl = views.length;
    var viewsToShow = [];
    var shadowCollection = [];
    var lightSource = new LightSource({
      x: centerPosition.x + 0.5 - viewportOffset.x,
      y: centerPosition.y + 0.5 - viewportOffset.y
    });

    for (var i = 0; i < vl; i++) {
      var view = views[i];
      if (isInViewport(view.position)) {
        view.element.style.left = dimension(view.position.x - viewportOffset.x);
        view.element.style.top = dimension(view.position.y - viewportOffset.y);
        if (!rootView.contains(view.element)) {
          rootView.appendChild(view.element);
        }
        if ([TREE, MOUNTAIN].indexOf(view.type) >= 0) {
          // shadow collection needs the lightsource currently, because it uses it to pick a side
          shadowCollection.push(new ShadowCaster({
            x: view.position.x - viewportOffset.x,
            y: view.position.y - viewportOffset.y
          }, view.size, lightSource));
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

    Light.drawShadows(shadowCollection, lightSource);
  }


  window.WorldView = {
    init: function() {
      rootView = document.getElementById("world_view");
      Light.init();
      recalculateViewportSize();
      window.onresize = function() {
        recalculateViewportSize();
        redrawViews();
      };
    },
    setViewportOffsetLimits: function(rect) {
      currentMapRect = rect;
    },
    addView: function(view) {
      views.push(view);
    },
    centerOnPosition: function(position) {
      var x = position.x - Math.floor(viewportSize.width / 2),
          y = position.y - Math.floor(viewportSize.height / 2);
      centerPosition = {x: position.x, y: position.y};
      // watch out not to scroll out of bounds. We add a unit in size from the map bounds
      // because we render the last tile on x/y out of bounds of the viewport (see the
      // Math.ceil() call in recalculateViewportSize()
      viewportOffset = {
        x: Math.max(currentMapRect.x, Math.min(x, (currentMapRect.width + 1) - viewportSize.width)),
        y: Math.max(currentMapRect.y, Math.min(y, (currentMapRect.height + 1) - viewportSize.height))
      };
      redrawViews();
    },
    redraw: function() {
      redrawViews();
    },
    animateDamage: function(victim, damage) {
      var position = victim.view.position;
      var elem = document.createElement("div");
      elem.className = "damage_animation";
      elem.style.left = dimension(position.x - viewportOffset.x);
      elem.style.top = dimension(position.y - viewportOffset.y);
      elem.textContent = "-" + damage.toFixed(1);
      // TODO it would probably be nicer to add this to some other view, but for now this is ok
      rootView.appendChild(elem);
      setTimeout(function() {
        rootView.removeChild(elem);
      }, 3000);
    }
  };
})();
