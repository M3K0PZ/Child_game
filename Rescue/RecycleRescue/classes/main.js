// Author: Noah Bompard 21-06-2023
// ****************************** main ***************************

const config = {
    scale: {
        mode: Phaser.Scale.RESIZE,
        width: window.innerWidth,
        height: window.innerHeight,
        autoCenter: Phaser.Scale.CENTER_BOTH,

    },
    type: Phaser.AUTO,
    transparent: false,
    pixelArt: false,
    physics: { default: "arcade", arcade: { debug: false } },
    scene: [
        ScenePreload,
        SceneCaramel,
        SceneLevel,
        SceneStart,
        SceneEnd
    ]
};
const game = new Phaser.Game(config);

