// Instantiate a new phaser game object
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

// Adding Game States
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('instructions', instructionsState);
game.state.add('instructionsPg2', instructionsPg2State);
game.state.add('intro',introState);
game.state.add('play', playState);
game.state.add('cutscene1State',cutscene1State);
game.state.add('level2State',level2State);
game.state.add('cutscene2State',cutscene2State);
game.state.add('level3State',level3State);
game.state.add('creditState',creditState);
game.state.add('win', winState);

// Start game by calling boot
game.state.start('load');