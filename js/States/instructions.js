// Instantiate instructionState
var instructionsState = {
	
	preload: function(){
		game.load.path = 'assets/';
		this.load.image('bng', 'img/instructionsArt.png');
    	this.load.image('back', 'img/Back.png');
    	this.load.image('next', 'img/Next.png');   	
	},

	create: function () {
		
		console.log('Create: menuState');
		this.add.image(0,0,'bng');
        keyboard=game.input.keyboard;
    	nextButton = this.add.button(this.world.centerX + 180 , 520,'next', this.goToInstructions2, this); 
    	backButton = this.add.button(this.world.centerX  - 380, 520,'back', this.goToMenu, this);
	},

	
	 goToInstructions2: function() {
	 	button.play();
     	this.state.start('instructionsPg2');
	},

	 goToMenu: function() {
	 	button.play();
	    this.state.start('menu');
	 },
};