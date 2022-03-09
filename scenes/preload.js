class preloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '22px monospace',
        fill: '#ffffff'
      }
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.load.image("platform", "assets/platform.png");


    this.load.audio('tap_sound', 'assets/audio/sfx_sounds_Blip1.wav');

    this.load.audio('detonate_sound', 'assets/audio/sfx_damage_hit9.wav');
    this.load.audio('click_sound', 'assets/audio/sfx_menu_move1.wav');
    this.load.audio('explode_sound', 'assets/audio/sfx_exp_shortest_hard5.wav');
    this.load.audio('launch_sound', 'assets/audio/sfx_wpn_missilelaunch.wav');
    this.load.audio('extra_sound', 'assets/audio/sfx_sounds_powerup6.wav');
    this.load.audio('coin_sound', 'assets/audio/sfx_coin_double1.wav');
    this.load.audio('end', 'assets/audio/mixkit-completion-of-a-level-2063.wav');
    this.load.bitmapFont("topaz", "assets/fonts/topaz.png", "assets/fonts/topaz.xml");
    this.load.spritesheet("particle_color", "assets/particles.png", {
      frameWidth: 6,
      frameHeight: 6
    });
    this.load.image("cl", "assets/corner-left.png");

    this.load.image("particle", "assets/sprites/particle.png");

    this.load.spritesheet("hero", "assets/bombs_new_clear.png", {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet("icons", "assets/game_icons2.png", {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet("switch", "assets/switch.png", {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet("trajectory", "assets/trajectory.png", { frameWidth: 40, frameHeight: 600 });
    //levels
    //group 1
    this.load.image("burst", "assets/levels/burst01-001.png");
    this.load.image("star", "assets/levels/star01-002.png");
    this.load.image("sword", "assets/levels/sword01-003.png");
    this.load.image("ghost", "assets/levels/ghost01-004.png");
    this.load.image("lightening", "assets/levels/lightening01-005.png");
    this.load.image("mega", "assets/levels/01-006.png");
    this.load.image("tap", "assets/levels/01-007.png");
    this.load.image("mario", "assets/levels/01-008.png");
    this.load.image("gdude", "assets/levels/01-009.png");
    this.load.image("r2", "assets/levels/01-010.png");
    this.load.image("tnt", "assets/levels/01-011.png");
    this.load.image("peace", "assets/levels/01-012.png");
    this.load.image("flower", "assets/levels/01-013.png");
    this.load.image("moon", "assets/levels/01-014.png");
    this.load.image("good", "assets/levels/01-015.png");
    this.load.image("potion", "assets/levels/potion01-016.png");
    //group 2
    this.load.image("groot", "assets/levels/02-001.png");
    this.load.image("random", "assets/levels/02-002.png");
    this.load.image("atat", "assets/levels/02-003.png");
    this.load.image("invader", "assets/levels/02-004.png");
    this.load.image("vader", "assets/levels/02-005.png");
    this.load.image("bowl", "assets/levels/02-006.png");
    this.load.image("signal", "assets/levels/02-007.png");
    this.load.image("crying", "assets/levels/02-008.png");
    this.load.image("pringle", "assets/levels/02-009.png");
    this.load.image("ace", "assets/levels/02-010.png");
    this.load.image("gimli", "assets/levels/02-011.png");
    this.load.image("frodo", "assets/levels/02-012.png");
    this.load.image("gondor", "assets/levels/02-013.png");
    this.load.image("cool", "assets/levels/02-014.png");
    this.load.image("falcon", "assets/levels/02-015.png");
    this.load.image("calendar", "assets/levels/02-016.png");
  }
  create() {
    this.scene.start("titleScreen");
  }
}