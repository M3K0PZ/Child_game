// ****************************** Scene GameScreen ***************************

class SceneLevel extends Phaser.Scene{
    constructor(){
        super("level");  
        
    }
    init(data) {
        let a = data?.a; // Utilisation de l'opérateur de chaînage optionnel (?.) pour vérifier si data existe
        console.log(a); // Affiche "test"
      }
      
    preload ()
    {    
    } 
    create () 
    {
        console.log("Game scene");
        
        
        this.h = game.scale.height;
        this.w = game.scale.width; 
        
        //CREATION DE LA MAP, factory plus tard
        this.mapping();

        this.lifeManager = new LifeManager();
        this.lifeManager.init(this, 1);

        //AJOUT DE LA BALLE ( a mettre en poo si temps)
        this.player_add();

        // GESTION DU DRAG AND DROP
        this.dragging_ball ();

        // AJOUT DES COLLECTIBLES ET DE LEURS DETECTIONS (dans factory plus tard, changera en fct du lvl)
        this.add_collectibles();
        
    }

    update(){
        //test si la balle est en dehors de l'écran, si oui, alors on la replace au centre et on perd une vie
        if(this.ball.x > game.scale.width || this.ball.x < 0 || this.ball.y > game.scale.height || this.ball.y < 0){
            //console.log("outOfBounds")
            this.lifeManager.decreaseLife();
            this.ball.x = game.scale.width/2;
            this.ball.y = game.scale.height/6 * 5
            this.ball.setVelocity(0, 0);
        }
      
        
    }
    mapping(){
        //Tile sizing : 20x40 en 16px
        //let tilesize_widht = w /20;
        //let tilesize_height = h/40;

        Align.scaleToGameW(this.add.image(this.w/2,  this.h/2, 'Sky'), 1);
        const map = this.make.tilemap({key:"map",tileWidth:16,tileHeight:16});
        const tileset = map.addTilesetImage("Terrain32x32","tiles");

        this.layer = map.createLayer("walls",tileset,0,0);
        this.layer_map = map.createLayer("tilemap",tileset,0,0);
        
        this.layer_map.setOrigin(this.w/2,this.h/2);
        this.layer.setOrigin(this.w/2,this.h/2);
        Align.scaleToGameW(this.layer,1);
        Align.scaleToGameW(this.layer_map,1);

    
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
        this.ball = this.physics.add.image(this.w/2, this.h/6 * 5, 'ball');
        Align.scaleToGameH(this.ball, 0.03);

        //COLLISIONS
        this.physics.add.collider(this.ball, this.layer);
        this.layer.setCollisionBetween(71,74)
            .setVisible(false);


        // PHYSIQUE DE LA BALLE
        this.ball.setBounce(1)
            .setCollideWorldBounds(false)
            .setVelocity(0, 0);
        this.ball.body.onOverlap = true;



        //PARTICULES following ball       
        emitter.startFollow(this.ball);
        console.log("emmitter");
    }
    dragging_ball (){
        let graphics = this.add.graphics();
        let coef = 2; // Vous pouvez ajuster le coefficient selon vos besoins
        var startPoint = null;
        var currentDistance;
        var angle;
        var ball = this.ball;


        this.input.on('pointerdown', function (pointer) {
            startPoint = new Phaser.Math.Vector2(pointer.x, pointer.y);
        });


        this.input.on('pointermove', function (pointer) {
            if (!startPoint) return;

            let res = trajectoire(graphics, startPoint, pointer, ball);
            currentDistance = res[0] ;
            angle = res[1];
            
        });

        this.input.on('pointerup',  (pointer) => {
            graphics.clear();
            shoot(ball, coef, currentDistance, angle); 
            startPoint = null;
        });
    }
    add_collectibles(){
        //un rond, un carré et une étoile plus tard, tests en cours [20%]
        this.star = this.add.star(this.w/2, this.h/2, 5, this.h*0.010, this.h*0.015, 0xecf80b);
        // Enable physics on the star
        this.physics.world.enable(this.star);
        this.star.body.setImmovable(true); // Make the star immovable
        // Set the star's properties
        this.star.body.setCircle(this.h*0.015); // Set the circle shape and radius for collision detection
        // Add collision between the ball and the star

        this.physics.add.overlap(this.ball, this.star, (ball, star)=>{
            this.cameras.main.flash();
            star.destroy();
            this.lifeManager.Collected();
            this.ball.x = game.scale.width/2;
            this.ball.y = game.scale.height/6 * 5
            this.ball.setVelocity(0, 0);
        });

        
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
    //console.log("shoot");
    let velocity = distance * coef;  
    // cap velocity to 850 maximum
    if (velocity > 850) {
        velocity = 850;
    }
    //console.log("velocity : "+ velocity);
    let velocityX = Math.cos(angle) * velocity;
    let velocityY = Math.sin(angle) * velocity;
    //console.log("vitesse output : "+ velocityX+" "+ velocityY);
    ball.setVelocity(-velocityX, -velocityY);
    
}
