var cacheName = 'phaser-v1';
var filesToCache = [
  '/',
  '/index.html',
  '/game_real.js',
  '/phaser.min.js',
  '/level_info.js',



  '/scenes/endLevel.js',
  '/scenes/preload.js',
  '/scenes/preview.js',
  '/scenes/selectgame.js',
  '/scenes/selectGroup.js',
  '/scenes/settings_menu.js',
  '/scenes/UI.js',
  '/scenes/title.js',


  '/classes/settings.js',

  '/assets/particles.png',
  '/assets/blocks2.png',
  '/assets/bombs_new_clear.png',
  '/assets/bombs_new.png',
  '/assets/corner-left.png',
  '/assets/game_icons2.png',
  '/assets/switch.png',
  '/assets/trajectory.png',
  '/assets/sprites/background.png',
  '/assets/sprites/particle.png',




  '/assets/fonts/topaz.png',
  '/assets/fonts/topaz.xml',

  '/assets/audio/mixkit-completion-of-a-level-2063.wav',
  '/assets/audio/sfx_coin_double1.wav',
  '/assets/audio/sfx_damage_hit9.wav',
  '/assets/audio/sfx_exp_shortest_hard5.wav',
  '/assets/audio/sfx_menu_move1.wav',
  '/assets/audio/sfx_sounds_Blip1.wav',
  '/assets/audio/sfx_sounds_powerup6.wav',
  '/assets/audio/sfx_wpn_missilelaunch.wav',

  '/assets/levels/01-001.png',
  '/assets/levels/01-002.png',
  '/assets/levels/01-003.png',
  '/assets/levels/01-004.png',
  '/assets/levels/01-005.png',
  '/assets/levels/01-006.png',
  '/assets/levels/01-007.png',
  '/assets/levels/01-008.png',
  '/assets/levels/01-009.png',
  '/assets/levels/01-010.png',
  '/assets/levels/01-011.png',
  '/assets/levels/01-012.png',
  '/assets/levels/01-013.png',
  '/assets/levels/01-014.png',
  '/assets/levels/01-015.png',
  '/assets/levels/01-016.png',

  '/assets/levels/02-001.png',
  '/assets/levels/02-002.png',
  '/assets/levels/02-003.png',
  '/assets/levels/02-004.png',
  '/assets/levels/02-005.png',
  '/assets/levels/02-006.png',
  '/assets/levels/02-007.png',
  '/assets/levels/02-008.png',
  '/assets/levels/02-009.png',
  '/assets/levels/02-010.png',
  '/assets/levels/02-011.png',
  '/assets/levels/02-012.png',
  '/assets/levels/02-013.png',
  '/assets/levels/02-014.png',
  '/assets/levels/02-015.png',
  '/assets/levels/02-016.png',

  '/assets/levels/03-001.png',
  '/assets/levels/03-002.png',
  '/assets/levels/03-003.png',
  '/assets/levels/03-004.png',
  '/assets/levels/03-005.png',
  '/assets/levels/03-006.png',
  '/assets/levels/03-007.png',
  '/assets/levels/03-008.png',
  '/assets/levels/03-009.png',
  '/assets/levels/03-010.png',
  '/assets/levels/03-011.png',
  '/assets/levels/03-012.png',
  '/assets/levels/03-013.png',
  '/assets/levels/03-014.png',
  '/assets/levels/03-015.png',
  '/assets/levels/03-016.png',

  '/assets/levels/04-001.png',
  '/assets/levels/04-002.png',
  '/assets/levels/04-003.png',
  '/assets/levels/04-004.png',
  '/assets/levels/04-005.png',
  '/assets/levels/04-006.png',
  '/assets/levels/04-007.png',
  '/assets/levels/04-008.png',
  '/assets/levels/04-009.png',
  '/assets/levels/04-010.png',
  '/assets/levels/04-011.png',
  '/assets/levels/04-012.png',
  '/assets/levels/04-013.png',
  '/assets/levels/04-014.png',
  '/assets/levels/04-015.png',
  '/assets/levels/04-016.png',

  '/assets/levels/05-001.png',
  '/assets/levels/05-002.png',
  '/assets/levels/05-003.png',
  '/assets/levels/05-004.png',
  '/assets/levels/05-005.png',
  '/assets/levels/05-006.png',
  '/assets/levels/05-007.png',
  '/assets/levels/05-008.png',
  '/assets/levels/05-009.png',
  '/assets/levels/05-010.png',
  '/assets/levels/05-011.png',
  '/assets/levels/05-012.png',
  '/assets/levels/05-013.png',
  '/assets/levels/05-014.png',
  '/assets/levels/05-015.png',
  '/assets/levels/05-016.png',

  '/assets/levels/06-001.png',
  '/assets/levels/06-002.png',
  '/assets/levels/06-003.png',
  '/assets/levels/06-004.png',
  '/assets/levels/06-005.png',
  '/assets/levels/06-006.png',
  '/assets/levels/06-007.png',
  '/assets/levels/06-008.png',
  '/assets/levels/06-009.png',
  '/assets/levels/06-010.png',
  '/assets/levels/06-011.png',
  '/assets/levels/06-012.png',
  '/assets/levels/06-013.png',
  '/assets/levels/06-014.png',
  '/assets/levels/06-015.png',
  '/assets/levels/06-016.png',

  '/assets/levels/07-001.png',
  '/assets/levels/07-002.png',
  '/assets/levels/07-003.png',
  '/assets/levels/07-004.png',
  '/assets/levels/07-005.png',
  '/assets/levels/07-006.png',
  '/assets/levels/07-007.png',
  '/assets/levels/07-008.png',
  '/assets/levels/07-009.png',
  '/assets/levels/07-010.png',
  '/assets/levels/07-011.png',
  '/assets/levels/07-012.png',
  '/assets/levels/07-013.png',
  '/assets/levels/07-014.png',
  '/assets/levels/07-015.png',
  '/assets/levels/07-016.png',

  '/assets/levels/08-001.png',
  '/assets/levels/08-002.png',
  '/assets/levels/08-003.png',
  '/assets/levels/08-004.png',
  '/assets/levels/08-005.png',
  '/assets/levels/08-006.png',
  '/assets/levels/08-007.png',
  '/assets/levels/08-008.png',
  '/assets/levels/08-009.png',
  '/assets/levels/08-010.png',
  '/assets/levels/08-011.png',
  '/assets/levels/08-012.png',
  '/assets/levels/08-013.png',
  '/assets/levels/08-014.png',
  '/assets/levels/08-015.png',
  '/assets/levels/08-016.png',

  '/assets/levels/09-001.png',
  '/assets/levels/09-002.png',
  '/assets/levels/09-003.png',
  '/assets/levels/09-004.png',
  '/assets/levels/09-005.png',
  '/assets/levels/09-006.png',
  '/assets/levels/09-007.png',
  '/assets/levels/09-008.png',
  '/assets/levels/09-009.png',
  '/assets/levels/09-010.png',
  '/assets/levels/09-011.png',
  '/assets/levels/09-012.png',
  '/assets/levels/09-013.png',
  '/assets/levels/09-014.png',
  '/assets/levels/09-015.png',
  '/assets/levels/09-016.png',

  '/assets/levels/10-001.png',
  '/assets/levels/10-002.png',
  '/assets/levels/10-003.png',
  '/assets/levels/10-004.png',
  '/assets/levels/10-005.png',
  '/assets/levels/10-006.png',
  '/assets/levels/10-007.png',
  '/assets/levels/10-008.png',
  '/assets/levels/10-009.png',
  '/assets/levels/10-010.png',
  '/assets/levels/10-011.png',
  '/assets/levels/10-012.png',
  '/assets/levels/10-013.png',
  '/assets/levels/10-014.png',
  '/assets/levels/10-015.png',
  '/assets/levels/10-016.png',

  '/assets/levels/11-001.png',
  '/assets/levels/11-002.png',
  '/assets/levels/11-003.png',
  '/assets/levels/11-004.png',
  '/assets/levels/11-005.png',
  '/assets/levels/11-006.png',
  '/assets/levels/11-007.png',
  '/assets/levels/11-008.png',
  '/assets/levels/11-009.png',
  '/assets/levels/11-010.png',
  '/assets/levels/11-011.png',
  '/assets/levels/11-012.png',
  '/assets/levels/11-013.png',
  '/assets/levels/11-014.png',
  '/assets/levels/11-015.png',
  '/assets/levels/11-016.png',

  //'https://cdn.jsdelivr.net/gh/photonstorm/phaser@3.10.1/dist/phaser.min.js'
];
self.addEventListener('install', function (event) {
  console.log('sw install');
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('sw caching files');
      return cache.addAll(filesToCache);
    }).catch(function (err) {
      console.log(err);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('sw fetch');
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }).catch(function (error) {
      console.log(error);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('sw activate');
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.log('sw removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});