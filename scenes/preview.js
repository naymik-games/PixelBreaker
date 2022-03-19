class preview extends Phaser.Scene {
  constructor() {
    super("preview");
  }
  preload() {


  }
  create() {
	  
	if(levels[onLevel].size == 0){
		gameOptions = gameOptionsSmall;
		var bgH = 600;
		var bgW =350;
		this.blockSize = 10;
	} else if (levels[onLevel].size == 1) {
		gameOptions = gameOptionsLarge;
		var bgH = 700;
		var bgW =550;
		this.blockSize = 10;
	} else {
		gameOptions = gameOptionsExtraLarge;
		var bgH = 800;
		var bgW = 650;
		this.blockSize = 5;
	}
	  
    this.bgb = this.add.image(game.config.width / 2,game.config.height / 2,'platform').setOrigin(.5).setTint(0xffffff);
    this.bgb.displayWidth = 745;
    this.bgb.displayHeight = 1220;
    
    this.bg = this.add.image(game.config.width / 2,game.config.height / 2,'platform').setOrigin(.5).setTint(0x222222);
    this.bg.displayWidth = 725;
    this.bg.displayHeight = 1200;
    
    //currentShape.shape = shapes[onLevel];
    this.gridbg = this.add.image(game.config.width / 2,600,'platform').setOrigin(.5,0).setTint(levels[onLevel].bgColor);
    this.gridbg.displayWidth = bgW;
    this.gridbg.displayHeight = 600;
    var previewImage = this.add.image(game.config.width / 2, 600, levels[onLevel].key).setOrigin(.5,0).setScale(this.blockSize)
//this.createBoard();
//this.applyShape();
   // onGroup = gameSettings.group;
    
    this.levelText = this.add.bitmapText(game.config.width / 2, 320, 'topaz', levels[onLevel].title, 80).setOrigin(.5, .5).setTint(0xd8a603);
    this.levelTitleText = this.add.bitmapText(game.config.width / 2, 480, 'topaz', 'LEVEL ' + onLevel, 60).setOrigin(.5, .5).setTint(0xd8a603);
    
    //this.playText = this.add.bitmapText(game.config.width / 2, 700, 'topaz', 'Play', 60).setOrigin(.5, .5).setTint(0xd8a603);
    if (gameSettings.levelStatus[onLevel] == -2) {
	  this.playIcon = this.add.image(360, 925, 'icons',10);
	  this.lockIcon = this.add.image(575, 600, 'icons',8);
    } else {
	  this.playIcon = this.add.image(360, 1125, 'icons',4).setInteractive();	
	}
	
	this.backIcon = this.add.image(515, 1125, 'icons',7).setInteractive();
    
    if (gameSettings.levelStatus[onLevel] == -2) {
      var statusText = 'Locked';
    } else if (gameSettings.levelStatus[onLevel] == -1) {
      var statusText = 'Never Played';
    
    } else if (gameSettings.levelStatus[onLevel] == 100) {
      var statusText = '* * *';
    } else if (gameSettings.levelStatus[onLevel] < 100 && gameSettings.levelStatus[onLevel] > 89) {
      var statusText = '* *';
    } else if (gameSettings.levelStatus[onLevel] < 89 && gameSettings.levelStatus[onLevel] > 74) {
      var statusText = '*';
    } else if (gameSettings.levelStatus[onLevel] < 75) {
      var statusText = 'Keep Trying';
    }



    this.starsText = this.add.bitmapText(game.config.width / 2, 1250, 'topaz', statusText, 60).setOrigin(.5, .5).setTint(0xd8a603);
    if(gameSettings.levelStatus[onLevel] > -1){
      this.perText = this.add.bitmapText(game.config.width / 2, 1350, 'topaz', 'Best: ' + gameSettings.levelStatus[onLevel] + '% Remaining', 40).setOrigin(.5, .5).setTint(0xd8a603);
    }
    
   
   this.playIcon.on('pointerdown', function(){
     if (soundOn) {
       this.sound.play('click_sound');
     }
     this.scene.start("PlayGame");
      this.scene.launch("UI");
      
    }, this);
    this.backIcon.on('pointerdown', function(){
      if (soundOn) {
        this.sound.play('click_sound');
      }
     this.scene.resume('selectGame')
      this.scene.stop();
      
    }, this);
  }
  
  
  createBoard() {
    grid = [];
    //if gameMode is a, always do value 8. If b, then probablility that is will be another color.
    //j x
    
    for (var i = 0; i < gameOptions.rows; i++) {
      var col = [];
      for (var j = 0; j < gameOptions.cols; j++) {
        var block = this.add.image(250 + this.blockSize * j + this.blockSize / 2, 600 + this.blockSize * i + this.blockSize / 2, 'field', 8);
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
  nextShape() {
    this.shapeCount = 0;
    currentShape.shape = shapes[onLevel];
    // console.log('shape length' + currentShape.shape.length)
    for (var row = 0; row < currentShape.shape.length; row++) {
      for (var col = 0; col < currentShape.shape[row].length; col++) {
        if (currentShape.shape[row][col] != 8) { //currentShape.shape[row][col] != 28
          this.shapeCount++;
        }

      }
    }

    this.shapeCountTemp = 0;
    for (var row = 0; row < currentShape.shape.length; row++) {
      for (var col = 0; col < currentShape.shape[row].length; col++) {
        if (currentShape.shape[row][col] == 28) { //currentShape.shape[row][col] != 28
          this.shapeCountTemp++;
        }

      }
    }
    
    //console.log(this.shapeCount);
    currentShape.row = 1;
    currentShape.col = Math.floor(grid[0].length / 2) - Math.ceil(currentShape.shape[0].length / 2);
  }

  applyShape() {
    currentShape.row = 1;
    currentShape.col = Math.floor(grid[0].length / 2) - Math.ceil(currentShape.shape[0].length / 2);

    for (var row = 0; row < currentShape.shape.length; row++) {
      for (var col = 0; col < currentShape.shape[row].length; col++) {
        if (currentShape.shape[row][col] != 8) {
          grid[currentShape.row + row][currentShape.col + col].setFrame(currentShape.shape[row][col]);
          grid[currentShape.row + row][currentShape.col + col].value = currentShape.shape[row][col];
        }
      }
    }
  }
  damageEmit() {
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
    emitter.explode(40, 425, 300);

  }
}
