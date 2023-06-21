class SceneEnd extends Phaser.Scene
{
    constructor()
    {
        super("End");
    }
    init(data) {
        this.res = data?.res;
        this.vie = data?.vie;
        this.sound_state = data?.sound_state;
        this.current_level = data?.level;
       
        
    }
    preload(){
    }
    
    create(){

        
        if (this.current_level >= 12){
            //.log("end");
            // fin des niveaux, éran de fin
            this.scene.start("Ending", {sound_state : this.sound_state});
            
        }else {

        // get the dimensions of the game
        const width = this.scale.width;
        const height = this.scale.height;
        this.partcle;
        //display lose or win scene depending on res, 0 or 1, and the life count
        if(this.res == 1){
            this.music = this.sound.add('Win_sound');
            if (this.sound_state == 1){
            this.music.play();
            this.music.loop = true;
            this.music.volume = 0.1; // volume ici 
            }
            this.particle = 'coupe';
        switch(this.vie){
            case 1:
                 this.res_image = this.add.image(width/2,  height/2, 'win1');

                break;
            case 2:
                this.res_image = this.add.image(width/2,  height/2, 'win2');
                break;
            case 3:
                this.res_image = this.add.image(width/2,  height/2, 'win3');
                break;
            default:
                console.log("UNEXPECTED CRITICAL ERROR ENDSCENE");
                break;
        }
    }else{
        this.music = this.sound.add('End_sound');
        if (this.sound_state == 1){
        this.music.play();
        this.music.loop = true;
        this.music.volume = 0.5; // volume ici 
        }
        this.particle = 'croix';

        this.res_image = this.add.image(width/2,  height/2, 'loose');
    }
    Align.scaleToGameH(this.res_image, 1);
   
  
        // display the button reload 
        this.reload = this.add.image(width/20 * 10 -45, height/20 *13 - 27, 'reload_button');
        
        Align.scaleToGameW(this.reload, 0.09  );
        
        this.reload.setInteractive();
        this.reload.on('pointerup', () => {
            if (this.sound_state == 1) this.sound.play('Change_sound', {volume: 0.5});
            this.music.stop();
            this.scene.start("level");
                }
        ); 
        //display the button menu
        this.menu = this.add.image(width/20 +45, height/20 +10, 'menu'); // n'apparait pas (encore)
         Align.scaleToGameW(this.menu, 0.12);
         this.menu.setInteractive();
         this.menu.on('pointerdown', () => {
            if (this.sound_state == 1) this.sound.play('Next_level', {volume: 0.1});
            this.music.stop();
            this.scene.start("Menu", { sound_state: this.sound_state});
             
         }
         );

        //display the button next 
        this.next = this.add.image(width/20 * 10 + 45, height/20 *13 - 27, 'next_button');
        Align.scaleToGameW(this.next, 0.13  );
        
        this.next.setInteractive();
        this.next.on('pointerup', () => {
            if (this.sound_state == 1) this.sound.play('Next_level', {volume: 0.1})
            this.music.stop();
          
            this.scene.start("level", {level: this.current_level+1,sound_state : this.sound_state}); // erreur ici a fix lundi
                }
        );

        this.add.particles(0, -10, this.particle, {
            x: { min: 0, max: 640 },
            lifespan: 10000,
            speedY: { min: 50, max: 300 },  
            scale: { start: 2, end: 1  },
            quantity: 1,
            blendMode: 'OVERLAY', 
            frequency: 150,
            
            rotate: { min: -15, max: 15 } 
        });
    }
    }
    
   
    

    update(){
    }

}