  
class UI extends Phaser.Scene {
  constructor() {
    super("UI");
  }
  preload() {


  }
  create() {
    this.isOpen = false;
    this.restartIcon = this.add.image(800, 75, 'icons', 1).setDepth(2).setScale(.8).setInteractive();
    this.restartIcon.on('pointerdown', function() {
      if (soundOn) {
        this.sound.play('click_sound');
      }
      var tween = this.tweens.add({
        targets: this.restartIcon,
        alpha: .3,
        duration: 100,
        yoyo: true
      })
      this.scene.start("PlayGame");
      this.scene.start("UI");
      
    }, this);

    this.homeIcon = this.add.image(700, 75, 'icons', 7).setDepth(2).setScale(.8).setInteractive();
    this.homeIcon.on('pointerdown', function() {
      if (soundOn) {
        this.sound.play('click_sound');
      }
      var tween = this.tweens.add({
        targets: this.homeIcon,
        alpha: .3,
        duration: 100,
        yoyo: true
      })
      this.scene.start("selectGame");
      this.scene.stop("PlayGame")
    }, this);

    this.buyIcon = this.add.image(600, 75, 'icons', 0).setDepth(2).setScale(.8).setInteractive();
    this.buyIcon.on('pointerdown', function() {
      if (soundOn) {
        this.sound.play('click_sound');
      }
      this.scene.pause('PlayGame');
      var tween = this.tweens.add({
        targets: this.buyIcon,
        alpha: .3,
        duration: 100,
        yoyo: true
      })
	  this.toggleBuyMenu();
    }, this);

gameSettings.coins

  this.switchIcon = this.add.image(game.config.width - 25, 1575, 'icons', 10).setDepth(2).setOrigin(1,.5).setScale(.8).setInteractive();
  this.switchIcon.on('pointerdown', function() {
  // this.hero.body.setVelocity(0, 0);
 // var scene = this.scene.get("PlayGame");
	console.log('switch')
     //scene.switchBombs();
     this.events.emit('switch');
    }, this);
	this.menuContainer = this.add.container(1200,0);
    this.createBuyMenu();
  }
  
  toggleBuyMenu(){
    if(this.isOpen){
      this.hideBuyMenu();
    } else {
      this.showBuyMenu();
    }
  }
  showBuyMenu(){
    this.isOpen = true;
	  var tween = this.tweens.add({
		  targets: this.menuContainer,
		  x: 0,
		  duration: 500,
		  
	  });
  }
   hideBuyMenu(){
     this.isOpen = false;
	  var tween = this.tweens.add({
		  targets: this.menuContainer,
		  x: 1200,
		  duration: 500,  
		  delay: 150,
	  });
	  this.scene.resume('PlayGame');
  }
  createBuyMenu(){
	  this.menuBGWhite = this.add.image(game.config.width, game.config.height / 2, 'platform').setOrigin(1,.5).setTint(0xffffff).setAlpha(.8);
      this.menuBGWhite.displayWidth = 260;
      this.menuBGWhite.displayHeight = 1020;
	  this.menuContainer.add(this.menuBGWhite);
	  
	  
	  this.menuBG = this.add.image(game.config.width, game.config.height / 2, 'platform').setOrigin(1,.5).setTint(0x333333).setAlpha(.8);
      this.menuBG.displayWidth = 250;
      this.menuBG.displayHeight = 1000;
	  this.menuContainer.add(this.menuBG);
	  
	  this.coinBG = this.add.image(game.config.width -5, game.config.height / 2 - 440, 'platform').setOrigin(1,.5).setTint(0xcccccc).setAlpha(.5);
      this.coinBG.displayWidth = 240;
      this.coinBG.displayHeight = 95;
	  this.menuContainer.add(this.coinBG);


	  this.coinText = this.add.bitmapText(game.config.width - 40, 380, 'topaz', gameSettings.coins, 70).setOrigin(1, .5).setTint(0xd8a603);
	  this.menuContainer.add(this.coinText);
	  this.coinIcon = this.add.image(game.config.width - 140, 390, 'icons', 9).setOrigin(1, .5).setScale(.7);
	  this.menuContainer.add(this.coinIcon);
	  
	  this.bomb0Icon = this.add.image(game.config.width - 140, 510, "hero", 0).setOrigin(1, .5).setScale(.6).setInteractive();
	  this.bomb0Text = this.add.bitmapText(game.config.width - 40, 500, 'topaz', '30', 60).setOrigin(1, .5).setTint(0xd8a603);
	  this.menuContainer.add(this.bomb0Icon);
	  this.menuContainer.add(this.bomb0Text);
	  this.bomb0Icon.on('pointerdown', function(){
	    this.buyBomb(0,30);
	  },this);
	  
	  this.bomb8Icon = this.add.image(game.config.width - 140, 610, "hero", 8).setOrigin(1, .5).setScale(.6).setInteractive();
	  this.bomb8Text = this.add.bitmapText(game.config.width - 40, 600, 'topaz', '10', 60).setOrigin(1, .5).setTint(0xd8a603);
	  this.menuContainer.add(this.bomb8Icon);
	  this.menuContainer.add(this.bomb8Text);
	  this.bomb8Icon.on('pointerdown', function(){
	    this.buyBomb(8,10);
	  },this);
	  
	  this.bomb1Icon = this.add.image(game.config.width - 140, 710, "hero", 1).setOrigin(1, .5).setScale(.6).setInteractive();
	  this.bomb1Text = this.add.bitmapText(game.config.width - 40, 700, 'topaz', '50', 60).setOrigin(1, .5).setTint(0xd8a603);
	  this.menuContainer.add(this.bomb1Icon);
	  this.menuContainer.add(this.bomb1Text);
	  this.bomb1Icon.on('pointerdown', function() {
	    this.buyBomb(1, 50);
	  }, this);
	  
 	  this.bomb2Icon = this.add.image(game.config.width - 140, 810, "hero", 2).setOrigin(1, .5).setScale(.6).setInteractive();
	  this.bomb2Text = this.add.bitmapText(game.config.width - 40, 800, 'topaz', '60', 60).setOrigin(1, .5).setTint(0xd8a603);
	  this.menuContainer.add(this.bomb2Icon);
	  this.menuContainer.add(this.bomb2Text);
	  this.bomb2Icon.on('pointerdown', function() {
	    this.buyBomb(2, 60);
	  }, this);
	  
	  
	  this.bomb3Icon = this.add.image(game.config.width - 140, 910, "hero", 3).setOrigin(1, .5).setScale(.6).setInteractive();
	  this.bomb3Text = this.add.bitmapText(game.config.width - 40, 900, 'topaz', '50', 60).setOrigin(1, .5).setTint(0xd8a603);
	  this.menuContainer.add(this.bomb3Icon);
	  this.menuContainer.add(this.bomb3Text);
	  this.bomb3Icon.on('pointerdown', function() {
	    this.buyBomb(3, 50);
	  }, this);
	  
	  this.bomb6Icon = this.add.image(game.config.width - 140, 1010, "hero", 6).setOrigin(1, .5).setScale(.6).setInteractive();
	  this.bomb6Text = this.add.bitmapText(game.config.width - 40, 1000, 'topaz', '70', 60).setOrigin(1, .5).setTint(0xd8a603);
	  this.menuContainer.add(this.bomb6Icon);
	  this.menuContainer.add(this.bomb6Text);
	  this.bomb6Icon.on('pointerdown', function() {
	    this.buyBomb(6, 70);
	  }, this);
	  
	  this.bomb7Icon = this.add.image(game.config.width - 140, 1110, "hero", 7).setOrigin(1, .5).setScale(.6).setInteractive();
	  this.bomb7Text = this.add.bitmapText(game.config.width - 40, 1100, 'topaz', '80', 60).setOrigin(1, .5).setTint(0xd8a603);
	  this.menuContainer.add(this.bomb7Icon);
	  this.menuContainer.add(this.bomb7Text);
	  this.bomb7Icon.on('pointerdown', function() {
	    this.buyBomb(7, 80);
	  }, this);
	  
	  this.bomb9Icon = this.add.image(game.config.width - 140, 1210, "hero", 9).setOrigin(1, .5).setScale(.6).setInteractive();
	  this.bomb9Text = this.add.bitmapText(game.config.width - 40, 1200, 'topaz', '90', 60).setOrigin(1, .5).setTint(0xd8a603);
	  this.menuContainer.add(this.bomb9Icon);
	  this.menuContainer.add(this.bomb9Text);
	  this.bomb9Icon.on('pointerdown', function() {
	    this.buyBomb(9, 90);
	  }, this);
	  
  }
  buyBomb(num,cost){
    cost = 1;
    if(gameSettings.coins >= cost){
      
      gameSettings.coins -= cost;
      this.coinText.setText(gameSettings.coins);
      //localStorage.setItem('breaker', JSON.stringify(gameSettings));
      this.events.emit('buy',num);
      this.toggleBuyMenu(); 
    }
    
    
  }
  
}