// Author: Noah Bompard 21-06-2023
// ****************************** Scene caramel ***************************
class SceneCaramel extends Phaser.Scene {
    constructor() {
        super("caramel");
    }

    init(data) {
        //here you can initialize some variables and share some data between scenes like this :
        //this.score = data?.score; the ? is to check if data exists, so no error code (be warned)
        // you call the scene with arg like that : 
        //this.scene.start("NameOfScene", {score: 0});
    }

    preload() {
    }

    create() {
        this.caramel = this.add.image(game.scale.width / 2, game.scale.height / 2, 'caramel');
        this.caramel.scale = 0.5;
        this.caramel.alpha = 0;
        this.caramel.preFX.addBloom();
        this.tweens.add({
                alpha: 10,
                targets: [this.caramel],
                ease: 'Cubic.easeIn',
                duration: 1000,
                hold: 1500,
                repeat: 0,
                yoyo: true,
                "onComplete": () => {
                    this.scene.start("start"); 
                }
            });
    }
}