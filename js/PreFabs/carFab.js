// Car Prefab for the police and citizen cars. 
// game = game object, key = the name of the car object, frame = which animation frames (If any), scale = size, rotation = the starting rotation of the car, police = true or false for headlights to beam. 
//var count = 1;
var pos;
//var temp1 = 0;
//var temp2 = 0;
//var px = [0];
//var py = [0];

function Car(game, key, x, y, p, termPoint, xOrY, speed, toF){
	
	// Call to phaser.sprite(game, x, y, key, frame), new sprite
	Phaser.Sprite.call(this, game, x, y, key);
	
	// Additional properties to the car.
	this.anchor.set(0.5);
    //this.scale.setTo(0.5, 0.5);
    game.physics.enable(this);
    
    this.points = p;
    if(speed > 0){
        this.increment = 1/speed;
    }
    this.i = 0;
    this.timerStopped = true;
    this.timer1 = null;
    this.tp = termPoint;
    this.xOrY = xOrY;
    this.toF = toF;
    //this.px = [0];
    //this.py = [0];
}

// Setting up the prototype + Constructor
Car.prototype = Object.create(Phaser.Sprite.prototype);
Car.prototype.constructor = Car;

Car.prototype.update = function(){
    if(this.timerStopped){
            this.timerStopped = false;
            this.timer1 = game.time.create(true);
            this.timer1.loop(.01, this.plot, this);
            this.timer1.start();
    }
}

//Plot function inspired by Andrew Grant on CodePen
Car.prototype.plot = function(){
    
    //var p1 = new Phaser.Point(temp1, temp2);
    
    var posx = game.math.linearInterpolation(this.points.x, this.i);
    var posy = game.math.linearInterpolation(this.points.y, this.i);
    
    //var p2 = new Phaser.Point(posx, posy);
    
    //var angle = Phaser.Point.angle(p1, p2);
    //this.rotation = angle;
        
    //temp1 = posx;
    //temp2 = posy;
    
    //px.push(posx);
    //py.push(posy);
    
    //var angle = game.math.angleBetween(px[count-1], py[count-1], posx, posy);
    //this.rotation = angle;
    
    //console.log(posx);
    //console.log(posy);
    
    //console.log(px);
    //console.log(py);
        
    this.x = posx;
    this.y = posy;
        
    this.i += this.increment;
        
        //this.px.push(posx);
        //this.py.push(posy);
        
        //console.log(px);
        
        //posy in this case will terminate the sprite when it reaches a certain
        //y-position. Can be changed to terminate upon reaching certain 
        //x-pos
    
    if(this.xOrY == true){
        pos = posx;
    }else{
        pos = posy;
    }
    
    if(this.toF){
        if(pos > this.tp){
            this.timer1.stop();
            this.timer1.destroy();
            this.i = 0;
            this.timerStopped = true;
        }
    }else{
        if(pos < this.tp){
        this.timer1.stop();
        this.timer1.destroy();
        this.i = 0;
        this.timerStopped = true;
    }
    }
        
    //count++;
}

// Override any function/method call seem fit here:
/*Car.prototype.update = {
    
}*/