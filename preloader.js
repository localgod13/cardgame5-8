export class Preloader {
    constructor() {
        this.totalAssets = 0;
        this.loadedAssets = 0;
        this.loadingScreen = null;
        this.progressBar = null;
        this.assetList = {
            sprites: {
                warrior: [
                    './assets/Sprites/Warrior/Idle.png',
                    './assets/Sprites/Warrior/Attack1.png',
                    './assets/Sprites/Warrior/Attack2.png',
                    './assets/Sprites/Warrior/Attack3.png',
                    './assets/Sprites/Warrior/hurt1.png',
                    './assets/Sprites/Warrior/hurt2.png',
                    './assets/Sprites/Warrior/hurt3.png'
                ],
                wizard: [
                    './assets/Sprites/Wizard/Idle.png',
                    './assets/Sprites/Wizard/Attack1.png',
                    './assets/Sprites/Wizard/Attack2.png',
                    './assets/Sprites/Wizard/Hit.png'
                ],
                flyingDemon: [
                    './assets/Sprites/Flying Demon/IDLE.png',
                    './assets/Sprites/Flying Demon/ATTACK.png',
                    './assets/Sprites/Flying Demon/HURT.png',
                    './assets/Sprites/Flying Demon/DEATH.png'
                ],
                executioner: [
                    './assets/Sprites/Executioner/idle2.png',
                    './assets/Sprites/Executioner/attacking.png',
                    './assets/Sprites/Executioner/skill1.png',
                    './assets/Sprites/Executioner/death.png'
                ]
            },
            images: [
                './assets/Images/Gravyard.png',
                './assets/Images/cardback.png',
                './assets/Images/attack.png',
                './assets/Images/defense.png',
                './assets/Images/magic.png'
            ],
            audio: [
                './assets/Audio/tsmusic.mp3',
                './assets/Audio/level1.mp3'
            ]
        };
    }

    createLoadingScreen() {
        this.loadingScreen = document.createElement('div');
        this.loadingScreen.className = 'loading-screen';
        
        const loadingContent = document.createElement('div');
        loadingContent.className = 'loading-content';
        
        const loadingText = document.createElement('h2');
        loadingText.textContent = 'Loading Game Assets...';
        
        this.progressBar = document.createElement('div');
        this.progressBar.className = 'progress-bar';
        const progressFill = document.createElement('div');
        progressFill.className = 'progress-fill';
        this.progressBar.appendChild(progressFill);
        
        const loadingPercentage = document.createElement('div');
        loadingPercentage.className = 'loading-percentage';
        loadingPercentage.textContent = '0%';
        
        loadingContent.appendChild(loadingText);
        loadingContent.appendChild(this.progressBar);
        loadingContent.appendChild(loadingPercentage);
        this.loadingScreen.appendChild(loadingContent);
        
        document.body.appendChild(this.loadingScreen);
    }

    calculateTotalAssets() {
        let total = 0;
        for (const category in this.assetList) {
            if (category === 'sprites') {
                for (const character in this.assetList.sprites) {
                    total += this.assetList.sprites[character].length;
                }
            } else {
                total += this.assetList[category].length;
            }
        }
        this.totalAssets = total;
    }

    updateProgress() {
        this.loadedAssets++;
        const percentage = Math.round((this.loadedAssets / this.totalAssets) * 100);
        
        const progressFill = this.progressBar.querySelector('.progress-fill');
        const loadingPercentage = this.loadingScreen.querySelector('.loading-percentage');
        
        progressFill.style.width = `${percentage}%`;
        loadingPercentage.textContent = `${percentage}%`;
    }

    loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.updateProgress();
                resolve(img);
            };
            img.onerror = () => {
                console.error(`Failed to load image: ${src}`);
                reject(new Error(`Failed to load image: ${src}`));
            };
            img.src = src;
        });
    }

    loadAudio(src) {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.oncanplaythrough = () => {
                this.updateProgress();
                resolve(audio);
            };
            audio.onerror = () => {
                console.error(`Failed to load audio: ${src}`);
                reject(new Error(`Failed to load audio: ${src}`));
            };
            audio.src = src;
        });
    }

    async loadAllAssets() {
        this.createLoadingScreen();
        this.calculateTotalAssets();
        
        const loadedAssets = new Map();
        
        try {
            // Load sprites
            for (const character in this.assetList.sprites) {
                for (const sprite of this.assetList.sprites[character]) {
                    const img = await this.loadImage(sprite);
                    loadedAssets.set(sprite, img);
                }
            }
            
            // Load images
            for (const image of this.assetList.images) {
                const img = await this.loadImage(image);
                loadedAssets.set(image, img);
            }

            // Load audio
            for (const audio of this.assetList.audio) {
                const audioElement = await this.loadAudio(audio);
                loadedAssets.set(audio, audioElement);
            }
            
            // Remove loading screen
            this.loadingScreen.remove();
            
            return loadedAssets;
        } catch (error) {
            console.error('Error loading assets:', error);
            this.loadingScreen.remove();
            throw error;
        }
    }
} 