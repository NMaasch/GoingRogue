// Instantiate instruction2State
var instructionsPg2State = {
	
	preload: function(){
		game.load.path = 'assets/';
		this.load.image('bng', 'img/instructionsArt2.png');
    	this.load.image('back', 'img/Back.png');
    	this.load.image('start', 'img/StartArrow.png');    	
	},

	create: function () {
		
		console.log('Create: menuState');
		this.add.image(0,0,'bng');
        keyboard=game.input.keyboard;
    	startButton = this.add.button(this.world.centerX + 180 , 520,'start', this.startGame, this); 
    	backButton = this.add.button(this.world.centerX  - 380, 520,'back', this.goToInstructions, this);
	},
     update: function(){ 
      if(keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            button.play();
            theme.destroy();
            this.state.start('intro'); 
        }   
    },
	
	 startGame: function() {
	 	theme.destroy();
	 	button.play();
     	this.state.start('intro');
	},

	 goToInstructions: function() {
	 	button.play();
	    this.state.start('instructions');
	 },
};