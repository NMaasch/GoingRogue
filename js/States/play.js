// Instantiate playState
var time = 60000 * 2 ; // value is ms

var playState = {
	create: function () {
		
		console.log('Create: playState');
		
		//  Resize our game world to be a 2000 x 2000 square
		game.world.setBounds(0, 0, 2632,1512);
		
		
		// add image background
        map=game.add.tilemap('level');
        map=addTilesetImage('temp','bgTile');
        map=addTilesetImage('roads','roadTile');
        map.addTilesetImage('buildings','buildingTile');
        mapBackground = map.createLayer('Background');
        mapBuildings = map.createLayer('Buildings');
        mapRoads = map.createLayer('Roads');
        map.setCollisionBetween(1,3000,true,'Buildings');
        mapBackground.resizeWorld();
		//map = game.add.image(0, 0, 'map1');
		//map.scale.setTo(2, 2);
		
		// add player image
		player = game.add.sprite(1150, 500, 'player');
		player.scale.setTo(.4,.4);
		game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.1, 0.1);

		player.anchor.setTo(0.5, 0.5);
        player.animations.add('walkDown',Phaser.Animation.generateFrameNames('player_',1,6,'',2),20,false);
		player.animations.add('walkUp',Phaser.Animation.generateFrameNames('player_',12,7,'',2),20,false);
        player.animations.add('walkRight',Phaser.Animation.generateFrameNames('playerSide_',6,1,'',2),20,false);
        player.animations.add('walkLeft',Phaser.Animation.generateFrameNames('playerSide_',7,12,'',2),20,false);
        player.animations.play('walkDown');
        //player.animations.add('walkDown', [0,1,2,3,4,5], 20, true);
		//player.animations.add('walkUp', [6,7,8,9,10,11], 20, true);
		
		// player physics
		game.physics.enable(player, Phaser.Physics.ARCADE);
		player.body.collideWorldBounds = true;
		

			
		// Add Keyboard movement/actions here:
		keyboard = game.input.keyboard;
		
		
		// Add sprites here:




		// hud  here:

		// TIMER
		box = game.add.sprite(20, 20, 'timerbox');
		box.anchor.setTo(.5);
		box.fixedToCamera = true;
		box.cameraOffset.setTo(400, 40);
		box.scale.setTo(1.2,1);
		timer = game.add.text(20,20, '',
								{font: '32px Comic Sans MS', fill: '#FFFFFF' });
		timer.anchor.setTo(.5);
		timer.fixedToCamera = true;
		timer.cameraOffset.setTo(400, 35);

		// Admiration Levels
		bar = game.add.sprite(700, 100, 'bar');
		bar.anchor.setTo(.5);
		box.scale.setTo(1.2,1.4);
		bar.fixedToCamera = true;
		bar.cameraOffset.setTo(775, 425);




		// Music and SFX here:
		music = game.add.audio('music',.8 , true);
		music.play();
		
	},
	
	update: function() {
		
		
		console.log('Update: playState');

		// time:
		timer.text = '' + Math.max( Math.round(time)/1000, 0.0 ).toFixed(1); ;
		time = time - 20;
		

		
		// Add collision:
		
		// Add conditions for movement/actions here:
		
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
		
		if(keyboard.isDown(Phaser.Keyboard.A)){
			player.body.velocity.x = -250;
			player.animations.play('walkLeft');
		}
		else if(keyboard.isDown(Phaser.Keyboard.D)){
			player.body.velocity.x = 250;
			player.animations.play('walkRight');
		}
		
		else if(keyboard.isDown(Phaser.Keyboard.W)){
			player.body.velocity.y = -250;
			player.animations.play('walkUp');
			
		}
		else if(keyboard.isDown(Phaser.Keyboard.S)){
			player.body.velocity.y = 250;
			player.animations.play('walkDown');
		}
		else{
			//player.animations.stop();
			player.frame = 'player_01';
		}
		
		
	},
	
	Win: function() {
		
		console.log('Win: playState');
		
		// Function call to winState.
		game.state.start('win');
	}
}
