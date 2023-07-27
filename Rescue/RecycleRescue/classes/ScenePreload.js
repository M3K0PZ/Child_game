// Author: Noah Bompard 21-06-2023
// ****************************** Scene Preload ***************************
class ScenePreload extends Phaser.Scene {
    constructor() {
        super("preload"); //here is the name to use when calling this scene, see the launch of the scene caramel later
    }

    preload() {
        //here is a loading bar made to inform the player, keep it, it's cool and useful
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        let height = this.game.scale.height;
        let width = this.game.scale.width;
        progressBox.fillStyle(0x444444, 0.8);
        progressBox.fillRect(width / 2 - 180, height / 2, 360, 50);
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading... \n (made by Noah Bompard)',
            style: {
                font: '25px monospace',
                color: '#ffffff',
                align: 'center'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 180, height / 2, 360 * value, 50);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();

        });

        /////////////////// FONT LOADING /////////////////////
        loadFont("CustomFont", "assets/font/font.otf");
        ///////////////// IMAGES LOADING /////////////////////
        //---------------UI-----------------
        this.load.image('sound_on', 'assets/img/ui/Sound_on.png');
        this.load.image('sound_off', 'assets/img/ui/Sound_off.png');
        this.load.image('replay', 'assets/img/ui/replay_button.png');
        this.load.image('play', 'assets/img/ui/play_button.png');
        this.load.image('info', 'assets/img/ui/info_button.png');
        //---------------scene caramel-----------------
        this.load.image('caramel', 'assets/img/caramel1.png');
        //---------------scene start-----------------
        this.load.image('boat0_3', 'assets/img/boats/ship0/ship3.png')
        this.load.image('boat1_3', 'assets/img/boats/ship1/ship3.png')
        this.load.image('boat2_3', 'assets/img/boats/ship2/ship3.png')
        this.load.image('boat3_3', 'assets/img/boats/ship3/ship3.png')
        this.load.image('boat4_3', 'assets/img/boats/ship4/ship3.png')
        this.load.image('Rescue', 'assets/img/Rescue.png')
        //---------------scene level-----------------
        this.load.image('ennemy', 'assets/img/boats/ennemy/ennemy_1.png')
        this.load.image('box2', 'assets/img/trash/trash1.png');
        this.load.image('box1', 'assets/img/trash/trash2.png');
        this.load.image('box3', 'assets/img/trash/trash3.png');
        this.load.image('zone', 'assets/img/zone.png');
        this.load.image('joystick', 'assets/img/joystick/joystick.png');
        this.load.image('joystickBase', 'assets/img/joystick/joystick_base.png');
        this.load.image('particule', 'assets/img/particule.png');
        this.load.image('particule_fin', 'assets/img/particule_fin.png');
        ///////////////// SOUND LOADING /////////////////////
        //--------------- music -----------------
        this.load.audio('start', 'assets/audio/music/start.mp3');
        this.load.audio('level', 'assets/audio/music/level.mp3');
        this.load.audio('end', 'assets/audio/music/end.mp3');
        //--------------- sound -----------------
        this.load.audio('click', 'assets/audio/ui/click_003.ogg');
        this.load.audio('click2', 'assets/audio/ui/select_003.ogg');
        this.load.audio('hit', 'assets/audio/ui/select_006.ogg');
        this.load.audio('box', 'assets/audio/ui/box.mp3');
        this.load.audio('zone', 'assets/audio/ui/zone.mp3');
        this.load.audio('transition', 'assets/audio/ui/transition.mp3');
    }
    create() {
        this.scene.start("caramel");
    }
    update() {
    }
}
function loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
}