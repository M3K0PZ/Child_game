class SceneEnd extends Phaser.Scene
{
    constructor()
    {
        super("End");
    }
    init(data) {
        this.res = data?.res;
        this.vie = data?.vie;
        console.log("End scene");
        
    }
    preload(){
    }
    
    create(){

        // get the dimensions of the game
        const width = this.scale.width;
        const height = this.scale.height;
        this.partcle;
        //display lose or win scene depending on res, 0 or 1, and the life count
        if(this.res == 1){
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
        this.particle = 'croix';

        this.res_image = this.add.image(width/2,  height/2, 'loose');
    }
    Align.scaleToGameH(this.res_image, 1);
   
    //create a particle emmiter so the image 'coupe' falls al over the screen
    // Create the particle emitter
        

        // create a particle emitter
       
       

        
          
        // display the button reload 
        this.reload = this.add.image(width/20 * 10 -45, height/20 *13 - 27, 'reload_button');
        
        Align.scaleToGameW(this.reload, 0.09  );
        
        this.reload.setInteractive();
        this.reload.on('pointerup', () => {
            this.scene.start("level");
                }
        ); 

        //display the button next 
        this.next = this.add.image(width/20 * 10 + 45, height/20 *13 - 27, 'next_button');
        Align.scaleToGameW(this.next, 0.13  );
        
        this.next.setInteractive();
        this.next.on('pointerup', () => {
            this.scene.start("level");
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
    
   
    

    update(){
    }

}