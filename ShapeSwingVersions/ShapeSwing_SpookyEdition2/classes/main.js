const config ={
    
    scale: {
        mode: Phaser.Scale.FIT,
        width : 320*2,
        height : 640*2,
        autoCenter: Phaser.Scale.CENTER_BOTH,
       
    },
    
    type: Phaser.AUTO,
    transparent: true,
    pixelArt: true,
    physics : {default : "arcade", arcade:{debug: false}},

    scene : [
            ScenePreload,
            SceneCaramel,
            SceneLevel, 
            SceneEnd,
            SceneMenu,
            SceneStarting,
            SceneFinalEnd
        ]

};
const game = new Phaser.Game(config);

