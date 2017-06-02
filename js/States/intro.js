var introState = {
    
    preload: function(){
        
    },
    
    create: function(){
        keyboard=game.input.keyboard;
        timer=game.time.create(true);
        
        timer.add(1000,function(){
            introText = game.add.text(400,300,'In A World',{fontSize:64, fill:'white'});
            introText.anchor.set(0.5);
            game.add.tween(introText).to({alpha:0},3000,"Linear",true);
            },this
        );
       timer.add(4000,function(){
            introText = game.add.text(400,300,'Filled with Despair',{fontSize:64, fill:'white'});
            introText.anchor.set(0.5);
            game.add.tween(introText).to({alpha:0},3000,"Linear",true);
            },this
        );
        timer.add(7000,function(){
            introText = game.add.text(400,300,'One Man',{fontSize:64, fill:'white'});
            introText.anchor.set(0.5);
            game.add.tween(introText).to({alpha:0},3000,"Linear",true);
            },this
        );
        timer.add(10000,function(){
            introText = game.add.text(400,300,'Will Save His People',{fontSize:64, fill:'white'});
            introText.anchor.set(0.5);
            game.add.tween(introText).to({alpha:0},3000,"Linear",true);
            },this
        );
        timer.add(13000,function(){
            introText = game.add.text(400,300,'From the Negligent\n\t\t\t\t\t\tGovernment',{fontSize:64, fill:'white'});
            introText.anchor.set(0.5);
            game.add.tween(introText).to({alpha:0},3000,"Linear",true);
            },this
        );
        timer.add(16000,function(){
            introText = game.add.text(400,300,'By',{fontSize:64, fill:'white'});
            introText.anchor.set(0.5);
            game.add.tween(introText).to({alpha:0},3000,"Linear",true);
            },this
        );
        timer.add(19000,function(){
            introText = game.add.text(400,300,'Fixing Potholes',{fontSize:64, fill:'white'});
            introText.anchor.set(0.5);
            game.add.tween(introText).to({alpha:0},3000,"Linear",true);
            },this
        );
        timer.add(22000,function(){
            introText = game.add.text(400,300,'Press [Spacebar] to liberate',{fontSize:56, fill:'white'});
            introText.anchor.set(0.5);
            },this
        );
        
        timer.start();
        
    },
    update: function(){
        if(keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            this.state.start('play');
        }
        
    },
    
}