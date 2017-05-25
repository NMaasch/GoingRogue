// Instantiate menuState
var menuState = {
	
	preload: function(){
		game.load.path = 'assets/';
		this.load.image('startB', 'img/start.png');
    	this.load.image('instructionsB', 'img/Instructions.png');
        this.load.image('bg','img/bng.png');
	},

	create: function () {
		
		console.log('Create: menuState');
        game.world.setBounds(0,0,800,600);
        this.add.image(0,0,'bg');
        keyboard=game.input.keyboard;
    	startButton = this.add.button(this.world.centerX - 65, 150,'startB', this.startGame, this);
        game.camera.setPosition(0,0);
    	startInstuction = this.add.button(this.world.centerX - 65, 300,'instructionsB', this.goToInstructions, this);
	},
    update: function(){
        if(keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            this.state.start('play');
        }
    },
	
	 startGame: function() {
     	this.state.start('play');
	},

	 goToInstructions: function() {
	    this.state.start('instructions');
	 },
};