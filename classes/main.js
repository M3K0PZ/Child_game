const config ={
    width : 320*2,
    height : 640*2,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
       
    },
    
    type: Phaser.AUTO,
    //transparent: true,
    //pixelArt: true,
    physics : {default : "arcade", arcade:{debug: true}},

    scene : [
            ScenePreload,
            SceneCaramel,
            SceneLevel 
            
        ]

};
const game = new Phaser.Game(config);

