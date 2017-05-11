// Instantiate loadState.
var loadState = {
	
	preload: function () {
		
		console.log('Preload: loadState');
		
		// Adding a loading label
		var loadingLabel = game.add.text(80,150,'loading...',{font: '30px Courier', fill: '#ffffff'});
		
		// Images for game
		game.load.path = 'assets/';
		game.load.image('map1', 'testmap.png');
		game.load.spritesheet('player', 'player.png', 80, 115);
		// Sounds for game

		game.load.path = 'assets/sounds/music/';
		game.load.audio('music', ['sneak.mp3', 'sneak.ogg']);
	},
	
	create: function () {
		
		console.log('Create: loadState');
		
		// Call to menuState.
		//game.state.start('play');
	},


	// Checks to see if audio is decoded!
	update: function() {
		if (this.cache.isSoundDecoded('music'))	{
			game.state.start('play');
		}
	}
}