(function() {
  "use strict";

  var HOUR = 60,
      DAY = 1440,
      HOURS_PER_DAY = 24,
      INTERVAL = 1000,
      DAYLIGHT_STARTS = 7 * HOUR,
      DAYLIGHT_ENDS = 19 * HOUR,
      TRANSITION = 2 * HOUR,
      worldTime = 10 * HOUR; // let's start at 10 o clock

  function timeLoop() {
    worldTime += 1;
    Whisper.say("time_tick", worldTime);
  }

  // returns the amount of luminosity at this time from 0 (dark) to 1 (bright)
  function luminosity() {
    var relativeTime = worldTime % DAY;
    // I started doing this using some crazy math.. but this proved to be simpler to define
    if (relativeTime >= DAYLIGHT_STARTS && relativeTime < DAYLIGHT_ENDS) {
      return 1;
    } else if (relativeTime >= DAYLIGHT_ENDS && relativeTime < DAYLIGHT_ENDS + TRANSITION) {
      return 1 - ((relativeTime - DAYLIGHT_ENDS) / TRANSITION);
    } else if (relativeTime >= DAYLIGHT_STARTS - TRANSITION && relativeTime < DAYLIGHT_STARTS) {
      return  (relativeTime - (DAYLIGHT_STARTS - TRANSITION)) / TRANSITION;
    }
    return 0;
  }

  window.WorldTime = {
    getLuminosity: luminosity,
    getCurrent: function() {
      return worldTime;
    },
    formatTime: function(time) {
      var days = Math.floor(time / DAY),
          hours = Math.floor(time / HOUR) % HOURS_PER_DAY,
          minutes = "" + (time % HOUR);
      if (minutes.length == 1) { // stupid padding
        minutes = "0" + minutes;
      }
      return (days > 0 ? ("day " + days + ", ") : "") + hours + ":" + minutes;
    },
    init: function() {
      setInterval(timeLoop, INTERVAL);
    }
  };

})();
