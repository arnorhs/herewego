(function() {

  var views = [],
      rootView;

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

  function renderWorld() {
    for (var i = 0; i < views.length; i++) {
      var element = views[i].getElement();
      if (!rootView.contains(element)) {
        rootView.appendChild(element);
      }
    }
  }

  window.WorldView = {
    init: function() {
      rootView = document.getElementById("world_view");
      renderWorld();
    },
    addView: function(view) {
      views.push(view);
    },
    centerOnView: function(view) {
      // figure out the x/y of the screen
      // css territory
      // TODO: fix this ugliness? scrolling the view is not optimal..

      var vx = parseInt(view.element.style.left);
      var vy = parseInt(view.element.style.top);
      var boundingRect = rootView.getBoundingClientRect();
      var windowWidth = boundingRect.right - boundingRect.left;
      var windowHeight = boundingRect.bottom - boundingRect.top;
      rootView.scrollLeft = (vx - (windowWidth/2));
      rootView.scrollTop = (vy - (windowHeight/2));
    },
    // TODO: this should probably eventually be removed
    getRootView: function() {
      return rootView;
    }
  };
})();
