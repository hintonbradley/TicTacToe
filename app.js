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

		// Storing winner
		this.winner = null;
	};

	Board.prototype.nextPlayer = function() {
		console.log('next player called')
		// Checking this.counter to toggle this.currentPlayer
		if (this.counter % 2 === 0) {
			this.currentPlayer = this.player1;
		} else {
			this.currentPlayer = this.player2;
		}
		this.counter += 1;
		console.log('this curent player in next player is now:', this.currentPlayer)
		if(this.counter>5){this.checkWinner()}
	};

	Board.prototype.checkWinner = function() {
		var b1=this.$boxes[0].innerHTML;
		var b2=this.$boxes[1].innerHTML;
		var b3=this.$boxes[2].innerHTML;
		var b4=this.$boxes[3].innerHTML;
		var b5=this.$boxes[4].innerHTML;
		var b6=this.$boxes[5].innerHTML;
		var b7=this.$boxes[6].innerHTML;
		var b8=this.$boxes[7].innerHTML;
		var b9=this.$boxes[8].innerHTML;
		if((b1==b2&&b2==b3&&b3!='&nbsp;')||(b4==b5&&b5==b6&&b6!='&nbsp;')||(b7==b8&&b8==b9&&b9!='&nbsp;')||(b1==b4&&b4==b7&&b7!='&nbsp;')||(b2==b5&&b5==b8&&b8!='&nbsp;')||(b3==b6&&b6==b9&&b9!='&nbsp;')||(b1==b5&&b5==b9&&b9!='&nbsp;')||(b3==b5&&b5==b7&&b7!='&nbsp;')) {
			var win;
			if(this.currentPlayer.mark=='X') {
				win = confirm('O wins! Would you like to play again?');
			} else {
				win = confirm('X wins! Would you like to play again?');
			}
			if(win) {
				for(var i=0; i<this.$boxes.length; i++) {
					this.$boxes[i].innerHTML='&nbsp;';
					this.currentPlayer = this.player1;
					this.counter = 1;
					this.winner = null;
				}
			}
		}
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
			this.counter = 1;
			this.winner = null;
		});
	};

	// Creating an instance of the board
	var board = new Board();

	// Calling init() to initialize click events on the new board
	board.init();
});





