// Instantiate playState
var playState = {
	create: function () {
		
		console.log('Create: playState');
		
		//  Resize our game world to be a 2000 x 2000 square
		game.world.setBounds(0, 0, 1316, 756);
		
		
		// add image background
		map = game.add.image(0, 0, 'map1');
		
		// add player image
		player = game.add.sprite(0, 0, 'player');
		game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.1, 0.1);

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
			player.body.velocity.x = -300;
			//player.animations.play('walkDown');
		}
		else if(keyboard.isDown(Phaser.Keyboard.RIGHT)){
			player.body.velocity.x = 300;
			//player.animations.play('walkDown');
		}
		
		else if(keyboard.isDown(Phaser.Keyboard.UP)){
			player.body.velocity.y = -300;
			player.animations.play('walkUp');
			
		}
		else if(keyboard.isDown(Phaser.Keyboard.DOWN)){
			player.body.velocity.y = 300;
			player.animations.play('walkDown');
		}
		else{
			player.animations.stop();
			player.frame = [0];
		}
		
		
	},
	
	Win: function() {
		
		console.log('Win: playState');
		
		// Function call to winState.
		game.state.start('win');
	}
}
