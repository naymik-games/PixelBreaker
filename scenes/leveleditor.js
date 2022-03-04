let controlMode = 'panzoom';
let editorFrame = 2;
class levelEditor extends Phaser.Scene {
  constructor() {
    super("levelEditor");
  }
  preload() {
	
    var url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpinchplugin.min.js';
    this.load.plugin('rexpinchplugin', url, true);

  }
  create() {
	  var dragScale = this.plugins.get('rexpinchplugin').add(this);

    this.cam = this.cameras.main;
    this.cam.setZoom(1);
    this.drag = false;

    dragScale
      .on('drag1', function(dragScale) {
        if(controlMode == 'panzoom'){
        var drag1Vector = dragScale.drag1Vector;
        this.cam.scrollX -= drag1Vector.x / this.cam.zoom;
        this.cam.scrollY -= drag1Vector.y / this.cam.zoom;
        this.drag = true;
        }
      }, this)
      .on('pinch', function(dragScale) {
        if(controlMode == 'panzoom'){
         var scaleFactor = dragScale.scaleFactor;
          this.cam.zoom *= scaleFactor;
          }
      }, this)

	  
    this.rows = gameOptions.rows - 18;
    this.cols = gameOptions.cols - 8;
    this.blockSize = 850 / this.cols;
    this.gameFieldHeight = this.blockSize * this.rows;
    this.emptySpace = game.config.height - this.gameFieldHeight;
    gameOptions.offSetY = this.emptySpace / 2;

   // this.topPanel = this.add.image(0, 0, 'platform').setOrigin(0).setTint(0x49494f).setDepth(2);
   // this.topPanel.displayWidth = game.config.width;
   // this.topPanel.displayHeight = this.emptySpace / 2;
    
   // this.bottomPanel = this.add.image(0, game.config.height, 'platform').setOrigin(0, 1).setTint(0x49494f).setInteractive();
   // this.bottomPanel.displayWidth = game.config.width;
   // this.bottomPanel.displayHeight = this.emptySpace / 2;
    //this.bottomPanel.on('pointerdown', this.tap, this);
    
  //  this.controlText = this.add.bitmapText(25, 25, 'topaz', 'pan/zoom', 40).setOrigin(0, .5).setTint(0xd8a603).setInteractive().setDepth(3);
   // this.controlText.on('pointerdown', this.toggleContol, this);
    var gridLines = this.add.grid(0,gameOptions.offSetY,850, this.gameFieldHeight, this.blockSize, this.blockSize, null,null,0xcccccc,.3 ).setOrigin(0)
    
    this.createBoard();
    this.input.on('pointerdown', this.down, this);
    this.input.on('pointermove', this.move, this);
    this.input.on('pointerup', this.up, this);
    //this.scene.start("PlayGame");
    this.dragging = false;
    
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
  down(e){
    if (e.worldX < 0 || e.worldY < this.emptySpace / 2 || e.worldY > this.emptySpace / 2 + this.blockSize * this.rows || e.worldX > this.blockSize * this.cols || controlMode == 'panzoom') {
      return
    }
    
    this.selected = [];

    let row = Math.floor((e.worldY - this.emptySpace / 2) / this.blockSize);
    let col = Math.floor(e.worldX / this.blockSize);
    grid[row][col].setFrame(editorFrame);
    gridValue[row][col] = editorFrame;
    console.log('row' + row + ' col' + col);
    this.dragging = true;
  }
  move(e){
    if (e.worldX < 0 || e.worldY < this.emptySpace / 2 || e.worldY > this.emptySpace / 2 + this.blockSize * this.rows || e.worldX > this.blockSize * this.cols || controlMode == 'panzoom') {
      return
    }
    if(this.dragging){
    let row = Math.floor((e.worldY - this.emptySpace / 2) / this.blockSize);
    let col = Math.floor(e.worldX / this.blockSize);
    let distance = Phaser.Math.Distance.Between(e.worldX, e.worldY, grid[row][col].x, grid[row][col].y);
    if (distance < this.blockSize * 0.4) {
    grid[row][col].setFrame(editorFrame);
    gridValue[row][col] = editorFrame;
    }
    }
  }
  up(){
    this.dragging = false;
  }
  createBoard() {
    grid = [];
    gridValue = [];
    //if gameMode is a, always do value 8. If b, then probablility that is will be another color.
    //j x

    for (var i = 0; i < this.rows; i++) {
      var col = [];
      var colValue = [];
      for (var j = 0; j < this.cols; j++) {
        var block = this.add.image(gameOptions.offSetX + this.blockSize * j + this.blockSize / 2, gameOptions.offSetY + this.blockSize * i + this.blockSize / 2, 'field', 8);
        block.value = 8;
        block.displayWidth = this.blockSize;
        block.displayHeight = this.blockSize;

        //  block.value = this.level[j][i];
        col.push(block);
        colValue.push(block.value);
      }
      grid.push(col);
      gridValue.push(colValue);
    }
    //console.log('j is y ' + grid.length);
    //console.log('i is x' + grid[0].length);

  }
}