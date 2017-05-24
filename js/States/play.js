// Instantiate playState
var time = 60000 * 2 ; // value is ms
var car;
var tween;
var bmd;
var points;
var count=0;
var px=0;
var py=0;
//var potCount = 0;

var playState = {
	create: function () {
		
		console.log('Create: playState');
		
		//  Resize our game world to be a 2000 x 2000 square
		game.world.setBounds(0, 0, 2632,1512);
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
        bmd=null;
        
        //Plot points for the moving sprite(car). The same index in x and y 
        //array correspond to one point (x[1] = 600, y[1] = 600) is 600, 600 
        //on coordinate plane
        points = {
            'x' : [0, 480,480,64,64],
            'y' : [480, 480,64,64,480]
        };
        
        //Prelim variable instantiation
        //Make increment smaller for faster moving sprite and vice versa
        increment = 1/400;
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
        map=game.add.tilemap('level');
        map.addTilesetImage('temp','bgTile');
        map.addTilesetImage('roads','roadTile');
        map.addTilesetImage('buildings','buildingTile');
        mapBackground = map.createLayer('Background');
        mapBuildings = map.createLayer('Buildings');
        mapRoads = map.createLayer('Roads');
        map.setCollisionBetween(1,3000,true,'Buildings');
        mapBackground.resizeWorld();
		//map = game.add.image(0, 0, 'map1');
		//map.scale.setTo(2, 2);
		
        // Pothole group creation and physics enabled. 
        potholes = game.add.group(); // attach potholes to a group.
		potholes.enableBody = true;	// enables physics to pothole object.
		potholes.potCount = 0;	// Create a variable per pothole object.
		
        
		// Pothole creation on level.
		createPothole(481, 400);
		createPothole(481, 300);
		createPothole(481, 200);

        
		// add player image
		player = game.add.sprite(500, 500, 'player');
		player.scale.setTo(.4,.4);
		game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.1, 0.1);

		player.anchor.setTo(0.5, 0.5);
        player.animations.add('walkDown',Phaser.Animation.generateFrameNames('player_',1,6,'',2),20,false);
		player.animations.add('walkUp',Phaser.Animation.generateFrameNames('player_',12,7,'',2),20,false);
        player.animations.add('walkRight',Phaser.Animation.generateFrameNames('playerSide_',6,1,'',2),20,false);
        player.animations.add('walkLeft',Phaser.Animation.generateFrameNames('playerSide_',7,12,'',2),20,false);
        player.animations.play('walkDown');

		
        //Adding test car
        car = new Car(game, 'car', 900, 500);
        game.add.existing(car);
		car.body.setSize(125,55,10,35);
        //tween = game.add.tween(car).to({x: [600, 900]}, 1000, "Linear", true, -1, false);
        //tween.onComplete.addOnce(this.tween2, this);

        
		// player physics
		game.physics.enable(player, Phaser.Physics.ARCADE);
		player.body.collideWorldBounds = true;
		
			
		// Add Keyboard movement/actions here:
		keyboard = game.input.keyboard;
		

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
		
        if(timerStopped){
            timerStopped = false;
            timer1 = game.time.create(true);
            timer1.loop(.01, this.plot, this);
            timer1.start();
        }
		
		// Add collision:
		game.physics.arcade.collide(player, mapBuildings);
        game.physics.arcade.overlap(player,car,this.wasHit,null,this);
		
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
			player.frame = 'player_01';
		}
        
		
		// Condition for removing a pothole
		// (SOLVED)Bug: if the player holds down the space bar it is continually updating the potCount.
		// This is why it is set to 50. It is a bit inconsistant with the spacebar pressing, but works as intended.
		// Specify in the "Instructions" that the player is to tap on spacebar.
		game.physics.arcade.overlap(player, potholes, killPothole); 
             
        

        // debug section~!!!!!~ 
        game.debug.bodyInfo(player, 32, 32); 
 
        game.debug.body(player); 
        game.debug.body(car); 
      
	},
	
	
	Win: function() {
		
		console.log('Win: playState');
		
		// Function call to winState.
		game.state.start('win');
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

function createPothole(x,y){ 
	var pothole = potholes.create(x,y, 'pothole'); 
    var potholeCount = 0;
    pothole.scale.setTo(.2,.2); 
}

function killPothole(player, pothole){
	if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){ 
            potholes.potCount++;
			if ( potholes.potCount == 10 ){
				potholes.remove(pothole);
				potholes.potCount = 0;
			}
        }
}