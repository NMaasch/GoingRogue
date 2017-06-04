// Instantiate loadState.
var loadState = {
	
	preload: function () {
		
		console.log('Preload: loadState');
		
		// Adding a loading label
        game.load.image('logo','assets/img/Logo.png');
        //var logo = game.add.image(0,0,'logo');
		var loadingLabel = game.add.text(325,400,'loading...',{font: '30px Courier', fill: '#ffffff'});
		//var logo = game.add.image(0,0,'logo');
		// Images for game
		game.load.path = 'assets/';
		game.load.atlas('player','img/playerAtlas.png','img/player.json');
        game.load.tilemap('level1','img/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Tilesheet','img/Tilesheet.png');
        game.load.image('pothole','img/pothole.png');
        game.load.image('car','img/car.png');
        game.load.image('fill', 'img/cementBag.png');
        game.load.spritesheet('explosion', 'img/explosion.png', 64, 64);
        // hud 
        game.load.image('timerbox','img/hud/trans.png');
		game.load.image('bar_empty','img/hud/bar_empty.png');
		game.load.image('bar_full','img/hud/bar_full.png');
		game.load.spritesheet('inventory', 'img/hud/inventory.png', 132, 82);
		


		// Sounds for game
		// MUSIC
		game.load.path = 'assets/sounds/music/';
		game.load.audio('music1', ['sneak.mp3', 'sneak.ogg']);
		game.load.audio('alert', ['alert.mp3', 'alert.ogg']);
		game.load.audio('theme', ['theme.mp3', 'theme.ogg']);
		game.load.audio('alert-theme', ['alert-theme.mp3', 'alert-theme.ogg']);
		game.load.audio('caution-theme',['caution-theme.mp3', 'caution-theme.ogg']);

		// SFX
		game.load.path = 'assets/sounds/sfx/';
		game.load.audio('yay', ['yay.mp3', 'yay.ogg']);
		game.load.audio('tick', ['42-second.mp3', '42-second.ogg']);
		game.load.audio('ambience', ['ambience.mp3', 'ambience.ogg']);
		game.load.audio('button', ['button.mp3', 'button.ogg']);
		game.load.audio('explosion', ['explosion.mp3', 'explosion.ogg']);
		game.load.audio('footsteps', ['footsteps.mp3', 'footsteps.ogg']);
		game.load.audio('complete', ['level_complete.mp3', 'level_complete.ogg']);
		game.load.audio('fix', ['pothole.mp3', 'pothole.ogg']);
		game.load.audio('pothole_complete', ['pothole_jingle.mp3', 'pothole_jingle.ogg']);

		
	},
	
	create: function () {
		
		console.log('Create: loadState');
		var logo = game.add.image(400,250,'logo');
        logo.anchor.setTo(0.5);
		// Call to menuState.
		//game.state.start('play');
	},


	// Checks to see if audio is decoded!
	update: function() {
		if (this.cache.isSoundDecoded('alert') 
			&& this.cache.isSoundDecoded('alert-theme')
			&& this.cache.isSoundDecoded('caution-theme')
			&& this.cache.isSoundDecoded('yay')
			&& this.cache.isSoundDecoded('theme')) {
			game.state.start('menu');
		}
	}
}