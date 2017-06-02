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
            this.state.start('play');
        }
    },
	
	//fuctions for buttons 
	 startGame: function() {
     	this.state.start('play');
	},

	 goToInstructions: function() {
	    this.state.start('instructions');
	 },
};