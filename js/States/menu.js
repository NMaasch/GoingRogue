// Instantiate menuState
var menuState = {
	
	preload: function(){
		game.load.path = 'assets/';
		this.load.image('logoName', 'img/logoName.png');
		this.load.image('startB', 'img/start.png');
    	this.load.image('instructionsB', 'img/Instructions.png');
        this.load.image('bg','img/bng.png');
	},

	create: function () {

		music_caution = game.add.audio('caution-theme',.5 , true);
		music_alert = game.add.audio('alert-theme', .5, true);
		sfx_alert = game.add.audio('alert', .6, false);
		footstep =game.add.audio('footsteps', .2, true);
		ambience = game.add.audio('ambience', .4, true);
		ticking = game.add.audio('tick', .8, false);
		fix = game.add.audio('fix', .9, false);
		explosion = game.add.audio('explosion', .6, false);
		pothole_complete = game.add.audio('pothole_complete', 1, false);
        
		button = game.add.audio('button', .8, false);
		
		//console log, setting bounds of game, setting camera
		console.log('Create: menuState');
        game.world.setBounds(0,0,800,600);
        game.camera.setPosition(0,0);
        
        //setting variable keyboard
        keyboard=game.input.keyboard;

        //adding background and logo
        this.add.image(0,0,'bg');
        this.add.image(this.world.centerX-200,100,'logoName');

        //adding buttons to game + leads to function 
    	startButton = this.add.button(this.world.centerX - 65, 220,'startB', this.startGame, this);
    	startInstuction = this.add.button(this.world.centerX - 65, 350,'instructionsB', this.goToInstructions, this);
	},
	
	// can start game by pressing spacebar 
    update: function(){
        if(keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        	theme.destroy();
            this.state.start("intro");
        }
    },
	
	//fuctions for buttons 
	 startGame: function() {
	 	button.play();
	 	theme.destroy();
     	this.state.start('play');
	},

	 goToInstructions: function() {
	 	button.play();
	    this.state.start('instructions');
	 },
};