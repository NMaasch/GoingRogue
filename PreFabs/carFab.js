// Car Prefab for the police and citizen cars. 
// game = game object, key = the name of the car object, frame = which animation frames (If any), scale = size, rotation = the starting rotation of the car, police = true or false for headlights to beam. 
function Car(game, key, frame, x, y, scale, rotation, police){
	
	// Call to phaser.sprite(game, x, y, key, frame), new sprite
	Phaser.Sprite.call(this, game, x, y, key, frame);
	
	// Additional properties to the car.
	this.anchor.set(0.5);
	this.scale.x = (scale*.5);
	this.scale.y = scale;
	this.rotation = rotation;
	
	if ( police == true ){
		
	}
}

// Setting up the prototype + Constructor
Car.prototype = Object.create(Phaser.Sprite.prototype);
Car.prototype.constructor = Car;

// Override any function/method call seem fit here: