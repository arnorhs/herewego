(function() {

  // Emits command events. Takes care of nuances regarding keyboard vs game time etc.
  //
  // Main events it emits so far:
  // - player movement
  // - show map
  // - hide map
  // - show stats
  //
  // Eventually this might become tied with a game cycle and it would be queried
  // instead of emitting events, but for now this will probably do

  var INTERVAL = 20,
      keysDown = new Set(),
      handler;

  // Main keyboard event loop
  function startLoop() {
    setInterval(function() {
      var movementOffset = {x:0, y:0};
      keysDown.each(function(command) {
        // some of the commands emit their own whisper events, we just need to
        // special-case the movement commands
        command.call(movementOffset);
      });
      if (movementOffset.x != 0 || movementOffset.y != 0) {
        handler.call(handler, movementOffset);
      }
    }, INTERVAL);
  }

  function up() { this.y += -1; }
  function down() { this.y += 1; }
  function left() { this.x += -1; }
  function right() { this.x += 1; }

  var key = {
    up: 38, down: 40, left: 37, right: 39,
    w: 87, a: 65, s: 83, d: 68,
    k: 75, j: 74, h: 72, l: 76,
    tab: 9,
    m: 77

  };

  // It's pretty stupid to define these like this, should probably be using addEventListener
  // and also using a factory or whatever the pattern would be called to have the same method
  // call remove/add depending on what's happening. I'm just too lazy
  document.onkeydown = function(e) {
    if (e.metaKey) {
      // clear the queue of keys, if any
      keysDown.clear();
      return true;
    }
    switch (e.keyCode) {
      case key.up:
      case key.w:
      case key.k:
        keysDown.add(up);
        break;
      case key.down:
      case key.s:
      case key.j:
        keysDown.add(down);
        break;
      case key.left:
      case key.a:
      case key.h:
        keysDown.add(left);
        break;
      case key.right:
      case key.d:
      case key.l:
        keysDown.add(right);
        break;
      case key.tab:
        Whisper.say("command_player_stats");
        break;
      case key.m:
        Whisper.say("command_show_map");
        break;
      default:
        return true;
    }
    return false;
  };

  document.onkeyup = function(e) {
    switch (e.keyCode) {
      case key.up:
      case key.w:
      case key.k:
        keysDown.remove(up);
        break;
      case key.down:
      case key.s:
      case key.j:
        keysDown.remove(down);
        break;
      case key.left:
      case key.a:
      case key.h:
        keysDown.remove(left);
        break;
      case key.right:
      case key.d:
      case key.l:
        keysDown.remove(right);
        break;
      case key.m:
        Whisper.say("command_hide_map");
        break;
      default:
        return true;
    }
    return false;
  };

  window.Commands = {
    init: function (callback) {
      handler = callback;
      startLoop();
    }
  }

})();
