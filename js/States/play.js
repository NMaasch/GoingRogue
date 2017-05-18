// Instantiate playState
var playState = {
	create: function () {
		
		console.log('Create: playState');
		
		//  Resize our game world to be a 2000 x 2000 square
		game.world.setBounds(0, 0, 2632,1512);
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		// add image background
		map = game.add.tilemap('level');
        map.addTilesetImage('temp','tiles');
        mapBackground = map.createLayer('Background');
        mapBuildings = map.createLayer('Buildings');
        map.setCollisionBetween(1,3000,true,'Buildings');
        mapBackground.resizeWorld();
        //map = game.add.image(0, 0, 'map1');
		//map.scale.setTo(2, 2);


		// add pothole image ------> convert to Group!!!
		potholes = game.add.group();
		
		//potholes.create(1000,400,'pothole');
		//createPothole(1000, 300);
		
		pothole = game.add.sprite(1000, 400, 'pothole');
		pothole.scale.setTo(.2,.2);
		pothole.anchor.setTo(0.5,0.5);
		
		// pothole physics
		game.physics.enable(pothole, Phaser.Physics.ARCADE);
		
		// adjusting hitbox size 
		pothole.body.setSize(200, 175, 75, 75);
		pothole.body.immovable = true;


        
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

		// Music and SFX here:
		music = game.add.audio('music',.8 , true);
		music.play();
		
	},
	
	update: function() {
		
		
		console.log('Update: playState');
		
		// Add collision:
		game.physics.arcade.collide( player, mapBuildings);
		
		// Add Overlap
		
		
		
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
		
		
		if (game.physics.arcade.overlap(player, pothole) == true && game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			pothole.destroy();
		}	
			
			
		//pothole.events.onInputDown.add(destroySprite, this);
		
		
		// debug section~!!!!!~
		game.debug.bodyInfo(player, 32, 32);

		game.debug.body(player);
		game.debug.body(pothole);
		
	},
	
	Win: function() {
		
		console.log('Win: playState');
		
		// Function call to winState.
		game.state.start('win');
	}
}

	function createPothole(x,y){
		potholes.create(x,y, 'pothole');
		
	//	potholes.scale.setTo(.2,.2);
		//potholes.anchor.setTo(0.5,0.5);
		
		// pothole physics
	//	game.physics.enable(potholes, Phaser.Physics.ARCADE);
		
		// adjusting hitbox size 
	//	potholes.body.setSize(200, 175, 75, 75);
	//	potholes.body.immovable = true;
	}
	
	
	function destroySprite(pothole){
		
	}