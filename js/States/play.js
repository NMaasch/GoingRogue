// Instantiate playState
var playState = {
	create: function () {
		
		console.log('Create: playState');
		
		// Add Keyboard movement/actions here:
		
		// Add sprites here:
		
	},
	
	update: function() {
		
		console.log('Update: playState');
		
		// Add collision:
		
		// Add conditions for movement/actions here:
		
	},
	
	Win: function() {
		
		console.log('Win: playState');
		
		// Function call to winState.
		game.state.start('win');
	}
}