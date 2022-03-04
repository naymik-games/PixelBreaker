

class levelEditorUI extends Phaser.Scene {

  constructor() {
    super("levelEditorUI");
  }
  preload() {
	this.load.image("allblocks", "assets/blocks_full_clear.png");
    
  }
  create() {
	  

	  
    this.rows = gameOptions.rows - 18;
    this.cols = gameOptions.cols - 8;
    this.blockSize = 850 / this.cols;
    this.gameFieldHeight = this.blockSize * this.rows;
    this.emptySpace = game.config.height - this.gameFieldHeight;
    gameOptions.offSetY = this.emptySpace / 2;

    this.topPanel = this.add.image(0, 0, 'platform').setOrigin(0).setTint(0x49494f).setDepth(2);
    this.topPanel.displayWidth = game.config.width;
    this.topPanel.displayHeight = this.emptySpace / 2;
    
    this.bottomPanel = this.add.image(0, game.config.height, 'platform').setOrigin(0, 1).setTint(0x49494f).setInteractive();
    this.bottomPanel.displayWidth = game.config.width;
    this.bottomPanel.displayHeight = this.emptySpace / 2;
    //this.bottomPanel.on('pointerdown', this.tap, this);
    
    this.controlText = this.add.bitmapText(25, 25, 'topaz', 'pan/zoom', 40).setOrigin(0, .5).setTint(0xd8a603).setInteractive().setDepth(3);
    this.controlText.value = -1;
	this.controlText.on('pointerdown', this.toggleContol, this);
    
    this.copyText = this.add.bitmapText(300, 25, 'topaz', 'copy', 40).setOrigin(0, .5).setTint(0xd8a603).setInteractive().setDepth(3);
    this.copyText.value = -1;
	this.copyText.on('pointerdown', this.copyGrid, this);
    
    //var gridLines = this.add.grid(0,gameOptions.offSetY,850, this.gameFieldHeight, this.blockSize, this.blockSize, null,null,0xcccccc,.3 ).setOrigin(0)
    this.addPallet();
    this.input.on('gameobjectdown', this.down, this);
    this.input.on('pointermove', this.move, this);
    this.input.on('pointerup', this.up, this);
    //this.scene.start("PlayGame");
    this.dragging = false;
    this.graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xC9DF49 },fillStyle: { color: 0xC9DF49 } });
	
  }
  toggleContol(){
    if(controlMode == 'panzoom'){
      controlMode = 'curser';
      this.controlText.setText('curser');
    } else if (controlMode == 'curser') {
      controlMode = 'panzoom';
      this.controlText.setText('pan/zoom');
    }
  }
  copyGrid(){
	 
    var output = JSON.stringify(gridValue);
	console.log(output);
	
	
  }
  down(e, obj){
	if(obj.value == -1){return}
    editorFrame = obj.value;
    obj.setAlpha(.5);
	this.graphics.clear();
	var rect = new Phaser.Geom.Rectangle(obj.x, obj.y, 80, 80);

    
	this.graphics.strokeRectShape(rect);
    
	
	
	
    this.currentObj.setAlpha(1);
    this.currentObj = obj;
  }
  move(e){
    
  }
  up(){
    
  }
  addPallet(){
    //this.tiles = this.add.image(0,1300, 'allblocks').setOrigin(0).setScale(.4);
    for(var f = 0;f < 29; f++){
      var tileX = 25 + f* 60
      var tileY = 1250;
      if(f > 15){
        tileY = 1275 + 60;
        tileX= 25 + (f - 15)* 60
      }
      if(f == 2){}
      var tiles = this.add.image(tileX,tileY, 'field', f).setOrigin(0).setScale(.5).setInteractive();
      tiles.value = f;
      if(f == 2){
        this.currentObj = tiles;
      }
    }
  }
}