import { CardManager } from './cardManager.js';
import { Game } from './game.js';

class BookAnimation {
    constructor() {
        this.spriteSheet = './assets/Sprites/storybook.png';
        this.frameWidth = 1176 / 42; // Width of each frame
        this.frameHeight = 35; // Height of the sprite
        this.totalFrames = 42;
        this.currentFrame = 0;
        this.animationSpeed = 50; // milliseconds per frame
        this.element = null;
        this.animationInterval = null;
    }

    createBookElement() {
        const bookElement = document.createElement('div');
        bookElement.className = 'book-animation';
        bookElement.style.cssText = `
            width: ${this.frameWidth * 16}px;
            height: ${this.frameHeight * 16}px;
            background-image: url(${this.spriteSheet});
            background-size: ${this.frameWidth * this.totalFrames * 16}px ${this.frameHeight * 16}px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1001;
        `;
        
        this.element = bookElement;
        return bookElement;
    }

    startAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }

        this.animationInterval = setInterval(() => {
            this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
            if (this.element) {
                this.element.style.backgroundPosition = `-${this.currentFrame * this.frameWidth * 16}px 0px`;
            }
        }, this.animationSpeed);
    }

    stopAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
    }
}

export class ClassSelection {
    constructor(loadedAssets) {
        this.selectedClass = null;
        this.selectedDeck = null;
        this.titleMusic = null;
        this.loadedAssets = loadedAssets;  // Store loaded assets
        this.bookAnimation = new BookAnimation();
        this.warriorCards = [
            'sword_strike',
            'double_slash',
            'critical_hit',
            'quick_strike',
            'whirlwind',
            'backstab',
            'berserker_rage',
            'precision_strike',
            'combo_strike',
            'heavy_slash',
            'counter_strike',
            'flurry_of_blows',
            'power_surge',
            'shadow_strike',
            'dragon_fang',
            'blade_dance',
            'thunder_strike',
            'soul_rend',
            'cross_slash',
            'final_strike',
            // Defense cards suitable for warriors
            'shield_block',
            'iron_wall',
            'mirror_shield',
            'counter_stance',
            'stone_skin',
            'dodge_roll',
            'fortify',
            'shield_wall',
            'deflection',
            'adamantine_skin'
        ];

        this.iceDeck = [
            // Defense Cards (5)
            'ice_shield',      // Basic ice shield
            'frost_wall',      // Ice wall defense
            'frozen_heart',    // Ice heart protection
            'ice_barrier',     // Ice barrier
            'frost_ward',      // Frost ward
            
            // Attack Cards (10)
            'frost_nova',      // Frost explosion
            'blizzard',        // Snowstorm attack
            'ice_spike',       // Ice projectile
            'frost_bite',      // Biting cold
            'winter_wind',     // Chilling wind
            'cold_snap',       // Sudden cold burst
            'ice_lance',       // Piercing ice
            'frost_bolt',      // Frost projectile
            'snow_blast',      // Snow attack
            'glacial_strike'   // Heavy ice attack
        ];

        this.lightningDeck = [
            // Defense Cards (5)
            'static_shield',    // Static electricity shield
            'thunder_wall',     // Lightning wall
            'storm_barrier',    // Storm barrier
            'lightning_ward',   // Lightning ward
            'storm_guard',      // Storm protection
            
            // Attack Cards (10)
            'lightning_bolt',   // Lightning attack
            'thunder_strike',   // Thunder attack
            'chain_lightning',  // Chaining lightning
            'storm_cloud',      // Storm cloud
            'electric_surge',   // Electric surge
            'thunder_clap',     // Thunder shockwave
            'lightning_rod',    // Lightning rod attack
            'static_field',     // Static field
            'storm_bolt',       // Storm projectile
            'thunder_blast'     // Thunder explosion
        ];

        this.fireDeck = [
            // Defense Cards (5)
            'flame_shield',     // Fire shield
            'fire_wall',        // Fire wall
            'inferno_barrier',  // Inferno barrier
            'blaze_ward',       // Blaze ward
            'ember_guard',      // Ember protection
            
            // Attack Cards (10)
            'fireball',         // Fire projectile
            'meteor_strike',    // Meteor attack
            'inferno',          // Massive fire
            'flame_burst',      // Flame explosion
            'pyroclasm',        // Fire and lava explosion
            'molten_strike',    // Lava attack
            'blaze_bolt',       // Blaze projectile
            'heat_wave',        // Heat wave
            'infernal_blast'    // Infernal explosion
        ];
    }

    createClassSelectionScene() {
        const container = document.createElement('div');
        container.className = 'class-selection-container';
        
        // Get the preloaded title music using the stored assets
        if (this.loadedAssets) {
            this.titleMusic = this.loadedAssets.get('./assets/Audio/tsmusic.mp3');
            if (this.titleMusic) {
                this.titleMusic.loop = true;
                this.titleMusic.volume = 0.5;
                this.playTitleMusic();
            } else {
                console.warn('Title music not found in loaded assets');
            }
        } else {
            console.warn('No loaded assets available');
        }
        
        container.innerHTML = `
            <h1>Choose Your Path</h1>
            <div class="class-options">
                <div class="warrior-option" data-class="warrior">
                    <img src="./assets/Images/wbutton.png" alt="Warrior" class="class-button">
                    <p>Masters of physical combat and defensive techniques</p>
                </div>
                <div class="mage-option" data-class="mage">
                    <img src="./assets/Images/mbutton.png" alt="Mage" class="class-button">
                    <p>Wielders of fire magic and devastating spells</p>
                </div>
            </div>
        `;

        // Update the class options selector to match new class names
        const classOptions = container.querySelectorAll('[data-class]');
        classOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.selectedClass = option.dataset.class;
                
                // For mage, automatically set fire deck
                if (this.selectedClass === 'mage') {
                    this.selectedDeck = 'fire';
                }
                
                // Initialize deck and start game immediately
                this.initializePlayerDeck();
                this.startGame();
            });
        });

        return container;
    }

    initializePlayerDeck() {
        const cardManager = new CardManager();
        let availableCards;
        
        if (this.selectedClass === 'warrior') {
            availableCards = this.warriorCards;
            console.log('Selected warrior deck with', availableCards.length, 'cards');
        } else {
            // For mage, use the selected deck
            switch (this.selectedDeck) {
                case 'ice':
                    availableCards = this.iceDeck;
                    console.log('Selected ice deck with', availableCards.length, 'cards');
                    break;
                case 'lightning':
                    availableCards = this.lightningDeck;
                    console.log('Selected lightning deck with', availableCards.length, 'cards');
                    break;
                case 'fire':
                    availableCards = this.fireDeck;
                    console.log('Selected fire deck with', availableCards.length, 'cards');
                    break;
                default:
                    availableCards = this.iceDeck;
                    console.log('Defaulted to ice deck with', availableCards.length, 'cards');
            }
        }

        // Create arrays for hand and draw pile
        const hand = [];
        const drawPile = [];
        
        // For Fire Mage, ensure Fireball is in the starting hand
        if (this.selectedClass === 'mage' && this.selectedDeck === 'fire') {
            hand.push('fireball');
            // Remove fireball from available cards to avoid duplicates
            availableCards = availableCards.filter(card => card !== 'fireball');
        }
        
        // Fill the remaining hand slots randomly
        while (hand.length < 5) {
            const randomIndex = Math.floor(Math.random() * availableCards.length);
            hand.push(availableCards[randomIndex]);
            availableCards.splice(randomIndex, 1); // Remove the card to avoid duplicates
        }
        
        // Fill the draw pile with remaining cards
        while (drawPile.length < 5) {
            const randomIndex = Math.floor(Math.random() * availableCards.length);
            drawPile.push(availableCards[randomIndex]);
            availableCards.splice(randomIndex, 1); // Remove the card to avoid duplicates
        }
        
        // Set up the deck
        this.playerDeck = {
            hand: hand,
            drawPile: drawPile,
            discardPile: []
        };

        // Log deck initialization for debugging
        console.log('Deck initialization complete:');
        console.log('- Draw pile:', this.playerDeck.drawPile);
        console.log('- Hand:', this.playerDeck.hand);
        console.log('- Draw pile size:', this.playerDeck.drawPile.length);
        console.log('- Hand size:', this.playerDeck.hand.length);
        console.log('- Total cards:', this.playerDeck.drawPile.length + this.playerDeck.hand.length);
    }

    getRandomCards(cardPool, count) {
        const shuffled = [...cardPool].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    drawCard() {
        if (this.playerDeck.drawPile.length === 0) {
            // If draw pile is empty, shuffle discard pile into draw pile
            this.playerDeck.drawPile = [...this.playerDeck.discardPile];
            this.playerDeck.discardPile = [];
            this.shuffleDeck();
        }

        if (this.playerDeck.drawPile.length > 0) {
            const card = this.playerDeck.drawPile.pop();
            this.playerDeck.hand.push(card);
            return card;
        }
        return null;
    }

    playCard(cardId) {
        const cardIndex = this.playerDeck.hand.findIndex(card => card === cardId);
        if (cardIndex !== -1) {
            const card = this.playerDeck.hand.splice(cardIndex, 1)[0];
            this.playerDeck.discardPile.push(card);
            return card;
        }
        return null;
    }

    shuffleDeck() {
        this.playerDeck.drawPile.sort(() => 0.5 - Math.random());
    }

    playTitleMusic() {
        if (this.titleMusic) {
            this.titleMusic.play().catch(error => {
                console.log('Autoplay prevented:', error);
                const startMusic = () => {
                    this.titleMusic.play();
                    document.removeEventListener('click', startMusic);
                };
                document.addEventListener('click', startMusic);
            });
        }
    }

    startGame() {
        // Fade out the title music
        if (this.titleMusic) {
            const fadeOut = setInterval(() => {
                if (this.titleMusic.volume > 0.1) {
                    this.titleMusic.volume -= 0.1;
                } else {
                    this.titleMusic.pause();
                    this.titleMusic.currentTime = 0;
                    this.titleMusic = null;
                    clearInterval(fadeOut);
                }
            }, 100); // Fade out over 1 second
        }

        // Hide class selection
        const classSelection = document.querySelector('.class-selection-container');
        if (classSelection) {
            classSelection.style.display = 'none';
        }

        // Show the appropriate intro sequence based on selected class
        if (this.selectedClass === 'mage') {
            this.showMageIntro();
        } else if (this.selectedClass === 'warrior') {
            this.showWarriorIntro();
        } else {
            // Initialize the main game directly for other classes
            this.initializeGame();
        }
    }

    showMageIntro() {
        // Add Google Font
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);

        // Start level 1 music
        const level1Music = new Audio('./assets/Audio/level1.mp3');
        level1Music.volume = 0;
        level1Music.loop = true;
        
        // Play mage intro sound
        const mageIntroSound = new Audio('./assets/Audio/mageintro.wav');
        mageIntroSound.volume = 0.7;
        
        // Start both sounds
        Promise.all([
            level1Music.play().catch(error => {
                console.log('Level 1 music autoplay prevented:', error);
                const startMusic = () => {
                    level1Music.play();
                    document.removeEventListener('click', startMusic);
                };
                document.addEventListener('click', startMusic);
            }),
            mageIntroSound.play().catch(error => {
                console.log('Mage intro sound autoplay prevented:', error);
                const startSound = () => {
                    mageIntroSound.play();
                    document.removeEventListener('click', startSound);
                };
                document.addEventListener('click', startSound);
            })
        ]).then(() => {
            // Fade in level 1 music
            const fadeIn = setInterval(() => {
                if (level1Music.volume < 0.5) {
                    level1Music.volume += 0.05;
                } else {
                    clearInterval(fadeIn);
                }
            }, 100);
        });

        // Create intro container
        const introContainer = document.createElement('div');
        introContainer.className = 'mage-intro-container';
        introContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 1s ease-in-out;
            z-index: 1000;
            cursor: pointer;
        `;

        // Create scroll container
        const scrollContainer = document.createElement('div');
        scrollContainer.style.cssText = `
            width: 1400px;
            height: 1050px;
            background-image: url('./assets/Images/scroll.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        `;

        // Create text content
        const introText = document.createElement('div');
        introText.style.cssText = `
            max-width: 1000px;
            text-align: center;
            line-height: 2;
            font-size: 2.4em;
            padding: 40px;
            position: relative;
            z-index: 1;
            color: #2c1810;
            font-family: 'Dancing Script', cursive;
            text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
            margin-top: -50px;
            height: 800px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            font-weight: 700;
        `;

        // Array of text lines with their timing
        const textLines = [
            { text: "The mage stands alone,", delay: 1500 },
            { text: "ash swirling in the still air.", delay: 3000 },
            { text: "Fire hums beneath his skin.", delay: 4500 },
            { text: "The dead do not rest.", delay: 6000 },
            { text: "Not here. Not now.", delay: 7500 },
            { text: "He summons flame,", delay: 9000 },
            { text: "its heat a warning and a promise.", delay: 10500 },
            { text: "The climb begins in fire and ash.", delay: 13000 },
            { text: "(click to skip)", delay: 14500, style: "font-size: 0.6em; margin-top: 40px; opacity: 0.7; font-family: 'Times New Roman', serif;" }
        ];

        // Create placeholder paragraphs for all lines
        textLines.forEach(line => {
            const p = document.createElement('p');
            p.style.cssText = `
                margin: 0;
                padding: 0;
                min-height: 1.2em;
                ${line.style || ''}
            `;
            introText.appendChild(p);
        });

        // Function to type text
        const typeText = (element, text, speed = 40) => {
            let index = 0;
            element.textContent = '';
            
            const typeNextChar = () => {
                if (index < text.length) {
                    element.textContent += text[index];
                    index++;
                    setTimeout(typeNextChar, speed);
                }
            };
            
            typeNextChar();
        };

        scrollContainer.appendChild(introText);
        introContainer.appendChild(scrollContainer);
        document.body.appendChild(introContainer);

        // Fade in
        setTimeout(() => {
            introContainer.style.opacity = '1';
        }, 100);

        // Add text lines with timing
        textLines.forEach((line, index) => {
            setTimeout(() => {
                const p = introText.children[index];
                typeText(p, line.text, 40); // 40ms between each character
            }, line.delay);
        });

        // Function to end intro with fade out for mage intro sound
        const endIntroWithFade = () => {
            // Fade out the mage intro sound
            const fadeOutInterval = setInterval(() => {
                if (mageIntroSound.volume > 0.05) {
                    mageIntroSound.volume -= 0.05;
                } else {
                    mageIntroSound.pause();
                    mageIntroSound.currentTime = 0;
                    clearInterval(fadeOutInterval);
                }
            }, 50);

            // Fade out the intro container
            introContainer.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(introContainer);
                this.initializeGame(level1Music); // Pass the music to the game
            }, 1000);
        };

        // Function to end intro without fading mage intro sound
        const endIntroWithoutFade = () => {
            // Fade out the intro container
            introContainer.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(introContainer);
                this.initializeGame(level1Music); // Pass the music to the game
            }, 1000);
        };

        // Add click handler to skip intro
        introContainer.addEventListener('click', () => {
            endIntroWithFade();
        });

        // Get the duration of the mage intro sound and use it for the timeout
        mageIntroSound.addEventListener('loadedmetadata', () => {
            // Add a small buffer to ensure the sound finishes playing
            const duration = mageIntroSound.duration * 1000 + 500;
            
            // Auto-end after the sound finishes
            setTimeout(() => {
                if (document.body.contains(introContainer)) {
                    endIntroWithoutFade();
                }
            }, duration);
        });
    }

    showWarriorIntro() {
        // Add Google Font
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);

        // Start level 1 music
        const level1Music = new Audio('./assets/Audio/level1.mp3');
        level1Music.volume = 0;
        level1Music.loop = true;
        
        // Play warrior intro sound
        const warriorIntroSound = new Audio('./assets/Audio/warriorintro.mp3');
        warriorIntroSound.volume = 0.7;
        
        // Start both sounds
        Promise.all([
            level1Music.play().catch(error => {
                console.log('Level 1 music autoplay prevented:', error);
                const startMusic = () => {
                    level1Music.play();
                    document.removeEventListener('click', startMusic);
                };
                document.addEventListener('click', startMusic);
            }),
            warriorIntroSound.play().catch(error => {
                console.log('Warrior intro sound autoplay prevented:', error);
                const startSound = () => {
                    warriorIntroSound.play();
                    document.removeEventListener('click', startSound);
                };
                document.addEventListener('click', startSound);
            })
        ]).then(() => {
            // Fade in level 1 music
            const fadeIn = setInterval(() => {
                if (level1Music.volume < 0.5) {
                    level1Music.volume += 0.05;
                } else {
                    clearInterval(fadeIn);
                }
            }, 100);
        });

        // Create intro container
        const introContainer = document.createElement('div');
        introContainer.className = 'warrior-intro-container';
        introContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 1s ease-in-out;
            z-index: 1000;
            cursor: pointer;
        `;

        // Create scroll container
        const scrollContainer = document.createElement('div');
        scrollContainer.style.cssText = `
            width: 1400px;
            height: 1050px;
            background-image: url('./assets/Images/scroll.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        `;

        // Create text content
        const introText = document.createElement('div');
        introText.style.cssText = `
            max-width: 1000px;
            text-align: center;
            line-height: 2;
            font-size: 2.4em;
            padding: 40px;
            position: relative;
            z-index: 1;
            color: #2c1810;
            font-family: 'Dancing Script', cursive;
            text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
            margin-top: -50px;
            height: 800px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            font-weight: 700;
        `;

        // Array of text lines with their timing
        const textLines = [
            { text: "The warrior stands,", delay: 1500 },
            { text: "blade chipped but firm.", delay: 3000 },
            { text: "Wind cuts through the graveyard", delay: 4500 },
            { text: "as old bones stir.", delay: 6000 },
            { text: "He remembers no name,", delay: 7500 },
            { text: "only the weight of duty.", delay: 9000 },
            { text: "Steel in hand,", delay: 10500 },
            { text: "heart unshaken.", delay: 12000 },
            { text: "The dead rise.", delay: 13500 },
            { text: "He does not falter.", delay: 15000 },
            { text: "The climb begins", delay: 16500 },
            { text: "with steel and silence.", delay: 18000 },
            { text: "(click to skip)", delay: 19500, style: "font-size: 0.6em; margin-top: 40px; opacity: 0.7; font-family: 'Times New Roman', serif;" }
        ];

        // Create placeholder paragraphs for all lines
        textLines.forEach(line => {
            const p = document.createElement('p');
            p.style.cssText = `
                margin: 0;
                padding: 0;
                min-height: 1.2em;
                ${line.style || ''}
            `;
            introText.appendChild(p);
        });

        // Function to type text
        const typeText = (element, text, speed = 40) => {
            let index = 0;
            element.textContent = '';
            
            const typeNextChar = () => {
                if (index < text.length) {
                    element.textContent += text[index];
                    index++;
                    setTimeout(typeNextChar, speed);
                }
            };
            
            typeNextChar();
        };

        scrollContainer.appendChild(introText);
        introContainer.appendChild(scrollContainer);
        document.body.appendChild(introContainer);

        // Fade in
        setTimeout(() => {
            introContainer.style.opacity = '1';
        }, 100);

        // Add text lines with timing
        textLines.forEach((line, index) => {
            setTimeout(() => {
                const p = introText.children[index];
                typeText(p, line.text, 40); // 40ms between each character
            }, line.delay);
        });

        // Function to end intro with fade out for warrior intro sound
        const endIntroWithFade = () => {
            // Fade out the warrior intro sound
            const fadeOutInterval = setInterval(() => {
                if (warriorIntroSound.volume > 0.05) {
                    warriorIntroSound.volume -= 0.05;
                } else {
                    warriorIntroSound.pause();
                    warriorIntroSound.currentTime = 0;
                    clearInterval(fadeOutInterval);
                }
            }, 50);

            // Fade out the intro container
            introContainer.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(introContainer);
                this.initializeGame(level1Music); // Pass the music to the game
            }, 1000);
        };

        // Function to end intro without fading warrior intro sound
        const endIntroWithoutFade = () => {
            // Fade out the intro container
            introContainer.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(introContainer);
                this.initializeGame(level1Music); // Pass the music to the game
            }, 1000);
        };

        // Add click handler to skip intro
        introContainer.addEventListener('click', () => {
            endIntroWithFade();
        });

        // Get the duration of the warrior intro sound and use it for the timeout
        warriorIntroSound.addEventListener('loadedmetadata', () => {
            // Add a small buffer to ensure the sound finishes playing
            const duration = warriorIntroSound.duration * 1000 + 500;
            
            // Auto-end after the sound finishes
            setTimeout(() => {
                if (document.body.contains(introContainer)) {
                    endIntroWithoutFade();
                }
            }, duration);
        });
    }

    initializeGame(level1Music) {
        // Initialize the main game with the already playing music
        const game = new Game();
        game.initialize(this.selectedClass, this.playerDeck, level1Music);
    }
} 