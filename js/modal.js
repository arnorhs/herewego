(function() {

  var activeModal = null,
      $modal;

  var modalFunctions = {
    playerStats: function($content, stats) {
      for (var key in stats) {
        if (stats.hasOwnProperty(key)) {
          // each row
          var $row = $("<div />", {class: "row"});
          $("<div />", {class: "property", text: key}).appendTo($row);
          $("<div />", {class: "value", text: formatStat(stats[key])}).appendTo($row);
          $content.append($row);
        }
      }
    }
  };

  $(function() {
    $modal = $("#modal");
  });

  function showModal(size) {
    $modal.css({
      width: size.width + "px",
      height: size.height + "px",
      marginTop: "-" + (size.height/2) + "px",
      marginLeft: "-" + (size.width/2) + "px"
    }).show();
  }

  function toggleModal(name, size) {
    if (activeModal === name) {
      $modal.hide();
      activeModal = null;
      return;
    }

    var modalFunction = modalFunctions[name],
        args = Array.prototype.slice.call(arguments, 2),
        $inner = $(".modal_inner", $modal);

    $inner.html("");

    args.unshift($inner);
    modalFunction.apply(window, args);
    showModal(size);

    activeModal = name;
  }

  window.Modal = {
    playerStats: function(stats) {
      toggleModal("playerStats", {width: 300, height: 265}, stats);
    }
  };

})();

