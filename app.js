//jQuery short-hand for $(document).ready(function() { ... });
$(function() {

	// PLAYER CONSTRUCTOR - mark holds X or O symbol
	function Player(symbol) {
		this.mark = symbol;
	};

	// BOARD CONSTRUCTOR
	function Board() {
		// this.player1 and this.player2 are new instances of the Player object.
		this.player1 = new Player('X');
		this.player2 = new Player('O');

		// storing all boxes
		this.$boxes = $('.box');

		// storing reset button
		this.$reset = $('#reset');

		// Initially setting a current player
		this.currentPlayer = this.player1;

		// Tracks how many moves have been made
		this.counter = 1;
	};

	Board.prototype.nextPlayer = function() {
		// Checking this.counter to toggle this.currentPlayer
		if (this.counter % 2 === 0) {
			this.currentPlayer = this.player1;
		} else {
			this.currentPlayer = this.player2;
		}
		this.counter += 1;
	};

	// `Board.prototype.init` initializes our event listeners
	Board.prototype.init = function() {
		var _this = this;

		// Click listeners on all boxes
		this.$boxes.click(function(evnt) {
			if (this.innerHTML=='&nbsp;') {
				this.innerHTML = _this.currentPlayer.mark;
				_this.nextPlayer();
			}else {
				alert('This box is already taken. Please choose another one.')
			}
		});

		// Click listener on reset button
		this.$reset.click(function(evnt) {
			for(var i=0;i<_this.$boxes.length; i++){
				_this.$boxes[i].innerHTML='&nbsp;';
			}
		});
	};

	// Creating an instance of the board
	var board = new Board();

	// Calling init() to initialize click events on the new board
	board.init();
});





