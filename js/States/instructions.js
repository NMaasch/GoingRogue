// Instantiate instructionState
var instructionsState = {
	
	preload: function(){
		game.load.path = 'assets/';
		this.load.image('bng', 'img/instructionsArt.png');
    	this.load.image('back', 'img/Back.png');
    	this.load.image('start', 'img/StartArrow.png');    	
	},

	create: function () {
		
		console.log('Create: menuState');
		this.add.image(0,0,'bng');

    	startButton = this.add.button(this.world.centerX + 180 , 520,'start', this.startGame, this); 
    	backButton = this.add.button(this.world.centerX  - 380, 520,'back', this.goToMenu, this);
	},
	
	 startGame: function() {
     	this.state.start('play');
	},

	 goToMenu: function() {
	    this.state.start('menu');
	 },
};