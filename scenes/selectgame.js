class selectGame extends Phaser.Scene {
  constructor() {
    super("selectGame");
  }
  preload() {


  }
  create() {
    this.startGroup = onGroup;
    this.selectText = this.add.bitmapText(game.config.width / 2, 75, 'topaz', 'SELECT LEVEL', 80).setOrigin(.5, .5).setTint(0xd8a603).setInteractive();

    //this.playText = this.add.bitmapText(game.config.width / 2 + 100, 75, 'topaz', 'SET >', 60).setOrigin(.5, .5).setTint(0xd8a603).setInteractive();
    this.playText = this.add.image(game.config.width - 25, game.config.height - 50, 'icons', 11).setOrigin(1, .5).setInteractive();
    this.playText.level = -1;

    this.play2Text = this.add.image(25, game.config.height - 50, 'icons', 12).setOrigin(0, .5).setInteractive();
    //this.play2Text = this.add.bitmapText(game.config.width / 2 - 100, 75, 'topaz', '< SET', 60).setOrigin(.5, .5).setTint(0xd8a603).setInteractive();
    this.play2Text.level = -3;
    /*  this.playText.on('pointerdown', function(){
        this.scene.start("PlayGame");
      }, this);*/


    this.showGroup(this.startGroup);
    //this.backText = this.add.bitmapText(game.config.width / 2, 1530, 'topaz', '< back', 60).setOrigin(.5, .5).setTint(0xd8a603).setInteractive();
    this.backText = this.add.image(game.config.width / 2, game.config.height - 50, 'icons', 2).setInteractive();


    this.backText.level = -2;
    /*this.editorText = this.add.bitmapText(game.config.width / 2, 1400, 'topaz', 'edit', 40).setOrigin(.5, .5).setTint(0xd8a603).setInteractive();
    this.editorText.on('pointerdown', function(){
      this.scene.start("levelEditor");
    }, this);*/
    //  this.input.on('pointerdown', this.startSwipe, this);
    // this.input.on('pointermove', this.moveSwipe, this);
    //  this.input.on('pointerup', this.endSwipe, this);

    this.input.on('gameobjectup', this.clickHandler, this);
  }

  endSwipe(e) {
    var swipeTime = e.upTime - e.downTime;
    var swipe = new Phaser.Geom.Point(e.upX - e.downX, e.upY - e.downY);
    var swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipe);
    var swipeNormal = new Phaser.Geom.Point(swipe.x / swipeMagnitude, swipe.y / swipeMagnitude);
    if (swipeMagnitude > 20 && swipeTime < 1000 && (Math.abs(swipeNormal.y) > 0.8 || Math.abs(swipeNormal.x) > 0.8)) {

      if (swipeNormal.x > 0.8) {
        console.log('right')
        this.handleMove(0, 1, );
      }
      if (swipeNormal.x < -0.8) {
        console.log('left')
        this.handleMove(0, -1);
      }
      if (swipeNormal.y > 0.8) {
        console.log('down')
        this.handleMove(1, 0);
      }
      if (swipeNormal.y < -0.8) {
        console.log('up')
        this.handleMove(-1, 0);
      }
    }
  }
  showGroup(groupNum) {
    if (this.groupBox) {
      //  this.groupBox.destroy(true);
      //this.hideGroup();
    }
    var groupBox = this.add.container().setDepth(0);
    var tempGroup = groupNum + 1;
    var groupText = this.add.bitmapText(game.config.width - 100, 75, 'topaz', tempGroup + '/' + groups.length, 50).setTint(0x00ff00).setOrigin(.5).setMaxWidth(500);
    groupBox.add(groupText);

    var titleText = this.add.bitmapText(game.config.width / 2, 175, 'topaz', groups[groupNum].title, 40).setTint(0x00ff00).setOrigin(.5).setMaxWidth(700);
    groupBox.add(titleText);
    //	var levelNum = groupNum + (groups[groupNum].puzzleCount -1);

    var levelNum = groups[groupNum].startNum;


    for (var i = 0; i < groups[groupNum].numLevels; i++) {
      //console.log('level');
      if (i < 8) {
        var xpos = 50
        var ypos = (game.config.height / 2 - 525) + (i * 140);

      } else {
        var xpos = 450
        var ypos = (game.config.height / 2 - 525) + ((i - 8) * 140);

      }
      var tempLevel = i + 1;
      var levelTitle = this.add.bitmapText(xpos, ypos - 20, 'topaz', '#' + tempLevel + ' - ' + levels[levelNum].title, 34).setOrigin(0, .5);
      levelTitle.level = levelNum;
      var statusText;



      levelTitle.setInteractive();
      var status = '';

      if (gameSettings.levelStatus[levelNum] == -2) {
        levelTitle.setAlpha(.5)
        status = 'locked';

      } else if (gameSettings.levelStatus[levelNum] == -1) {
        status = 'Not Played';
      } else if (gameSettings.levelStatus[levelNum] == 100) {
        status = '* * * - ' + gameSettings.levelStatus[levelNum] + '%';
      } else if (gameSettings.levelStatus[levelNum] > 89 && gameSettings.levelStatus[levelNum] < 100) {
        status = '* * - ' + gameSettings.levelStatus[levelNum] + '%';
      } else if (gameSettings.levelStatus[levelNum] > 74 && gameSettings.levelStatus[levelNum] < 90) {
        // statusText = this.add.bitmapText(game.config.width / 2, ypos + 60, 'topaz', '*', 50).setOrigin(.5).setTint(0xd8a603);
        status = '* - ' + gameSettings.levelStatus[levelNum] + '%';
      } else if (gameSettings.levelStatus[levelNum] < 75) {
        status = gameSettings.levelStatus[levelNum] + '%';
      }


      statusText = this.add.bitmapText(xpos + 50, ypos + 50, 'topaz', status, 34).setOrigin(0, .5).setTint(0xd8a603);





      levelNum++;
      groupBox.add(levelTitle);
      groupBox.add(statusText);

    }




    groupBox.add(groupText);

    groupBox.setPosition(game.config.width, 0);
    this.groupBox = groupBox;
    this.tweens.add({
      targets: this.groupBox,
      //alpha: .5,
      x: 0,
      duration: 500,

      //delay: 500,
      //  yoyo: true,
      callbackScope: this,
      onComplete: function() {

      }
    });
  }

  hideGroup(num) {
    this.tweens.add({
      targets: this.groupBox,
      //alpha: .5,
      //  x: game.config.width,
      x: -850,
      duration: 500,
      //  yoyo: true,
      callbackScope: this,
      onComplete: function() {
        this.groupBox.destroy(true);
        this.showGroup(num);
      }
    });

  }
  preGroup(block) {
    var tween = this.tweens.add({
      targets: block,
      alpha: .3,
      scale: .7,
      duration: 100,
      yoyo: true
    })



    if (this.startGroup < groups.length - 1) {
      this.startGroup++;
    } else {
      this.startGroup = 0
    }
    this.hideGroup(this.startGroup);
  }
  nextGroup(block) {
    var tween = this.tweens.add({
      targets: block,
      alpha: .3,
      scale: .7,
      duration: 100,
      yoyo: true
    })



    if (this.startGroup > 0) {
      this.startGroup--;
    } else {
      this.startGroup = groups.length - 1
    }
    this.hideGroup(this.startGroup);
  }
  clickHandler(pointer, block) {
    if (soundOn) {
      this.sound.play('click_sound');
    }
    if (block.level == -1) {

      this.preGroup(block)
      //   this.showGroup(this.startGroup);
    } else if (block.level == -3) {
      this.nextGroup(block)


    } else if (block.level == -2) {
      this.scene.start('titleScreen');
    } else {
      onLevel = block.level;
      onGroup = this.startGroup;
      this.scene.pause()
      this.scene.launch('preview');
    }

  }




}
