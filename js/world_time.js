(function() {

  var worldTime = 0,
      tickHandlers = [];

  function timeLoop() {
    worldTime += 1;

    tickHandlers.forEach(function(handler) {
      handler.call(window);
    });
  }

  function initTimeLoop() {
    setInterval(timeLoop, 1000);
  }

  window.WorldTime = {
    getCurrent: function() {
      return worldTime;
    },
    formatTime: function(time) {
      var hours = Math.floor(time / 60) % (60*24),
          minutes = "" + (time % 60);
      if (minutes.length == 1) { // stupid padding
        minutes = "0" + minutes;
      }
      return hours + ":" + minutes;
    },
    addTickHandler: function(handler) {
      tickHandlers.push(handler);
    },
    init: function() {
      initTimeLoop();
    }
  };

})();
