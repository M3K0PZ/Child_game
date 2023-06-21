// ****************************** Scene Preload ***************************
class ScenePreload extends Phaser.Scene
{
    constructor()
    {
        super("preload");
    }

    preload(){
        //this.load.spritesheet('loading', 'assets/img/background/loading.png', { frameWidth: 32, frameHeight: 32 });
      
        
        this.width = this.game.config.width;
        this.height = this.game.config.height;


        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(this.width/2 -180 , this.height/2, 360, 50);

   
        var loadingText = this.make.text({
            x: this.width / 2,
            y: this.height / 2 - 50,
            text: 'Loading... \n (may take time due to phaser limitations)',
            style: {
                font: '25px monospace',
                fill: '#ffffff',
                align: 'center'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

      

        this.load.on('progress', function (value) {
           // .log(value);
            //  percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(150, 650, 340 * value, 30);
        });


        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            
        });



        //buttons to use the whole game (menu, level, end)
        this.load.image('next_button', 'assets/img/buttons/next.png');
        this.load.image('reload_button', 'assets/img/buttons/reload.png');
        this.load.image('menu', 'assets/img/buttons/Menu.png');
        this.load.image('home', 'assets/img/buttons/home.png');
        
        //---------------scene caramel-----------------
        this.load.image('caramel', 'assets/img/caramel1.png');

        //---------------scene level-----------------
        this.load.image('Sky', 'assets/img/background/Sky.png');
        this.load.image('particles', 'assets/img/particles.png');
        this.load.image('ball', 'assets/img/game/bullet.png');
        this.load.image('star', 'assets/img/game/star.png');
        this.load.image('triangle', 'assets/img/game/triangle.png');
        
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


        //---------------scene starting-----------------
        this.load.image('ButtonStart', 'assets/img/buttons/play.png');
        this.load.image('info', 'assets/img/buttons/info.png');
        this.load.image('homescreen', 'assets/img/background/start_scene.png');

        //---------------scene final ending-----------------

        this.load.image('FinalScreen', 'assets/img/background/end_scene.png');
        this.load.image('coin', 'assets/img/end/particles.png');

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
        this.load.audio('Title_sound', 'assets/audio/Title_screen.mp3');
        //--------------- buttons sound -----------------
       
        this.load.audio('button_sound', 'assets/audio/click2.mp3');
        //--------------- menu sound -----------------
        this.load.audio('Menu_sound', 'assets/audio/menu.mp3');
        //--------------- level sound -----------------
        this.load.audio('Level_sound', 'assets/audio/playing.mp3');
        //--------------- end sound -----------------
        this.load.audio('End_sound', 'assets/audio/end.mp3');
        //--------------- win sound -----------------
        this.load.audio('Win_sound', 'assets/audio/win.mp3');
        //--------------- change sound -----------------
        this.load.audio('Change_sound', 'assets/audio/menu_change.mp3');
        //--------------- next level sound -----------------
        this.load.audio('Next_level', 'assets/audio/next_level.mp3');
        //--------------- bouncing sound -----------------
        this.load.audio('Bouncing', 'assets/audio/bouncing.mp3');
        //--------------- collected sound -----------------
        this.load.audio('collected', 'assets/audio/collected.mp3');
        //--------------- final sound -----------------
        this.load.audio('Final_music', 'assets/audio/FinalMusic.mp3');
        //--------------- Starting sound -----------------
        this.load.audio('Starting_music', 'assets/audio/Starting_music.mp3');
        //--------------- hit sound -----------------
        this.load.audio('hit', 'assets/audio/hit_sound.mp3');

    }

    create(){
        
       this.scene.start("caramel"); 
      

    }
    update(){
    }
}