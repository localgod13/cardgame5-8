// Import enemy classes
import { Enemy } from './enemy.js';
import { Executioner } from './executioner.js';
import { FlyingDemon } from './flyingDemon.js';
import { CardManager } from './cardManager.js';
import { DebugMenu } from './debugMenu.js';
import { Warrior } from './warrior.js';
import { Mage } from './mage.js';
import { Preloader } from './preloader.js';
import { ThreeRenderer } from './threeRenderer.js';

class Card {
    constructor(name, attack, defense, cost) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.cost = cost;
    }

    createCardElement() {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div style="padding: 10px; color: white;">
                <h3>${this.name}</h3>
                <p>Attack: ${this.attack}</p>
                <p>Defense: ${this.defense}</p>
                <p>Cost: ${this.cost}</p>
            </div>
        `;
        return card;
    }
}

class PlayerCharacter {
    constructor(spriteSheet, frameWidth = 135, frameHeight = 135, totalFrames = 10) {
        this.spriteSheet = spriteSheet;
        this.currentFrame = 0;
        this.totalFrames = totalFrames; // Default: 10 frames in the idle sprite sheet
        this.frameWidth = frameWidth; // Default: 135px width
        this.frameHeight = frameHeight; // Default: 135px height
        this.animationSpeed = 100; // milliseconds per frame
        this.element = null;
        this.animationInterval = null;
        this.isAttacking = false;
        this.isHurt = false;
        this.attackSpriteSheets = [
            './assets/Sprites/Warrior/Attack1.png',
            './assets/Sprites/Warrior/Attack2.png',
            './assets/Sprites/Warrior/Attack3.png'
        ];
        this.attackFrames = [4, 4, 5]; // Frames for each attack animation
        this.currentAttackIndex = 0;
        this.hurtSpriteSheets = [
            './assets/Sprites/Warrior/hurt1.png',
            './assets/Sprites/Warrior/hurt2.png',
            './assets/Sprites/Warrior/hurt3.png'
        ];
    }

    createPlayerElement() {
        const playerElement = document.createElement('div');
        playerElement.className = 'player-character';
        
        // Create sprite container
        const spriteContainer = document.createElement('div');
        spriteContainer.className = 'player-sprite';
        spriteContainer.style.width = `${this.frameWidth * 4}px`; // 4x larger
        spriteContainer.style.height = `${this.frameHeight * 4}px`; // 4x larger
        spriteContainer.style.backgroundImage = `url(${this.spriteSheet})`;
        
        // Dynamically set background size based on frame dimensions and total frames
        const bgWidth = this.frameWidth * this.totalFrames * 4;
        const bgHeight = this.frameHeight * 4;
        spriteContainer.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;
        
        playerElement.appendChild(spriteContainer);
        this.element = playerElement;
        
        // Start animation
        this.startAnimation();
        
        return playerElement;
    }

    startAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }

        this.animationInterval = setInterval(() => {
            if (!this.isAttacking) {
                this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
                
                if (this.element) {
                    const spriteContainer = this.element.querySelector('.player-sprite');
                    if (spriteContainer) {
                        spriteContainer.style.backgroundImage = `url(${this.spriteSheet})`;
                        
                        // Dynamically set background size based on frame dimensions and total frames
                        const bgWidth = this.frameWidth * this.totalFrames * 4;
                        const bgHeight = this.frameHeight * 4;
                        spriteContainer.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;
                        
                        spriteContainer.style.backgroundPosition = `-${this.currentFrame * this.frameWidth * 4}px 0px`;
                    }
                }
            }
        }, this.animationSpeed);
    }

    playAttackAnimation() {
        if (this.isAttacking) return;
        
        this.isAttacking = true;
        let attackFrame = 0;
        
        const spriteContainer = this.element.querySelector('.player-sprite');
        if (!spriteContainer) return;

        // Stop the idle animation
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }

        // Store original sprite sheet and position
        const originalSpriteSheet = spriteContainer.style.backgroundImage;
        const originalPosition = spriteContainer.style.backgroundPosition;
        const originalSize = spriteContainer.style.backgroundSize;

        // Set up attack animation properties
        spriteContainer.style.backgroundImage = `url(${this.attackSpriteSheets[this.currentAttackIndex]})`;
        
        // Adjust background size based on current attack animation
        const currentFrames = this.attackFrames[this.currentAttackIndex];
        const totalWidth = this.frameWidth * currentFrames * 4; // 4x larger
        spriteContainer.style.backgroundSize = `${totalWidth}px 540px`; // 135px height * 4
        spriteContainer.style.backgroundPosition = '0px 0px';

        const attackInterval = setInterval(() => {
            if (attackFrame >= this.attackFrames[this.currentAttackIndex]) {
                clearInterval(attackInterval);
                this.isAttacking = false;
                
                // Restore original properties
                spriteContainer.style.backgroundImage = originalSpriteSheet;
                spriteContainer.style.backgroundSize = originalSize;
                spriteContainer.style.backgroundPosition = originalPosition;
                
                // Switch to next attack animation for next time
                this.currentAttackIndex = (this.currentAttackIndex + 1) % this.attackSpriteSheets.length;
                
                // Restart idle animation
                this.startAnimation();
                return;
            }

            spriteContainer.style.backgroundPosition = `-${attackFrame * this.frameWidth * 4}px 0px`;
            attackFrame++;
        }, 200); // 200ms per frame for attack animation
    }

    playHurtAnimation() {
        if (this.isHurt) return;
        
        this.isHurt = true;
        let hurtFrame = 0;
        
        const spriteContainer = this.element.querySelector('.player-sprite');
        if (!spriteContainer) return;

        // Stop the idle animation
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }

        // Store original sprite properties
        const originalSpriteSheet = spriteContainer.style.backgroundImage;
        const originalPosition = spriteContainer.style.backgroundPosition;
        const originalSize = spriteContainer.style.backgroundSize;

        const hurtInterval = setInterval(() => {
            if (hurtFrame >= this.hurtSpriteSheets.length) {
                clearInterval(hurtInterval);
                this.isHurt = false;
                
                // Restore original properties
                spriteContainer.style.backgroundImage = originalSpriteSheet;
                spriteContainer.style.backgroundSize = originalSize;
                spriteContainer.style.backgroundPosition = originalPosition;
                
                // Restart idle animation
                this.startAnimation();
                return;
            }

            // Set all sprite properties together
            spriteContainer.style.backgroundImage = `url(${this.hurtSpriteSheets[hurtFrame]})`;
            spriteContainer.style.backgroundSize = '540px 540px'; // 135px * 4
            spriteContainer.style.backgroundPosition = '0px 0px';
            hurtFrame++;
        }, 200); // 200ms per frame for hurt animation
    }
}

class SoundManager {
    constructor() {
        this.sounds = new Map();
        this.volume = 0.5;
    }

    loadSound(id, path) {
        const audio = new Audio(path);
        audio.volume = this.volume;
        this.sounds.set(id, audio);
    }

    playSound(id) {
        const sound = this.sounds.get(id);
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(error => console.log('Error playing sound:', error));
        }
    }

    setVolume(volume) {
        this.volume = volume;
        this.sounds.forEach(sound => {
            sound.volume = volume;
        });
    }
}

export class Game {
    constructor() {
        this.playerClass = null;
        this.playerDeck = null;
        this.playerHealth = 100;
        this.playerDefense = 0;
        this.playerResource = 0;
        this.maxResource = 0;
        this.isPlayerTurn = true;
        this.isTargeting = false;
        this.currentCard = null;
        this.sourceCard = null;
        this.targetingArrow = null;
        this.enemies = [];
        this.attackQueue = [];
        this.cardManager = new CardManager();  // Initialize CardManager
        this.playerCharacter = null;
        this.debugMenu = null;
        this.gameScene = null;
        this.reservedResource = 0; // Track reserved resources
        this.effectRenderer = new ThreeRenderer();
        this.levelMusic = null; // Add level music property
        this.isPaused = false; // Add pause state
        this.pauseMenu = null; // Add pause menu reference
        this.musicVolume = 0.5; // Add music volume
        this.sfxVolume = 0.5; // Add sound effects volume
        this.lastHurtSound = null; // Track last played hurt sound
        this.soundManager = new SoundManager();
        this.soundManager.loadSound('shieldHit', './assets/Audio/shieldhit.mp3');
        this.soundManager.loadSound('axeHit', './assets/Audio/axe.mp3');
        this.soundManager.loadSound('hurt1', './assets/Audio/hurt1.mp3');
        this.soundManager.loadSound('hurt2', './assets/Audio/hurt2.mp3');
        this.soundManager.loadSound('hurt3', './assets/Audio/hurt3.mp3');
    }

    initialize(playerClass, playerDeck, level1Music = null) {
        this.playerClass = playerClass;
        this.playerDeck = playerDeck;
        this.gameScene = document.querySelector('.game-scene');
        
        if (!this.gameScene) {
            console.error('Game scene not found!');
            return;
        }

        // Use provided level music or create new if not provided
        if (level1Music) {
            this.levelMusic = level1Music;
        } else {
            // Initialize level music only if not provided
            this.levelMusic = new Audio('./assets/Audio/level1.mp3');
            this.levelMusic.loop = true;
            this.levelMusic.volume = 0.5;
            this.levelMusic.play().catch(error => {
                console.log('Autoplay prevented:', error);
                const startMusic = () => {
                    this.levelMusic.play();
                    document.removeEventListener('click', startMusic);
                };
                document.addEventListener('click', startMusic);
            });
        }

        // Initialize player based on class
        if (playerClass === 'warrior') {
            const warrior = new Warrior();
            this.playerHealth = warrior.health;
            this.playerDefense = warrior.defense;
            this.maxResource = warrior.maxResource;
            this.playerResource = 4;
            this.playerCharacter = new PlayerCharacter(warrior.spriteSheet);
        } else if (playerClass === 'mage') {
            const mage = new Mage();
            this.playerHealth = mage.health;
            this.playerDefense = mage.defense;
            this.maxResource = mage.maxResource;
            this.playerResource = 10;
            this.playerCharacter = mage;
        }

        // Show the game scene
        this.gameScene.style.display = 'flex';
        
        // Initialize the game
        this.initializeGame();

        // Initialize debug menu
        this.debugMenu = new DebugMenu(this);

        // Create pause menu
        this.createPauseMenu();
        
        // Add pause button event listener
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.togglePause();
            }
        });
    }

    initializeGame() {
        // Initialize player character
        const playerSide = document.querySelector('.player-side');
        if (playerSide) {
            playerSide.innerHTML = '';
            
            // Create player element with the already initialized playerCharacter
            const playerElement = this.playerCharacter.createPlayerElement();
            playerElement.setAttribute('data-class', this.playerClass); // Set the class attribute
            
            // Add shield aura
            const shieldAura = document.createElement('div');
            shieldAura.className = 'shield-aura';
            playerElement.appendChild(shieldAura);
            
            // Add character stats
            const statsContainer = document.createElement('div');
            statsContainer.className = 'character-stats';
            statsContainer.innerHTML = `
                <div class="health-bar">
                    <div class="health-bar-fill" style="width: 100%"></div>
                </div>
                <div class="defense-bar">
                    <div class="defense-bar-fill" style="width: 0%"></div>
                    <div class="defense-text">Defense: 0</div>
                </div>
                <div class="resource-bar">
                    <div class="resource-bar-fill" style="width: ${(this.playerResource / this.maxResource) * 100}%"></div>
                </div>
                <div class="resource-label">${this.playerClass === 'mage' ? 'Mana' : 'Rage'}: ${this.playerResource}</div>
            `;
            
            playerElement.appendChild(statsContainer);
            playerSide.appendChild(playerElement);
        }

        // Initialize enemy characters
        const enemySide = document.querySelector('.enemy-side');
        if (enemySide) {
            enemySide.innerHTML = '';
            // Create two executioner enemies and one flying demon
            for (let i = 0; i < 3; i++) {
                const enemy = i === 1 ? 
                    new FlyingDemon(i + 1, 100) :
                    new Executioner(i + 1, 100);
                this.enemies.push(enemy);
                enemySide.appendChild(enemy.createEnemyElement());
            }
        }

        // Initialize player's hand
        this.updatePlayerHand(true);
        this.updatePileCounts();

        // Initialize end turn button
        const endTurnBtn = document.querySelector('.end-turn-btn');
        if (endTurnBtn) {
            endTurnBtn.addEventListener('click', () => this.endTurn());
        }

        // Create targeting arrow
        this.createTargetingArrow();
    }

    createTargetingArrow() {
        console.log('Creating targeting arrow'); // Debug log
        if (this.targetingArrow) {
            this.targetingArrow.remove(); // Remove existing arrow if any
        }
        
        this.targetingArrow = document.createElement('div');
        this.targetingArrow.className = 'targeting-arrow';
        this.targetingArrow.style.display = 'none';
        document.querySelector('.game-scene').appendChild(this.targetingArrow);
    }

    startTargeting(cardId) {
        console.log('startTargeting called with cardId:', cardId);
        if (!this.isPlayerTurn) return;

        const cardData = this.cardManager.getCard(cardId);
        console.log('Card data:', cardData);
        
        if (!cardData || (cardData.type !== 'Attack' && cardData.type !== 'Magic')) {
            console.log('Invalid card type for targeting');
            return;
        }

        this.isTargeting = true;
        this.currentCard = cardId;
        
        if (!this.targetingArrow) {
            this.createTargetingArrow();
        }

        const cardElement = document.querySelector(`.card[data-card-id="${cardId}"]`);
        if (cardElement) {
            this.sourceCard = cardElement;
            this.targetingArrow.style.display = 'block';
            
            if (cardData.type === 'Magic') {
                this.targetingArrow.classList.add('magic');
            } else {
                this.targetingArrow.classList.remove('magic');
            }
            
            console.log('Targeting arrow displayed');

            document.addEventListener('mousemove', this.updateArrowPosition);
            document.addEventListener('click', this.handleTargetSelection);
            document.addEventListener('click', this.handleOutsideClick);
        } else {
            console.log('Card element not found');
            this.stopTargeting();
        }
    }

    updateArrowPosition = (e) => {
        if (!this.isTargeting || !this.sourceCard) return;

        const cardRect = this.sourceCard.getBoundingClientRect();
        const startX = cardRect.left + cardRect.width / 2;
        const startY = cardRect.top + cardRect.height / 2;

        const angle = Math.atan2(e.clientY - startY, e.clientX - startX);
        
        // Calculate the distance to the mouse position
        const distance = Math.hypot(e.clientX - startX, e.clientY - startY);
        
        // Set a much larger maximum length to ensure it can reach any enemy
        const maxLength = Math.max(window.innerWidth, window.innerHeight) * 1.5;
        const length = Math.min(distance, maxLength);

        this.targetingArrow.style.transform = `translate(${startX}px, ${startY}px) rotate(${angle}rad)`;
        this.targetingArrow.style.width = `${length}px`;

        // Check if mouse is over an enemy's hitbox
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        this.enemies.forEach(enemy => {
            if (enemy.element) {
                const spriteElement = enemy.element.querySelector('.enemy-sprite');
                if (spriteElement) {
                    const rect = spriteElement.getBoundingClientRect();
                    // Calculate hitbox dimensions (40% of sprite size)
                    const hitboxWidth = rect.width * 0.4;
                    const hitboxHeight = rect.height * 0.4;
                    // Calculate hitbox position (centered on sprite)
                    const hitboxLeft = rect.left + (rect.width - hitboxWidth) / 2;
                    const hitboxTop = rect.top + (rect.height - hitboxHeight) / 2;
                    
                    // Check if mouse is within hitbox
                    const isInHitbox = mouseX >= hitboxLeft && 
                                     mouseX <= hitboxLeft + hitboxWidth &&
                                     mouseY >= hitboxTop && 
                                     mouseY <= hitboxTop + hitboxHeight;
                    
                    if (isInHitbox) {
                        enemy.element.classList.add('targetable');
                    } else {
                        enemy.element.classList.remove('targetable');
                    }
                }
            }
        });
    }

    handleTargetSelection = (e) => {
        console.log('Target selection clicked');
        if (!this.isTargeting) return;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const targetedEnemy = this.enemies.find(enemy => {
            if (enemy.element) {
                const spriteElement = enemy.element.querySelector('.enemy-sprite');
                if (spriteElement) {
                    const rect = spriteElement.getBoundingClientRect();
                    const hitboxWidth = rect.width * 0.4;
                    const hitboxHeight = rect.height * 0.4;
                    const hitboxLeft = rect.left + (rect.width - hitboxWidth) / 2;
                    const hitboxTop = rect.top + (rect.height - hitboxHeight) / 2;
                    
                    return mouseX >= hitboxLeft && 
                           mouseX <= hitboxLeft + hitboxWidth &&
                           mouseY >= hitboxTop && 
                           mouseY <= hitboxTop + hitboxHeight;
                }
            }
            return false;
        });

        if (targetedEnemy) {
            console.log('Enemy hitbox found:', targetedEnemy);
            
            // Check if player has enough resources for this card
            const cardData = this.cardManager.getCard(this.currentCard);
            if (!cardData) {
                this.stopTargeting();
                return;
            }

            // Check if we have enough resources including what's already reserved
            if (this.playerResource - this.reservedResource < cardData.cost) {
                this.showResourceNotification(cardData.cost);
                this.stopTargeting();
                return;
            }

            // Add to attack queue instead of playing immediately
            this.attackQueue.push({
                cardId: this.currentCard,
                targetEnemy: targetedEnemy,
                cost: cardData.cost
            });
            
            // Reserve the resources
            this.reservedResource += cardData.cost;
            
            // Update the card's appearance to show it's queued
            const cardElement = document.querySelector(`.card[data-card-id="${this.currentCard}"]`);
            if (cardElement) {
                cardElement.classList.add('queued');
                // Add a small indicator showing the target
                const targetIndicator = document.createElement('div');
                targetIndicator.className = 'target-indicator';
                targetIndicator.textContent = `→ ${targetedEnemy.id}`;
                cardElement.appendChild(targetIndicator);
            }

            // Update the resource display to show reserved resources
            this.updateResourceBar();
        }

        this.stopTargeting();
    }

    handleOutsideClick = (e) => {
        if (!this.isTargeting) return;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Check if click is outside all enemy hitboxes
        const isOutsideAllHitboxes = this.enemies.every(enemy => {
            if (enemy.element) {
                const spriteElement = enemy.element.querySelector('.enemy-sprite');
                if (spriteElement) {
                    const rect = spriteElement.getBoundingClientRect();
                    // Calculate hitbox dimensions (40% of sprite size)
                    const hitboxWidth = rect.width * 0.4;
                    const hitboxHeight = rect.height * 0.4;
                    // Calculate hitbox position (centered on sprite)
                    const hitboxLeft = rect.left + (rect.width - hitboxWidth) / 2;
                    const hitboxTop = rect.top + (rect.height - hitboxHeight) / 2;
                    
                    // Check if mouse is within hitbox
                    return !(mouseX >= hitboxLeft && 
                           mouseX <= hitboxLeft + hitboxWidth &&
                           mouseY >= hitboxTop && 
                           mouseY <= hitboxTop + hitboxHeight);
                }
            }
            return true;
        });
        
        if (isOutsideAllHitboxes) {
            this.stopTargeting();
        }
    }

    stopTargeting() {
        console.log('Stopping targeting'); // Debug log
        this.isTargeting = false;
        this.currentCard = null;
        this.sourceCard = null;
        if (this.targetingArrow) {
            this.targetingArrow.style.display = 'none';
        }
        // Remove targetable class from all enemies
        this.enemies.forEach(enemy => {
            if (enemy.element) {
                enemy.element.classList.remove('targetable');
            }
        });
        document.removeEventListener('mousemove', this.updateArrowPosition);
        document.removeEventListener('click', this.handleTargetSelection);
        document.removeEventListener('click', this.handleOutsideClick);
    }

    updatePlayerHand(isInitialDeal = false, previousHandSize = 0) {
        const playerHand = document.querySelector('.player-hand');
        if (!playerHand) return;

        // Clear current hand
        playerHand.innerHTML = '';

        // Add cards from player's hand
        this.playerDeck.hand.forEach((cardId, index) => {
            const cardData = this.cardManager.getCard(cardId);
            if (cardData) {
                const cardElement = this.cardManager.createCardElement(cardData);
                cardElement.dataset.cardId = cardId;
                
                // Only add dealing class to new cards (those beyond the previous hand size)
                if (isInitialDeal && index >= previousHandSize) {
                    cardElement.classList.add('dealing');
                    // Remove dealing class after animation completes
                    setTimeout(() => {
                        cardElement.classList.remove('dealing');
                        cardElement.style.visibility = 'visible';
                        cardElement.style.opacity = '1';
                    }, 600); // Match the animation duration from CSS
                } else {
                    // For existing cards, make them visible immediately
                    cardElement.style.visibility = 'visible';
                    cardElement.style.opacity = '1';
                }
                
                // Check if this card is in the attack queue
                const queuedAttack = this.attackQueue.find(attack => attack.cardId === cardId);
                if (queuedAttack) {
                    cardElement.classList.add('queued');
                    const targetIndicator = document.createElement('div');
                    targetIndicator.className = 'target-indicator';
                    targetIndicator.textContent = `→ ${queuedAttack.targetEnemy.id}`;
                    cardElement.appendChild(targetIndicator);

                    // Add click handler to remove from queue
                    cardElement.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.removeFromQueue(cardId);
                    });
                } else {
                    cardElement.addEventListener('click', (e) => {
                        e.stopPropagation();
                        console.log('Card clicked:', cardData);
                        
                        if (cardData.type === 'Attack' || cardData.type === 'Magic') {
                            console.log('Starting targeting for attack/magic card');
                            this.startTargeting(cardId);
                        } else {
                            console.log('Playing non-targeting card');
                            this.playCard(cardId, this.enemies[0]);
                        }
                    });
                }
                
                playerHand.appendChild(cardElement);
            }
        });
    }

    updatePileCounts() {
        const drawPileCount = document.querySelector('.draw-pile .pile-count');
        const discardPileCount = document.querySelector('.discard-pile .pile-count');

        if (drawPileCount) {
            drawPileCount.textContent = this.playerDeck.drawPile.length;
        }
        if (discardPileCount) {
            discardPileCount.textContent = this.playerDeck.discardPile.length;
        }
    }

    playCard(cardId, targetEnemy) {
        if (!this.isPlayerTurn) return;

        // Find the card in the player's hand
        const cardIndex = this.playerDeck.hand.findIndex(card => card === cardId);
        if (cardIndex === -1) return;

        // Get the card data
        const cardData = this.cardManager.getCard(cardId);
        if (!cardData) return;

        // Check if player has enough resources
        if (this.playerResource < cardData.cost) {
            this.showResourceNotification(cardData.cost);
            return;
        }

        // Remove card from hand and add to discard pile
        const playedCard = this.playerDeck.hand.splice(cardIndex, 1)[0];
        this.playerDeck.discardPile.push(playedCard);

        // Deduct resource cost (ensure it doesn't go below 0)
        this.playerResource = Math.max(0, this.playerResource - cardData.cost);

        // Apply card effects
        this.applyCardEffects(cardData, targetEnemy);

        // Update the display
        this.updatePlayerHand();
        this.updatePileCounts();
        this.updateHealthBars();
        this.updateResourceBar();
    }

    showResourceNotification(requiredCost) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'resource-notification';
        
        // Set the resource icon based on player class
        const resourceIcon = this.playerClass === 'mage' ? '🔮' : '⚔️';
        const resourceName = this.playerClass === 'mage' ? 'Mana' : 'Rage';
        
        notification.innerHTML = `
            <div class="resource-icon">${resourceIcon}</div>
            <h3>Not Enough ${resourceName}!</h3>
            <p>You need ${requiredCost} ${resourceName.toLowerCase()} to play this card.</p>
            <button class="close-notification">OK</button>
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Show notification with animation
        notification.style.display = 'block';
        
        // Add click handler for close button
        const closeButton = notification.querySelector('.close-notification');
        closeButton.addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    applyCardEffects(cardData, targetEnemy) {
        if (!targetEnemy) return;

        const enemy = this.enemies.find(e => e.id === targetEnemy.id);
        if (!enemy) return;

        if (cardData.type === 'Attack' || cardData.type === 'Magic') {
            // Play attack animation
            if (this.playerCharacter) {
                this.playerCharacter.playAttackAnimation();
            }

            // Wait for attack animation to complete before applying damage
            setTimeout(() => {
                const isDead = enemy.takeDamage(cardData.attack);
                if (isDead) {
                    enemy.destroy();
                    this.enemies = this.enemies.filter(e => e.id !== enemy.id);
                }
                
                // Additional effects for Magic cards
                if (cardData.type === 'Magic') {
                    // Add any additional magic effects here
                    // For example, healing the player or adding defense
                    if (cardData.defense) {
                        this.playerDefense = Math.min(100, this.playerDefense + cardData.defense);
                        this.updateDefenseBar();
                    }
                }
            }, 800); // Wait for attack animation to complete
        } else if (cardData.type === 'Defense') {
            // Handle defense cards
            this.playerDefense = Math.min(100, this.playerDefense + cardData.defense);
            this.updateDefenseBar();
        }
        // Add other card effect types here as needed
    }

    updateHealthBars() {
        const playerHealthBar = document.querySelector('.player-character .health-bar-fill');
        if (playerHealthBar) {
            playerHealthBar.style.width = `${this.playerHealth}%`;
        }

        this.enemies.forEach(enemy => {
            const enemyHealthBar = enemy.element.querySelector('.health-bar-fill');
            if (enemyHealthBar) {
                enemyHealthBar.style.width = `${enemy.health}%`;
            }
        });
    }

    updateDefenseBar() {
        const defenseBar = document.querySelector('.defense-bar-fill');
        const shieldAura = document.querySelector('.shield-aura');
        if (defenseBar) {
            // Convert defense value to percentage (assuming max defense is 100)
            const defensePercentage = (this.playerDefense / 100) * 100;
            defenseBar.style.width = `${defensePercentage}%`;
            
            // Update the defense text if it exists
            const defenseText = document.querySelector('.defense-text');
            if (defenseText) {
                defenseText.textContent = `Defense: ${this.playerDefense}`;
            }

            // Update shield aura
            if (shieldAura) {
                if (this.playerDefense > 0) {
                    shieldAura.classList.add('active');
                } else {
                    shieldAura.classList.remove('active');
                }
            }
        }
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
            this.updatePlayerHand(false); // Not an initial deal
            this.updatePileCounts();
            return card;
        }
        return null;
    }

    shuffleDeck() {
        this.playerDeck.drawPile.sort(() => 0.5 - Math.random());
    }

    updateResourceBar() {
        const resourceBar = document.querySelector('.resource-bar-fill');
        const resourceLabel = document.querySelector('.resource-label');
        
        if (resourceBar) {
            // Show available resources (total minus reserved)
            const availableResource = this.playerResource - this.reservedResource;
            resourceBar.style.width = `${(availableResource / this.maxResource) * 100}%`;
        }
        if (resourceLabel) {
            const resourceName = this.playerClass === 'mage' ? 'Mana' : 'Rage';
            resourceLabel.textContent = `${resourceName}: ${this.playerResource - this.reservedResource} (${this.reservedResource} reserved)`;
        }
    }

    endTurn() {
        if (!this.isPlayerTurn) return;

        this.isPlayerTurn = false;
        const endTurnBtn = document.querySelector('.end-turn-btn');
        if (endTurnBtn) {
            endTurnBtn.disabled = true;
        }

        // Execute queued attacks
        this.executeQueuedAttacks().then(() => {
            // Enemy's turn
            setTimeout(() => {
                this.enemyTurn();
            }, 1000);
        });
    }

    createFireballEffect(sourceElement, targetElement) {
        // Get source and target positions
        const sourceRect = sourceElement.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        
        // Calculate start position (center of player)
        const startX = sourceRect.left + sourceRect.width / 2;
        const startY = sourceRect.top + sourceRect.height / 2;
        
        // Calculate end position (center of enemy)
        const endX = targetRect.left + targetRect.width / 2;
        const endY = targetRect.top + targetRect.height / 2;

        // Create WebGL fireball effect
        this.effectRenderer.createFireballEffect(startX, startY, endX, endY);
    }

    async executeQueuedAttacks() {
        for (const attack of this.attackQueue) {
            const cardData = this.cardManager.getCard(attack.cardId);
            if (!cardData) continue;

            // Remove card from hand and add to discard pile
            const cardIndex = this.playerDeck.hand.findIndex(card => card === attack.cardId);
            if (cardIndex !== -1) {
                const playedCard = this.playerDeck.hand.splice(cardIndex, 1)[0];
                this.playerDeck.discardPile.push(playedCard);
            }

            // Deduct the reserved resource cost
            this.playerResource = Math.max(0, this.playerResource - attack.cost);
            this.reservedResource -= attack.cost;

            // Play attack animation
            if (this.playerCharacter) {
                this.playerCharacter.playAttackAnimation();
            }

            // Wait for attack animation to complete
            await new Promise(resolve => setTimeout(resolve, 800));

            const enemyElement = attack.targetEnemy.element;
            if (enemyElement) {
                if (attack.cardId === 'fireball') {
                    const playerElement = document.querySelector('.player-character');
                    if (playerElement) {
                        // Play fireball sound effect with sfxVolume
                        const fireballSound = new Audio('./assets/Audio/fire1.mp3');
                        fireballSound.volume = this.sfxVolume;
                        fireballSound.play().catch(error => console.log('Error playing fireball sound:', error));
                        
                        this.createFireballEffect(playerElement, enemyElement);
                        
                        // Wait for fireball to reach enemy, then play explosion
                        setTimeout(() => {
                            const explosionSound = new Audio('./assets/Audio/explosion.mp3');
                            explosionSound.volume = this.sfxVolume;
                            explosionSound.play().catch(error => console.log('Error playing explosion sound:', error));
                        }, 400); // Slightly before the fireball animation completes
                        
                        // Wait for fireball animation to complete
                        await new Promise(resolve => setTimeout(resolve, 500));
                    }
                } else if (attack.cardId === 'inferno') {
                    // Create inferno effect for all enemies simultaneously
                    this.enemies.forEach(enemy => {
                        const enemyElement = enemy.element;
                        const enemyRect = enemyElement.getBoundingClientRect();
                        const centerX = enemyRect.left + enemyRect.width / 2;
                        const topY = enemyRect.top;
                        const width = enemyRect.width * 1.5; // Make the pillar wider than the enemy
                        const height = enemyRect.height * 2; // Make the pillar taller than the enemy
                        
                        // Create inferno effect for this enemy
                        this.effectRenderer.createInfernoEffect(centerX, topY, width, height);
                    });
                    // Wait for inferno animation to complete
                    await new Promise(resolve => setTimeout(resolve, 700));
                } else if (attack.cardId === 'meteor_strike') {
                    // Calculate the center position of all enemies
                    let totalX = 0;
                    let totalY = 0;
                    this.enemies.forEach(enemy => {
                        const enemyRect = enemy.element.getBoundingClientRect();
                        totalX += enemyRect.left + enemyRect.width / 2;
                        totalY += enemyRect.top + enemyRect.height / 2;
                    });
                    const centerX = totalX / this.enemies.length;
                    const centerY = totalY / this.enemies.length;
                    
                    // Create meteor effect with sound callback
                    this.effectRenderer.createMeteorEffect(centerX, centerY, () => {
                        const meteorSound = new Audio('./assets/Audio/fire2.mp3');
                        meteorSound.volume = this.sfxVolume;
                        meteorSound.play().catch(error => console.log('Error playing meteor sound:', error));
                    });
                    // Wait for meteor animation to complete
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } else if (attack.cardId === 'blaze_bolt') {
                    // Get player and enemy positions for blaze bolt effect
                    const playerElement = document.querySelector('.player-character');
                    const enemyRect = enemyElement.getBoundingClientRect();
                    if (playerElement) {
                        const playerRect = playerElement.getBoundingClientRect();
                        const startX = playerRect.left + playerRect.width / 2;
                        const startY = playerRect.top + playerRect.height / 2;
                        const endX = enemyRect.left + enemyRect.width / 2;
                        const endY = enemyRect.top + enemyRect.height / 2;
                        
                        // Create blaze bolt effect
                        this.effectRenderer.createFireBoltEffect(startX, startY, endX, endY);
                        // Wait for blaze bolt animation to complete
                        await new Promise(resolve => setTimeout(resolve, 400));
                    }
                } else if (attack.cardId === 'pyroclasm') {
                    // Get player position for pyroclasm effect
                    const playerElement = document.querySelector('.player-character');
                    if (playerElement) {
                        // Play pyroclasm sound effect
                        const pyroclasmSound = new Audio('./assets/Audio/pyo.mp3');
                        pyroclasmSound.volume = this.sfxVolume;
                        pyroclasmSound.play().catch(error => console.log('Error playing pyroclasm sound:', error));

                        const playerRect = playerElement.getBoundingClientRect();
                        const mageX = playerRect.left + playerRect.width / 2;
                        const mageY = playerRect.top + playerRect.height / 2;
                        
                        // Create pyroclasm effect
                        this.effectRenderer.createPyroclasmEffect(mageX, mageY);
                        // Wait for pyroclasm animation to complete
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                } else if (attack.cardId === 'heat_wave') {
                    console.log('Triggering heat wave effect');
                    
                    // Play heat wave sound effect
                    const heatWaveSound = new Audio('./assets/Audio/heatwave.mp3');
                    heatWaveSound.volume = this.sfxVolume;
                    heatWaveSound.play().catch(error => console.log('Error playing heat wave sound:', error));
                    
                    // Fade out after 4 seconds
                    setTimeout(() => {
                        const fadeOutInterval = setInterval(() => {
                            if (heatWaveSound.volume > 0.05) {
                                heatWaveSound.volume -= 0.05;
                            } else {
                                heatWaveSound.pause();
                                clearInterval(fadeOutInterval);
                            }
                        }, 50);
                    }, 4000); // Changed from 3000 to 4000
                    
                    // Create heat wave effect for all enemies simultaneously
                    this.enemies.forEach(enemy => {
                        const enemyElement = enemy.element;
                        const enemyRect = enemyElement.getBoundingClientRect();
                        const targetX = enemyRect.left + enemyRect.width / 2;
                        const targetY = enemyRect.top + enemyRect.height / 2;
                        
                        console.log('Heat wave target position:', targetX, targetY);
                        
                        // Create heat wave effect for this enemy
                        this.effectRenderer.createHeatWaveEffect(targetX, targetY);
                    });
                    
                    // Wait for heat wave animation to complete
                    await new Promise(resolve => setTimeout(resolve, 3900));
                }
            }

            // Apply card effects
            if (attack.cardId === 'heat_wave' || attack.cardId === 'pyroclasm' || attack.cardId === 'meteor_strike') {
                // Apply damage to all enemies for heat wave, pyroclasm, and meteor strike
                for (const enemy of this.enemies) {
                    const isDead = enemy.takeDamage(cardData.attack);
                    if (isDead) {
                        enemy.destroy();
                        this.enemies = this.enemies.filter(e => e.id !== enemy.id);
                    }
                }
            } else {
                // Apply damage to single target for other cards
                const enemy = this.enemies.find(e => e.id === attack.targetEnemy.id);
                if (enemy) {
                    const isDead = enemy.takeDamage(cardData.attack);
                    if (isDead) {
                        enemy.destroy();
                        this.enemies = this.enemies.filter(e => e.id !== enemy.id);
                    }
                }
            }

            if (cardData.type === 'Magic' && cardData.defense) {
                this.playerDefense = Math.min(100, this.playerDefense + cardData.defense);
                this.updateDefenseBar();
            }

            // Update the display
            this.updatePlayerHand();
            this.updatePileCounts();
            this.updateHealthBars();
            this.updateResourceBar();

            // Wait a bit between attacks to make the sequence more visible
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Clear the attack queue and reserved resources
        this.attackQueue = [];
        this.reservedResource = 0;
    }

    enemyTurn() {
        let currentEnemyIndex = 0;

        const processNextEnemy = () => {
            if (currentEnemyIndex >= this.enemies.length) {
                this.startPlayerTurn();
                return;
            }

            const attackingEnemy = this.enemies[currentEnemyIndex];
            const damage = Math.floor(Math.random() * 5) + 1;

            attackingEnemy.playAttackAnimation();
            
            const animationDuration = attackingEnemy.constructor.name === 'FlyingDemon' ? 1200 : 2600;

            if (attackingEnemy.constructor.name === 'Executioner') {
                const handleAttackFrame = (event) => {
                    if (event.detail.enemyId === attackingEnemy.id) {
                        this.soundManager.playSound('axeHit');
                        this.applyEnemyDamage(attackingEnemy, damage);
                    }
                };

                document.addEventListener('enemyAttackFrame', handleAttackFrame);

                setTimeout(() => {
                    document.removeEventListener('enemyAttackFrame', handleAttackFrame);
                    currentEnemyIndex++;
                    processNextEnemy();
                }, animationDuration);
            } else {
                setTimeout(() => {
                    this.applyEnemyDamage(attackingEnemy, damage);
                    currentEnemyIndex++;
                    processNextEnemy();
                }, animationDuration);
            }
        };

        processNextEnemy();
    }

    startPlayerTurn() {
        this.isPlayerTurn = true;
        const endTurnBtn = document.querySelector('.end-turn-btn');
        if (endTurnBtn) {
            endTurnBtn.disabled = false;
        }

        // Update resources for the turn
        if (this.playerClass === 'mage') {
            this.playerResource = 10;
        } else {
            // Warrior gets 4 rage each turn, added to existing rage
            this.playerResource += 4;
        }
        this.updateResourceBar();

        // Store current hand size before drawing new cards
        const currentHandSize = this.playerDeck.hand.length;

        // Draw cards until player has 5 cards, keeping existing cards
        const cardsToDraw = 5 - currentHandSize;
        for (let i = 0; i < cardsToDraw; i++) {
            const card = this.drawCard();
            if (!card) break;
        }

        // Update hand with dealing animation, passing the previous hand size
        this.updatePlayerHand(true, currentHandSize);
    }

    applyEnemyDamage(enemy, damage) {
        let remainingDamage = damage;
        if (this.playerDefense > 0) {
            this.soundManager.playSound('shieldHit');

            if (this.playerDefense >= damage) {
                this.playerDefense -= damage;
                remainingDamage = 0;
                const shieldAura = document.querySelector('.shield-aura');
                if (shieldAura) {
                    shieldAura.classList.add('hit');
                    setTimeout(() => {
                        shieldAura.classList.remove('hit');
                    }, 500);
                }
            } else {
                remainingDamage = damage - this.playerDefense;
                this.playerDefense = 0;
                const shieldAura = document.querySelector('.shield-aura');
                if (shieldAura) {
                    shieldAura.classList.add('hit');
                    setTimeout(() => {
                        shieldAura.classList.remove('hit');
                    }, 500);
                }
            }
        }

        if (remainingDamage > 0) {
            this.playerHealth = Math.max(0, this.playerHealth - remainingDamage);
            if (this.playerCharacter) {
                this.playerCharacter.playHurtAnimation();
                
                if (this.playerClass === 'mage') {
                    const hurtSounds = ['hurt1', 'hurt2', 'hurt3'];
                    const availableSounds = hurtSounds.filter(sound => sound !== this.lastHurtSound);
                    const randomSound = availableSounds[Math.floor(Math.random() * availableSounds.length)];
                    this.lastHurtSound = randomSound;
                    this.soundManager.playSound(randomSound);
                }
            }
        }

        this.updateHealthBars();
        this.updateDefenseBar();

        if (this.playerClass === 'warrior' && remainingDamage > 0) {
            this.playerResource += remainingDamage;
            this.updateResourceBar();
        }

        if (this.playerHealth <= 0) {
            this.endGame();
            return;
        }
    }

    endGame() {
        const winner = this.playerHealth <= 0 ? 'Enemy' : 'Player';
        
        // Create game over modal
        const modal = document.createElement('div');
        modal.className = 'game-over-modal';
        modal.style.display = 'flex';
        
        const content = document.createElement('div');
        content.className = 'game-over-content';
        content.innerHTML = `
            <h2>Game Over!</h2>
            <p>${winner} wins!</p>
            <button class="restart-button">Play Again</button>
        `;
        
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        // Add click handler for restart button
        const restartButton = content.querySelector('.restart-button');
        restartButton.addEventListener('click', () => {
            modal.remove();
            location.reload();
        });
    }

    // Add method to remove a card from the queue
    removeFromQueue(cardId) {
        const attackIndex = this.attackQueue.findIndex(attack => attack.cardId === cardId);
        if (attackIndex !== -1) {
            const attack = this.attackQueue[attackIndex];
            // Return the reserved resources
            this.reservedResource -= attack.cost;
            // Remove from queue
            this.attackQueue.splice(attackIndex, 1);
            // Update the display
            this.updateResourceBar();
            this.updatePlayerHand();
        }
    }

    createDebugMenu() {
        const debugMenu = document.createElement('div');
        debugMenu.style.position = 'fixed';
        debugMenu.style.top = '10px';
        debugMenu.style.right = '10px';
        debugMenu.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        debugMenu.style.padding = '10px';
        debugMenu.style.borderRadius = '5px';
        debugMenu.style.zIndex = '1000';
        debugMenu.style.color = 'white';
        debugMenu.style.fontFamily = 'Arial, sans-serif';
        debugMenu.style.fontSize = '14px';

        // Add debug controls
        const controls = [
            { label: 'Add to Hand', action: () => this.addCardToHand() },
            { label: 'Draw Card', action: () => this.drawCard() },
            { label: 'End Turn', action: () => this.endTurn() },
            { label: 'Toggle AI', action: () => this.toggleAI() }
        ];

        controls.forEach(control => {
            const button = document.createElement('button');
            button.textContent = control.label;
            button.style.display = 'block';
            button.style.width = '100%';
            button.style.margin = '5px 0';
            button.style.padding = '5px';
            button.style.backgroundColor = '#4CAF50';
            button.style.color = 'white';
            button.style.border = 'none';
            button.style.borderRadius = '3px';
            button.style.cursor = 'pointer';
            button.onclick = control.action;
            debugMenu.appendChild(button);
        });

        document.body.appendChild(debugMenu);
    }

    addCardToHand(cardId) {
        if (cardId) {
            // Add the card directly to the player's hand
            this.playerDeck.hand.push(cardId);
            
            // Update the hand display
            this.updatePlayerHand();
            
            // Log the action
            console.log(`Added card ${cardId} to hand`);
        } else {
            console.log('No card selected');
        }
    }

    createPauseMenu() {
        this.pauseMenu = document.createElement('div');
        this.pauseMenu.className = 'pause-menu';
        this.pauseMenu.style.display = 'none';
        
        this.pauseMenu.innerHTML = `
            <div class="pause-content">
                <h2>Pause Menu</h2>
                <div class="volume-controls">
                    <div class="volume-slider">
                        <label for="music-volume">Music Volume</label>
                        <input type="range" id="music-volume" min="0" max="100" value="50">
                    </div>
                    <div class="volume-slider">
                        <label for="sfx-volume">Sound Effects Volume</label>
                        <input type="range" id="sfx-volume" min="0" max="100" value="50">
                    </div>
                </div>
                <button class="resume-button">Resume Game</button>
            </div>
        `;

        // Add event listeners for volume sliders
        const musicSlider = this.pauseMenu.querySelector('#music-volume');
        const sfxSlider = this.pauseMenu.querySelector('#sfx-volume');
        
        musicSlider.addEventListener('input', (e) => {
            this.musicVolume = e.target.value / 100;
            if (this.levelMusic) {
                this.levelMusic.volume = this.musicVolume;
            }
        });

        sfxSlider.addEventListener('input', (e) => {
            this.sfxVolume = e.target.value / 100;
        });

        // Add event listener for resume button
        const resumeButton = this.pauseMenu.querySelector('.resume-button');
        resumeButton.addEventListener('click', () => this.togglePause());

        document.body.appendChild(this.pauseMenu);
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        this.pauseMenu.style.display = this.isPaused ? 'flex' : 'none';
        
        if (this.isPaused) {
            // Pause the game
            if (this.levelMusic) {
                this.levelMusic.pause();
            }
            // Disable game interactions
            this.gameScene.style.pointerEvents = 'none';
        } else {
            // Resume the game
            if (this.levelMusic) {
                this.levelMusic.play();
            }
            // Re-enable game interactions
            this.gameScene.style.pointerEvents = 'auto';
        }
    }
}

// Start the game when the page loads
window.addEventListener('load', async () => {
    try {
        const preloader = new Preloader();
        const loadedAssets = await preloader.loadAllAssets();
        
        // Initialize game with loaded assets
        window.game = new Game();
        window.game.loadedAssets = loadedAssets;
    } catch (error) {
        console.error('Failed to load game assets:', error);
        alert('Failed to load game assets. Please refresh the page.');
    }
}); 