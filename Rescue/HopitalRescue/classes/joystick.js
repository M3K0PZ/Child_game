class Joystick {
  constructor(scene, x, y, radius) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.directionX = 0;
    this.directionY = 0;
    this.distance = 0;
    this.radius = radius;
    this.joystickBase = null;
    this.joystick = null;
    this.joystickActive = false;
  }

  create() {
    this.joystickBase = this.scene.add.image(this.x, this.y, 'joystickBase').setInteractive();
    this.joystick = this.scene.add.image(this.x, this.y, 'joystick').setInteractive();
    this.joystick.setScale(0.5);
    this.joystickBase.setScale(0.5);
    this.joystick.setAlpha(0.8);

    this.scene.input.on('pointerdown', (pointer) => {
      this.joystickActive = true;
      this.joystickBase.x = pointer.x;
      this.joystickBase.y = pointer.y;
      this.joystick.x = pointer.x;
      this.joystick.y = pointer.y;
      this.joystick.setPosition(this.joystickBase.x, this.joystickBase.y);
      this.joystickBase.setPosition(this.joystickBase.x, this.joystickBase.y);
    });

    this.joystick.on('pointerdown', () => {
      this.joystickActive = true;
    });

    this.scene.input.on('pointerup', () => {
      this.joystickActive = false;
      this.joystick.setVisible(false);
      this.joystickBase.setVisible(false);
    });

    this.scene.input.on('pointermove', (pointer) => {
      if (this.joystickActive) {
        this.joystick.setVisible(true);
        this.joystickBase.setVisible(true);
        const angle = Phaser.Math.Angle.Between(this.joystickBase.x, this.joystickBase.y, pointer.x, pointer.y);
        this.distance = Phaser.Math.Distance.Between(this.joystickBase.x, this.joystickBase.y, pointer.x, pointer.y);
        //update des valeurs de direction
        this.directionX = Math.cos(angle);
        this.directionY = Math.sin(angle);
        // affichage graphique du joystick
        if (this.distance <= this.radius) {
          this.joystick.setPosition(pointer.x, pointer.y);
        } else {
          const deltaX = Math.cos(angle) * this.radius;
          const deltaY = Math.sin(angle) * this.radius;
          const newX = this.joystickBase.x + deltaX;
          const newY = this.joystickBase.y + deltaY;
          this.joystick.setPosition(newX, newY);
          this.distance = this.radius; // caper la speed
        }
      }
    });
  }

  getDirection() {
    return { x: this.directionX, y: this.directionY };
  }
  getSpeed() {
    return this.distance / this.radius;
  }
}