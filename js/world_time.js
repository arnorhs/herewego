(function() {

  var worldTime = 0,
      interval = 1000;

  function timeLoop() {
    worldTime += 1;
    Whisper.say("time_tick", worldTime);
  }

  window.WorldTime = {
    getCurrent: function() {
      return worldTime;
    },
    formatTime: function(time) {
      var days = Math.floor(time / 1440) % 60,
          hours = Math.floor(time / 60) % 24,
          minutes = "" + (time % 60);
      if (minutes.length == 1) { // stupid padding
        minutes = "0" + minutes;
      }
      return (days > 0 ? ("day " + days + ", ") : "") + hours + ":" + minutes;
    },
    init: function() {
      setInterval(timeLoop, interval);
    }
  };

})();
