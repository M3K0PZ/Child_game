class SceneStart extends Phaser.Scene {
  constructor() {
    super("start");
    this.selectedBoatIndex = 0;
    this.boatOptions = [
      "boat0_3", // Replace with the actual boat asset keys
      "boat1_3",
      "boat2_3",
      "boat3_3",
      "boat4_3",
    ];
    this.boatSprite = null;
    this.boatGroup = null;
    this.wanderRange = 100; // Range for boat wandering
    this.wanderSpeed = 50; // Speed at which the boats wander
  }

  init(data) {
    this.sound_manager = data?.sound_manager;
  }

  preload() {
  }

  create() {
    this.cameras.main.setBackgroundColor("#7d7d7d");
    this.w = this.game.scale.width;
    this.h = this.game.scale.height;
    //sound manager init
    if (this.sound_manager == null) {
      this.sound_manager = new Sound_manager();
    }
    this.sound_manager.init(this);
    this.sound_manager.play_music("start");
    // Create a group for boat enemies
    this.boatGroup = this.add.group();

    // Spawn multiple boat enemies
    const numEnemies = 5; // Number of boat enemies to spawn
    for (let i = 0; i < numEnemies; i++) {
      const boatEnemy = this.spawnBoatEnemy();
      this.boatGroup.add(boatEnemy);
    }
    this.titre = this.add.image(this.w / 2, this.h / 4, "Rescue");
    // Create the start button text
    this.start_button = this.add.text(this.w / 2 + 20, this.h / 4 * 3, "START", {
      fill: "#333333",
      fontSize: "200px",
      fontFamily: "CustomFont",
    });
    this.start_button.setOrigin(0.5, 0.5).setInteractive();
    this.start_button.on("pointerdown", (pointer) => {
      this.start_button.setColor("#09f");
    });
    this.start_button.on("pointerup", (pointer) => {
      this.start_button.setColor("#05f");
      this.sound_manager.play_sound("click2");
      this.scale.off('resize', this.resize, this); //bug reported to phaser
      this.scene.start("SceneLevel", { boat_index: this.selectedBoatIndex, sound_manager: this.sound_manager });
    });

    this.start_button.on("pointerover", (pointer) => {
      this.start_button.setFontSize("225px");
    });
    this.start_button.on("pointerout", (pointer) => {
      this.start_button.setFontSize("200px");
    });
    // Create arrow buttons for boat selection
    this.leftArrow = this.add.text(
      this.w / 2 - 100,
      this.h / 2,
      "<",
      {
        fill: "#fff",
        fontSize: "50px",
      }
    );
    this.leftArrow.setOrigin(0.5).setInteractive();
    this.leftArrow.on("pointerup", (pointer) => {
      this.sound_manager.play_sound("click2");
      this.selectPreviousBoat();
    });

    this.rightArrow = this.add.text(
      this.w / 2 + 100,
      this.h / 2,
      ">",
      {
        fill: "#fff",
        fontSize: "50px",
      }
    );
    this.rightArrow.setOrigin(0.5).setInteractive();
    this.rightArrow.on("pointerup", (pointer) => {
      this.sound_manager.play_sound("click2");
      this.selectNextBoat();
    });

    this.soundButton = this.add.image(this.game.scale.width / 2 + 200, this.game.scale.height / 2 + 200, "sound_on");
    // Make the sound button interactive
    this.soundButton.setInteractive();
    this.soundButton.on("pointerdown", (pointer) => {
      this.soundButton.setScale(0.22);
    });
    this.soundButton.on("pointerup", (pointer) => {
      this.resize();

      this.sound_manager.toggle_sound();
      this.sound_manager.play_sound("click");
      this.soundButton.setTexture(this.soundButton.texture.key === "sound_on" ? "sound_off" : "sound_on"); //changement son
    });

    // Display the initial selected boat
    this.displaySelectedBoat();


    this.scale.on('resize', this.resize, this);
    this.resize();
  }

  selectNextBoat() {
    this.selectedBoatIndex++;
    if (this.selectedBoatIndex >= this.boatOptions.length) {
      this.selectedBoatIndex = 0;
    }
    this.displaySelectedBoat();
  }

  selectPreviousBoat() {
    this.selectedBoatIndex--;
    if (this.selectedBoatIndex < 0) {
      this.selectedBoatIndex = this.boatOptions.length - 1;
    }
    this.displaySelectedBoat();
  }

  displaySelectedBoat() {
    if (this.boatSprite) {
      this.boatSprite.destroy();
    }
    const boatKey = this.boatOptions[this.selectedBoatIndex];
    this.boatSprite = this.add.sprite(this.w / 2, this.h / 2, boatKey);
    this.boatSprite.setOrigin(0.5, 0.5);
    this.boatSprite.preFX.addGlow(0xffffff, 1, 1);

    // Additional setup for the boat sprite (positioning, scaling, etc.)

    this.resize();

  }

  spawnBoatEnemy() {
    const x = Phaser.Math.Between(0, this.game.scale.width);
    const y = Phaser.Math.Between(0, this.game.scale.height);
    const boatEnemy = this.physics.add.sprite(x, y, "ennemy"); // Use physics.add.sprite instead of add.sprite
    boatEnemy.setAlpha(0.9);
    boatEnemy.setDepth(0);
    boatEnemy.setCollideWorldBounds(true);
  
    // Set the size of the boat enemy
    const scaleFactor = 0.05; // Adjust this value to change the size (0.5 means half the original size)
    boatEnemy.setScale(scaleFactor);
  
    // Randomize initial movement direction and speed
    const velocityX = Phaser.Math.Between(-this.wanderSpeed, this.wanderSpeed);
    const velocityY = Phaser.Math.Between(-this.wanderSpeed, this.wanderSpeed);
    boatEnemy.body.setVelocity(velocityX, velocityY); // Use body.setVelocity instead of setVelocity
  
    // Wrap the boat enemy around the screen
    this.physics.world.wrap(boatEnemy, -boatEnemy.width / 2, -boatEnemy.height / 2, this.game.scale.width + boatEnemy.width, this.game.scale.height + boatEnemy.height);
  
    return boatEnemy;
  }
  

  update() {
    // Update boat enemies' movement and rotation
    this.boatGroup.getChildren().forEach((boatEnemy) => {
      const { velocity } = boatEnemy.body;
      const angle = Math.atan2(velocity.y, velocity.x);
      boatEnemy.rotation = angle - Math.PI / 2;

      // Randomize movement direction and speed periodically
      if (Phaser.Math.Between(0, 100) < 1) {
        const velocityX = Phaser.Math.Between(-this.wanderSpeed, this.wanderSpeed);
        const velocityY = Phaser.Math.Between(-this.wanderSpeed, this.wanderSpeed);
        boatEnemy.body.setVelocity(velocityX, velocityY); // Use body.setVelocity instead of setVelocity
      }

      // Constrain boat enemies' movement within the wander range
      if (boatEnemy.body.velocity.x > this.wanderSpeed) {
        boatEnemy.body.velocity.x = this.wanderSpeed;
      } else if (boatEnemy.body.velocity.x < -this.wanderSpeed) {
        boatEnemy.body.velocity.x = -this.wanderSpeed;
      }

      if (boatEnemy.body.velocity.y > this.wanderSpeed) {
        boatEnemy.body.velocity.y = this.wanderSpeed;
      } else if (boatEnemy.body.velocity.y < -this.wanderSpeed) {
        boatEnemy.body.velocity.y = -this.wanderSpeed;
      }
    });

  }

  shutdown() {
    this.scale.off('resize', this.resize, this);
  }

  resize() {
    // Redimensionnement du jeu
    var gameWidth = this.scale.width;
    var gameHeight = this.scale.height;
    this.physics.world.setBounds(0, 0, gameWidth, gameHeight);
    var isLandscape = gameHeight / gameWidth < 1.3 ? true : false;
    // Positioning the title
    this.titre.setPosition(gameWidth / 2, gameHeight / 4);
    // Positioning the start button
    this.start_button.setPosition(gameWidth / 2 + 20, gameHeight / 4 * 3);
    // Wrapping the boat enemies around the screen
    this.boatGroup.getChildren().forEach((boatEnemy) => {
      this.physics.world.wrap(boatEnemy, -boatEnemy.width / 2, -boatEnemy.height / 2, gameWidth + boatEnemy.width, gameHeight + boatEnemy.height);
    });
    // Positioning the sound button
    this.soundButton.setPosition(this.game.scale.width / 2, this.game.scale.height - this.game.scale.height / 10);
    // Resizing the boat selector
    var boatSelectorX = gameWidth / 2;
    var boatSelectorY = gameHeight / 2;
    var leftArrowX = boatSelectorX - 200;
    var rightArrowX = boatSelectorX + 200;
    // Update boat selector position
    this.boatSprite.setPosition(boatSelectorX, boatSelectorY);
    // Update arrow button positions
    this.leftArrow.setPosition(leftArrowX, boatSelectorY);
    this.rightArrow.setPosition(rightArrowX, boatSelectorY);
    //update size 
    if (isLandscape) {
      Align.scaleToGameH(this.soundButton, 0.1);
      Align.scaleToGameH(this.titre, 0.4);
      Align.scaleToGameH(this.start_button, 0.2);
      Align.scaleToGameH(this.leftArrow, 0.1);
      Align.scaleToGameH(this.rightArrow, 0.1);
      Align.scaleToGameH(this.boatSprite, 0.1);
    }
    else {
      Align.scaleToGameW(this.soundButton, 0.1);
      Align.scaleToGameW(this.titre, 0.9);
      Align.scaleToGameW(this.start_button, 0.4);
      Align.scaleToGameW(this.leftArrow, 0.16);
      Align.scaleToGameW(this.rightArrow, 0.16);
      Align.scaleToGameW(this.boatSprite, 0.15);
    }
  }
}