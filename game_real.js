let game;

window.onload = function() {
  let gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: 0x000000,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 900,
      height: 1650
    },
    physics: {
      default: "arcade",
      arcade: {

      }
    },
    pixelArt: true,

    scene: [preloadGame, titleScreen, settings, selectGroup, selectGame, preview, playGame, UI, endLevel, levelEditor, levelEditorUI]
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
    if (levels[onLevel].size == 0) {
      gameOptions = gameOptionsSmall;
    } else if (levels[onLevel].size == 1) {
      gameOptions = gameOptionsLarge;
      var bgH = 700;
      var bgW = 550;
    } else {
      gameOptions = gameOptionsExtraLarge;
      var bgH = 850;
      var bgW = 1350;
    }




    //game board set up
    this.bombHelp = ['Normal', 'Tap to drop', 'tap to spread', 'swipe to control', '?', '?', 'Extra reach', 'Big radius', 'Smaller punch', 'Color drain'];
    this.bombBonusNums = [0, 1, 2, 3, 6, 7, 8, 9];
    this.currentBombNum = 0;

    this.cameras.main.setBackgroundColor(levels[onLevel].bgColor);

    var particles = this.add.particles("particle");

    // trail emitter configuration
    this.emitter = particles.createEmitter({
      // particle speed - particles do not move
      speed: 0,
      // particle scale: from 1 to zero
      scale: {
        start: .9,
        end: 0
      },
      // particle alpha: from opaque to transparent
      alpha: {
        start: 1,
        end: 0
      },
      // particle frequency: one particle every 100 milliseconds
      frequency: 50,
      // particle lifespan: 1 second
      lifespan: 1000
    });

    this.blockSize = game.config.width / gameOptions.cols;
    this.fixedBlockSize = game.config.width / 35;
    this.gameFieldHeight = this.blockSize * gameOptions.rows;
    this.emptySpace = game.config.height - this.gameFieldHeight;
    gameOptions.offSetY = this.emptySpace / 2;

    this.topPanelb = this.add.image(0, 0, 'platform').setOrigin(0).setTint(0xd8a603).setDepth(2);
    this.topPanelb.displayWidth = game.config.width;
    this.topPanelb.displayHeight = this.emptySpace / 2 + 10;

    this.topPanel = this.add.image(0, 0, 'platform').setOrigin(0).setTint(0x49494f).setDepth(2);
    this.topPanel.displayWidth = game.config.width;
    this.topPanel.displayHeight = this.emptySpace / 2;

    this.bottomPanelb = this.add.image(0, game.config.height, 'platform').setOrigin(0, 1).setTint(0xd8a603).setInteractive();
    this.bottomPanelb.displayWidth = game.config.width;
    this.bottomPanelb.displayHeight = this.emptySpace / 2 + 10;


    this.bottomPanel = this.add.image(0, game.config.height, 'platform').setOrigin(0, 1).setTint(0x49494f).setInteractive();
    this.bottomPanel.displayWidth = game.config.width;
    this.bottomPanel.displayHeight = this.emptySpace / 2;
    this.bottomPanel.on('pointerdown', this.tap, this);
    this.physics.world.setBounds(0, this.emptySpace / 2, game.config.width, this.gameFieldHeight);

    this.createBoard();

    //trajectory
    this.trajectory = this.add.sprite(game.config.width / 2, game.config.height - (this.bottomPanel.displayHeight + 150), "trajectory", 0).setTint(0x00ff00);
    this.trajectory.setOrigin(0.5, 1);
    this.trajectory.setVisible(false);

    //power meter
    this.powerMeter = this.add.image(35, game.config.height - (this.emptySpace / 2 + 50), 'platform').setOrigin(.5, 1).setTint(0xd8a603);
    this.powerMeter.displayWidth = 20;
    this.powerMeter.displayHeight = 0;


    //text fields
    this.setUpText();
    
    //ready modal set up
    this.readyBG = this.add.image(1200, 1100, 'platform').setAlpha(.7).setTint(0x000000);
    this.readyBG.displayHeight = 125;
    this.readyBG.displayWidth = 300;
    this.readyText = this.add.bitmapText(1200, 1100, 'topaz', 'READY?', 70).setOrigin(.5, .5).setTint(0xd8a603);
    
    //aiming brackets
    this.bracketts = this.add.bitmapText(game.config.width / 2, 1340, 'topaz', '[  ]', 70).setOrigin(.5).setTint(0x333333);
   
    //buttons
    //detonation button
    this.detonatePressed = false;
    if(detonaterOn){
      this.detonateIcon = this.add.image(825, 1425, 'icons', 6).setDepth(2).setOrigin(1).setScale(1.5).setInteractive();
      this.detonateIcon.on('pointerdown', function() {
    
      //this.hero.body.setVelocity(0, 0);
      if (soundOn) {
        this.sound.play('detonate_sound');
      }

      var tween = this.tweens.add({
        targets: this.detonateIcon,
        alpha: .3,
        scale: .7,
        duration: 100,
        yoyo: true
      })
      if (!this.detonatePressed) {
        this.doStop();
        this.detonatePressed = true;
      }

    }, this);

    }


    this.shapeHitRow = 0;
    this.shapeHitCol = 0;
    // aux bomb set up
    this.bombGroup = this.physics.add.group();
    this.bombGroup.createMultiple({
      key: 'hero',
      frame: 4,
      repeat: 10,

    });

    Phaser.Actions.Call(this.bombGroup.getChildren(), function(bomb) {
      bomb.placed = false;
    }, this);
    //bomb set up


    //  this.cameras.main.startFollow(this.hero, true, 0, 0.5, 0, - (game.config.height / 2 - game.config.height * gameOptions.firstPlatformPosition));
    // this.input.on("pointerdown", this.destroyPlatform, this);

    this.bonusBomb = this.add.image(-80, -80, 'hero', 0).setAlpha(.4);

    //add first shape

    // this.wall = this.physics.add.image(game.config.width / 2, 700, 'field', 6);
    //this.wall.body.immovable = true;

    //this.physics.add.collider(this.hero, this.wall);
    //inputs

    //initial settings

    this.tapCount = 0;
    this.radius = 5;
    this.gameState = PREPARING_FOR_NEXT_MOVE;
    this.hit = false;
    this.bombHit = true;
    this.coinExists = false;
    this.bombCollected = false;

   // this.tapText = this.add.bitmapText(600, 1240, 'topaz', '#left ' + this.numberOfBombs, 40).setOrigin(0, .5).setTint(0xd8a603).setAlpha(1);

    this.stateText = this.add.bitmapText(600, 1070, 'topaz', '#bombs ' + this.numberOfBombs, 40).setOrigin(0, .5).setTint(0xd8a603).setAlpha(0);


    var UI = this.scene.get('UI');
    UI.events.on('switch', function(data) {
      console.log('switch recieved')
      this.switchBombs();
    }, this);
    UI.events.on('buy', function(data) {
      console.log('buy recieved ' + data)
      this.addBoughtBomb(data);
    }, this);




    this.setUpHeroBomb();
    this.setUpLevel();
    this.setUpBombs();


    this.input.on("pointerdown", this.startAiming, this);
    this.input.on("pointerdown", this.startTap, this)

    this.input.on("pointerup", this.shootBall, this)
    this.input.on("pointermove", this.adjustAim, this);


    this.graphicsAim = this.add.graphics({ lineStyle: { width: 1, color: 0xff0000 }, fillStyle: { color: 0x00ff00 } });

    // making the emitter follow the player
    this.emitter.startFollow(this.hero);
    this.heroSpin = this.tweens.add({
      targets: this.hero,
      angle: 360,
      duration: 200,
      // yoyo: true,
      loop: -1,
      paused: true
    });

  }


  setUpHeroBomb() {
    this.hero = this.physics.add.sprite(game.config.width / 2, 1350, "hero", levels[onLevel].bombTypes[this.currentBombNum - 1]).setAlpha(0).setInteractive();
    this.hero.displayWidth = this.fixedBlockSize * 3;
    this.hero.displayHeight = this.fixedBlockSize * 3;
    this.hero.body.setBounce(1, 1);
    this.hero.body.collideWorldBounds = true;
    this.hero.body.setDrag(.50, .50);
    this.hero.body.setDamping(true);
    this.hero.main = true;
    this.hero.bombType = levels[onLevel].bombTypes[this.currentBombNum - 1];
  }
  setUpLevel() {
    this.nextShape();
    this.applyShape();

  }
  setUpBombs() {
    this.numberOfBombs = levels[onLevel].bombTypes.length;
    this.bombTotalText.setText(this.numberOfBombs)
    this.loadBombs(this.numberOfBombs);
    this.bombsFired = 0;
    var timeline = this.tweens.createTimeline({
      onCompleteScope: this,
      onComplete: function() {
        this.setUpTurn();
      }
    });
    for (var i = 0; i < this.magazine.length; i++) {
      timeline.add({
        targets: this.magazine[i],
        x: 425 - i * 80,
        offset: '-=400',
        duration: 500
      });

      //this.magazine[i].x = 800 - i * 60;
    }

    timeline.play();
    var tween = this.tweens.add({
      targets: [this.readyText, this.readyBG],
      x: 450,
      duration: 800,
      //yoyo: true
    });

  }
  loadBombs(num) {
    this.bompType = 'drop';
    this.magazine = [];
    for (var i = 0; i < num; i++) {
      var icon = this.add.image(-50, 1580, 'hero', levels[onLevel].bombTypes[i]);
      icon.displayWidth = this.fixedBlockSize * 3;
      icon.displayHeight = this.fixedBlockSize * 3;
      icon.bombType = levels[onLevel].bombTypes[i];
      this.magazine.push(icon);
    }

  }
  setUpTurn() {
    var tween = this.tweens.add({
      targets: [this.readyText, this.readyBG],
      x: 1200,
      duration: 800,
      //yoyo: true
    });
    this.nextBomb();
    //this.bombHelpText.setText(this.bombHelp[this.hero.bombType]);
    // this.bracketts.setTint(0xd8a603);

  }
nextBomb() {
    this.tapCount = 0;
    this.bombHit = true;
    this.detonatePressed = false;

    this.currentBombNum++;
    this.addCoin();
    //console.log(levels[onLevel].bombTypes[this.currentBombNum - 1])
    this.bombText.setText(this.currentBombNum);
    //this.bombIcon.setAlpha(1);
    var tween = this.tweens.add({
      targets: this.magazine[0],
      x: game.config.width / 2,
      y: 1350,
      duration: 800,
      onCompleteScope: this,
      onComplete: function() {
        var tempVal = this.magazine[0].bombType;
       
        this.magazine[0].setAlpha(0);
        this.magazine[0].setPosition(50, 1400);
        //	this.hero = this.magazine[0];
        this.magazine.splice(0, 1);

        this.hero.setFrame(tempVal);
        this.hero.bombType = tempVal;

        //this.hero.setFrame(levels[onLevel].bombTypes[this.currentBombNum - 1]);
        // this.hero.bombType = levels[onLevel].bombTypes[this.currentBombNum - 1];
        this.hero.setPosition(game.config.width / 2, 1350).setAlpha(1);
        this.hero.angle = 0;

        this.bracketts.setTint(0xd8a603);
        this.slideBombs();
        this.hit = false;
        this.bombHelpText.setText(this.bombHelp[this.hero.bombType]);
        this.heroRow = Math.floor((this.hero.y - gameOptions.offSetY) / this.blockSize);
        this.heroCol = Math.floor(this.hero.x / this.blockSize);
        this.gameState = WAITING_FOR_PLAYER_INPUT;
        if (this.bombsFired == 4) {
          this.addBonusBomb();
          //
        }
      }

    })

  }
  




  tap(e) {

    if (this.gameState == BALLS_ARE_RUNNING && this.tapCount < 3) {
      if (this.hero.bombType == 1) {
        this.tapCount++;
        if (soundOn) {
          this.sound.play('tap_sound');
        }
        var b = this.bombGroup.get(0, 0, 'hero', 4, true);
        b.displayWidth = this.fixedBlockSize * 3;
        b.displayHeight = this.fixedBlockSize * 3;
        b.placed = true;
        b.setAlpha(1);
        b.setPosition(this.hero.x, this.hero.y);
      } else if (this.hero.bombType == 2) {
        this.tapCount = 4;
        if (soundOn) {
          this.sound.play('tap_sound');
        }
		var angle = Math.atan2(this.hero.body.velocity.y, this.hero.body.velocity.x);
	
		var deg = this.radToDeg(angle)
		console.log('angle ' + angle)
        for (var i = 0; i < 3; i++) {
          var b = this.bombGroup.get(0, 0, 'hero', 5, true);
          b.displayWidth = this.fixedBlockSize * 3;
          b.displayHeight = this.fixedBlockSize * 3;
          b.placed = true;
          b.setAlpha(1);
          b.setPosition(this.hero.x, this.hero.y);
          b.body.setBounce(1, 1);
          b.body.collideWorldBounds = true;
          b.body.setDrag(.50, .50);
          b.body.setDamping(true);
          if (i == 0) {
            //b.body.setVelocity(-200,-this.speed);
            // let angleOfFire = Phaser.Math.DegToRad((this.trajectory.angle - 50) - 90);
            //b.body.setVelocity(this.speed * Math.cos(angleOfFire), this.speed * Math.sin(angleOfFire));
			var newRad = this.degToRad(deg - 15);
			console.log('new angle ' + newRad)
			var newVect = this.vectorFromRad(newRad);
			console.log(newVect)
			b.body.setVelocity((this.ballSpeed * 1.5) * newVect.x, this.ballSpeed * newVect.y)
           // b.body.setVelocity(this.hero.body.velocity.x - 250, this.hero.body.velocity.y - 200);
          } else if (i == 1) {
            //b.body.setVelocity(0, -this.speed);
            // let angleOfFire = Phaser.Math.DegToRad((this.trajectory.angle + 50) - 90);
            //b.body.setVelocity((this.speed * 1) * Math.cos(angleOfFire), (this.speed * 1.1) * Math.sin(angleOfFire));
			var newRad = this.degToRad(deg - 2);
			var newVect = this.vectorFromRad(newRad);
			b.body.setVelocity((this.ballSpeed * 1.5) * newVect.x, this.ballSpeed * newVect.y)

            //b.body.setVelocity(this.hero.body.velocity.x + 250, this.hero.body.velocity.y - 200);
          } else {
            //b.body.setVelocity(200,-this.speed);
            // let angleOfFire = Phaser.Math.DegToRad((this.trajectory.angle + 60) - 90);
            // b.body.setVelocity(this.speed * Math.cos(angleOfFire), this.speed * Math.sin(angleOfFire));
			var newRad = this.degToRad(deg + 15);
			var newVect = this.vectorFromRad(newRad);
			b.body.setVelocity((this.ballSpeed * 1.5) * newVect.x, this.ballSpeed * newVect.y)

            //b.body.setVelocity(this.hero.body.velocity.x + 0, this.hero.body.velocity.y - 400);
          }

        }
      } else if (this.hero.bombType == 3 && e.y < game.config.height - this.emptySpace / 2) {
        /* if(e.x > game.config.width /2){
           this.hero.body.velocity.x += 100;
         } else {
           this.hero.body.velocity.x -= 100;
         }*/
        this.tapCount = 1;

      }
    }
  }
degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

radToDeg(rad) {
  return rad / (Math.PI / 180);
}
vectorFromRad(radian) {
     let x = Math.cos(radian);
     let y = Math.sin(radian);
     
      return {x: x, y: y}
    
  }
  tapUp(e) {
    if (this.gameState == BALLS_ARE_RUNNING) {
      if (this.hero.bombType == 3 && this.tapCount == 1) {
        if (soundOn) {
          this.sound.play('tap_sound');
        }
        console.log(e.downX);
        var swipeTime = e.upTime - e.downTime;
        var swipe = new Phaser.Geom.Point(e.upX - e.downX, e.upY - e.downY);
        var swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipe);
        var swipeNormal = new Phaser.Geom.Point(swipe.x / swipeMagnitude, swipe.y / swipeMagnitude);
    
    
      this.angleOfFire = Phaser.Math.Angle.Between(e.downX, e.downY, e.x, e.y);
this.hero.body.setVelocity(100 * Math.cos(this.angleOfFire), 100 * Math.sin(this.angleOfFire));

      /*  if (swipeMagnitude > 20 && swipeTime < 1000 && (Math.abs(swipeNormal.y) > 0.8 || Math.abs(swipeNormal.x) > 0.8)) {
          if (swipeNormal.x > 0.8) { //right
            this.hero.body.velocity.x += 100;
          }
          if (swipeNormal.x < -0.8) { //left
            this.hero.body.velocity.x -= 100;
          }
          if (swipeNormal.y > 0.8) { //down
            //this.rotateShape();
            this.hero.body.velocity.y += 100;
            //	this.moveDown();
          }
          if (swipeNormal.y < -0.8) { //up
            this.hero.body.velocity.y -= 100;

          }
        }*/
      }
    }
  }
  startTap(e) {
    if (this.gameState == BALLS_ARE_RUNNING) {
      this.tap(e)
    }
  }
  startAiming(e) {

    // are we waiting for player input?
    if (this.gameState == WAITING_FOR_PLAYER_INPUT) {

      // the angle of fire is not legal at the moment
      this.legalAngleOfFire = false;

      // change game state because now the player is aiming
      this.gameState = PLAYER_IS_AIMING;

    }
  }

  // method to adjust the aim
  adjustAim(e) {
    if (this.gameState == PLAYER_IS_AIMING) {



      this.graphicsAim.clear()
      this.direction = Phaser.Math.Angle.Between(this.hero.x, this.hero.y, e.x, e.y);
      this.trajectory.angle = Phaser.Math.RadToDeg(this.direction) + 90;
      this.line = new Phaser.Geom.Line(this.hero.x, this.hero.y, e.x, e.y);
      var points = this.line.getPoints(10);
      for (var i = 0; i < points.length; i++) {
        var p = points[i];
        this.graphicsAim.fillCircle(p.x, p.y, 7)
      }
      this.graphicsAim.fillCircle(this.line.x2, this.line.y2, 37.5)
      this.legalAngleOfFire = true
      this.angleOfFire = Phaser.Geom.Line.Angle(this.line)
      this.ballSpeed = (Phaser.Geom.Line.Length(this.line)) * 2

      if (this.ballSpeed > 1500) {
        this.ballSpeed = 1500;
      }
      this.powerMeter.displayHeight = 1200 * (this.ballSpeed / 1500);
      //this.tapText.setText('speed ' + this.ballSpeed);
      this.forceText.setText(Math.round(this.ballSpeed))
      //this.graphics.strokeLineShap





      /*


            // determine x and y distance between current and initial input
            let distX = e.x - e.downX;
            let distY = e.y - e.downY;

            if (distY > 800) {
              distY = 800;
            }
            this.powerMeter.displayHeight = distY * .5;
            this.forceText.setText(Math.round(distY));
            this.speed = Math.round(distY) * 4;
            // his is a legal agne of fire
            this.legalAngleOfFire = true;

            // show trajectory sprite
            this.trajectory.setVisible(true);

            // determine dragging direction
            this.direction = Phaser.Math.Angle.Between(e.x, e.y, e.downX, e.downY);

            // rotate trajectory sprite accordingly
            this.trajectory.angle = Phaser.Math.RadToDeg(this.direction) + 90;
            //this.angleText.setText(this.trajectory.angle);


            // y distance is smaller than 10, that is: player is not dragging down
            if (distY < 0) {

              // not a legal angle of fire
              this.legalAngleOfFire = false;

              // hide trajectory sprite
              this.trajectory.setVisible(false);
              this.powerMeter.displayHeight = 0;
              this.forceText.setText(0);
              return
            }
       */

    }
  }


  // method to shoot the ball
  shootBall(e) {

    if (this.gameState == PLAYER_IS_AIMING) {


      //console.log(Phaser.Geom.Line.Length(this.line) * .01);
      this.angleOfFire2 = (this.angleOfFire + Math.PI) % (2 * Math.PI)
      // this.ballSpeed = (Phaser.Geom.Line.Length(this.line) ) * 2
      //console.log('speed ' + this.ballSpeed)
      //this.tapText.setText('speed ' + this.ballSpeed);

      //this.active.setVelocity(this.ballSpeed * Math.cos(this.angleOfFire2), this.ballSpeed * Math.sin(this.angleOfFire2));
      this.hero.body.setVelocity(this.ballSpeed * Math.cos(this.angleOfFire), this.ballSpeed * Math.sin(this.angleOfFire));
      this.heroSpin.resume();
      this.bombsFired++;
      this.gameState = BALLS_ARE_RUNNING;
      if (soundOn) {
        this.sound.play('launch_sound');
      }
      this.legalAngleOfFire = false;
      this.bracketts.setTint(0x333333);



      /*


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
              if (soundOn) {
                this.sound.play('launch_sound');
              }
            }

            // we don't have a legal angle of fire
            else {

              // let's wait for player input again
              this.gameState = WAITING_FOR_PLAYER_INPUT;
            }
            
            */
    }
    else if (this.gameState == BALLS_ARE_RUNNING) {
      this.tapUp(e);
    }
  }



  update() {
    this.stateText.setText('#bombs' + this.numberOfBombs);


    if (this.gameState == BALLS_ARE_RUNNING) {
      //this.heroV.setText('x' + Math.round(this.hero.body.velocity.x) + ',y' + Math.round(this.hero.body.velocity.y));
      this.checkPosAux();

      if (Math.abs(this.hero.body.velocity.x) < 5 && Math.abs(this.hero.body.velocity.y) < 5) {
        this.doStop();
      }


      if (this.checkPos()) {
        if (this.hero.bombType == 0 || this.hero.bombType == 2 || this.hero.bombType == 4 || this.hero.bombType == 7 || this.hero.bombType == 6 || this.hero.bombType == 9) {
          this.gameState = PREPARING_FOR_NEXT_MOVE;
        }
        if (this.bombHit) {
          this.bombHit = false;
          if (this.hero.bombType == 0 || this.hero.bombType == 2 || this.hero.bombType == 7 || this.hero.bombType == 8 || this.hero.bombType == 4 || this.hero.bombType == 6 || this.hero.bombType == 9) { //this.hero.bombType == 5  || 
            this.doStop();
          }

        }

      } else {
        this.heroRow = Math.floor((this.hero.y - gameOptions.offSetY) / this.blockSize);
        this.heroCol = Math.floor(this.hero.x / this.blockSize);
        //this.heroYText.setText('row ' + this.heroRow);
        //this.heroXText.setText('col ' + this.heroCol);
        if (this.heroRow > gameOptions.maxY) {
          this.hero.body.setVelocity(0, 0);
        }

      }
    }
  }
  
  checkPos() {
    if (grid[this.heroRow][this.heroCol].value != 8) {
      if (this.hero.bombType != 1 || this.hero.bombType != 3) {
        this.hit = true;
        this.hitValue = grid[this.heroRow][this.heroCol].value;
      }


    }
    return this.hit;
  }


  checkPosAux() {
    if (this.hero.bombType == 2) {

      Phaser.Actions.Call(this.bombGroup.getChildren(), function(bomb) {
        if (bomb.placed) {
          var bRow = Math.floor((bomb.y - gameOptions.offSetY) / this.blockSize);
          var bCol = Math.floor(bomb.x / this.blockSize);

          if (grid[bRow][bCol].value != 8) {
            bomb.setVelocity(0, 0);

          }
        }
      }, this);

    }

  }

  
  
  
  doSpread() {
    //this.tapCount = 4;

    var timeline = this.tweens.createTimeline({
      onCompleteScope: this,
      onComplete: function() {
        this.finishStop();
      }
    });


    for (var i = 0; i < 4; i++) {
      var b = this.bombGroup.get(0, 0, 'hero', 5, true);
      b.displayWidth = this.fixedBlockSize * 3;
      b.displayHeight = this.fixedBlockSize * 3;
      b.placed = true;
      b.setAlpha(1);
      b.setPosition(this.hero.x, this.hero.y);
      if (i == 0) {
        var xpos = this.hero.x;
        var ypos = this.hero.y - 100;
      } else if (i == 1) {
        var xpos = this.hero.x;
        var ypos = this.hero.y + 100;
      } else if (i == 2) {
        var xpos = this.hero.x - 100;
        var ypos = this.hero.y;
      } else if (i == 3) {
        var xpos = this.hero.x + 100;
        var ypos = this.hero.y;
      }
      // b.body.setBounce(1, 1);
      //b.body.collideWorldBounds = true;
      // b.body.setDrag(.50, .50);
      // b.body.setDamping(true);

      timeline.add({
        targets: b,
        y: ypos,
        x: xpos,
        duration: 200,


      });


    }
    timeline.play();


  }
  doStop() {
    this.hero.setVelocity(0, 0);
    this.heroSpin.pause();
    this.hit = true;
    if (this.hero.bombType == 6) {
      this.doSpread();
      //this.finishStop();
    } else if (this.hero.bombType == 9) {
      this.doFill();

    } else {
      this.finishStop();
    }


  }
  finishStop() {
    Phaser.Actions.Call(this.bombGroup.getChildren(), function(bomb) {
      if (bomb.placed) {
        this.doDamage(bomb);
      }
    }, this);
    this.doDamage(this.hero);
    this.gameState = PREPARING_FOR_NEXT_MOVE;
  }
  

  doDamage(object) {
    if (this.hero.bombType == 7) {
      this.radius = 5; // + levels[onLevel].size;
    } else if (this.hero.bombType == 3) {
      this.radius = 4; //+ levels[onLevel].size;
    } else if (this.hero.bombType == 4 || this.hero.bombType == 8) {
      this.radius = 2; // + levels[onLevel].size;
    } else if (this.hero.bombType == 5) {
      this.radius = 1; // + levels[onLevel].size;
    } else {
      this.radius = 3; // + levels[onLevel].size;
    }
    var hX = object.x;
    var hY = object.y;
    var graphics = this.add.graphics({ lineStyle: { width: 2, color: 0xff0000, alpha: .7 } });
    var circle = new Phaser.Geom.Circle(hX, hY, this.fixedBlockSize * this.radius);
    graphics.strokeCircleShape(circle);
    var i = this.heroRow;
    var j = this.heroCol
    this.gameSpeed = this.time.addEvent({
      delay: 500,
      callback: function() {
        object.setAlpha(0);
        object.placed = false;
        if (this.bombGroup.contains(object)) {
          // this.bombGroup.KillAndHide(object);
        }
        if (soundOn) {
          this.sound.play('explode_sound');
        }
        this.damageEmit(hX, hY);
        for (var y = 0; y < gameOptions.rows; y++) {
          for (var x = 0; x < gameOptions.cols; x++) {
            if (circle.contains(grid[y][x].x, grid[y][x].y)) {
              if (grid[y][x].value != 28) {
                grid[y][x].setFrame(8);
                grid[y][x].value = 8;
              }
            }
          }
        }
        if (circle.contains(this.bonusBomb.x, this.bonusBomb.y) && !this.bombCollected) {
          //this.addBoughtBomb(9)
          //this.addBoughtBomb(7)
          this.bombCollected = true;
          if (this.bonusBomb.value == 0 || this.bonusBomb.value == 8) {
            this.collectBonusBomb(this.bonusBomb.value, this.bonusBomb.x, this.bonusBomb.y);
            this.collectBonusBomb(this.bonusBomb.value, this.bonusBomb.x + 50, this.bonusBomb.y + 50);
            this.collectBonusBomb(this.bonusBomb.value, this.bonusBomb.x + 100, this.bonusBomb.y + 1000);
          } else {
            this.collectBonusBomb(this.bonusBomb.value, this.bonusBomb.x, this.bonusBomb.y);
            this.collectBonusBomb(this.bonusBomb.value, this.bonusBomb.x + 50, this.bonusBomb.y + 50);
          }
          this.bonusBomb.destroy();
        }

        if (this.coinExists) {

          if (circle.contains(this.coin.x, this.coin.y)) {

            this.collectCoin();

          }

        }
        if (object.main) {
          //create message
          var rand = Phaser.Math.Between(1, 100);
          if (rand < 10) {
            var mess = 'Great!'
          } else if (rand < 20) {
            var mess = 'Superb!'
          } else if (rand < 30) {
            var mess = 'Excellent!'
          } else if (rand < 50) {

            var mess = 'Pixel-tastic!'
          } else if (rand < 70) {
            var mess = 'You\'re the bomb!'
          } else {
            var mess = '';
          }
          var messText = this.add.bitmapText(game.config.width / 2, 1100, 'topaz', mess, 90).setOrigin(.5).setTint(0xd8a603).setDepth(2).setAlpha(0);
          var tween = this.tweens.add({
            targets: messText,
            alpha: 1,
            yoyo: true,
            duration: 1500,
            onCompleteScope: this,
            onComplete: function() {
				
              messText.destroy();
            }
          })
         this.endTurn();
          
        }
        graphics.clear();
      },
      callbackScope: this,
      loop: false
    });




  }
  doFill() {
    console.log(this.heroCol + ', ' + this.heroRow);
    console.log(this.hitValue);

    this.floodFill(this.heroRow, this.heroCol)
    this.finishStop();
  }
  floodFill(row, col) {
    if (grid[row][col].value == this.hitValue) {
      grid[row][col].value = 8;
      grid[row][col].setFrame(8);
      this.floodFill(row + 1, col);
      this.floodFill(row - 1, col);
      this.floodFill(row, col + 1);
      this.floodFill(row, col - 1);
    }
  }
  collectCoin() {
    if (soundOn) {
      this.sound.play('coin_sound');
    }
    this.coinExists = false;
    coinCount++;
    this.coinText.setText(coinCount);
    this.damageEmit(this.coinText.x, this.coinText.y)
    var tween = this.tweens.add({
      targets: this.coin,
      y: -100,
      duration: 500,
      onCompleteScope: this,
      onComplete: function() {
        this.coin.destroy();
      }
    })
  }
  





  addBoughtBomb(num) {

    var boughtBomb = this.add.image(game.config.width + 50, game.config.height / 2, 'hero', num);
    if (soundOn) {
      this.sound.play('extra_sound');
    }


var count = this.magazine.length;
        var xpos = 425 - count * 80;
        levels[onLevel].bombTypes.push(num);
        var icon = this.add.image(-80, 1580, 'hero', num);
        icon.displayWidth = this.fixedBlockSize * 3;
        icon.displayHeight = this.fixedBlockSize * 3;
        icon.bombType = num;
        var tween = this.tweens.add({
          targets: icon,
          x: xpos,
          duration: 400
        })
        this.magazine.push(icon);
        this.numberOfBombs++;


    var tweenmove = this.tweens.add({
      targets: boughtBomb,
      x: -80,
      y: 1580,
      //offset: '-=400',
      duration: 800,
      onCompleteScope: this,
      onComplete: function() {
        //this.setUpTurn();
        boughtBomb.destroy();
        
      }
    });
    //timeline.play();

  }



  collectBonusBomb(num, xpos, ypos) {
    this.numberOfBombs++;
    this.bombTotalText.setText(this.numberOfBombs)

    levels[onLevel].bombTypes.push(num);
	var boughtBomb = this.add.image(xpos, ypos, 'hero', num);
    boughtBomb.displayWidth = this.fixedBlockSize * 3;
    boughtBomb.displayHeight = this.fixedBlockSize * 3;
	 var count = this.magazine.length;
        var xpos = 425 - count * 80;

        var icon = this.add.image(-80, 1580, 'hero', num);
        icon.displayWidth = this.fixedBlockSize * 3;
        icon.displayHeight = this.fixedBlockSize * 3;
        icon.bombType = num;
        var tween = this.tweens.add({
          targets: icon,
          x: xpos,
          duration: 400
        })
        this.magazine.push(icon);
    

    if (soundOn) {
      this.sound.play('extra_sound');
    }

    var tweenmove = this.tweens.add({
      targets: boughtBomb,
      x: -80,
      y: 1580,
      //offset: '-=400',
      duration: 800,
      onCompleteScope: this,
      onComplete: function() {
        //this.setUpTurn();
        boughtBomb.destroy();
       

      }
    });
    //timeline.play();

  }







  endTurn() {
    this.hit = false;

    this.newShapeCount = 0;
    for (var i = 0; i < gameOptions.rows; i++) {
      for (var j = 0; j < gameOptions.cols; j++) {
        if (grid[i][j].value != 8) { //grid[i][j].value != 28
          this.newShapeCount++;
        }
      }
    }
    console.log('shape count' + this.newShapeCount)
    this.newShapeCountTemp = 0;
    for (var i = 0; i < gameOptions.rows; i++) {
      for (var j = 0; j < gameOptions.cols; j++) {
        if (grid[i][j].value == 28) { //grid[i][j].value != 28
          this.newShapeCountTemp++;
        }
      }
    }
    console.log('shape count' + this.newShapeCountTemp)
    this.newShapeCount -= this.newShapeCountTemp;
    var per = this.newShapeCount / this.shapeCount * 100;
    this.perText.setText(Math.round(per) + '%');
    if (per < 26) {
      this.damageEmit(this.perText.x, this.perText.y);
    }
    if (per == 0) {
      this.gameSpeed = this.time.addEvent({
        delay: 1500,
        callback: function() {
          this.scene.launch("endLevel", { percent: Math.round(per) });
          this.scene.pause();
          this.scene.pause('UI')
        },
        callbackScope: this,
      });


      //this.endLevel(per);
      return
      //	this.scene.start("selectGame");
    } else if (this.magazine.length == 0) {
      // this.endLevel(per);

      this.gameSpeed = this.time.addEvent({
        delay: 1500,
        callback: function() {
          this.scene.launch("endLevel", { percent: Math.round(per) });
          this.scene.pause();
		  this.scene.pause('UI')
        },
        callbackScope: this,
      });
      return
    }
    this.hero.setAlpha(0);
    this.nextBomb();

  }
  switchBombs() {

    if (this.gameState == WAITING_FOR_PLAYER_INPUT) {
      var tempValHero = this.hero.bombType;
      var tempValMag = this.magazine[0].bombType;
      var tween = this.tweens.add({
        targets: this.hero,
        y: 1580,
        yoyo: true,
        duration: 500,
        onYoyo: function() {
          this.hero.bombType = tempValMag;
          this.hero.setFrame(tempValMag)
          this.magazine[0].bombType = tempValHero;
          this.magazine[0].setFrame(tempValHero);
        },
        onYoyoScope: this,
      })





    }

  }
  
  addCoin() {
    var rand = Phaser.Math.Between(1, 100);
    if (rand > 50 && !this.coinExists) {
      var xpos = Phaser.Math.Between(100, 750);
      var ypos = Phaser.Math.Between(275, 600);
      this.coin = this.add.image(xpos, ypos, 'icons', 9).setScale(.75);
      this.coinExists = true;

      var tween = this.tweens.add({
        targets: this.coin,
        alpha: .5,
        scale: .5,
        duration: 2000,
        yoyo: true,
        repeat: -1
      });
      this.time.addEvent({
        delay: 15000,
        callback: function() {
          this.coin.destroy();
          this.coinExists = false;

        },
        callbackScope: this,
        loop: false
      });
    }
  }
  addBonusBomb() {
    //var type = Phaser.Math.Between(0, 8);
    var type = Phaser.Math.RND.pick(this.bombBonusNums);
    this.bonusBomb.setFrame(type);
    var xpos = Phaser.Math.Between(100, 750);
    var ypos = Phaser.Math.Between(275, 600);
    this.bonusBomb.setPosition(xpos, ypos);
    this.bonusBomb.value = type;
    var tween = this.tweens.add({
      targets: this.bonusBomb,
      alpha: .8,

      duration: 2000,
      yoyo: true,
      repeat: -1
    })
  }
  slideBombs() {
    var timeline = this.tweens.createTimeline({
      onCompleteScope: this,
      onComplete: function() {
        //this.setUpTurn();
      }
    });
    for (var i = 0; i < this.magazine.length; i++) {
      timeline.add({
        targets: this.magazine[i],
        x: '+=80',
        //offset: '-=400',
        duration: 300
      });

      //this.magazine[i].x = 800 - i * 60;
    }
    timeline.add({
      targets: this.powerMeter,
      displayHeight: 0,
      duration: 800,
      offset: -800
    });
    timeline.play();
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
   // console.log('shape count' + this.shapeCountTemp)
    this.shapeCount -= this.shapeCountTemp;
    //console.log('shape count' + this.shapeCount)

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
  
  setUpText(){
    var leveltemp = onLevel + 1;
    this.titleText = this.add.bitmapText(50, this.topPanel.displayHeight / 2, 'topaz', '#' + leveltemp + ' ' + levels[onLevel].title, 60).setOrigin(0, .5).setTint(0xd8a603).setDepth(2);
    this.perText = this.add.bitmapText(690, 200, 'topaz', '100%', 70).setOrigin(0, .5).setTint(0xd8a603);
    this.forceText = this.add.bitmapText(70, game.config.height - (this.emptySpace / 2 + 50), 'topaz', '0', 50).setOrigin(0, 1).setTint(0xd8a603);
    this.coinText = this.add.bitmapText(825, 280, 'topaz', '0', 50).setOrigin(1, .5).setTint(0xd8a603);
    this.coinIcon = this.add.image(725, 290, 'icons', 9).setScale(.5);
    //this.heroYText = this.add.bitmapText(700, 350, 'topaz', '0', 40).setOrigin(0, .5).setTint(0xd8a603);
    //this.heroXText = this.add.bitmapText(700, 450, 'topaz', '0', 40).setOrigin(0, .5).setTint(0xd8a603);
    this.bombText = this.add.bitmapText(600, 1575, 'topaz', this.currentBombNum, 40).setOrigin(0, .5).setTint(0xd8a603).setAlpha(1);
    this.bombTotalText = this.add.bitmapText(675, 1575, 'topaz', '0', 40).setOrigin(0, .5).setTint(0xd8a603);
    //this.heroV = this.add.bitmapText(600, 750, 'topaz', '0', 20).setOrigin(0, .5).setTint(0xd8a603);
    this.bombHelpText = this.add.bitmapText(game.config.width / 2, 1450, 'topaz', ' ', 40).setOrigin(.5).setTint(0xd8a603);


  }

  damageEmit(objX, objY, col) {
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
      frequency: 40,
      // particle lifespan: 1 second
      lifespan: 1000
    });
    //emitter.tint.onChange(0x7d1414);
    emitter.explode(40, objX, objY);

  }

}