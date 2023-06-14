class SceneStarting extends Phaser.Scene
{
    constructor()
    {
        super("Starting");
    }
    
    preload(){
    }

    create(){
        
        this.h = game.scale.height;
        this.w = game.scale.width; 

        this.sound_state = 1;
        this.music = this.sound.add('Starting_music');
        this.music.loop = true;
        this.music.volume = 0.1; // volume ici
        this.music.play();


        this.button = this.sound.add('button_sound');

        this.homescreen= this.add.image(0, 0, 'homescreen').setOrigin(0, 0);
        Align.scaleToGameW(this.homescreen, 1); 
        
        
        this.ButtonStart = this.add.image(this.w/2 +10, this.h/8 *5 , 'ButtonStart');
        Align.scaleToGameW(this.ButtonStart, 0.30);
        this.ButtonStart.setInteractive();
        this.ButtonStart.on('pointerdown', () => {
            if (this.sound_state == 1) this.sound.play('Next_level', {volume: 0.1});
            this.music.stop();
            
            this.scene.start("level",{level : 1, sound_state : this.sound_state});
        }
        );
        
        this.menu = this.add.image(this.w/2, this.h/6 *5, 'menu');
        Align.scaleToGameW(this.menu, 0.15);
        this.menu.setInteractive();
        this.menu.on('pointerdown', () => {
           if (this.sound_state == 1) this.sound.play('Next_level', {volume: 0.1});
           this.music.stop();
          
            this.scene.start("Menu",{sound_state : this.sound_state});
            
        }
        );
        // Bouton pour le son, on ou off
        this.soundIcon = this.add.image(this.w/8 * 2, this.h/6 *5 , 'Sound_on').setInteractive();
        if (this.sound_state == -1) this.soundIcon.setTexture('Sound_off');
        this.soundIcon.setScale(5);
        this.soundIcon.on('pointerdown', () => {
            if (this.music.isPlaying) {
                if (this.sound_state==1) this.button.play();
                this.sound_state = -1;
                this.music.pause();
                this.soundIcon.setTexture('Sound_off');
            } else {
                if (this.sound_state==1) this.button.play();
                this.music.play();
                this.sound_state = 1;
                this.soundIcon.setTexture('Sound_on');
            }
        });

        // information button
        this.info = this.add.image(this.w/8 * 6, this.h/6 * 5, 'info').setInteractive();
this.info.setScale(5);
this.info.on('pointerup', () => {
    
    window.location.href = 'https://orleansgames.com/controller/controller_landing.php';
    
});

        
    }

    update(){
    }

}