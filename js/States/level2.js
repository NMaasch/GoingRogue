	// Instantiate playState
var car;
var bmd;
var px = [0];
var py = [0];
var px2 = [0];
var py2 = [0];
var px3 = [0];
var py3 = [0];
var px4 = [0];
var py4 = [0];
var count = 1;
var count2 = 1;
var percentScore;
var numHoles;
var potCount;
var ammo;
var firstCollect;
var playerHole=false;
var fill_angle = 0;
var toggle = true;
var spotted;
var check;

var level2State = {
	create: function () {
		
        // Music and SFX here:
		music_caution.play();
		ambience.play();
        
		// Variable declarations 
		this.foot_bool = false;
		this.dead = false;
		spotted = false;
        ammo = 0;
        firstCollect = false;
        potCount=0;
        numHoles = 3;
        percentScore = 1/numHoles;
		
		//TIME FOR LEVEL
		this.time = 60000; 
		
		console.log('Create: playState');
		
		//  Resize our game world to be a 2000 x 2000 square
		game.world.setBounds(0, 0, 2632,1512);
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
        bmd=null;
        
        //Plot points for the moving sprite(car). The same index in x and y 
        //array correspond to one point (x[1] = 600, y[1] = 600) is 600, 600 
        //on coordinate plane
        points = {
            'x' : [0, 800],
            'y' : [479, 479]
        };
        
        points2 = {
            'x' :[255, 255],
            'y' :[0, 1000]
        };
        
        points3 = {
            'x' :[672, 672],
            'y' :[0, 700]
        };
        
        //Creating bitmap
        bmd = this.add.bitmapData(game.width, game.height);
        bmd.addToWorld();
        
		// add image background and buildings
        map=game.add.tilemap('level2');
        map.addTilesetImage('Tilesheet','Tilesheet');
        mapBackground = map.createLayer('Background');
        mapRoads = map.createLayer('Roads');
        mapBuildings = map.createLayer('Buildings');
        map.setCollisionBetween(1,3000,true,'Buildings');
        mapBackground.resizeWorld();
		
        //Pothole group creation and physics enabled
        potholes = game.add.group(); //attach potholes to group
        potholes.enableBody = true;// enables physics to pothole object
        potholes.potCount=0; //Create a variable per pothole object.        
            
        //Pothole creation on level.
        this.createPothole(255,1000); 
        this.createPothole(575,120); 
        this.createPothole(1570,775);        

        
		// add player image
		player = game.add.sprite(1248, 576, 'player');
		player.scale.setTo(.4,.4);
		game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.1, 0.1);
		player.anchor.setTo(0.5, 0.5);
        
        //set player animations
        player.animations.add('walkDown',Phaser.Animation.generateFrameNames('player_',1,6,'',2),20,false);
		player.animations.add('walkUp',Phaser.Animation.generateFrameNames('player_',12,7,'',2),20,false);
        player.animations.add('walkRight',Phaser.Animation.generateFrameNames('playerSide_',6,1,'',2),20,false);
        player.animations.add('walkLeft',Phaser.Animation.generateFrameNames('playerSide_',7,12,'',2),20,false);
        player.animations.play('walkRight');
		
        // player physics
		game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.setSize(50,50,8,0);
		player.body.collideWorldBounds = true;
        
        //Adding car
        car = new Car(game, 'car', 900, 500, points, 1200, true, 100);
        car.body.setSize(70,70,27,25);
        game.add.existing(car);
        //tween = game.add.tween(car).to({x: [600, 900]}, 1000, "Linear", true, -1, false);
        //tween.onComplete.addOnce(this.tween2, this);
        
        //Arrows for pointing the player towards cement and potholes
        arrow = game.add.sprite(0, 0, 'arrow');
        arrow.anchor.setTo(0.5, 0.5); 
        game.physics.enable(arrow, Phaser.Physics.ARCADE);
        arrow.fixedToCamera = true;
        arrow.cameraOffset.setTo(350, 300);
        arrow.alpha=0;
        
        arrow2 = game.add.sprite(0, 0, 'arrow2');
        arrow2.anchor.setTo(0.5, 0.5); 
        game.physics.enable(arrow2, Phaser.Physics.ARCADE);
        arrow2.fixedToCamera = true;
        arrow2.cameraOffset.setTo(550, 300);
        arrow2.alpha=0;
        
        conText = game.add.text(16, 16, "Press 'E' to toggle indicators", {fontSize: '32px', fill: '#f9eb1d'});
        conText.anchor.set(0);
        conText.fixedToCamera = true;
        conText.cameraOffset.setTo(16, 16);
        //Fade text off screen
        game.time.events.add(10000, function(){game.add.tween(conText).to({alpha: 0}, 2000, "Linear", true)}, this);

        //spacebar
		spacebar=game.add.sprite(-100,0,'spacebar');
      	spacebar.animations.add('smash');
      	spacebar.animations.play('smash',8,true);
        	
		// Add Keyboard movement/actions here:
		keyboard = game.input.keyboard;

		//Cement filler group
        filler = game.add.group();
		fill1 = filler.create(96, 128,'fill');
		game.physics.enable(fill1, Phaser.Physics.ARCADE);
		fill1.body.immovable = true;
        fill1.anchor.setTo(0.5);
        fill1.scale.setTo(0.2);
        
        fill = filler.create(164, 128,'fill');
		game.physics.enable(fill, Phaser.Physics.ARCADE);
		fill.body.immovable = true;
        fill.anchor.setTo(0.5);
        fill.scale.setTo(0.2);
        
        fill2 = filler.create(1824, 352,'fill');
		game.physics.enable(fill2, Phaser.Physics.ARCADE);
		fill2.body.immovable = true;
        fill2.anchor.setTo(0.5);
        fill2.scale.setTo(0.2);
		
        // hud  here:
        // NEXT SET OF LINES TO ADD IN THE FILLED BAR
        bar_fill = game.add.sprite(500, 100, 'bar_full');
		bar_fill.anchor.setTo(1);
		bar_fill.fixedToCamera = true;
		bar_fill.cameraOffset.setTo(763, 497);
        
        var tweenBar = game.add.tween(bar_fill.scale).to({y: 0}, 10, "Linear", true, 0, 0);
        
        tweenBar.start();
        
		// Admiration Levels
		bar = game.add.sprite(500, 100, 'bar_empty');
		bar.anchor.setTo(1);
		bar.fixedToCamera = true;
		bar.cameraOffset.setTo(765, 500);
		
		// Filler Inventory
		inv = game.add.sprite(0, 20, 'inventory');
		inv.fixedToCamera = true;
		inv.cameraOffset.setTo(10, 500);
        
        check=0;
        
	},


	update: function() {		
		//console.log('Update: playState');
        
        //Car rotation
        //Saving car's position so that the angle may be calculated
        px.push(car.x);
        py.push(car.y);
        
        angle = game.math.angleBetween(px[count-1], py[count-1], px[count], py[count]);
        car.rotation = angle;
        
        //Rotating cop car along its path
        if(numHoles > 0 && firstCollect){
            px2.push(car2.x);
            py2.push(car2.y);
        
            angle2 = game.math.angleBetween(px2[count2-1], py2[count2-1], px2[count2], py2[count2]);
            car2.rotation = angle2;
        
            px3.push(car3.x);
            py3.push(car3.y);
        
            angle3 = game.math.angleBetween(px3[count2-1], py3[count2-1], px3[count2], py3[count2]);
            car3.rotation = angle3;
            
            game.physics.arcade.overlap(player,car2,this.wasHit,null,this);
            game.physics.arcade.overlap(player,car3,this.wasHit,null,this);
            
            count2++;
        }
        
        count++;
        
        //Arrow stuff
        //Finding closest pothole and pointing arrow at it
        var closestPothole = potholes.getClosestTo(player, null, this);
        
        if(closestPothole != null){
            arrow.rotation = game.physics.arcade.angleBetween(arrow, closestPothole);
        }else{
            arrow.kill();
        }
        
        //Finding closest cement bag and pointing at it
        var closestCement = filler.getClosestTo(player, null, this);
        
        if(closestCement != null){
            arrow2.rotation = game.physics.arcade.angleBetween(arrow2, closestCement);
        }else{
            arrow2.kill();
        }
        
        //Toggling arrows visibility
        if(keyboard.justPressed(Phaser.Keyboard.E)){
            arrow.alpha = toggle;
            arrow2.alpha = toggle;
            toggle = !toggle;
        }
        
        inv.frame = ammo;

        //rotation for fill
        fill.angle ++;
        fill1.angle ++;
        fill2.angle ++;
        
        //time check for game over
		if(this.time == 0&& check ==0){
			this.gameOver();
		}

		// once player picks up the fill timer starts ticking down;
		if(spotted == true){
			timer.text = '' + Math.max( Math.round(this.time)/1000, 0.0 ).toFixed(1); 
			this.time = this.time - 20;
		}

		
		// Add collision:
		game.physics.arcade.overlap(player, filler, this.collectFill, null, this);
		game.physics.arcade.collide( player, mapBuildings);
        game.physics.arcade.overlap(player,car,this.wasHit,null,this);

		
		// Add conditions for movement/actions here:
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
		

		if(this.foot_bool == true && this.dead==false){
			if(footstep.isPlaying == false){
				footstep.play();
			}
		} else footstep.stop();
	


        //player movement/animations
		if(keyboard.isDown(Phaser.Keyboard.A)){
			this.foot_bool = true;
			player.body.velocity.x = -250;
			player.animations.play('walkLeft');
		}
		else if(keyboard.isDown(Phaser.Keyboard.D)){
			this.foot_bool = true;
			player.body.velocity.x = 250;
			player.animations.play('walkRight');
		}
		
		else if(keyboard.isDown(Phaser.Keyboard.W)){
			this.foot_bool=true;
			player.body.velocity.y = -250;
			player.animations.play('walkUp');
			
		}
		else if(keyboard.isDown(Phaser.Keyboard.S)){
			this.foot_bool = true;
			player.body.velocity.y = 250;
			player.animations.play('walkDown');
		}
		else{
			this.foot_bool = false;
			//player.animations.stop();
			player.frame = 'player_01';
		}
        
		
		// Condition for removing a pothole
		// Specify in the "Instructions" that the player is to tap on spacebar.
		playerHole = game.physics.arcade.overlap(player,potholes);
        if(playerHole == true && ammo > 0){
        	spacebar.x=player.x-100;
        	spacebar.y=player.y-100;
            game.physics.arcade.overlap(player,potholes,this.killPothole);
        }
        else{
        	potholes.potCount = 0;
        	spacebar.x=-300;
        }
		
		// Condition for player death.
        if(this.dead==true){
                ticking.stop();
        	if(keyboard.isDown(Phaser.Keyboard.R)){
        		music_caution.stop();
        		music_alert.stop();
        		ambience.stop();
                music_gameover.stop();
        		game.state.start('level2State');
			}
        }
        if(percentScore == 1){
             spotted = false;
                //game.paused = true;
                this.winning = game.add.text(400 , game.world.height/2, '\t\t\t\tLEVEL COMPLETE!\n\t\tPress "R" to Continue ',{font: '70px Verdana', fill: '#ff0083'});
                this.winning.fixedToCamera = true;
                this.winning.anchor.setTo(.5);
                this.winning.cameraOffset.setTo(400, 300);
                ticking.stop();
                if(check==0){sfx_clapping.play();sfx_tada.play();}
                check=1;
                music_caution.stop();
                music_alert.stop();
                if (game.input.keyboard.isDown(Phaser.Keyboard.R)){
                    game.paused = false;
                    this.dead=false;
                    music_caution.stop();
                    music_alert.stop();
                    ambience.stop();
                    ticking.stop();
                    game.state.start('cutscene2State');
                }
         }
        
	},
	gameOver: function(){
		
		console.log('gameOver: function');
		check =1;
		spotted = false;
		
		explode = game.add.sprite(player.x, player.y, 'explosion');
		explode.anchor.setTo(.5);
        explode.scale.setTo(3);
		player.kill();
        music_caution.stop();
        music_alert.stop();
        music_gameover.play();
		//explosion sprite and sound
		
		explode.animations.add('explode');
		explode.animations.play('explode', 5, false);
		explosion.play();


		this.gameover = game.add.text(400 , game.world.height/2, '\t\t\t\t\t\t\tGAMEOVER!\n\t\tPress "R" to Restart. ',{font: '80px Verdana', fill: '#ff0083'});
		this.gameover.fixedToCamera = true;
		this.gameover.anchor.setTo(.5);
		this.gameover.cameraOffset.setTo(400, 300);
		this.dead = true;
	},

	
	collectFill: function(player, fill){
        if(firstCollect == false){
            
            //Adding in cop cars when cement is first collected
            car2 = new Car(game, 'poCar', 0, 0, points2, 1000, false, 200);
            car2.body.setSize(110,223,55,-66);
            game.add.existing(car2);
            
            car3 = new Car(game, 'poCar', 0, 0, points3, 1000, false, 200);
            car3.body.setSize(110,223,55,-66);
            game.add.existing(car3);
            
		  box = game.add.sprite(20, 20, 'timerbox');
		  box.scale.setTo(1.2,1.4);
		  box.anchor.setTo(.5);
		  box.fixedToCamera = true;
		  box.cameraOffset.setTo(400, 40);
		  box.scale.setTo(1.2,1);
		  timer = game.add.text(20,20, '',{font: '32px Helvitica', fill: '#FFFFFF' });
		  timer.anchor.setTo(.5);
		  timer.fixedToCamera = true;
		  timer.cameraOffset.setTo(400, 35);
          firstCollect = true;
          sfx_alert.play();
		  music_caution.stop();
		  music_alert.play();
		  ticking.play();
        }
		spotted = true;
		if(ammo<2) { 
			ammo++;
			inv.frame = ammo;
			fill.kill();
		}
	},
	
	//used to debug~!!!!!
	render: function(){ 
        //game.debug.bodyInfo(player,32,32);
        //game.debug.body(player);
        //game.debug.body(car);
        //potholes.forEach(this.game.debug.body, this.game.debug);
    },
	
	
    wasHit: function(){
        //console.log('was hit');
        if(percentScore != 1){
			this.gameOver();
		}
		
        //console.log('wasHit');
    },
	
	
    createPothole: function(x,y){
        var pothole = potholes.create(x,y,'potholeAnim');
        var potholeCount = 0;
		pothole.frame = 0;	
		// Condition for flipping the animation state back to original state.
		if(potholeCount == 0){
			pothole.frame = 0;
		}
    },
   
    killPothole: function(player,pothole){
        if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
            
			potholes.potCount++;
            fix.play();
            game.camera.shake(0.01,300);
			//Pothole Animations when player hits spacebar
			if(potholes.potCount == 2){pothole.frame = 2;}
			if(potholes.potCount == 4){pothole.frame = 1;}
			if(potholes.potCount == 6){pothole.frame = 3;}
			if(potholes.potCount == 8){pothole.frame = 4;}
            if(potholes.potCount == 10){
            	pothole_complete.play();
                potholes.remove(pothole);
                potholes.potCount = 0;
                ammo--;
                //this was updateScore function
				percentScore = 1/numHoles;
                var t1 = game.add.tween(bar_fill.scale).to({y: percentScore}, 500, "Linear", true, 0, 0);
                t1.start();
                if(numHoles > 1){
                    numHoles--;
                }
            }
        } 
    }
}
