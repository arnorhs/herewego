(function() {

  var views = [],
      rootView,
      viewportSize,
      viewportOffset = {x: 0, y: 0},
      centerPoint;

  function recalculateViewportSize() {
    // pixel sizes
    var boundingRect = rootView.getBoundingClientRect();
    var windowWidth = boundingRect.right - boundingRect.left;
    var windowHeight = boundingRect.bottom - boundingRect.top;
    viewportSize = {
      width: Math.ceil(windowWidth / UNIT),
      height: Math.ceil(windowHeight / UNIT)
    };
    centerPoint = {
      x: Math.floor((windowWidth / 2) / UNIT),
      y: Math.floor((windowHeight / 2) / UNIT)
    };
  }

  function isInViewport(position) {
    return position.x >= viewportOffset.x &&
           position.x < viewportOffset.x + viewportSize.width &&
           position.y >= viewportOffset.y &&
           position.y < viewportOffset.y + viewportSize.height;
  }

  function rearrangeViews() {
    var vl = views.length;
    var viewsToShow = [];
    for (var i = 0; i < vl; i++) {
      var view = views[i];
      if (isInViewport(view.position)) {
        view.element.style.left = dimension(view.position.x - viewportOffset.x);
        view.element.style.top = dimension(view.position.y - viewportOffset.y);
        if (!rootView.contains(view.element)) {
          rootView.appendChild(view.element);
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
  }

  window.WorldView = {
    init: function() {
      rootView = document.getElementById("world_view");
      recalculateViewportSize();
      rearrangeViews();
    },
    addView: function(view) {
      views.push(view);
    },
    centerOnView: function(view) {
      viewportOffset = {
        x: view.position.x - centerPoint.x,
        y: view.position.y - centerPoint.y
      };
      rearrangeViews();
    }
  };
})();
