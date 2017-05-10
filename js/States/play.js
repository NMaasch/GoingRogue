// Instantiate playState
var playState = {
	create: function () {
		
		console.log('Create: playState');
		
		//  Resize our game world to be a 2000 x 2000 square
		// game.world.setBounds(0, 0, 1316, 756);
		
		
		// add image background
		map = game.add.image('map1', 0, 0);
		
		// add player image
		player = game.add.sprite(0, 0, 'player');
		
		player.anchor.setTo(0.5, 0.5);
		player.animations.add('walkDown', [0,1,2,3,4,5], 20, true);
		player.animations.add('walkUp', [6,7,8,9,10,11], 20, true);
		
		// player physics
		game.physics.enable(player, Phaser.Physics.ARCADE);
		player.body.collideWorldBounds = true;
		

			
		// Add Keyboard movement/actions here:
		keyboard = game.input.keyboard;
		
		
		// Add sprites here:
		
	},
	
	update: function() {
		
		
		console.log('Update: playState');
		
		// Add collision:
		
		// Add conditions for movement/actions here:
		
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
		
		if(keyboard.isDown(Phaser.Keyboard.LEFT)){
			player.body.velocity.x = -5;
		}
		else if(keyboard.isDown(Phaser.Keyboard.RIGHT)){
			player.body.velocity.x = 5;
		}
		
		else if(keyboard.isDown(Phaser.Keyboard.UP)){
			player.body.velocity.y = -5;
		}
		else if(keyboard.isDown(Phaser.Keyboard.DOWN)){
			player.body.velocity.y = 5;
		}
		
		
	},
	
	Win: function() {
		
		console.log('Win: playState');
		
		// Function call to winState.
		game.state.start('win');
	}
}