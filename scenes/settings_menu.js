  
class settings extends Phaser.Scene {
  constructor() {
    super("settings");
  }
  preload() {


  }
  create() {
    
    
    
   
//this.createBoard();
//this.applyShape();
    
    this.optionsText = this.add.bitmapText(game.config.width / 2, 300, 'topaz', 'Options', 80).setOrigin(.5, .5).setTint(0xd8a603);
    
    this.soundfxText = this.add.bitmapText(game.config.width / 2 -100, 600, 'topaz', 'Sound FX', 60).setOrigin(1, .5).setTint(0xd8a603);
    this.detonateText = this.add.bitmapText(game.config.width / 2 -100, 800, 'topaz', 'Detonate', 60).setOrigin(1, .5).setTint(0xd8a603);

    
	if(soundOn){
		var sframe = 1;
	} else {
		var sframe = 0;
	}
	if(detonaterOn){
	  var dframe = 1;
	} else {
	  var dframe = 0;
	}
	
	this.switchIcon = this.add.image(game.config.width / 2 +100, 600, 'switch',sframe).setInteractive();
    this.switchIconD = this.add.image(game.config.width / 2 +100, 800, 'switch',dframe).setInteractive();

    
    this.backIcon = this.add.image(game.config.width / 2, 1500, 'icons',12).setInteractive();
  
  
	
   this.switchIcon.on('pointerdown', function(){
     if(soundOn){
      this.sound.play('click_sound');
     }
	   if(soundOn){
		 this.switchIcon.setFrame(0);
		
	   soundOn = false;  
	   gameSettingsOptions.soundfx = false;
	   } else {
		  this.switchIcon.setFrame(1);
	   soundOn = true; 
	   gameSettingsOptions.soundfx = true;
	   }
	  localStorage.setItem('breakerOptions', JSON.stringify(gameSettingsOptions)); 
      //this.scene.start("selectGame");
    }, this);
    
    this.switchIconD.on('pointerdown', function(){
     if(soundOn){
      this.sound.play('click_sound');
     }
	   if(detonaterOn){
		 this.switchIconD.setFrame(0);
		
	   detonaterOn = false;  
	   gameSettingsOptions.detonater = false;
	   } else {
		  this.switchIconD.setFrame(1);
	   detonaterOn = true; 
	   gameSettingsOptions.detonater = true;
	   }
	  localStorage.setItem('breakerOptions', JSON.stringify(gameSettingsOptions)); 
      //this.scene.start("selectGame");
    }, this);
    
    
	this.backIcon.on('pointerdown', function(){
      this.scene.start("titleScreen");
    }, this);
  }
  
  
 
}