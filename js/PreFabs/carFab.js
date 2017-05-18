// Car Prefab for the police and citizen cars. 
// game = game object, key = the name of the car object, frame = which animation frames (If any), scale = size, rotation = the starting rotation of the car, police = true or false for headlights to beam. 
function Car(game, key, x, y){
	
	// Call to phaser.sprite(game, x, y, key, frame), new sprite
	Phaser.Sprite.call(this, game, x, y, key);
	
	// Additional properties to the car.
	this.anchor.set(0.5);
    //this.scale.setTo(0.5, 0.5);
    game.physics.enable(this);
}

// Setting up the prototype + Constructor
Car.prototype = Object.create(Phaser.Sprite.prototype);
Car.prototype.constructor = Car;

// Override any function/method call seem fit here:
/*Car.prototype.update = {
    
}*/