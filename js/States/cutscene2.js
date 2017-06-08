var cutscene2State ={
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
            cutText = game.add.text(400,300,'\t\Voices rush through \nthe city here like water',{fontSize:46, fill:'white'});
            cutText.anchor.set(0.5);
            cutText.alpha=0;
            game.add.tween(cutText).to({alpha: 1},5000,Phaser.Easing.Linear.None,true,0,0,true);
            },this
    
        );
        timer.add(10000,function(){
            cutText = game.add.text(315,120,'I think its the same man as before',{fontSize:38, fill:'orange'});
            cutText.anchor.set(0.5);
            cutText.alpha=0;
            game.add.tween(cutText).to({alpha: 1},2500,Phaser.Easing.Linear.None,true,0,0,true);
            },this
        );
        timer.add(12500,function(){
            cutText = game.add.text(550,300,'How can you tell?',{fontSize:56, fill:'green'});
            cutText.anchor.set(0.5);
            cutText.alpha=0;
            game.add.tween(cutText).to({alpha: 1},5000,Phaser.Easing.Linear.None,true,0,0,true);
            },this
        );
        timer.add(15000,function(){
            cutText = game.add.text(406,550,'For he is the only who could have this much mercy',{fontSize:32, fill:'orange'});
            cutText.anchor.set(0.5);
            cutText.alpha=0;
            game.add.tween(cutText).to({alpha: 1},5000,Phaser.Easing.Linear.None,true,0,0,true);
            },this
        );
        timer.add(25000,function(){
            cutText = game.add.text(400,200,'Our Hero will never falter',{fontSize:40, fill:'white'});
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
            this.state.start('level3State');
        }
    }
}