// Instantiate menuState
var menuState = {
	
	preload: function(){
		game.load.path = 'assets/';
		this.load.image('startB', 'img/start.png');
    	this.load.image('instructionsB', 'img/Instructions.png');
	},

	create: function () {
		
		console.log('Create: menuState');

    	startButton = this.add.button(this.world.centerX - 95, 150,'startB', this.startGame, this); 
    	startInstuction = this.add.button(this.world.centerX - 95, 300,'instructionsB', this.goToInstructions, this);
	},
	
	 startGame: function() {
     	this.state.start('play');
	},

	 goToInstructions: function() {
	    this.state.start('instructions');
	 },
};