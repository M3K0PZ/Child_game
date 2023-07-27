class SceneEnd extends Phaser.Scene {
  constructor() {
    super("end");
    this.score = 0;
    this.scoreText = null;
    this.confettiEmitter = null;
  }

  init(data) {
    this.score = data?.score;
    this.sound_manager = data?.sound_manager;
  }

  create() {
    // Create a white background
    this.cameras.main.setBackgroundColor('#c9c9c9');
    this.sound_manager.init(this);
    this.sound_manager.play_music("end");

    // Create the confetti emitter
    this.confettiEmitter = this.add.particles(0, 0, "particule_fin", {
      x: { min: 0, max: this.game.scale.width },
      y: 0,
      speed: { min: 200, max: 400 },
      angle: { min: 100, max: 400 }, // Adjust the angle range as needed
      gravityY: 400,
      lifespan: 4000,
      scale: { start: 0.3, end: 0 },
      frequency: 150,
      quantity: 5,
    });
    this.confettiEmitter.setAlpha(0.5);

    // Create the score text
    this.scoreText = this.add.text(this.game.scale.width / 2, this.game.scale.height / 3, "" + this.score, {
      fill: "#000000",
      fontSize: "480px",
      fontFamily: "CustomFont",
    });
    this.scoreText.setOrigin(0.5);
    this.scoreText.preFX.addGlow(0xffffff, 2, 1, 0);

    // Create the replay button, along with the sound one next to it
    this.replayButton = this.add.image(this.game.scale.width / 2, this.game.scale.height / 2 + 200, "replay");
    this.soundButton = this.add.image(this.game.scale.width / 2 + 200, this.game.scale.height / 2 + 200, "sound_on");
    this.infoButton = this.add.image(this.game.scale.width / 2 - 200, this.game.scale.height / 2 + 200, "info");

    // Make the replay button interactive
    this.replayButton.setInteractive();
    this.replayButton.on("pointerdown", (pointer) => {
      this.replayButton.setScale(0.25);
    });
    this.replayButton.on("pointerup", (pointer) => {
      this.sound_manager.play_sound("click2");
      this.scene.stop('end');
      this.scale.off('resize', this.resize, this);
      this.scene.start("start", { sound_manager: this.sound_manager });
    });

    // Make the sound button interactive
    this.soundButton.setInteractive();
    this.soundButton.on("pointerdown", (pointer) => {
      this.soundButton.setScale(0.22);
    });
    this.soundButton.on("pointerup", (pointer) => {
      this.resize();
      this.sound_manager.play_sound("click2");
      this.sound_manager.toggle_sound();
      this.soundButton.setTexture(this.soundButton.texture.key === "sound_on" ? "sound_off" : "sound_on"); //changement son
    });

    // Make the info button interactive
    this.infoButton.setInteractive();
    this.infoButton.on("pointerdown", (pointer) => {
      this.infoButton.setScale(0.22);
    });
    this.infoButton.on("pointerup", (pointer) => {
      this.sound_manager.play_sound("click2");
      window.location.href = 'https://orleansgames.com/controller/controller_landing.php';
    });

    // Resize the scene elements
    this.resize();
    this.scale.on("resize", this.resize, this);
  }

  update() {
  }

  resize() {
    this.physics.world.setBounds(0, 0, this.game.scale.width, this.game.scale.height);
    // Update the position of the score text
    this.scoreText.setPosition(this.game.scale.width / 2+40, this.game.scale.height / 3);

    // Update the position of the confetti emitter
    this.confettiEmitter.setPosition(0, -50);


    // Update the position of the buttons
    this.replayButton.setPosition(this.game.scale.width / 2, this.game.scale.height / 2 + 200);
    this.soundButton.setPosition(this.game.scale.width / 2 + 200, this.game.scale.height / 2 + 200);
    this.infoButton.setPosition(this.game.scale.width / 2 - 200, this.game.scale.height / 2 + 200);

    //landscape
    if (this.game.scale.width > this.game.scale.height) {
      Align.scaleToGameW(this.replayButton, 0.1);
      Align.scaleToGameW(this.soundButton, 0.1);
      Align.scaleToGameW(this.infoButton, 0.1);
    } else {
      Align.scaleToGameH(this.replayButton, 0.1);
      Align.scaleToGameH(this.soundButton, 0.1);
      Align.scaleToGameH(this.infoButton, 0.1);
      //add more space between the buttons
      this.soundButton.x += 50;
      this.infoButton.x -= 50;

    }


  }

}