class UiManager {
    constructor() {
      this.playerLife = 3; // Nombre de vies du joueur
      this.lifeText = null; // Référence au texte affichant la vie
    }
  
    createUi(scene) {
      // Affichage du texte de vie en haut à droite de l'écran de la scène spécifiée
      this.lifeText = scene.add.text(
        scene.game.config.width - 20,
        20,
        `Vie: ${this.playerLife}`,
        { font: "20px Arial", fill: "#ffffff" }
      );
      this.lifeText.setOrigin(1, 0);
    }
  
    decreaseLife() {
      this.playerLife--;
      this.updateLifeText();
      this.checkGameOver();
    }
  
    updateLifeText() {
      this.lifeText.setText(`Vie: ${this.playerLife}`);
    }
  
    checkGameOver() {
      if (this.playerLife <= 0) {
        console.log("Game Over");
        // Ajoutez ici le code pour gérer la défaite du joueur
      }
    }
  
    checkWin() {
      console.log("Victory!");
      // Ajoutez ici le code pour gérer la victoire du joueur
    }
  }
  