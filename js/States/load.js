// Instantiate loadState.
var loadState = {
	
	preload: function () {
		
		console.log('Preload: loadState');
		
		// Adding a loading label
		var loadingLabel = game.add.text(300,275,'loading...',{font: '30px Courier', fill: '#ffffff'});
		
		// Images for game
		game.load.path = 'assets/';
		game.load.atlas('player','img/playerAtlas.png','img/player.json');
        //game.load.tilemap('level','img/map1.json', null, Phaser.Tilemap.TILED_JSON);
        //game.load.image('bgTile','img/temp.png');
        //game.load.image('roadTile','img/roads.png');
        //game.load.image('buildingTile','img/buildings.jpeg');
        game.load.tilemap('level1','img/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Tilesheet','img/Tilesheet.png');
        game.load.image('pothole','img/pothole.png');
        game.load.image('car','img/car.png');
        game.load.image('fill', 'img/cementBag.png');
        // hud 
        game.load.image('timerbox','img/hud/trans.png');
		game.load.image('bar','img/hud/bar.png');
		game.load.spritesheet('inventory', 'img/hud/inventory.png', 132, 82);



		// Sounds for game
		// MUSIC
		game.load.path = 'assets/sounds/music/';
		//game.load.audio('music1', ['sneak.mp3', 'sneak.ogg']);
		game.load.audio('alert', ['alert.mp3', 'alert.ogg']);
		game.load.audio('alert-theme', ['alert-theme.mp3', 'alert-theme.ogg']);
		game.load.audio('caution-theme',['caution-theme.mp3', 'caution-theme.ogg']);

		// SFX
		game.load.path = 'assets/sounds/sfx/';
		game.load.audio('yay', ['yay.mp3', 'yay.ogg']);
		
	},
	
	create: function () {
		
		console.log('Create: loadState');
		
		// Call to menuState.
		//game.state.start('play');
	},


	// Checks to see if audio is decoded!
	update: function() {
		if (this.cache.isSoundDecoded('alert') 
			&& this.cache.isSoundDecoded('alert-theme')
			&& this.cache.isSoundDecoded('caution-theme')
			&& this.cache.isSoundDecoded('yay')) {
			game.state.start('menu');
		}
	}
}