var introState = {
    
    preload: function(){
        game.load.path= 'assets/sounds/sfx/';
        game.load.audio('impact',['impact.mp3','impact.ogg']);
        game.load.audio('horns',['horns.mp3','horns.ogg']);
        game.load.path='assets/sounds/music/';
        game.load.audio('drum',['drum.mp3','drum.ogg']);
        if(this.cache.isSoundDecoded('impact')&&
           this.cache.isSoundDecoded('drum')&&
           this.cache.isSoundDecoded('horns')){}
    },
    
    create: function(){
        keyboard=game.input.keyboard;
        timer=game.time.create(true);
        sfx_impact = game.add.audio('impact',.7,true);
        sfx_impact.play();
        music_drum=game.add.audio('drum',.6,true);
        music_drum.play();
        sfx_horns = game.add.audio('horns',.4,false);
        timer.add(1000,function(){
            introText = game.add.text(400,300,'In A World',{fontSize:64, fill:'white'});
            introText.anchor.set(0.5);
            game.add.tween(introText).to({alpha:0},2500,"Linear",true);
            },this
        );
       timer.add(3500,function(){
            introText = game.add.text(400,300,'Filled with Despair',{fontSize:64, fill:'white'});
            introText.anchor.set(0.5);
            game.add.tween(introText).to({alpha:0},2500,"Linear",true);
            },this
        );
        timer.add(6000,function(){
            introText = game.add.text(400,300,'One Man',{fontSize:64, fill:'white'});
            introText.anchor.set(0.5);
            game.add.tween(introText).to({alpha:0},2500,"Linear",true);
            },this
        );
        timer.add(8500,function(){
            introText = game.add.text(400,300,'Will Save His People',{fontSize:64, fill:'white'});
            introText.anchor.set(0.5);
            game.add.tween(introText).to({alpha:0},2500,"Linear",true);
            },this
        );
        timer.add(11000,function(){
            introText = game.add.text(400,300,'From the Negligent\n\t\t\t\t\t\tGovernment',{fontSize:64, fill:'white'});
            introText.anchor.set(0.5);
            game.add.tween(introText).to({alpha:0},2500,"Linear",true);
            },this
        );
        timer.add(13500,function(){
            introText = game.add.text(400,300,'By',{fontSize:64, fill:'white'});
            introText.anchor.set(0.5);
            game.add.tween(introText).to({alpha:0},2500,"Linear",true);
            },this
        );
        timer.add(16000,function(){
            introText = game.add.text(400,300,'Fixing Potholes',{fontSize:64, fill:'white'});
            introText.anchor.set(0.5);
            game.add.tween(introText).to({alpha:0},2500,"Linear",true);
            },this
        );
        timer.add(18500,function(){
            sfx_horns.play();
            introText = game.add.text(400,300,'Press [Spacebar] to liberate',{fontSize:56, fill:'white'});
            introText.anchor.set(0.5);
            },this
        );
        timer.add(20000,function(){sfx_impact.stop();},this);
        
        timer.start();
        
    },
    update: function(){
        if(keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            music_drum.stop();
            sfx_horns.stop();
            this.state.start('play');
        }
        
    },
    
}