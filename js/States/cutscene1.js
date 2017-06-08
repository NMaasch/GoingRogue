var cutscene1State ={
    preload: function(){
        game.load.path='assets/sounds/music/';
        game.load.audio('cathedral',['cathedral.mp3','cathedral.ogg']);
        if(this.cache.isSoundDecoded('cathedral')){};  
    },
    create: function(){
        keyboard=game.input.keyboard;
        timer=game.time.create(true);
        music_cathedral = game.add.audio('cathedral',.9,true);
        music_cathedral.play();
        timer.add(0,function(){
            cutText = game.add.text(400,300,'\t\tWhispers flow through \nthe city here like the wind',{fontSize:46, fill:'white'});
            cutText.anchor.set(0.5);
            cutText.alpha=0;
            game.add.tween(cutText).to({alpha: 1},5000,Phaser.Easing.Linear.None,true,0,0,true);
            },this
    
        );
        timer.add(10000,function(){
            cutText = game.add.text(280,120,'Who fixed these roads?',{fontSize:46, fill:'blue'});
            cutText.anchor.set(0.5);
            cutText.alpha=0;
            game.add.tween(cutText).to({alpha: 1},2500,Phaser.Easing.Linear.None,true,0,0,true);
            },this
        );
        timer.add(12500,function(){
            cutText = game.add.text(550,300,'I have no idea',{fontSize:56, fill:'pink'});
            cutText.anchor.set(0.5);
            cutText.alpha=0;
            game.add.tween(cutText).to({alpha: 1},5000,Phaser.Easing.Linear.None,true,0,0,true);
            },this
        );
        timer.add(15000,function(){
            cutText = game.add.text(350,550,'Whoever it is, bless their soul',{fontSize:46, fill:'yellow'});
            cutText.anchor.set(0.5);
            cutText.alpha=0;
            game.add.tween(cutText).to({alpha: 1},5000,Phaser.Easing.Linear.None,true,0,0,true);
            },this
        );
        timer.add(25000,function(){
            cutText = game.add.text(400,200,'Our Hero will venture forth for his people',{fontSize:40, fill:'white'});
            cutText.anchor.set(0.5);
            cutText.alpha=0;
            game.add.tween(cutText).to({alpha: 1},7000,Phaser.Easing.Linear.None,true,0,0,false);
            },this
        );
        timer.add(29000,function(){
            cutText = game.add.text(400,300,'Press [SPACEBAR] to liberate',{fontSize:56, fill:'white'});
            cutText.anchor.set(0.5);
            cutText.alpha=0;
            game.add.tween(cutText).to({alpha: 1},10000,Phaser.Easing.Linear.None,true,0,0,false);
            },this
        );
        
        
        
        timer.start();
    },
    update: function(){
        if(keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            music_cathedral.stop();
            this.state.start('level2State');
        }
    }
}