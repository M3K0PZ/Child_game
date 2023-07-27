class SceneLevel extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneLevel'
    });
    this.w = game.config.width;
    this.h = game.config.height;
    this.touches = null;
    this.zone = null;
    this.object = null;
    this.isObjectFollowing = false;
    this.boat = null;
    this.boatSpeed = 250;
    this.joystick = null;
    this.joystickRadius = 100;
    this.joystickSpeed = null;
  }

  init(data) {
    this.boat_index = data?.boat_index; //choose the boat skin
    if (this.boat_index == null) {
      this.boat_index = 0;
    }
    this.sound_manager = data?.sound_manager;
  }

  preload() {
    // Chargement des ressources du jeu 
    //chargement des assets des bateaux
    this.load.image('boat' + this.boat_index + '_2', 'assets/img/boats/ship' + this.boat_index + '/ship2.png')
    this.load.image('boat' + this.boat_index + '_1', 'assets/img/boats/ship' + this.boat_index + '/ship1.png')
    this.load.image('boat' + this.boat_index + '_0', 'assets/img/boats/ship' + this.boat_index + '/ship0.png')
  }

  create() {
    this.entity_manager = new entity_manager(this, this.sound_manager);
    this.sound_manager.init(this);
    this.sound_manager.play_music("level");
    this.initializeTimer();
    this.initializeGraphics(); // Initialisation des éléments du jeu
    this.initializeInputControls();
    this.scale.on('resize', this.resize, this);
    this.resize();
  }

  update() {
    // Logique de mise à jour du jeu
    this.updateBoatMovement();
    this.entity_manager.update_entity();
  }


  //////////////////////// FONCTIONS ////////////////////////
  initializeTimer() {
    // Configuration du timer du jeu, avec un compteur a l'écran
    this.timeLeft = 60*3; // en secondes
    this.timeText = this.add.text(this.scale.width / 2, this.scale.height / 2, this.timeLeft, {
      fontFamily: 'CustomFont',
      fontSize: '100px',
      fill: '#000000'

    });
    this.timeText.setOrigin(0.5);
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timeLeft--;
        this.timeText.setText(this.timeLeft);
        if (this.timeLeft <= 0) {
          this.GameOver();

        }
      },
      loop: true
    });



  }

  initializeGraphics() {
    // Configuration graphique du jeu'
    this.cameras.main.setBackgroundColor('#c9c9c9');
    this.boat = new Boat(this, this.scale.width / 2, this.scale.height / 2, this.sound_manager); //le player en dehors des regles de l'entity manager
    this.boat.create(this.boat_index, this.entity_manager);

    // faites 'en dur' parce qu'elles sont uniques, les ennemis et autres non
    this.box = new entity(this, this.scale.width / 4, this.scale.height / 2, this.entity_manager);
    this.box.create("box");
    this.box.add_collision(this.boat);

    this.ennemy1 = new entity(this, this.scale.width / 4 * 3, this.scale.height / 2, this.entity_manager);
    this.ennemy1.create("ennemy");
    this.ennemy1.add_collision(this.boat);

    this.zone = new entity(this, this.scale.width / 2, this.scale.height / 8, this.entity_manager);
    this.zone.create("zone");
    this.physics.add.collider(this.boat.sprite, this.zone.sprite, () => {
      this.box.collected();
    }
    );
    this.physics.add.collider(this.zone.sprite, this.ennemy1.sprite);

    this.entity_manager.add_entity(this.ennemy1);
    this.entity_manager.add_entity(this.box);
    this.entity_manager.add_entity(this.zone);
    this.resize();
  }

  initializeInputControls() {
    // Configuration des contrôles du jeu

    this.joystick = new Joystick(this, this.scale.width / 2, this.scale.height * 0.9, this.joystickRadius);
    this.joystick.create();
  }

  updateBoatMovement() {
    // Logique de déplacement du bateau
    this.joystickSpeed = this.joystick.getSpeed();
    const direction = this.joystick.getDirection();
    const velocityX = direction.x * this.boatSpeed * this.joystickSpeed;
    const velocityY = direction.y * this.boatSpeed * this.joystickSpeed;
    this.boat.Update_movement(velocityX, velocityY);
  }

  updateObjectFollowing() {
    this.box.updateObjectFollowing();
  }

  resize() {
    // Redimensionnement du jeu
    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;
    this.physics.world.setBounds(0, 0, gameWidth, gameHeight);
    var isLandscape = this.scale.height / this.scale.width < 1.3 ? true : false;

    if (!isLandscape) {
      this.boatSpeed = 350;
      this.timeText.setPosition(this.scale.width / 2, this.scale.height / 5 * 4);
    } else {
      this.timeText.setPosition(this.scale.width / 4 * 3, this.scale.height / 2);

      this.boatSpeed = 250;
    }

    this.entity_manager.resize(isLandscape);
    this.boat.resize(isLandscape);
    this.box.resize(isLandscape);
    this.zone.resize(isLandscape);
    this.ennemy1.resize(isLandscape);

  }

  GameOver() {
    this.scale.off('resize', this.resize, this);
    this.entity_manager.GameOver(this.sound_manager);
  }

}