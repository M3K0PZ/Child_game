class LifeManager {
  constructor() {
    this.gameObject; // Référence au gameObject associé
    this.playerLife; // Nombre de vies du joueur
    this.lifeText ; // Référence au texte affichant la vie
    this.collectibles; // Référence au groupe de collectibles pour gagner
    this.CurrentState;
  
    this.States = Object.freeze({
      WIN: 'WIN',
      PLAYING: 'PLAYING',
      PAUSED: 'PAUSED',
      GAME_OVER: 'GAME_OVER'
    });
  }

  init(scene, i, lifeCount, gameObj) {
    this.playerLife = lifeCount;
    this.gameObject = gameObj;
    // Affichage du texte de vie en haut à droite de l'écran de la scène spécifiée
    this.hearts = scene.add.group();
    for(let i = -1; i < lifeCount -1; i++){
      let heart = scene.add.image((i * 65)+ scene.game.scale.width/2 , 70, 'heart');
      heart.setScale(2.5);
      heart.setScrollFactor(0);
      this.hearts.add(heart);
    }
    

    this.lifeText = scene.add.text(
      40,
      10,
      `Vie: ${this.playerLife}`,
      { font: "20px Arial", fill: "#ffffff" }
    );
    
    this.updateLifeText();
    this.CurrentState = this.States.PLAYING;
    
    this.collectibles = i;
    
  }

  pause() { 
    this.CurrentState = this.States.PAUSED;
  }

  decreaseLife() {
    this.playerLife--;
    //change the heart image to empty_heart
    this.hearts.getChildren()[this.playerLife].setTexture('empty_heart');
  

    this.updateLifeText();
    this.checkGameOver();
  }

  updateLifeText() {
    this.lifeText.setText(`Vie: ${this.playerLife}`);
  }
  

  Collected(){
    this.collectibles--;
    if(this.collectibles <= 0){
      this.checkWin();
    }

  }

  checkGameOver() {
    if (this.playerLife <= 0) {
      console.log("Game Over");
      this.CurrentState = this.States.GAME_OVER;
      // Ajoutez ici le code pour gérer la défaite du joueur
    }
  }

  checkWin() {
    console.log("Victory!");
    this.CurrentState = this.States.WIN;
    // Ajoutez ici le code pour gérer la victoire du joueur
  }

  getCurrentState() {

    return this.CurrentState;
  }
  getLife()
  {
    return this.playerLife;
  }
  
}
