// ****************************** Scene Preload ***************************
class ScenePreload extends Phaser.Scene
{
    constructor()
    {
        super("preload");
    }

    preload(){
        //buttons to use the whole game (menu, level, end)
        this.load.image('next_button', 'assets/img/buttons/next.png');
        this.load.image('reload_button', 'assets/img/buttons/reload.png');
        this.load.image('menu', 'assets/img/buttons/Menu.png');
        
        //---------------scene caramel-----------------
        this.load.image('caramel', 'assets/img/caramel1.png');

        //---------------scene level-----------------
        this.load.image('base', 'assets/img/background/base.png');
        this.load.image('Sky', 'assets/img/background/Sky.png');
        this.load.image('particles', 'assets/img/particles.png');
        this.load.image('ball', 'assets/img/game/bullet.png');
        this.load.image('star', 'assets/img/game/star.png');
        //tiles loding
        this.load.tilemapTiledJSON('map', 'assets/img/tilemap/tile1.tmj');
        this.load.image('tiles', 'assets/img/tilemap/Terrain32x32.png');
       //new tiles walls loading
        this.load.tilemapTiledJSON('ship', 'assets/img/tilemap/ship_walls.tmj');
        this.load.image('ship_tiles', 'assets/img/tilemap/ship32x32.png');
        //life loading
        this.load.image('heart', 'assets/img/buttons/heart.png');
        this.load.image('empty_heart', 'assets/img/buttons/empty_heart.png');
        //---------------scene menu-----------------
        this.load.image('level', 'assets/img/buttons/level.png');
        this.load.image('Sound_on', 'assets/img/buttons/sound_on.png');
        this.load.image('Sound_off', 'assets/img/buttons/sound_off.png');
        
        

        //---------------scene end-----------------
        this.load.image('loose', 'assets/img/end/loose.png');
        this.load.image('win1', 'assets/img/end/win1.png');
        this.load.image('win2', 'assets/img/end/win2.png');
        this.load.image('win3', 'assets/img/end/win3.png');
        //particles
        this.load.image('croix', 'assets/img/buttons/croix.png');
        this.load.image('coupe', 'assets/img/buttons/coupe.png');

        

        ///////////////// SOUND LOADING /////////////////////
        //--------------- Title Screen sound -----------------
        this.load.audio('Title_sound', 'assets/audio/Title_screen.wav');
        //--------------- buttons sound -----------------
        this.load.audio('button_intro', 'assets/audio/button.wav');
        this.load.audio('button', 'assets/audio/click2.wav');
        //--------------- menu sound -----------------
        this.load.audio('Menu_sound', 'assets/audio/menu.wav');
        //--------------- level sound -----------------
        this.load.audio('Level_sound', 'assets/audio/playing.wav');
        //--------------- end sound -----------------
        this.load.audio('End_sound', 'assets/audio/end.mp3');
        //--------------- win sound -----------------
        this.load.audio('Win_sound', 'assets/audio/win.wav');
        

    }

    create(){
        console.log("Preload scene");
        this.scene.start("Menu");
        //this.scene.start("End", {res:0, vie:3});
        //this.scene.start("level");
       

    }
    update(){
    }
}