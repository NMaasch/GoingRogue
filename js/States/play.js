// Instantiate playState
var car;
var tween;
var bmd;
var points;
var count = 1;
var px = [0];
var py = [0];
var potCount = 0;
var ammo;
var firstCollect;

var playState = {
	create: function () {
		this.dead = false;
		this.spotted = false;
        ammo = 0;
        firstCollect = false;

		//TIME FOR LEVEL
		this.time = 60000 / 2; 
		
		console.log('Create: playState');
		
		//  Resize our game world to be a 2000 x 2000 square
		game.world.setBounds(0, 0, 2632,1512);
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
        bmd=null;
        
        //Plot points for the moving sprite(car). The same index in x and y 
        //array correspond to one point (x[1] = 600, y[1] = 600) is 600, 600 
        //on coordinate plane
        points = {
            'x' : [64, 480,480,64,64],
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
        
		// add image background and buildings
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
		
        // add pothole image ------> convert to Group!!! 
        potholes = game.add.group(); 
     
        //potholes.create(1000,400,'pothole'); 
        //createPothole(1000, 300); 
     
        pothole = game.add.sprite(481, 400, 'pothole'); 
        pothole.scale.setTo(.2,.2); 
        pothole.anchor.setTo(0.5,0.5); 
     
        // pothole physics 
        game.physics.enable(pothole, Phaser.Physics.ARCADE); 
     
        // adjusting hitbox size for pothole  
        pothole.body.setSize(200, 175, 75, 75); 
        pothole.body.immovable = true; 
        
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
		
        // player physics
		game.physics.enable(player, Phaser.Physics.ARCADE);
		player.body.collideWorldBounds = true;
        
        //Adding test car
        car = new Car(game, 'car', 900, 500);
        car.body.setSize(70,70,27,25);
        game.add.existing(car);
        //tween = game.add.tween(car).to({x: [600, 900]}, 1000, "Linear", true, -1, false);
        //tween.onComplete.addOnce(this.tween2, this);
        	
		// Add Keyboard movement/actions here:
		keyboard = game.input.keyboard;
		
		
		// Add sprites here:

		//Cement filler group
        filler = game.add.group();
        
		fill = filler.create(700, 500,'fill');
		game.physics.enable(fill, Phaser.Physics.ARCADE);
		fill.body.immovable = true;
        
        fill = filler.create(900, 500,'fill');
		game.physics.enable(fill, Phaser.Physics.ARCADE);
		fill.body.immovable = true;
        
		// hud  here:

		// Admiration Levels
		bar = game.add.sprite(700, 100, 'bar');
		bar.anchor.setTo(.5);
		bar.fixedToCamera = true;
		bar.cameraOffset.setTo(775, 425);

		// Filler Inventory
		inv = game.add.sprite(0, 20, 'inventory');
		inv.animations.add('empty', [0], false);
		//inv.animations.add('1', [1], false);
		//inv.animations.add('2', [2], false);
		//inv.scale.setTo(.8,.8)
		//inv.anchor.setTo(.5);
		inv.fixedToCamera = true;
		inv.cameraOffset.setTo(10, 500);
		inv.animations.play('empty');

		// Music and SFX here:
		music_caution = game.add.audio('caution-theme',.8 , true);
		music_alert = game.add.audio('alert-theme', .8, true);
		sfx_alert = game.add.audio('alert', .9, false);
		music_caution.play();
	},
	gameOver: function(){
		player.kill();
		this.gameover = game.add.text(400 , game.world.height/2, 'GAMEOVER\nPress "r" to return to menu ',
										{font: '30px Helvitica', fill: '#FFFFFF'});
		this.gameover.fixedToCamera = true;
		this.gameover.anchor.setTo(.5);
		this.gameover.cameraOffset.setTo(400, 300);
		this.dead = true;
	},

	collectFill: function(player, fill){
        if(firstCollect == false){
		  box = game.add.sprite(20, 20, 'timerbox');
		  box.scale.setTo(1.2,1.4);
		  box.anchor.setTo(.5);
		  box.fixedToCamera = true;
		  box.cameraOffset.setTo(400, 40);
		  box.scale.setTo(1.2,1);
		  timer = game.add.text(20,20, '',
				{font: '32px Comic Sans MS', fill: '#FFFFFF' });
		  timer.anchor.setTo(.5);
		  timer.fixedToCamera = true;
		  timer.cameraOffset.setTo(400, 35);
          firstCollect = true;
          sfx_alert.play();
		  music_caution.stop();
		  music_alert.play();
        }
		//sfx_alert.play();
		//music_caution.stop();
		//music_alert.play();
		this.spotted = true;
		if(ammo<=2) { 
			ammo++;
			inv.frame = ammo;
			fill.kill();
		}
	},
	update: function() {		
		//console.log('Update: playState');
        
        inv.frame = ammo;
        
		if(this.time == 0){
			this.gameOver();
		}
		// time:
//		timer.text = '' + Math.max( Math.round(this.time)/1000, 0.0 ).toFixed(1);
//		this.time = this.time - 20;

		// once player picks up the fill timer starts ticking down;

		if(this.spotted == true){
			timer.text = '' + Math.max( Math.round(this.time)/1000, 0.0 ).toFixed(1); 
			this.time = this.time - 20;
		}	
        if(timerStopped){
            timerStopped = false;
            timer1 = game.time.create(true);
            timer1.loop(.01, this.plot, this);
            timer1.start();
        }
		
		// Add collision:
		game.physics.arcade.overlap(player, filler, this.collectFill, null, this);

		game.physics.arcade.collide( player, mapBuildings);
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
			//player.animations.stop();
			player.frame = 'player_01';
		}
        
		
		// Condition for removing a pothole
		// (SOLVED)Bug: if the player holds down the space bar it is continually updating the potCount.
		// This is why it is set to 50. It is a bit inconsistent with the spacebar pressing, but works as intended.
		// Specify in the "Instructions" that the player is to tap on spacebar.
		if (game.physics.arcade.overlap(player, pothole) == true && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){ 
            potCount++;
			if ( potCount == 10 ){
				pothole.destroy();
				potCount == 0;
                ammo--;
			}
        }
        
        //pothole.events.onInputDown.add(destroySprite, this); 

        if(this.dead==true){
        	if(keyboard.isDown(Phaser.Keyboard.R)){
        		music_caution.stop();
        		music_alert.stop();
        		game.state.start('menu');
			}
        }
	},
	render: function(){//used to debug~!!!!!~ 
        //game.debug.bodyInfo(player,32,32);
        //game.debug.body(player);
        //game.debug.body(pothole);
        game.debug.body(car);
    },
	Win: function() {
		
		console.log('Win: playState');
		
		// Function call to winState.
		game.state.start('win');
	},
    wasHit: function(){
        this.gameOver();
        //console.log('wasHit');
    },
    plot: function(){
        var posx = this.math.linearInterpolation(points.x, i);
        var posy = this.math.linearInterpolation(points.y, i);
        car.x = posx;
        car.y = posy;
        i += increment;
        
        px.push(posx);
        py.push(posy);
        //console.log(px);
        
        angle = this.math.angleBetween(px[count-1], py[count-1], posx, posy);
        car.rotation = angle;
        //posy in this case will terminate the sprite when it reaches a certain
        //y-position. Can be changed to terminate upon reaching certain 
        //x-pos
        if(posy > 480) {
            timer1.stop();
            timer1.destroy();
            i = 0;
            timerStopped = true;
        }
        count++;
    },
    createPothole: function(x,y){ 
    potholes.create(x,y, 'pothole'); 
     
    //potholes.scale.setTo(.2,.2); 
    //potholes.anchor.setTo(0.5,0.5); 
     
    //pothole physics 
    //game.physics.enable(potholes, Phaser.Physics.ARCADE); 
     
    //adjusting hitbox size  
    //potholes.body.setSize(200, 175, 75, 75); 
    //potholes.body.immovable = true; 
  }, 
   
   
  //function destroySprite(pothole){ 
     
  //}
    
}
