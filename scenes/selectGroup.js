class selectGroup extends Phaser.Scene {
  constructor() {
    super("selectGroup");
  }
  preload() {

  }
  create(){
    this.cameras.main.setBackgroundColor(0x333333);
    this.startGroup = onGroup;
    this.selectText = this.add.bitmapText(game.config.width / 2, 75, 'topaz', 'SELECT Pixel Pack', 80).setOrigin(.5, .5).setTint(0xd8a603).setInteractive();
    var count = 0;
    for (var i = 0; i < 4; i++){
      for (var j = 0; j < 3; j++){
        
          var xPos = 150 + j * 300
          var yPos = 300 + i * 300
          var pack = this.add.image(xPos, yPos, 'platform').setInteractive();
          pack.displayWidth = 275;
          pack.displayHeight = 275;
         if(count < groups.length){
          if(count == this.startGroup){
            pack.setTint(0x00ff00)
          }
          var groupTitle = this.add.bitmapText(xPos, yPos - 130, 'topaz',groups[count].title, 40).setOrigin(.5,0).setTint(0x333333).setMaxWidth(265);
          pack.group = count;
          }
          count++
        
      }
    }

    this.backText = this.add.image(game.config.width / 2, game.config.height - 50, 'icons', 12).setInteractive();
    this.backText.group = -1;
    

    this.input.on('gameobjectdown', this.click, this)
  }
  click(e, object){
    if(object.group > -1){
      object.setAlpha(.3);
      onGroup = object.group;
      this.scene.start("selectGame");
    } else if(object.group == -1){
      this.scene.start("titleScreen");
    }
  }
}