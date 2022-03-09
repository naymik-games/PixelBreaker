  
class titleScreen extends Phaser.Scene {
  constructor() {
    super("titleScreen");
  }
  preload() {


  }
  create() {
    
    gameSettings = JSON.parse(localStorage.getItem('breaker'));
    if (gameSettings === null || gameSettings.length <= 0) {
      localStorage.setItem('breaker', JSON.stringify(defaultValues));
      gameSettings = defaultValues;
    }
    
	gameSettingsOptions = JSON.parse(localStorage.getItem('breakerOptions'));
    if (gameSettingsOptions === null || gameSettingsOptions.length <= 0) {
      localStorage.setItem('breakerOptions', JSON.stringify(defaultValuesOptions));
      gameSettingsOptions = defaultValuesOptions;
    }
	soundOn = gameSettingsOptions.soundfx;
	detonaterOn = gameSettingsOptions.detonater;;
    var corner = this.add.image(0, gameOptions.offSetY, 'cl').setOrigin(0).setScale(.5);
    
    
    //currentShape.shape = shapes[1];
//this.createBoard();
//this.applyShape();
    onGroup = gameSettings.group;
    this.breakerText = this.add.bitmapText(game.config.width / 2, 300, 'topaz', 'PIXEL BREAKER', 80).setOrigin(.5, .5).setTint(0xd8a603);
    
    this.playText = this.add.bitmapText(game.config.width / 2, 700, 'topaz', 'Play', 60).setOrigin(.5, .5).setTint(0xd8a603);
    this.playIcon = this.add.image(425, 825, 'icons',7).setInteractive();
    var bomb = this.add.image(425,1000,'hero', 0);
    var tween = this.tweens.add({
      targets: bomb,
      y: 50,
      x:10,
      duration: 600,
      delay: 300,
      onCompleteScope:this,
      onComplete: function(){
        this.damageEmit();
        bomb.setAlpha(0);
      }
    })
    
    this.coinIcon = this.add.image(game.config.width / 2 - 25, 1107, 'icons',9).setScale(.7);

   this.coinTotalText = this.add.bitmapText(game.config.width / 2 + 25, 1100, 'topaz', gameSettings.coins, 60).setOrigin(0, .5).setTint(0xd8a603).setInteractive();
   
    
    this.settingsIcon = this.add.image(game.config.width / 2, 1500, 'icons',3).setInteractive();
  
   this.levelEditText = this.add.bitmapText(game.config.width / 2 +350, 1500, 'topaz', 'Edit', 40).setOrigin(.5, .5).setTint(0xd8a603).setInteractive();
    this.levelEditText.on('pointerdown', function(){
      this.scene.start("levelEditor");
      this.scene.launch("levelEditorUI");
    }, this);
	
	
   this.playIcon.on('pointerdown', function(){
     if(soundOn){
      this.sound.play('click_sound');
     }
      
      this.scene.start("selectGroup");
    }, this);
	this.settingsIcon.on('pointerdown', function(){
      if (soundOn) {
        this.sound.play('click_sound');
      }
      this.scene.start("settings");
    }, this);
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
        start: 10,
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
    emitter.explode(100, 50, 300);

  }
}