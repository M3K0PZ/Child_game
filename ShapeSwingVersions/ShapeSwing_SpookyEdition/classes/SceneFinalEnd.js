class SceneFinalEnd extends Phaser.Scene
{
    constructor()
    {
        super("Ending");
    }
    init(data) {
        this.sound_state = data?.sound_state;

    }

    preload(){
    }

    create(){
        this.h = game.scale.height;
        this.w = game.scale.width; 

        this.music = this.sound.add('Final_music');

        if (this.sound_state == 1){
        
        
        this.music.loop = true;
        this.music.volume = 0.1; // volume ici
        this.music.play();
        }

        this.homescreen = this.add.image(0, 0, 'FinalScreen').setOrigin(0, 0);
        Align.scaleToGameW(this.homescreen, 1);
        
        this.add.particles(0, -10, 'coin', {
            x: { min: 0, max: 640 },
            lifespan: 10000,
            speedY: { min: 50, max: 300 },  
            scale: { start: 10, end: 7  },
            quantity: 1,
            blendMode: 'OVERLAY', 
            frequency: 300,
            
            rotate: { min: -15, max: 15 } 
        });

        //add button home 
        this.home = this.add.image(this.w/2, this.h/8 *3, 'home');
        Align.scaleToGameW(this.home, 0.25);
        this.home.setInteractive();
        this.home.on('pointerdown', () => {
            if (this.sound_state == 1) this.sound.play('Next_level', {volume: 0.1});
            this.music.stop();
            this.scene.start("Starting", {sound_state : this.sound_state});

        }
        );

    }

    update(){
    }
}