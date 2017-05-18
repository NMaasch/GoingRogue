// Instantiate loadState.
var loadState = {
	
	preload: function () {
		
		console.log('Preload: loadState');
		
		// Adding a loading label
		var loadingLabel = game.add.text(80,150,'loading...',{font: '30px Courier', fill: '#ffffff'});
		
		// Images for game
		game.load.path = 'assets/img/';
		game.load.atlas('player','playerAtlas.png','player.json');
        game.load.tilemap('level','tempmap.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles','temp.png');
        game.load.image('pothole', 'pothole.png'); 
        //game.load.spritesheet('player', 'player.png', 80, 115);
		// Sounds for game
        game.load.image('car', 'car.png');

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