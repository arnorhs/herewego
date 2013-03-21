(function() {

  var listeners = {};

  function listen(name, func) {
    if (!name || !func) {
      throw new Error("Whisper.listen: You must provide an event name and a callback");
    }
    if (!listeners[name]) {
      listeners[name] = [];
    }
    listeners[name].push(func);
  }

  function say(name) {
    if (!name) {
      throw new Error("Whisper.say: You must provide an event name");
    }
    var arr = listeners[name],
        args = Array.prototype.slice.call(arguments, 1);
    if (!arr) return;

    for (var i = 0, l = arr.length; i < l; i++) {
      (function(func) {
        setTimeout(function() {
          func.apply(window, args);
        },0);
      })(arr[i]);
    }
  }

  window.Whisper = {
    say: say,
    listen: listen
  };

})();
