class Sound_manager {
    constructor() {
        this.scene = null;
        this.music = null;
        this.sound = null;
        this.sound_on = true;
        this.music_volume = 0.5;
        this.sound_volume = 0.5;
    }

    init(scene) {
        this.scene = scene;
    }

    play_music(music_key) {
        if (this.sound_on == true) {
            if (this.music != null) {
                this.music.stop();
            }
            this.music = this.scene.sound.add(music_key, { volume: this.music_volume, loop: true });
            this.music.play();
        }
    }

    play_sound(sound_key) {
        if (this.sound_on) {
            this.sound = this.scene.sound.add(sound_key, { volume: this.sound_volume });
            this.sound.play();
        }
    }

    stop_music() {
        if (this.music != null) {
            this.music.stop();
        }
    }

    stop_sound() {
        if (this.sound != null) {
            this.sound.stop();
        }
    }

    toggle_sound() {
        this.sound_on = !this.sound_on;
        if (this.sound_on) {
            this.music.resume();
        } else {
            this.music.pause();
        }
    }
}