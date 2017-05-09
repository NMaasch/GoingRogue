// Instantiate menuState
var menuState = {
	
	create: function () {
		
		console.log('Create: menuState');
		
		// Name of the game being displayed.
		var nameLabel = game.add.text(80,80,'Final Project',{font: '50px Arial', fill: '#ffffff'});
		
		// Instructions to player on starting.
		var startLabel = game.add.text(80, game.world.height-80, 'press the "W" key to start', {font: '25px Arial', fill: #ffffff'});
		
		// Enable the W key for onPress action.
		var wkey = game.input.keyboard.addkey(Phaser.Keyboard.W);
		wkey.onDown.addOnce(this.start, this);
	},
	
	// Start function to call the play state.
	start: function () {
		
		console.log('Start: menuState');
		
		game.state.start('play');
	}
};