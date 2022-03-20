  
class endLevel extends Phaser.Scene {
  constructor() {
    super("endLevel");
  }
  init(data){
    this.per = data.percent
    
  }
  preload() {


  }
  create() {
    console.log(this.per)
  /*  gameSettings = JSON.parse(localStorage.getItem('breaker'));
    if (gameSettings === null || gameSettings.length <= 0) {
      localStorage.setItem('breaker', JSON.stringify(defaultValues));
      gameSettings = defaultValues;
    }*/
    if(soundOn){
      this.sound.play('end');
    }
    
    this.endBGB = this.add.image(game.config.width / 2, game.config.height / 2, 'platform').setAlpha(1).setOrigin(.5).setTint(0xffffff);
    var tweenback = this.tweens.add({
      targets: this.endBGB,
      displayHeight: 920,
      displayWidth: game.config.width -180,
      duration: 100
    })
    
    this.endBG = this.add.image(game.config.width / 2, game.config.height / 2, 'platform').setAlpha(1).setOrigin(.5).setTint(0x333333);
    var tweenback = this.tweens.add({
      targets: this.endBG,
      displayHeight: 900,
      displayWidth: game.config.width -200,
      duration: 100
    })
   // this.endBG.displayHeight = 900;
   // this.endBG.displayWidth = game.config.width -200;
    if(this.per > 74){
      if(gameSettings.levelStatus[onLevel + 1] == -2){
        gameSettings.levelStatus[onLevel + 1] = -1;
      }
    }
    console.log(coinCount);
    gameSettings.coins += coinCount;
    
    if(this.per > gameSettings.levelStatus[onLevel]){
      gameSettings.levelStatus[onLevel] = this.per;
    } else if(gameSettings.levelStatus[onLevel] == -1){
      gameSettings.levelStatus[onLevel] = this.per
    }
    
    
    coinCount = 0;
    if (this.per == 100) {
      var star = '* * *';
      var mess = 'AWESOME!'
    } else if (this.per >= 90 && this.per < 100) {
      var star = '* *';
      var mess = 'DOING GREAT!'
    } else if(this.per > 74 && this.per < 90){
      var mess = ' JUST MADE IT!'
      var star = '*';
    } else {
      var mess = 'KEEP TRYING!'
      var star = '--';
    }
    this.message = this.add.bitmapText(1200, 475, 'topaz', mess, 80).setOrigin(.5).setTint(0xd8a603).setInteractive();
    this.perText = this.add.bitmapText(1200, 600, 'topaz', this.per + '%', 100).setOrigin(.5).setTint(0xd8a603).setInteractive();

    this.starText = this.add.bitmapText(1200, 775, 'topaz', star, 100).setOrigin(.5).setTint(0xd8a603).setInteractive();
	
	
	this.coinIcon = this.add.image(game.config.width + 300, 1227, 'icons',9).setScale(.7);
  this.coinTotalText = this.add.bitmapText(game.config.width + 375, 1220, 'topaz', gameSettings.coins, 60).setOrigin(0, .5).setTint(0xd8a603).setInteractive();
   
	
	
	
	this.playAgainIcon = this.add.image(1200, 975, 'icons',1).setInteractive();
    //this.playAgain = this.add.bitmapText(1200, 900, 'topaz', 'PLAY AGAIN', 70).setOrigin(.5).setTint(0xd8a603).setInteractive();
    this.playAgainIcon.on('pointerdown', function() {

      this.scene.start("PlayGame");
    }, this);
    if(this.per < 26){
    //this.nextLevelText = this.add.bitmapText(1200, 1025, 'topaz', 'NEXT', 70).setOrigin(.5).setTint(0xd8a603).setInteractive();
    this.nextLevelIcon = this.add.image(1200, 1025, 'icons',11).setInteractive();
   
	this.nextLevelIcon.on('pointerdown', function() {
      onLevel++
      this.scene.start("PlayGame");
      this.scene.resume('UI');
    }, this);
    }

    //this.selectText = this.add.bitmapText(1200, 1150, 'topaz', 'SELECT LEVEL', 50).setOrigin(.5).setTint(0xd8a603).setInteractive();
    this.selectIcon = this.add.image(1200, 1150, 'icons',7).setInteractive();
	this.selectIcon.on('pointerdown', function() {
    this.scene.stop('PlayGame')
      this.scene.start("selectGame");
      this.scene.stop('UI')
      //this.scene.stop();
    }, this);


    var timeline = this.tweens.createTimeline({

    });
    timeline.add({
      targets: this.message,
      x: 425,
      delay: 0,
      //offset: '-=400',
      duration: 400
    });
    timeline.add({
      targets: this.perText,
      x: 425,
      delay: 0,
      offset: '-=400',
      
      duration: 400
    });
    timeline.add({
      targets: this.starText,
      x: 425,
      delay: 0,
      offset: '-=400',
      
      duration: 400
    });
    
    timeline.add({
      targets: [this.selectIcon,this.nextLevelIcon,this.playAgainIcon],
      x: 425,
      delay: 400,
      offset: '-=400',
      duration: 400
    });
    timeline.add({
      targets: this.coinIcon,
      x: 575,
      delay: 0,
      offset: '-=400',
      duration: 800
    });
    timeline.add({
      targets: this.coinTotalText,
      x: 650,
      delay: 200,
      offset: '-=400',
      duration: 400
    });
    timeline.play();
	gameSettings.group = onGroup;
    localStorage.setItem('breaker', JSON.stringify(gameSettings));

    
    
    
    
    
    
  }
  
  
  createBoard() {
    grid = [];
    //if gameMode is a, always do value 8. If b, then probablility that is will be another color.
    //j x
this.blockSize = 10;
    for (var i = 0; i < gameOptions.rows; i++) {
      var col = [];
      for (var j = 0; j < gameOptions.cols; j++) {
        var block = this.add.image(gameOptions.offSetX + this.blockSize * j + this.blockSize / 2, gameOptions.offSetY + this.blockSize * i + this.blockSize / 2, 'field', 8);
        block.value = 8;
        block.displayWidth = this.blockSize;
        block.displayHeight = this.blockSize;

        //  block.value = this.level[j][i];
        col.push(block);
      }
      grid.push(col);
    }
    //console.log('j is y ' + grid.length);
    //console.log('i is x' + grid[0].length);

  }
  
  damageEmit(x,y) {
    var particlesColor = this.add.particles("particle_color");

    //.setTint(0x7d1414);
    var emitter = particlesColor.createEmitter({
      // particle speed - particles do not move
      // speed: 1000,
      frame: { frames: [0, 1, 2, 3], cycle: true },

      speed: {
        min: -500,
        max: 500
      },
      // particle scale: from 1 to zero
      scale: {
        start: 4,
        end: 0
      },
      // particle alpha: from opaque to transparent
      alpha: {
        start: 1,
        end: 1
      },
      // particle frequency: one particle every 100 milliseconds
      frequency: 50,
      // particle lifespan: 1 second
      lifespan: 1000
    });
    //emitter.tint.onChange(0x7d1414);
    emitter.explode(x, y, 300);

  }
}
