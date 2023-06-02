class SceneMenu extends Phaser.Scene {
    constructor() {
        super("Menu");
    }

    init(data) {
        this.levels = data?.levels;
        // architecture de data.levels
        //     { name: "level1", collectibles: { 1 : [200,200], 2 :[304,031] } },
        //     { name: "level2", collectibles: { 1 : [200,200], 2 :[304,031] } },
        //...

        this.levelButtons = [];
        this.levelButtonsText = [];
        this.currentPage = 0;
        this.levelsPerPage = 9; // Nombre de niveaux par page
        this.buttonSize = 20; // Taille d'un bouton de niveau
        this.buttonSpacing = 50; // Espacement entre les boutons de niveau
        this.Scale = 6; // Facteur d'échelle des boutons de niveau
        this.music = this.sound.add('Menu_sound');
        this.button = this.sound.add('button_sound');
    }

    preload() {
        // Préchargement des ressources nécessaires (par exemple, les images des boutons de niveau)
    }

    create() {
        //console.log("Menu scene");

        this.h = game.scale.height;
        this.w = game.scale.width;
        ////////////////// AUDIO //////////////////////// 
        
        this.music.play();
        this.music.loop = true;
        this.music.volume = 0.1; // volume ici 

        

        ////////////////// AJUSTEMENTS  ////////////////////////
        // Chargement de la taille de l'image du bouton
        const buttonTexture = this.textures.get('level');
        this.buttonSize = buttonTexture.getSourceImage().width; // Utilisez .height pour la hauteur si nécessaire

        this.buttonSize = this.buttonSize*this.Scale;



        //connait les niveaucx, et les emplacements de collectibles
        this.levels = [
            { name: "level1", collectibles: { 1: [200, 200], 2: [304, 31] } },
            { name: "level2", collectibles: { 1: [100, 400], 2: [204, 31] } },
            { name: "level3", collectibles: { 1: [300, 400], 2: [404, 31] } },
            { name: "level4", collectibles: { 1: [500, 400], 2: [604, 31] } },
            { name: "level5", collectibles: { 1: [700, 400], 2: [804, 31] } },
            { name: "level6", collectibles: { 1: [900, 400], 2: [1004, 31] } },
            { name: "level7", collectibles: { 1: [110, 400], 2: [104, 31] } },
            { name: "level8", collectibles: { 1: [130, 400], 2: [144, 31] } },
            { name: "level9", collectibles: { 1: [150, 400], 2: [164, 31] } },
            { name: "level10", collectibles: { 1: [100, 400], 2: [184, 31] } },
            { name: "level11", collectibles: { 1: [100, 400], 2: [204, 31] } },
            { name: "level12", collectibles: { 1: [100, 400], 2: [204, 31] } },
          
        ];



        // Calcul du nombre total de pages en fonction du nombre de niveaux et du nombre de niveaux par page
        const totalPages = Math.ceil(this.levels.length / this.levelsPerPage);

        // Création des boutons de niveau pour la page actuelle
        this.createLevelButtons();

        // Bouton pour passer à la page suivante
        const nextButton = this.add.image(this.w/3 *2 + 40, this.h/4 *3 + 55, 'next_button').setInteractive();
        nextButton.setScale(this.Scale);   
        nextButton.on('pointerdown', () => {
            this.button.play();
            if (this.currentPage < totalPages - 1) {
                this.currentPage++;
                this.updateLevelButtons();
            }
        });

        // Bouton pour revenir à la page précédente
        const prevButton = this.add.image(this.w/3 - 60, this.h/4 *3 + 50, 'next_button').setInteractive();
        prevButton.rotation = Phaser.Math.DegToRad(180);
        prevButton.setScale(this.Scale); 
        prevButton.on('pointerdown', () => { 
            this.button.play();
            if (this.currentPage > 0) {
                this.currentPage--;
                this.updateLevelButtons();
            }
        });

        // Bouton pour le son, on ou off
        this.soundIcon = this.add.image(this.w/2 -10, this.h/9 * 8 , 'Sound_on').setInteractive();
        this.soundIcon.setScale(this.Scale);
        this.soundIcon.on('pointerdown', () => {
            if (this.music.isPlaying) {
                this.button.play();
                this.music.pause();
                this.soundIcon.setTexture('Sound_off');
            } else {
                this.button.play();
                this.music.resume();
                this.soundIcon.setTexture('Sound_on');
            }
        });
    }

    createLevelButtons() {
        const startIndex = this.currentPage * this.levelsPerPage;
        const endIndex = startIndex + this.levelsPerPage;
    
        const centerX = this.w / 2; // Coordonnée x du centre de l'écran
        const centerY = this.h / 2; // Coordonnée y du centre de l'écran
    
        const gridWidth = 3; // Nombre de boutons par ligne dans la grille
        const gridHeight = Math.ceil(this.levelsPerPage / gridWidth); // Nombre de lignes dans la grille
    
        const gridSpacingX = (this.buttonSize + this.buttonSpacing) * gridWidth - this.buttonSpacing; // Ajustement du décalage en largeur
        const gridSpacingY = (this.buttonSize + this.buttonSpacing) * gridHeight;
    
        const gridStartX = centerX - gridSpacingX / 2;
        const gridStartY = centerY - gridSpacingY / 2 + (this.buttonSize + this.buttonSpacing) / 2; // Ajout de la moitié de la hauteur d'un bouton
    
        for (let i = startIndex; i < endIndex && i < this.levels.length; i++) {
            const level = this.levels[i]; // plus tard dans la scene level, on pourra utiliser level.collectibles pour placer les collectibles
    
            const gridX = (i - startIndex) % gridWidth;
            const gridY = Math.floor((i - startIndex) / gridWidth);
    
            const buttonX = gridStartX + gridX * (this.buttonSize + this.buttonSpacing) + gridX * this.buttonSpacing; // Ajustement du décalage en largeur
            const buttonY = gridStartY + gridY * (this.buttonSize + this.buttonSpacing);
    
            const levelButton = this.add.image(buttonX, buttonY, 'level').setScale(this.Scale).setInteractive().on('pointerdown', () => {
                this.button.play();
                this.music.stop();
                console.log("level " + (i+1) + " selected");
                this.scene.start("level", { level: i+1 });
            });
             // Add text for level number
        const levelNumber = this.add.text(buttonX, buttonY, (i + 1).toString(), {
            //chose a pixelated font, press start 
            fontFamily: 'Arial',
            fontSize: '70px',
            color: '#ffffff'
        });
        levelNumber.setOrigin(0.5);

        
        this.levelButtonsText.push(levelNumber);
        this.levelButtons.push(levelButton);
        }
    }
    
    

    updateLevelButtons() {
        // Supprimer les anciens boutons de niveau
        this.levelButtons.forEach(button => button.destroy());
        this.levelButtonsText.forEach(text => text.destroy());
        this.levelButtonsText = [];
        this.levelButtons = [];

        // Créer les nouveaux boutons de niveau pour la page actuelle
        this.createLevelButtons();

        // Animation de transition des boutons de niveau
        this.levelButtons.forEach(button => {
            button.alpha = 0;
            this.tweens.add({
                targets: button,
                alpha: 1,
                duration: 600,
                ease: 'Power5'
            });
        });
        //Animation de transition des textes de niveau
        this.levelButtonsText.forEach(text => {
            text.alpha = 0;
            this.tweens.add({
                targets: text,
                alpha: 1,
                duration: 600,
                ease: 'Power5'
            });
        }
        );
    }

    update() {
        // Logique de mise à jour du jeu
    }
}
