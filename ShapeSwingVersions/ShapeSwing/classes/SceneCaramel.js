// ****************************** Scene caramel ***************************

class SceneCaramel extends Phaser.Scene{
    constructor(){
        super("caramel");
    }
    init(){
    }
    preload(){
    }
    create(){
        this.caramel = this.add.image(game.scale.width/2,  game.scale.height/2, 'caramel');
        this.caramel.scale = 0.5;
        this.caramel.alpha = 0;
        
        this.caramel.preFX.addBloom();
        
        
        this.tweens.add({
            alpha: 10,
            targets: [this.caramel],
            ease: 'Cubic.easeIn', 
            duration: 1000,
            hold: 1500,
            repeat:0,
            yoyo: true,
            onComplete: () => {
                this.scene.start("Starting"); 
        
                
            }
        });

    }

}