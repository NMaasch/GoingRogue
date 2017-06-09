var creditState ={
    preload: function(){
        game.load.path='assets/sounds/music/';
        game.load.audio('symphony',['Symphony.mp3','Symphony.ogg']);
        if(this.cache.isSoundDecoded('cathedral')){};  
    },
    create: function(){
        keyboard=game.input.keyboard;
        timer=game.time.create(true);
        music_symphony = game.add.audio('symphony',1,true);
        music_symphony.play();
        timer.add(100,function(){
            credText = game.add.text(400,300,'WOOHOO!',{fontSize:56, fill:'white'});
            credText.anchor.set(0.5);
            },this
    
        );
        timer.add(1500,function(){
            game.add.tween(credText).to({alpha:0},50,"Linear",true);
            credText = game.add.text(400,300,'You Did It!',{fontSize:46, fill:'white'});
            credText.anchor.set(0.5);
            },this
        );
        timer.add(2700,function(){
            game.add.tween(credText).to({alpha:0},50,"Linear",true);
            credText = game.add.text(400,300,'Potholes are Gone!',{fontSize:46, fill:'white'});
            credText.anchor.set(0.5);
            },this
        );
        timer.add(4500,function(){
            game.add.tween(credText).to({alpha:0},50,"Linear",true);
            },this
        );
        timer.add(5900,function(){
            credText = game.add.text(400,300,'Through the periless journey, our hero was able to fix all\n the roads from the disastrous potholes. When the government \n wouldnt act, he did. People are filled with glee and\n jump with joy to be able to roam the streets safely again. \nThey will tell their children of the legend \nthat has been made here today. Nobody \nknew his name nor what he truly looked like, \nhowever, all the cities will refer to him as...',{fontSize:24, fill:'white'});
            credText.anchor.set(0.5);
            },this
        );
        timer.add(29700,function(){
            game.add.tween(credText).to({alpha:0},10,"Linear",true);
            credText = game.add.text(400,300,'The Portland Rogue',{fontSize:36, fill:'yellow'});
            credText.anchor.set(0.5);
            },this
        );
        timer.add(35000,function(){
            game.add.tween(credText).to({alpha:0},100,"Linear",true);
            credText = game.add.text(400,80,'Thanks for playing!',{fontSize:32, fill:'white'});
            credText.anchor.set(0.5);
            credText = game.add.text(436,200,'Justin Pimentel\t\t Programmer, Game AI',{fontSize:32, fill:'blue'});
            credText.anchor.set(0.5);
            credText = game.add.text(400,240,'Briant Licup\t\t Sound Design',{fontSize:32, fill:'yellow'});
            credText.anchor.set(0.5);
            credText = game.add.text(358,280,'Nathaniel Maasch\t\tGame Design',{fontSize:32, fill:'red'});
            credText.anchor.set(0.5);
            credText = game.add.text(343,320,'Jennifer Bermeo\t\tArt Design',{fontSize:32, fill:'pink'});
            credText.anchor.set(0.5);
            credText = game.add.text(387,360,'Sean Woods\t\t Programmer',{fontSize:32, fill:'green'});
            credText.anchor.set(0.5);
            },this
        );
        timer.add(50000,function(){
            credText = game.add.text(150,550,'Press [SPACEBAR] for the menu',{fontSize:32, fill:'white'});
            credText.alpha=0;
             game.add.tween(credText).to({alpha:1},2500,"Linear",true);
            },this
        );
        
        
        
        
        
        timer.start();
    },
    update: function(){
        if(keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            music_symphony.stop();
            theme.play();
            this.state.start('menu');
        }
    }
}