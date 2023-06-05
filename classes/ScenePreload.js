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

        /////////////////// LEVELS LOADING /////////////////////
        this.load.tilemapTiledJSON('level1', 'assets/img/tilemap/levels/level1.tmj');
        this.load.tilemapTiledJSON('level2', 'assets/img/tilemap/levels/level2.tmj');
        this.load.tilemapTiledJSON('level3', 'assets/img/tilemap/levels/level3.tmj');
        this.load.tilemapTiledJSON('level4', 'assets/img/tilemap/levels/level4.tmj');
        this.load.tilemapTiledJSON('level5', 'assets/img/tilemap/levels/level5.tmj');
        this.load.tilemapTiledJSON('level6', 'assets/img/tilemap/levels/level6.tmj');
        this.load.tilemapTiledJSON('level7', 'assets/img/tilemap/levels/level7.tmj');
        this.load.tilemapTiledJSON('level8', 'assets/img/tilemap/levels/level8.tmj');
        this.load.tilemapTiledJSON('level9', 'assets/img/tilemap/levels/level9.tmj');
        this.load.tilemapTiledJSON('level10', 'assets/img/tilemap/levels/level10.tmj');
        this.load.tilemapTiledJSON('level11', 'assets/img/tilemap/levels/level11.tmj');
        this.load.tilemapTiledJSON('level12', 'assets/img/tilemap/levels/level12.tmj');

        

        ///////////////// SOUND LOADING /////////////////////
        //--------------- Title Screen sound -----------------
        this.load.audio('Title_sound', 'assets/audio/Title_screen.wav');
        //--------------- buttons sound -----------------
        this.load.audio('button_intro', 'assets/audio/button.wav');
        this.load.audio('button_sound', 'assets/audio/click2.mp3');
        //--------------- menu sound -----------------
        this.load.audio('Menu_sound', 'assets/audio/menu.wav');
        //--------------- level sound -----------------
        this.load.audio('Level_sound', 'assets/audio/playing.wav');
        //--------------- end sound -----------------
        this.load.audio('End_sound', 'assets/audio/end.mp3');
        //--------------- win sound -----------------
        this.load.audio('Win_sound', 'assets/audio/win.wav');
        //--------------- change sound -----------------
        this.load.audio('Change_sound', 'assets/audio/menu_change.mp3');
        //--------------- next level sound -----------------
        this.load.audio('Next_level', 'assets/audio/next_level.mp3');

    }

    create(){
        //console.log("Preload scene");
        this.scene.start("Menu");
        //this.scene.start("End", {res:0, vie:3});
        //this.scene.start("level");
       

    }
    update(){
    }
}