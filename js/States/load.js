// Instantiate loadState.
var loadState = {
	
	preload: function () {
		
		console.log('Preload: loadState');
		
		// Adding a loading label
		var loadingLabel = game.add.text(80,150,'loading...',{font: '30px Courier', fill: '#ffffff'});
		
		// Load Assets for game here.
		// game.load.image()
		// game.load.spritesheet()
		// game.load.atlas()
	},
	
	create: function () {
		
		console.log('Create: loadState');
		
		// Call to menuState.
		game.state.start('menu');
	}
};