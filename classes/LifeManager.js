class LifeManager {
  constructor() {
    this.playerLife = 3; // Nombre de vies du joueur
    this.lifeText ; // Référence au texte affichant la vie
    this.collectibles = null; // Référence au groupe de collectibles pour gagner
    this.CurentState = null;
    this.States = Object.freeze({
      START: 'WIN',
      PLAYING: 'PLAYING',
      PAUSED: 'PAUSED',
      GAME_OVER: 'GAME_OVER'
    });
  }

  init(scene, i) {
    // Affichage du texte de vie en haut à droite de l'écran de la scène spécifiée
    this.lifeText = scene.add.text(
      40,
      10,
      `Vie: ${this.playerLife}`,
      { font: "20px Arial", fill: "#ffffff" }
    );
    
    this.updateLifeText();
    this.CurentState = this.States.PLAYING;
    this.collectibles = i;
    
  }

  pause() { 
    this.CurrentState = this.States.PAUSED;
  }

  decreaseLife() {
    this.playerLife--;
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


  
}
