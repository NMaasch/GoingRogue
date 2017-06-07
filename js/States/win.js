// Instantiate winState.
var winState = {
	
	create: function () {
		
		console.log('Create: winState');
		
		var winLabel = game.add.text(80, 80, 'You Win!',{font: '50px Arial', fill: '#00FF00'});
		
		var startLabel = game.add.text(0, 0, 'press the "W" key to play again', {font: '25px Arial', fill: '#00FF00'});
		
		// Add "W" key 
		var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		wkey.onDown.addOnce(this.restart, this);
	},
	
	restart: function () {
		
		console.log('restart: winState');
		
		game.state.start('menu');
	}
}