(function() {

  window.defaultAttributesForType = function(type) {
    switch (type) {
      case ALIEN:
        return {
          level: 1,
          strength: 1,
          health: 10,
          weapon: new Weapon(2),
          armor: null,
          exp: 0
        };
        break;
      case PLAYER:
        return {
          level: 1,
          strength: 1,
          maxHealth: 20,
          health: 20,
          weapon: new Weapon(5),
          armor: null,
          exp: 0
        };
    }
    return {};
  }

})();
