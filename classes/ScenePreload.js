// ****************************** Scene Preload ***************************
class ScenePreload extends Phaser.Scene
{
    constructor()
    {
        super("preload");
    }

    preload(){
       
        this.load.image('caramel', 'assets/img/caramel1.png');
        this.load.image('base', 'assets/img/background/base.png');
        this.load.image('Sky', 'assets/img/background/Sky.png');
        this.load.image('particles', 'assets/img/particles.png');
        this.load.image('ball', 'assets/img/game/bullet.png');
        this.load.tilemapTiledJSON('map', 'assets/img/tilemap/tile1.tmj');
        this.load.image('tiles', 'assets/img/tilemap/Terrain32x32.png');
        this.load.image('star', 'assets/img/game/star.png');
      
        this.load.audio('intro', 'assets/audio/intro.wav');

    }

    create(){
        console.log("Preload scene");
       
        //this.scene.launch("level", { param1: value1, param2: value2 });
        this.scene.launch("level", { a: "test" }); //change to caramel later (avoiding loading time)
    }
    update(){
    }
}