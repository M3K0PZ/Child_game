class entity {
    constructor(scene, x, y, manager) {
        this.scene = scene;
        this.entity_manager = manager;
        this.sprite = null;
        this.x = x;
        this.y = y;
        this.type = null; // box, ennemy,...
        this.boat = null;
        this.isObjectFollowing = false;
        this.isLandscape = false; // defaut format téléphone
        this.rotation = 0; // New property to store rotation angle
        this.speed = 100; // Desired speed value
        this.direction = new Phaser.Math.Vector2(); // New property to store the direction
        this.is_blinking = false;
    }

    create(type) {
        this.type = type;
        switch (type) {
            case "box":
                this.sprite = this.scene.physics.add.image(this.x, this.y, 'box1');
                this.sprite.setCollideWorldBounds(true);
                this.sprite.setDepth(1);
                this.sprite.setSize(600, 600, true);
                break;
            case "ennemy":
                this.sprite = this.scene.physics.add.image(this.x, this.y, 'ennemy');
                this.sprite.setCollideWorldBounds(true);
                this.sprite.setDepth(1);
                this.sprite.setSize(40, 40, true);
                break;
            case "zone":
                this.sprite = this.scene.physics.add.image(this.x, -this.y / 3, 'zone');
                this.sprite.setOrigin(0.5);
                this.sprite.setImmovable(true);
                this.sprite.setDepth(1);
                this.sprite.setScale(0.5);
                break;
            default:
                break;
        }
    }

    updateObjectFollowing() {
        // Logique de suivi de l'objet (dans le cas d'un objet qui suit le bateau)
        if (this.isObjectFollowing && this.boat != null && this.type == "box") {
            this.scene.tweens.add({
                targets: this.sprite,
                x: this.boat.sprite.x,
                y: this.boat.sprite.y,
                ease: 'Linear',
                duration: 500, // 5000 pour les ennemis
                repeat: 0,
                yoyo: false
            });
        }
        if (this.type == "ennemy") {
            const targetX = this.boat.sprite.x;
            const targetY = this.boat.sprite.y;
            // Calculate the direction vector
            this.direction.setTo(targetX - this.sprite.x, targetY - this.sprite.y).normalize();
            // Multiply the direction by the speed value
            const velocityX = this.direction.x * this.speed;
            const velocityY = this.direction.y * this.speed;
            // Apply the velocity to the sprite
            this.sprite.body.setVelocity(velocityX, velocityY);
            // Calculate the rotation angle
            this.rotation = Math.atan2(velocityY, velocityX) - Math.PI / 2;
            // Apply the rotation to the sprite
            this.sprite.rotation = this.rotation;
        }
        if (this.type == "zone"&& this.isObjectFollowing) {
            //make the zone flicker so the player knows where to go 
            this.scene.tweens.add({
                targets: this.sprite,
                alpha: 0.5,
                ease: 'Linear',
                duration: 500,
                repeat: 0,
                yoyo: true
            });

        }

    }

    add_collision(boat) { // collision avec le bateau seulement
        this.boat = boat;
        this.scene.physics.add.overlap(this.sprite, boat.sprite, () => {
            boat.hit(this);
        });
    }

    set_entity_following() {
        if (this.isObjectFollowing == false) {
            this.entity_manager.play_sound("box");
        }
        this.isObjectFollowing = true;
    }

    collected() {
        // when overlaping with zone
        if (this.isObjectFollowing) {
            this.entity_manager.add_points();
            this.entity_manager.stop_blinking(); // toggle the zone blinking off
            // destroy the sprite, wait 1 seconde put it again in a random position on the screen 
            this.sprite.destroy();
            this.scene.time.addEvent({
                delay: 1000,
                callback: () => {
                    const centerX = this.scene.scale.width / 2;
                    const centerY = this.scene.scale.height / 2;
                    const randomX = Phaser.Math.FloatBetween(centerX - 100, centerX + 100);
                    const randomY = Phaser.Math.FloatBetween(centerY - 100, centerY + 100);
                    const random_int = Phaser.Math.Between(1, 3);

                    this.sprite = this.scene.physics.add.image(randomX, randomY, 'box' + random_int);
                    this.sprite.setCollideWorldBounds(true);
                    this.sprite.setDepth(1);
                    this.sprite.setSize(600, 600, true);
                    this.add_collision(this.boat);
                    if (this.isLandscape) {
                        Align.scaleToGameH(this.sprite, 0.03);
                    } else {
                        Align.scaleToGameW(this.sprite, 0.06);
                    }
                },
                loop: false
            });
            this.entity_manager.play_sound("zone");
            this.isObjectFollowing = false;
        }
    }

    resize(isLandscape) {
        this.isLandscape = isLandscape;
        // Redimensionnement de l'objet
        if (this.type === "box") {
            // Vérifier si la boîte a déjà une position aléatoire
            // Mettre à jour la position en fonction du redimensionnement de la scène
            const currentX = this.sprite.x;
            const currentY = this.sprite.y;
            const ratioX = currentX / this.scene.scale.width;
            const ratioY = currentY / this.scene.scale.height;
            const newRandomX = ratioX * this.scene.scale.width;
            const newRandomY = ratioY * this.scene.scale.height;
            this.sprite.setPosition(newRandomX, newRandomY);
            if (isLandscape) {
                Align.scaleToGameH(this.sprite, 0.03);
            } else {
                Align.scaleToGameW(this.sprite, 0.09);
            }
        }
        if (this.type === "zone") {
            this.sprite.x = this.scene.scale.width / 2;
            this.sprite.y = -this.sprite.height / 10;
            if (isLandscape) {
                Align.scaleToGameH(this.sprite, 0.45);
            } else {
                Align.scaleToGameW(this.sprite, 0.8);
            }
        }
        if (this.type === "ennemy") {
            // Update the rotation based on the new position
            if (isLandscape) {
                Align.scaleToGameH(this.sprite, 0.1);
            } else {
                Align.scaleToGameW(this.sprite, 0.1);
            }
            const targetX = this.boat.sprite.x;
            const targetY = this.boat.sprite.y;
            const dx = targetX - this.sprite.x;
            const dy = targetY - this.sprite.y;
            this.rotation = Math.atan2(dy, dx);
            // Apply the rotation to the sprite
            this.sprite.rotation = this.rotation;
        }
    }

    start_blinking() {
        //add postFX glow
        
        if(this.type == "zone" && !this.is_blinking){
            this.sprite.setAlpha(1);
            //make the zone flicker so the player knows where to go
            this.scene.tweens.add({
                targets: this.sprite,
                alpha: 0.6,
                ease: 'easeOut',
                scale: this.sprite.scale * 1.05,
                duration: 500,
                repeat: -1,
                yoyo: true
            });
            this.is_blinking = true;
        }
    }

    stop_blinking() {
        //remove tweens if exists 
        console.log("stop blinking");
        if(this.type == "zone" && this.is_blinking){
            //turn off the zone flickering
            this.scene.tweens.killTweensOf(this.sprite);
            this.sprite.setAlpha(1);
            this.is_blinking = false;


        }
    }

}
