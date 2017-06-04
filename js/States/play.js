// Instantiate playState
var car;
var tween;
var bmd;
var points;
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
var potCount;
var ammo;
var firstCollect;
var playerHole=false;
var percentScore;
var numHoles;
var tweenScore;
var bar;
var arrow;
var toggle = true;

var playState = {
	create: function () {
		this.dead = false;
		this.spotted = false;
        ammo = 0;
        firstCollect = false;
        potCount=0;
        numHoles = 2;
        percentScore = 1/numHoles;
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
        /*
        //Prelim variable instantiation
        //Make increment smaller for faster moving sprite and vice versa
        increment = 1/200;
        i = 0;
        timerStopped = true;
        timer1 = null;*/
        
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
        map=game.add.tilemap('level1');
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
        this.createPothole(220,700);
        this.createPothole(640,300);
        
		// add player image
		player = game.add.sprite(500, 500, 'player');
		player.scale.setTo(.4,.4);
		game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.1, 0.1);
		player.anchor.setTo(0.5, 0.5);
        
        //set player animations
        player.animations.add('walkDown',Phaser.Animation.generateFrameNames('player_',1,6,'',2),20,false);
		player.animations.add('walkUp',Phaser.Animation.generateFrameNames('player_',12,7,'',2),20,false);
        player.animations.add('walkRight',Phaser.Animation.generateFrameNames('playerSide_',6,1,'',2),20,false);
        player.animations.add('walkLeft',Phaser.Animation.generateFrameNames('playerSide_',7,12,'',2),20,false);
        player.animations.play('walkDown');
		
        // player physics
		game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.setSize(50,50,8,0);
		player.body.collideWorldBounds = true;
        
        //Adding car
        //new Car(context, sprite, x(No effect), y(No effect), 
        //pathPoints, termination position, true = posx | false = posy, speed)
        car = new Car(game, 'car', 900, 500, points, 1200, true, 100);
        car.body.setSize(70,70,27,25);
        game.add.existing(car);
        
        //car2 = new Car(game, 'poCar', 900, 500, points2, 1000, false, 200);
        //car2.body.setSize(70,70,27,25);
        //game.add.existing(car2);
        
        //car3 = new Car(game, 'poCar', 900, 500, points3, 600, false, 200);
        //car3.body.setSize(70,70,27,25);
        //game.add.existing(car3);
        
        //tween = game.add.tween(car).to({x: [600, 900]}, 1000, "Linear", true, -1, false);
        //tween.onComplete.addOnce(this.tween2, this);
        	
		// Add Keyboard movement/actions here:
		keyboard = game.input.keyboard;

		//Cement filler group
        filler = game.add.group();
		fill = filler.create(825, 725,'fill');
		game.physics.enable(fill, Phaser.Physics.ARCADE);
		fill.body.immovable = true;
        fill.anchor.setTo(0.5);
        fill.scale.setTo(0.2);
        
        fill = filler.create(925, 775,'fill');
		game.physics.enable(fill, Phaser.Physics.ARCADE);
		fill.body.immovable = true;
        fill.anchor.setTo(0.5);
        fill.scale.setTo(0.2);
		
        // hud  here:
        
        arrow = game.add.sprite(0, 0, 'arrow');
        arrow.anchor.setTo(0.5, 0.5); 
        game.physics.enable(arrow, Phaser.Physics.ARCADE);
        arrow.fixedToCamera = true;
        arrow.cameraOffset.setTo(350, 300);
        
        arrow2 = game.add.sprite(0, 0, 'arrow2');
        arrow2.anchor.setTo(0.5, 0.5); 
        game.physics.enable(arrow2, Phaser.Physics.ARCADE);
        arrow2.fixedToCamera = true;
        arrow2.cameraOffset.setTo(550, 300);
        
		// Admiration Levels
		bar = game.add.sprite(700, 100, 'bar');
		bar.anchor.setTo(1, 1);
		bar.fixedToCamera = true;
		bar.cameraOffset.setTo(775, 525);
        
        barHeight = bar.height;
        var tweenTest = game.add.tween(bar.scale).to({y: 0}, 10, "Linear", true, 0, 0);
        
        tweenTest.start();

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
		this.gameover = game.add.text(400 , game.world.height/2, 'GAMEOVER\nPress "r" to return to menu ',{font: '30px Helvitica', fill: '#FFFFFF'});
		this.gameover.fixedToCamera = true;
		this.gameover.anchor.setTo(.5);
		this.gameover.cameraOffset.setTo(400, 300);
		this.dead = true;
	},

	collectFill: function(player, fill){
        if(firstCollect == false){
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
        bar.updateCrop();
        
        var t1 = car.x;
        var t2 = car.y
        
        px.push(car.x);
        py.push(car.y);
        
        angle = game.math.angleBetween(px[count-1], py[count-1], t1, t2);
        car.rotation = angle;
        
        if(ammo > 0){
            var s1 = car2.x;
            var s2 = car2.y
        
            px2.push(car2.x);
            py2.push(car2.y);
        
            angle2 = game.math.angleBetween(px2[count2-1], py2[count2-1], s1, s2);
            car2.rotation = angle2;
            
            var a1 = car3.x;
            var a2 = car3.y
        
            px3.push(car3.x);
            py3.push(car3.y);
        
            angle3 = game.math.angleBetween(px3[count2-1], py3[count2-1], a1, a2);
            car3.rotation = angle3;
            
            game.physics.arcade.overlap(player,car2,this.wasHit,null,this);
            game.physics.arcade.overlap(player,car3,this.wasHit,null,this);
            
            count2++;
        }
        
        count++;
        
        inv.frame = ammo;
        
        //Arrow stuff
        
        var closestPothole = potholes.getClosestTo(player, null, this);
        
        if(closestPothole != null){
            arrow.rotation = game.physics.arcade.angleBetween(arrow, closestPothole);
        }else{
            arrow.kill();
        }
        
        var closestCement = filler.getClosestTo(player, null, this);
        
        if(closestCement != null){
            arrow2.rotation = game.physics.arcade.angleBetween(arrow2, closestCement);
        }else{
            arrow2.kill();
        }
        
        //game.physics.arcade.moveToObject(arrow, player, 2000);
        
        //time check for game over
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
        
        //Timer controlling repeating cycle for car paths
        
		// Add collision:
		game.physics.arcade.overlap(player, filler, this.collectFill, null, this);
		game.physics.arcade.collide( player, mapBuildings);
        game.physics.arcade.overlap(player,car,this.wasHit,null,this);
        //game.physics.arcade.overlap(player,car2,this.wasHit,null,this);		
		// Add conditions for movement/actions here:
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
		
        //player movement/animations
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
        
        
        //Toggling arrows visibility
        if(keyboard.justPressed(Phaser.Keyboard.E)){
            arrow.alpha = toggle;
            arrow2.alpha = toggle;
            toggle = !toggle;
        }
        
		
		// Condition for removing a pothole
		// Specify in the "Instructions" that the player is to tap on spacebar.
		playerHole = game.physics.arcade.overlap(player,potholes);
        if(playerHole == true){
            game.physics.arcade.overlap(player,potholes,this.killPothole);
        }
        else{potholes.potCount = 0;}

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
        if(ammo > 0){
            game.debug.body(car2);
        }
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
    
    createPothole: function(x,y){
        var pothole = potholes.create(x,y,'pothole');
        var potholeCount=0;
        pothole.scale.setTo(0.2,0.2);
    },
    
    killPothole: function(player,pothole){
        if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
            potholes.potCount++;
            if(potholes.potCount == 10){
                potholes.remove(pothole);
                potholes.potCount = 0;
                ammo--;
                updateScore();
            }
        }
    }
}

function updateScore(){
        console.log(barHeight);
        percentScore = 1/numHoles;
        console.log(percentScore);
      
        var t1 = game.add.tween(bar.scale).to({y: percentScore}, 2000, "Linear", true, 0, 0);
      
        t1.start();
      
        if(numHoles > 1){
            numHoles--;
        }
}
