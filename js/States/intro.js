var introState = {
    
    preload: function(){
        
    },
    
    create: function(){
        keyboard=game.input.keyboard;
        introText=game.add.text(400,300,'In A World',{fontSize: 64,fill:'white'});
        introText.anchor.set(0.5);
        //fades text out
        game.add.tween(introText).to({alpha:0},5000,"Linear",true);
    },
    update: function(){
        if(keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            this.state.start('play');
        }
        
    },
    
    
}