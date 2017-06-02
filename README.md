# GoingRogue
GoingRogue Game
-----------------------------------------------------------------------------
index.html

Working html document that has our file structure to the JS files.
Please update this file as folder path's and file name's change.

-----------------------------------------------------------------------------

game.js

This JS file holds the order in which our states fire off.
If there is a design change in the state format, please change in this file.

-----------------------------------------------------------------------------

boot.js

This loads the game physics system.
Not sure what else should go in this file.

-----------------------------------------------------------------------------

load.js

Loads assets to game.
Should include all audio and img files. 

-----------------------------------------------------------------------------

menu.js

This is the state that manages the level content.
It is also the portal for the player to access game functionality.

-----------------------------------------------------------------------------

instructions.js

This is the state that manages the instructions of the game.
It is also the portal for the player to access the menu or the the second page of the instructions.

-----------------------------------------------------------------------------

instructionsPg2.js

This is the state that manages the second page of the instructions of the game.
It is also the portal for the player to access the game or the the first page of the instructions.

-----------------------------------------------------------------------------

play.js

The main game loop resides here.
Update as needed and often.

-----------------------------------------------------------------------------

win.js

Initial win/lose state. 
This will show the player if they have won or lost with a timed metric.
Functionality includes replay button, next level button, or main menu button.

------------------------------------------------------------------------------

carFab.js

A prefab for car objects within the game.
Inherits from Phaser.Sprite()
Added a function that will take in scale, coordinates, police boolean.
No update override as of yet. Waiting to collaborate with group.

-------------------------------------------------------------------------------