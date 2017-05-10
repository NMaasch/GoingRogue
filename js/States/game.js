// Instantiate a new phaser game object
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

// Adding Game States
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);

// Start game by calling boot
game.state.start('boot');