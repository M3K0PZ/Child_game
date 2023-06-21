// ****************************** Scene GameScreen ***************************

class SceneLevel extends Phaser.Scene{
    constructor(){
        super("level");  
        
    }
    init(data) {
        this.level_number = data?.level; // level number  (to be used in factory to create the level layout)
        this.sound_state = data?.sound_state; // sound on/off
        
       

         //connait les niveaux, et les emplacements de collectibles
         this.levels = [
            { name: "level1", collectibles: { 1: [320, 640] } },
            { name: "level2", collectibles: { 1: [130 ,400], 2:[530,400] } },
            { name: "level3", collectibles: { 1: [150,210], 2: [500, 210] } },
            { name: "level4", collectibles: { 1: [320, 300] } },
            { name: "level5", collectibles: { 1: [320, 300], 2: [145,450], 3:[470,460] } },
            { name: "level6", collectibles: { 1: [320, 390], 2: [320, 160] } },
            { name: "level7", collectibles:  { 1: [100, 520], 2: [535, 520] } },
            { name: "level8", collectibles: { 1: [100, 520], 2: [535, 520], 3:[320,175] }},
            { name: "level9", collectibles: { 1: [100, 350], 2: [550, 350], 3:[320,240] } },
            { name: "level10", collectibles: {  1: [80, 550], 2: [560, 550], 3:[320,350] } },
            { name: "level11", collectibles: { 1: [325,425], 2: [550,425], 3:[90,425] } },
            { name: "level12", collectibles: { 1: [320,200] } },
    
          
        ];
      }
    
    preload ()
    {    
    } 
    create () 
    {



        this.cameras.main.flash();

        ////.log("Game scene");
        this.music = this.sound.add('Level_sound');
        if (this.sound_state == 1){
            
            this.music.play();
            this.music.loop = true;
            this.music.volume = 0.1; // volume ic
        }
        
         
        
        this.h = game.scale.height;
        this.w = game.scale.width; 
  
        

        //CREATION DE LA MAP, factory plus tard
        this.mapping();
        //.log("mapping done");
        

        //AJOUT DE LA BALLE ( à mettre en poo si temps)
        this.player_add();
        //.log("player added");

        //AJOUT DU GESTIONAIRE
        //check si lifeManager existe, sinon le créer
        if(this.lifeManager == undefined) this.lifeManager = new LifeManager(); // you can use a life manager with an life class, the manager keeping track of lifes, 
                                              //making multiples lifes for mulitples objects, but since there will be only one ball (eq. player), i don't.
                                              //but that's why i kept a init function and a new lifeManager separated, if needed.
        this.lifeManager.init(this, 3,this.ball);
    
        
        // GESTION DU DRAG AND DROP
        this.dragging_ball ();
        //.log("dragging done");

        // AJOUT DES COLLECTIBLES ET DE LEURS DETECTIONS (dans factory plus tard, changera en fct du lvl)
       // this.add_collectibles();
        //.log("collectibles added");
        this.add_collectibles(this.levels[this.level_number-1].collectibles);

        this.add_buttons();    
        //.log("buttons added");
 
    }

    update(){
        //test si la balle est en dehors de l'écran, si oui, alors on la replace au centre et on perd une vie
        if(this.ball.x > game.scale.width || this.ball.x < 0 || this.ball.y > this.h || this.ball.y < 0){
            ////.log("outOfBounds")
            this.cameras.main.flash();
            this.lifeManager.decreaseLife(); // here if life manager is a real manager (wich is not rn) add obj reference.
            if (this.sound_state == 1)  this.sound.play('hit', {volume: 0.2, rate :3});
            this.ball.x = game.scale.width/2;
            this.ball.y = this.h/6 * 5
            this.ball.setVelocity(0, 0);
        }

        let state = this.lifeManager.getCurrentState();
        switch(state){
            case 'WIN':
                this.music.stop();
                this.scene.start("End", {res:1, vie:this.lifeManager.getLife(), level:this.level_number, sound_state: this.sound_state});
                break;
            case 'GAME_OVER':
                this.music.stop();
                this.scene.start("End", {res:0, vie:this.lifeManager.getLife(), level:this.level_number, sound_state: this.sound_state});
                break;
            //paused si besoin ici
            default:
                break;
        }

    }
    mapping(){
        
        //Tile sizing : 20x40 en 16px
        //let tilesize_widht = w /20;
        //let tilesize_height = h/40;

        //background loading
        Align.scaleToGameW(this.add.image(this.w/2,  this.h/2, 'Sky'), 1);

        //map loading
        var level_to_load = "level"+this.level_number;

        const map = this.make.tilemap({key:level_to_load,tileWidth:16,tileHeight:16});
        const tileset = map.addTilesetImage("Terrain32x32","tiles");

        this.layer = map.createLayer("walls",tileset,0,0);
        this.layer_map = map.createLayer("tilemap",tileset,0,0);
        
        this.layer_map.setOrigin(this.w/2,this.h/2);
        this.layer.setOrigin(this.w/2,this.h/2);
        Align.scaleToGameW(this.layer,1);
        Align.scaleToGameW(this.layer_map,1);

        


        //new tiles walls loading for a better look with the css background
        const ship = this.make.tilemap({key:"ship",tileWidth:16,tileHeight:16});
        const ship_tileset = ship.addTilesetImage("ship32x32","ship_tiles");  
        
        this.ship_layer = ship.createLayer("shipwalls",ship_tileset,0,0);
        this.ship_layer.setOrigin(this.w/2,this.h/2);
        Align.scaleToGameW(this.ship_layer,1);

    }
    player_add(){
        //PARTICULES
        const emitter = this.add.particles(1, 0, "particles", {
            speed: 10,
            scale: { start: 2, end: 0 },
            blendMode: "LIGHTEN",
            lifespan: 500,
        }); 

        // AJOUT BALLE
        this.ball = this.physics.add.image(this.w/2, this.h/6 * 5, 'star');
        this.ball.id = 1; // this id will be used to identify the shape in the collision detection.

        Align.scaleToGameH(this.ball, 0.03);
        this.ball.setScale(2);

        this.ball.body.setCircle(10,2,2 ); // Set the circle shape and radius for collision detection 
            
        //COLLISIONS
        this.physics.add.collider(this.ball, this.layer, () => {
            if (this.sound_state == 1) this.sound.play('Bouncing', {volume: 0.2});
        });
        this.layer.setCollisionBetween(71,74)
            .setVisible(false);


        // PHYSIQUE DE LA BALLE
        this.ball.setBounce(1)
            .setCollideWorldBounds(false)
            .setVelocity(0, 0);
        this.ball.body.onOverlap = true;
        


        //PARTICULES following ball       
        emitter.startFollow(this.ball);
        
    }
    dragging_ball (){
        var graphics = this.add.graphics();
        let coef = 2; // Vous pouvez ajuster le coefficient selon vos besoins
        var startPoint = null;
        var currentDistance;
        var angle;
        var ball = this.ball;
        var moved = false;

        this.input.on('pointerdown',  (pointer) => {
            startPoint = new Phaser.Math.Vector2(pointer.x, pointer.y);
        });


        this.input.on('pointermove', (pointer) => {
            if (!startPoint) return;
           
            moved = true;
            let res = trajectoire(graphics, startPoint, pointer, ball); // besoin de redéfinir les variables sinon pb de scope (je commence en javascript ok) 
            currentDistance = res[0] ;
            angle = res[1];
            
        });

        this.input.on('pointerup', (pointer) => {
            //.log(pointer.x, pointer.y );
            if (moved) {
            graphics.clear();
            shoot(ball, coef, currentDistance, angle); 
            moved = false;
            }
            startPoint = null;
        });
    }

    add_collectibles(collectibles) {
        
        // need to collect 3 collectibles to win
        //print the collectibles lenght
        this.lifeManager.setCollectibles(Object.keys(collectibles).length);
        
        for (const key in collectibles) {
          const position = collectibles[key];
          const collectibleType = parseInt(key);
          switch (collectibleType) {
            case 1:
              
               


              this.star = this.add.image(position[0], position[1], 'star');

                this.star.setScale(4); 
              this.physics.world.enable(this.star);
              this.star.body.setImmovable(true);
      
              this.physics.add.overlap(this.ball, this.star, (ball, collectible) => {
                    if (this.sound_state == 1)  this.sound.play('collected', {volume: 0.2});
                    if (this.ball.id == 1) {
                    this.cameras.main.flash();
                    collectible.destroy();
                    this.lifeManager.Collected();
                    this.ball.x = game.scale.width / 2;
                    this.ball.y = this.h / 6 * 5;
                    this.ball.setVelocity(0, 0);

                    // Change the ball texture to triangle after a slight delay
                     this.time.delayedCall(100, () => {
                    this.ball.setTexture('triangle');
                    this.ball.setScale(2);
                    });


                    this.ball.id ++;
                  
                }else {
                    this.cameras.main.flash();
                    if (this.sound_state == 1)  this.sound.play('hit', {volume: 0.2, rate :3});
                    this.lifeManager.decreaseLife();
                    this.ball.x = game.scale.width / 2;
                    this.ball.y = this.h / 6 * 5;
                    this.ball.setVelocity(0, 0);
                }
            }
              
              );
              break;
              
            case 2:
                const triangle = this.add.image(position[0], position[1], 'triangle');
                triangle.setScale(4.5);

              this.physics.world.enable(triangle);
              triangle.body.setImmovable(true);
              
              this.physics.add.overlap(this.ball, triangle, (ball, collectible) => {
                if (this.ball.id == 2) {
                    if (this.sound_state == 1)  this.sound.play('collected', {volume: 0.2});
                    this.cameras.main.flash();
                    collectible.destroy();
                    this.lifeManager.Collected();
                    this.ball.x = game.scale.width / 2;
                    this.ball.y = this.h / 6 * 5;
                    this.ball.setVelocity(0, 0);

                      // Change the ball texture to triangle after a slight delay
                    this.time.delayedCall(100, () => {
                    this.ball.setTexture('ball');
                    this.ball.setScale(2.7);
                    this.ball.body.setCircle(7,2,2 )
                 
                    });

                    this.ball.id ++;
                }else {
                    this.cameras.main.flash();
                    if (this.sound_state == 1)  this.sound.play('hit', {volume: 0.2, rate :3});
                    this.lifeManager.decreaseLife();
                    this.ball.x = game.scale.width / 2;
                    this.ball.y = this.h / 6 * 5;
                    this.ball.setVelocity(0, 0);
                }
              });
              break;
              
            case 3:

            const circle = this.add.image(position[0], position[1], 'ball');
              circle.setScale(4.5);
              this.physics.world.enable(circle);
              
           
              this.physics.add.overlap(this.ball, circle, (ball, collectible) => {
                if (this.ball.id == 3) {
                    if (this.sound_state == 1)  this.sound.play('collected', {volume: 0.2});
                    this.cameras.main.flash();
                    collectible.destroy();
                    this.lifeManager.Collected();
                    this.ball.x = game.scale.width / 2;
                    this.ball.y = this.h / 6 * 5;
                    this.ball.setVelocity(0, 0);
                }else {
                    this.cameras.main.flash();
                    if (this.sound_state == 1)  this.sound.play('hit', {volume: 0.2, rate :3});
                    this.lifeManager.decreaseLife();
                    this.ball.x = game.scale.width / 2;
                    this.ball.y = this.h / 6 * 5;
                    this.ball.setVelocity(0, 0);
                }
              });
              break;
              default:
                console.log("UNEXPECTED CRITICAL ERROR COLLECTIBLES");
                break;
          }
        }
      }
      
    add_buttons(){
         // display the button reload on the top right and the menu button on the top left
         this.reload = this.add.image(this.w/20 * 19 -45, this.h/20 +15, 'reload_button');
         Align.scaleToGameW(this.reload, 0.12);
         this.reload.setInteractive();
         this.reload.on('pointerup', () => {
           
            if (this.sound_state == 1) this.sound.play('Change_sound', {volume: 0.5});
            this.music.stop();
             this.scene.restart();
                 }
         );
         this.menu = this.add.image(this.w/20 +45, this.h/20 +10, 'menu');
         Align.scaleToGameW(this.menu, 0.12);
         this.menu.setInteractive();
         this.menu.on('pointerdown', () => {
            if (this.sound_state == 1) this.sound.play('Next_level', {volume: 0.1});
            this.music.stop();
         
             this.scene.start("Menu",{sound_state : this.sound_state});
             
         }
         );
    }
}
// ****************************** Functions *************************** 

function trajectoire(graphics, startPoint, pointer,ball)  {
    graphics.clear();
    
    var endPoint = new Phaser.Math.Vector2(pointer.x, pointer.y); // le nouveau point final
    var line = new Phaser.Geom.Line(startPoint.x, startPoint.y, endPoint.x, endPoint.y); // trajectoire
    
    // Calcul du décalage pour centrer la ligne sur les coordonnées de la balle
    var dx = ball.x - startPoint.x;
    var dy = ball.y - startPoint.y;
    line.x1 += dx;
    line.x2 += dx;
    line.y1 += dy;
    line.y2 += dy;
    
    var dots = 6; // Nombre de points
    var dotDistance = Phaser.Geom.Line.Length(line) / dots; // Distance entre chaque point

    var currentDistance = Phaser.Math.Distance.Between(startPoint.x, startPoint.y, endPoint.x, endPoint.y); // distance entre le point de départ et le point actuel
    var angle = Phaser.Math.Angle.Between(startPoint.x, startPoint.y, endPoint.x, endPoint.y); // angle entre le point de départ et le point actuel

    for (var i = 0; i < dots; i++) {
        
        var dotX = ball.x - Math.cos(angle) * dotDistance * (dots - 1 - i);
        var dotY = ball.y - Math.sin(angle) * dotDistance * (dots - 1 - i);
        var dotSize = 5 + i * 2; // Plus petit au plus grand
        
        if(i != 5 ){
            graphics.fillStyle(0xffffff);
            graphics.fillCircle(dotX, dotY, dotSize);
        }
    }

    return [currentDistance, angle];
}
function shoot(ball,coef, distance, angle) {
    //.log("shoot");
    let velocity = distance * coef;  
    // cap velocity to 850 maximum
    if (velocity > 850) {
        velocity = 850;
    }
    //.log("velocity : "+ velocity);
    let velocityX = Math.cos(angle) * velocity;
    let velocityY = Math.sin(angle) * velocity;
    //.log("vitesse output : "+ velocityX+" "+ velocityY);
    ball.setVelocity(-velocityX, -velocityY);
    
}
