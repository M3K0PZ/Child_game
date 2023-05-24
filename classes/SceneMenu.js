// ****************************** Scene GameMenu *************************
class SceneMenu extends Phaser.scene {
    constructor(){
        super("Menu");  
        
    }
    init()
    {
        
    }
    preload ()
    {  

    } 
    create () 
    {
        console.log("Game scene");

        this.h = game.scale.height;
        this.w = game.scale.width; 
        
        //connait l'array de tout les niveaux
        // will call the function to create the levels layout from factory and the buttons
        // know oh much collectibles there is per level.

       
        
    }
    update(){

    }
}