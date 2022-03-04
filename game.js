let game;

window.onload = function() {
  let gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: 0x000000,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 850,
      height: 1450
    },
    physics: {
      default: "arcade",
      arcade: {
        gravity: {
          y: gameOptions.gameGravity
        }
      }
    },
    pixelArt: true,

    scene: [preloadGame, titleScreen, selectGame, playGame, UI, levelEditor, levelEditorUI]
  }
  game = new Phaser.Game(gameConfig);

  window.focus();
}



class playGame extends Phaser.Scene {
    constructor() {
      super("PlayGame");
    }
    preload() {


    }
    create() {
      this.cameras.main.setBackgroundColor(levels[onLevel].bgColor);
	
	  
	
    this.blockSize = game.config.width / gameOptions.cols;
    this.gameFieldHeight = this.blockSize * gameOptions.rows;
    this.emptySpace = game.config.height - this.gameFieldHeight;
    gameOptions.offSetY = this.emptySpace / 2;

    this.topPanel = this.add.image(0, 0, 'platform').setOrigin(0).setTint(0x49494f).setDepth(2);
    this.topPanel.displayWidth = game.config.width;
    this.topPanel.displayHeight = this.emptySpace / 2;
    
    this.bottomPanel = this.add.image(0, game.config.height, 'platform').setOrigin(0, 1).setTint(0x49494f).setInteractive();
    this.bottomPanel.displayWidth = game.config.width;
    this.bottomPanel.displayHeight = this.emptySpace / 2;
    //this.bottomPanel.on('pointerdown', this.tap, this);
    this.physics.world.setBounds(0, this.emptySpace / 2, game.config.width, this.gameFieldHeight);
    

    
    this.bombGroup = this.physics.add.group();
    this.mag = [];
    //this.gameState = PREPARING_FOR_NEXT_MOVE;
    this.gameState = WAITING_FOR_PLAYER_INPUT;
    
    this.createBoard();
    this.nextShape();
    this.applyShape();
    this.setUpHeroBomb();
    this.loadBombs();
    this.positionBombs();
    
     //trajectory
    this.trajectory = this.add.sprite(game.config.width / 2, game.config.height - (this.bottomPanel.displayHeight + 150), "trajectory", 0);
    this.trajectory.setOrigin(0.5, 1);
    this.trajectory.setVisible(false);
    
    this.bracketts = this.add.bitmapText(game.config.width / 2, 1195, 'topaz', '[   ]', 70).setOrigin(.5).setTint(0x333333);

    this.input.on("pointerdown", this.startAiming, this);
    this.input.on("pointerup", this.shootBall, this)
    this.input.on("pointermove", this.adjustAim, this);

      
    }
    
    update(){
      
    }
  setUpHeroBomb(){
	this.hero = this.physics.add.sprite(game.config.width / 2, 1200, "hero", levels[onLevel].bombTypes[this.currentBombNum - 1]).setAlpha(0);
    this.hero.displayWidth = this.blockSize * 3;
    this.hero.displayHeight = this.blockSize * 3;
    this.hero.body.setBounce(1, 1);
    this.hero.body.collideWorldBounds = true;
    this.hero.body.setDrag(.50, .50);
    this.hero.body.setDamping(true);
    this.hero.main = true;
    this.hero.bombType = levels[onLevel].bombTypes[this.currentBombNum - 1];
  }
  loadBombs(){
    for(var b = 0; b < levels[onLevel].bombTypes.length; b++){
      var bomb = this.add.image(-80, 1590, 'hero', levels[onLevel].bombTypes[b]);
      bomb.displayWidth = this.blockSize * 3;
      bomb.displayHeight = this.blockSize * 3;
      bomb.placed = false;
      this.bombGroup.add(bomb);
      this.mag.push(bomb);
    }
  }
  positionBombs(){
    var timeline = this.tweens.createTimeline();
    for(var b = 0; b < this.mag.length; b++){
      timeline.add({
        targets: this.mag[b],
        x: 425 - b*80,
        duration: 500
      });
    }
    timeline.play();
  }
  nextShape() {
    this.shapeCount = 0;
    currentShape.shape = shapes[onLevel];
    for (var row = 0; row < currentShape.shape.length; row++) {
      for (var col = 0; col < currentShape.shape[row].length; col++) {
        if (currentShape.shape[row][col] != 8) {
          this.shapeCount++;
        }

      }
    }
    //console.log(this.shapeCount);
    currentShape.row = 1;
    currentShape.col = Math.floor(grid[0].length / 2) - Math.ceil(currentShape.shape[0].length / 2);
  }

  applyShape() {
    for (var row = 0; row < currentShape.shape.length; row++) {
      for (var col = 0; col < currentShape.shape[row].length; col++) {
        if (currentShape.shape[row][col] != 8) {
          grid[currentShape.row + row][currentShape.col + col].setFrame(currentShape.shape[row][col]);
          grid[currentShape.row + row][currentShape.col + col].value = currentShape.shape[row][col];
        }
      }
    }
  }
  createBoard() {
    grid = [];
    //if gameMode is a, always do value 8. If b, then probablility that is will be another color.
    //j x

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
  
  startAiming(e) {

    // are we waiting for player input?
    if (this.gameState == WAITING_FOR_PLAYER_INPUT) {
console.log('start aiming')
      // the angle of fire is not legal at the moment
      this.legalAngleOfFire = false;

      // change game state because now the player is aiming
      this.gameState = PLAYER_IS_AIMING;

    } else if (this.gameState == BALLS_ARE_RUNNING) {
      this.tap(e)
    }
  }

  // method to adjust the aim
  adjustAim(e) {

    if (this.gameState == PLAYER_IS_AIMING) {
    

      // determine x and y distance between current and initial input
      let distX = e.x - e.downX;
      let distY = e.y - e.downY;

      if (distY > 800) {
        distY = 800;
      }
//      this.powerMeter.displayHeight = distY * .5;
 //     this.forceText.setText(Math.round(distY));
      this.speed = Math.round(distY) * 4;
      // this is a legal agne of fire
      this.legalAngleOfFire = true;

      // show trajectory sprite
      this.trajectory.setVisible(true);

      // determine dragging direction
      this.direction = Phaser.Math.Angle.Between(e.x, e.y, e.downX, e.downY);

      // rotate trajectory sprite accordingly
      this.trajectory.angle = Phaser.Math.RadToDeg(this.direction) + 90;
      this.angleText.setText(this.trajectory.angle);
    }

    // y distance is smaller than 10, that is: player is not dragging down
    else {

      // not a legal angle of fire
      this.legalAngleOfFire = false;

      // hide trajectory sprite
      this.trajectory.setVisible(false);
    }
  }


  // method to shoot the ball
  shootBall(e) {

    if (this.gameState == PLAYER_IS_AIMING) {

      // hide trajectory sprite
      this.trajectory.setVisible(false);

      // do we have a legal angle of fire?
      if (this.legalAngleOfFire) {

        // change game state
        
        this.bracketts.setTint(0x333333);
        // adjust angle of fire
        let angleOfFire = Phaser.Math.DegToRad(this.trajectory.angle - 90);
        //  console.log('bg l ' + this.ballGroup.getLength());
        // iterate through all balls
        this.hero.body.setVelocity(this.speed * Math.cos(angleOfFire), this.speed * Math.sin(angleOfFire));
        this.heroSpin.resume();
        // this.angleText.setText(angleOfFire);
        this.bombsFired++;
        this.gameState = BALLS_ARE_RUNNING;
      }

      // we don't have a legal angle of fire
      else {

        // let's wait for player input again
        this.gameState = WAITING_FOR_PLAYER_INPUT;
      }
    } else if(this.gameState == BALLS_ARE_RUNNING){
      this.tapUp(e);
    }
  }
  
  
  
  
  
}