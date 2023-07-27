class Boat {
  constructor(scene, x, y, sound_manager) {
    this.scene = scene;
    this.emmiter = null;
    this.sprite = null;
    this.x = x;
    this.y = y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.frameIndex = 7;
    this.isHittable = true;
    this.life = 3;
    this.dead = false;
    this.isBlinking = false;
    this.blinkInterval = null;
    this.blinkDuration = 100;
    this.sound_manager = sound_manager;
    this.entity_manager = null;
  }

  create(skin_index, entity_manager) {
    if (skin_index == null) {
      skin_index = 0;
    }
    this.boat_index = skin_index;
    this.sprite = this.scene.physics.add.image(this.x, this.y, 'boat' + this.boat_index + '_3').setCollideWorldBounds(true);
    this.sprite.setDepth(1);
    this.sprite.setSize(800, 800, true);
    this.sprite.setOrigin(0.5);
    this.entity_manager = entity_manager;
  }


  Update_movement(velocityX, velocityY) {
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    const angle = Math.atan2(velocityY, velocityX);
    this.sprite.setRotation(angle - Math.PI / 2);
    this.sprite.setVelocity(velocityX, velocityY);
    if (this.dead) {
      this.sprite.setVelocity(0, 0);
    }
  }

  hit(entity) {
    switch (entity.type) {
      case "box":
        entity.set_entity_following();
        this.entity_manager.start_blinking();
        break;
      case "ennemy":
        if (this.isHittable) {
          const centerX = this.scene.scale.width / 2;
          const centerY = this.scene.scale.height / 2;
          const randomX = Phaser.Math.FloatBetween(centerX - centerX / 5 * 4, centerX + centerX / 5 * 4);
          const randomY = Phaser.Math.FloatBetween(centerY - 100, centerY + 100);

          entity.sprite.setAlpha(0); //make the entity invisible
          this.sound_manager.play_sound("hit");
          this.life--;
          this.update_sprite(this.life);
          this.isHittable = false;
          this.startBlinking();
          this.scene.time.addEvent({
            delay: 2000,
            callback: () => {
              entity.sprite.setAlpha(1);
              entity.sprite.setPosition(randomX, randomY);
              this.isHittable = true;
              this.stopBlinking();
            },
          });
        }
        break;
      default:
        break;
    }
  }

  startBlinking() {
    if (!this.isBlinking) {
      this.isBlinking = true;
      this.blinkInterval = setInterval(() => {
        this.toggleBlink();
      }, this.blinkDuration);
    }
  }

  stopBlinking() {
    if (this.isBlinking) {
      this.isBlinking = false;
      this.sprite.setAlpha(1);
      clearInterval(this.blinkInterval);
    }
  }

  toggleBlink() {
    this.sprite.setAlpha(1 - this.sprite.alpha);
  }

  resize(isLandscape) {
    // Redimensionnement du bateau
    if (isLandscape) {
      Align.scaleToGameH(this.sprite, 0.1);
      this.scale_bateau = { start: 1, end: 0 };
      this.duration = { min: 200, max: 500 };
    } else {
      Align.scaleToGameW(this.sprite, 0.1);
      this.scale_bateau = { start: 2, end: 0 };
      this.duration = { min: 500, max: 1000 };
    }
    // Redimensionnement de l'émetteur de particules en fonction de la taille du bateau
    if (this.emitter == null) {
      // Repositionner l'émetteur de particules
      this.emitter = this.scene.add.particles(0, 0, "particule", {
        frequency: 50,
        lifespan: this.duration,
        speed: { min: 10, max: 35 },
        scale: this.scale_bateau
      });
      this.emitter.startFollow(this.sprite);
    }
  }

  update_sprite(life) {
    switch (life) {
      case 3:
        this.sprite.setTexture('boat' + this.boat_index + '_3');
        break;
      case 2:
        this.sprite.setTexture('boat' + this.boat_index + '_2');
        break;
      case 1:
        this.sprite.setTexture('boat' + this.boat_index + '_1');
        break;
      case 0:
        this.sprite.setTexture('boat' + this.boat_index + '_0');
        this.dead = true;
        this.scene.entity_manager.play_sound("transition");
        // make the camera flash slowly and then go to the gameover scene
        this.scene.cameras.main.fadeOut(1000, 255, 255, 255);
        this.scene.time.addEvent({
          delay: 1000,
          callback: () => {
            //need to know its entity manager 
            this.scene.GameOver();
          },
        });
        //this.scene.scene.start("gameover");
        break;
      default:
        break;
    }

  }
}


