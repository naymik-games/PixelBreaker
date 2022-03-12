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
    this.load.image("burst", "assets/levels/01-001.png");
    this.load.image("star", "assets/levels/01-002.png");
    this.load.image("sword", "assets/levels/01-003.png");
    this.load.image("ghost", "assets/levels/01-004.png");
    this.load.image("lightening", "assets/levels/01-005.png");
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
    this.load.image("potion", "assets/levels/01-016.png");
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
    //group 3
    this.load.image("yoda", "assets/levels/03-001.png");
    this.load.image("earth", "assets/levels/03-002.png");
    this.load.image("bender", "assets/levels/03-003.png");
    this.load.image("shipup", "assets/levels/03-004.png");
    this.load.image("shipdown", "assets/levels/03-005.png");
    this.load.image("fett", "assets/levels/03-006.png");
    this.load.image("bombs", "assets/levels/03-007.png");
    this.load.image("xwing", "assets/levels/03-008.png");
    this.load.image("topgun", "assets/levels/03-009.png");
    this.load.image("saber", "assets/levels/03-010.png");
    this.load.image("time", "assets/levels/03-011.png");
    this.load.image("wmap", "assets/levels/03-012.png");
    this.load.image("logo", "assets/levels/03-013.png");
    this.load.image("nasa", "assets/levels/03-014.png");
    this.load.image("dan", "assets/levels/03-015.png");
    this.load.image("gandolf", "assets/levels/03-016.png");
    //group 4
    this.load.image("harley", "assets/levels/04-001.png");
    this.load.image("browns", "assets/levels/04-002.png");
    this.load.image("football", "assets/levels/04-003.png");
    this.load.image("skyline", "assets/levels/04-004.png");
    this.load.image("nightstand", "assets/levels/04-005.png");
    this.load.image("chopper", "assets/levels/04-006.png");
    this.load.image("eye", "assets/levels/04-007.png");
    this.load.image("btf", "assets/levels/04-008.png");
    this.load.image("shuttle", "assets/levels/04-009.png");
    this.load.image("idea", "assets/levels/04-010.png");
    this.load.image("jawa", "assets/levels/04-011.png");
    this.load.image("portait", "assets/levels/04-012.png");
    this.load.image("lem", "assets/levels/04-013.png");
    this.load.image("bulb", "assets/levels/04-014.png");
    this.load.image("robocop", "assets/levels/04-015.png");
    this.load.image("longing", "assets/levels/04-016.png");
    //group 5
    this.load.image("indy", "assets/levels/05-001.png");
    this.load.image("samus", "assets/levels/05-002.png");
    this.load.image("carbonite", "assets/levels/05-003.png");
    this.load.image("ny", "assets/levels/05-004.png");
    this.load.image("ringwraith", "assets/levels/05-005.png");
    this.load.image("smsamus", "assets/levels/05-006.png");
    this.load.image("nescontroll", "assets/levels/05-007.png");
    this.load.image("smartphone", "assets/levels/05-008.png");
    this.load.image("nokia", "assets/levels/05-009.png");
    this.load.image("pw", "assets/levels/05-010.png");
    this.load.image("lotr", "assets/levels/05-011.png");
    this.load.image("rip", "assets/levels/05-012.png");
    this.load.image("rocky", "assets/levels/05-013.png");
    this.load.image("hungry", "assets/levels/05-014.png");
    this.load.image("leaf", "assets/levels/05-015.png");
    this.load.image("jedi", "assets/levels/05-016.png");
    //group 6
    this.load.image("work", "assets/levels/06-001.png");
    this.load.image("casio", "assets/levels/06-002.png");
    this.load.image("hiker", "assets/levels/06-003.png");
    this.load.image("brain", "assets/levels/06-004.png");
    this.load.image("raiders", "assets/levels/06-005.png");
    this.load.image("dumb", "assets/levels/06-006.png");
    this.load.image("temple", "assets/levels/06-007.png");
    this.load.image("olympic", "assets/levels/06-008.png");
    this.load.image("crusade", "assets/levels/06-009.png");
    this.load.image("floppy", "assets/levels/06-010.png");
    this.load.image("oldcom", "assets/levels/06-011.png");
    this.load.image("epsiv", "assets/levels/06-012.png");
    this.load.image("witchk", "assets/levels/06-013.png");
    this.load.image("mcfly", "assets/levels/06-014.png");
    this.load.image("headphones", "assets/levels/06-015.png");
    this.load.image("cassette", "assets/levels/06-016.png");
    //group 7
    this.load.image("1bit", "assets/levels/07-001.png");
    this.load.image("icarus", "assets/levels/07-002.png");
    this.load.image("ipod", "assets/levels/07-003.png");
    this.load.image("droids", "assets/levels/07-004.png");
    this.load.image("usa", "assets/levels/07-005.png");
    this.load.image("laptop", "assets/levels/07-006.png");
    this.load.image("powerpoint", "assets/levels/07-007.png");
    this.load.image("shield", "assets/levels/07-008.png");
    this.load.image("liberty", "assets/levels/07-009.png");
    this.load.image("ohio", "assets/levels/07-010.png");
    this.load.image("walkman", "assets/levels/07-011.png");
    this.load.image("contra", "assets/levels/07-012.png");
    this.load.image("helmet", "assets/levels/07-013.png");
    this.load.image("lincoln", "assets/levels/07-014.png");
    this.load.image("excite", "assets/levels/07-015.png");
    this.load.image("storm", "assets/levels/07-016.png");
    //group 8
    this.load.image("arcade", "assets/levels/08-001.png");
    this.load.image("catapult", "assets/levels/08-002.png");
    this.load.image("castle", "assets/levels/08-003.png");
    this.load.image("cartrages", "assets/levels/08-004.png");
    this.load.image("pacman", "assets/levels/08-005.png");
    this.load.image("swlogo", "assets/levels/08-006.png");
    this.load.image("bella", "assets/levels/08-007.png");
    this.load.image("usa2", "assets/levels/08-008.png");
    this.load.image("mother", "assets/levels/08-009.png");
    this.load.image("finn", "assets/levels/08-010.png");
    this.load.image("chip", "assets/levels/08-011.png");
    this.load.image("magnet", "assets/levels/08-012.png");
    this.load.image("autobots", "assets/levels/08-013.png");
    this.load.image("stamps", "assets/levels/08-014.png");
    this.load.image("mailbox", "assets/levels/08-015.png");
    this.load.image("darkside", "assets/levels/08-016.png");
    //group 9
    this.load.image("fellowship1", "assets/levels/09-001.png");
    this.load.image("fellowship2", "assets/levels/09-002.png");
    this.load.image("burger", "assets/levels/09-003.png");
    this.load.image("et", "assets/levels/09-004.png");
    this.load.image("ghostbuster", "assets/levels/09-005.png");
    this.load.image("born", "assets/levels/09-006.png");
    this.load.image("princess", "assets/levels/09-007.png");
    this.load.image("atari", "assets/levels/09-008.png");
    this.load.image("locamotive", "assets/levels/09-009.png");
    this.load.image("globe", "assets/levels/09-010.png");
    this.load.image("raiders2", "assets/levels/09-011.png");
    this.load.image("rebel", "assets/levels/09-012.png");
    this.load.image("ataricontrol", "assets/levels/09-013.png");
    this.load.image("pigsfly", "assets/levels/09-014.png");
    this.load.image("smallchop", "assets/levels/09-015.png");
    this.load.image("fireplace", "assets/levels/09-016.png");
    //group 10
    this.load.image("car", "assets/levels/10-001.png");
    this.load.image("vertigo", "assets/levels/10-002.png");
    this.load.image("bill", "assets/levels/10-003.png");
    this.load.image("kylo", "assets/levels/10-004.png");
    this.load.image("xbox", "assets/levels/10-005.png");
    this.load.image("deskphone", "assets/levels/10-006.png");
    this.load.image("sting", "assets/levels/10-007.png");
    this.load.image("swissarmy", "assets/levels/10-008.png");
    this.load.image("rocket", "assets/levels/10-009.png");
    this.load.image("caution", "assets/levels/10-010.png");
    this.load.image("iconsc", "assets/levels/10-011.png");
    this.load.image("duck", "assets/levels/10-012.png");
    this.load.image("flagpole", "assets/levels/10-013.png");
    this.load.image("monarch", "assets/levels/10-014.png");
    this.load.image("landscape", "assets/levels/10-015.png");
    this.load.image("bigchopper", "assets/levels/10-016.png");
     //group 11
     this.load.image("marioh", "assets/levels/11-001.png");
     this.load.image("tfaicons", "assets/levels/11-002.png");
     this.load.image("art", "assets/levels/11-003.png");
     this.load.image("2600", "assets/levels/11-004.png");
     this.load.image("jets", "assets/levels/11-005.png");
     this.load.image("fan", "assets/levels/11-006.png");
     this.load.image("cavs", "assets/levels/11-007.png");
     this.load.image("badge", "assets/levels/11-008.png");
     this.load.image("maple", "assets/levels/11-009.png");
     this.load.image("build", "assets/levels/11-010.png");
     this.load.image("campfire", "assets/levels/11-011.png");
     this.load.image("r2d22", "assets/levels/11-012.png");
     this.load.image("port2", "assets/levels/11-013.png");
     this.load.image("aces", "assets/levels/11-014.png");
     this.load.image("etbody", "assets/levels/11-015.png");
     this.load.image("sonic", "assets/levels/11-016.png");
 
  }
  create() {
    this.scene.start("titleScreen");
  }
}