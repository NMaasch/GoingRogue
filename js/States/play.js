var car;
var tween;
var bmd;
var points;
var count = 0;
var px = 0;
var py = 0;

// Instantiate playState
var playState = {
	create: function () {
		
		console.log('Create: playState');
		
		//  Resize our game world to be a 2000 x 2000 square
		game.world.setBounds(0, 0, 2632,1512);
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
        bmd = null;
        
        //Plot points for the moving sprite. The same index in x and y 
        //array correspond to one point (x[1] = 600, y[1] = 600) is 600, 600 
        //on coordinate plane
        points = {
            'x' : [600, 300, 300, 600, 600],
            'y' : [600, 600, 300, 300, 600]
        };
        
        //Prelim variable instantiation
        //Make increment smaller for faster moving sprite and vice versa
        increment = 1/500;
        i = 0;
        timerStopped = true;
        timer1 = null;
        
        //Creating bitmap
        bmd = this.add.bitmapData(game.width, game.height);
        bmd.addToWorld();
        
        //Loop to draw path for visualization
        /*for(let j = 0; j < 1; j += increment) {
            var posx = this.math.linearInterpolation(points.x, j);
            var posy = this.math.linearInterpolation(points.y, j);
            bmd.rect(posx, posy, 3, 3, 'rgba(245, 0, 0, 1)');
        }*/
        
		// add image background
		map = game.add.tilemap('level');
        map.addTilesetImage('temp','tiles');
        mapBackground = map.createLayer('Background');
        mapBuildings = map.createLayer('Buildings');
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
        
        //Adding test car
        car = new Car(game, 'car', 900, 500);
        game.add.existing(car);
        //tween = game.add.tween(car).to({x: [600, 900]}, 1000, "Linear", true, -1, false);
        //tween.onComplete.addOnce(this.tween2, this);
		
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
		
        
        //Allows for car movement to repeat upon reaching end of path
        if(timerStopped){
            timerStopped = false;
            timer1 = game.time.create(true);
            timer1.loop(.01, this.plot, this);
            timer1.start();
        }
        
        
		// Add collision:
		game.physics.arcade.collide(player, mapBuildings);
		// Add conditions for movement/actions here:
        game.physics.arcade.overlap(player, car, this.wasHit, null, this);
		
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
	},
    render: function(){
        game.debug.spriteInfo(player, 32, 32);
    },
    wasHit: function(){
        console.log('wasHit');
    },
    plot: function(){
        var posx = this.math.linearInterpolation(points.x, i);
        var posy = this.math.linearInterpolation(points.y, i);
        car.x = posx;
        car.y = posy;
        i += increment;
        /*angle = this.math.angleBetween(px, py, posx, posy);
        car.rotation = angle;
        
        var px = {'x': posx};
        var py = {'y': posy};

        console.log(px);*/
        //posy in this case will terminate the sprite when it reaches a certain
        //y-position. Can be changed to terminate upon reaching certain 
        //x-pos
        if(posy > 1180) {
            timer1.stop();
            timer1.destroy();
            i = 0;
            timer1Stopped = true;
        }
    }
    
}
