// Instantiate bootState.
var bootState = {
	// Create function - instantiating physics system.
	preload: function(){
        game.load.image('logo','assets/img/Logo.jpg');
    },
    
    create: function () {
		
		console.log('Create: bootState');
		
		// Starting physics system.
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		// Call to loadState.
		game.state.start('load');
	}
};