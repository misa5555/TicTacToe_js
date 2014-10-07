(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    var view = this;
    $('.tile').on('click', function(event){
      view.makeMove( $(event.target));
    });
  };

  View.prototype.makeMove = function ($square) {
    var pos = $square.data("pos");
    var currentPlayer = this.game.currentPlayer;

    try {
      this.game.playMove(pos);
    } catch (e) {
      alert('Invalid move! Try again.');
      return;
    }

    if (this.game.currentPlayer == "x"){
      $square.addClass("red");
    } else{
      $square.addClass("blue");
    }

    if (this.game.isOver()) {
      this.$el.find('.tile').off('click');
      debugger
      var winner = this.game.winner();
      if (winner) {
        console.log(winner);
        if (winner == "o"){
          win_color = "red"
        } else {
          win_color = "blue" 
        }
        this.$el.append("<div class='winner-notice'> winner is "+ win_color +"</div>")
      } else {
        this.$el.append("<div class='winner-notice'>draw</div>");
      }
    }
  };

  View.prototype.setupBoard = function () {
    for (var rowIdx = 0; rowIdx < 3; rowIdx++) {
      var $row = $('<div class="row"></div>');

      for (var colIdx = 0; colIdx < 3; colIdx++) {
        var $li = $('<div class="tile">');
        $li.data("pos", [rowIdx, colIdx]);

        $row.append($li);
      }
      this.$el.append($row);
    }
  };
})();
