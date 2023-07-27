class entity_manager {
    constructor(scene, sound_manager) {
        this.scene = scene;
        this.entity_list = [];
        this.points = 0;
        this.pointCounterText = this.scene.add.text(this.scene.scale.width / 2, this.scene.scale.height / 2,
            this.points,
            { fontSize: '100px', fontFamily: 'CustomFont', color: '#224e8c' });
        this.pointCounterText.setOrigin(0.5).setAlpha(0.5);
        this.sound_manager = sound_manager;
    }

    //link to sound manager for entities
    play_sound(sound_key) {
        this.sound_manager.play_sound(sound_key);
    }

    add_entity(entity) {
        this.entity_list.push(entity);
    }
    update_entity() {
        this.entity_list.forEach(entity => {
            entity.updateObjectFollowing();
        });
    }
    add_points(points) {
        this.points += 1;
        this.update_point_counter();
    }

    update_point_counter() {
        this.pointCounterText.setText(this.points);
    }
    resize(isLandscape) {

        if (isLandscape) {
            this.pointCounterText.x = this.scene.scale.width / 4 ;
            this.pointCounterText.y = this.scene.scale.height / 2;

          //  this.pointCounterText.setFontSize(this.scene.game.scale.width / 5 );
        }
        else {
            this.pointCounterText.x = this.scene.scale.width / 2 ;
            this.pointCounterText.y = this.scene.scale.height / 2;
        }
    }
    GameOver(sound_manager) {
        this.scene.scene.start("end", { score: this.points, sound_manager: sound_manager });
    }
    stop_blinking() {
        this.entity_list.forEach(entity => {
            entity.stop_blinking();
        });
    }
    start_blinking() {
        this.entity_list.forEach(entity => {
            entity.start_blinking();
        });
    }

}