export class Mage {
    constructor() {
        this.health = 100;
        this.defense = 0;
        this.resource = 0;
        this.maxResource = 10;
        this.spriteSheet = './assets/Sprites/Wizard/Idle.png';
        this.frameWidth = 100; // Even smaller than before (was 120px)
        this.frameHeight = 100; // Even smaller than before (was 120px)
        this.totalFrames = 6; // 6 frames in the idle sprite sheet
        this.attackSpriteSheets = [
            './assets/Sprites/Wizard/Attack1.png',
            './assets/Sprites/Wizard/Attack2.png'
        ];
        this.hurtSpriteSheet = './assets/Sprites/Wizard/Hit.png';
        this.hurtFrameWidth = 231; // 924/4 for the hit sprite sheet
        this.hurtFrameHeight = 190;
        this.hurtTotalFrames = 4;
        this.currentFrame = 0;
        this.animationSpeed = 100; // milliseconds per frame
        this.element = null;
        this.animationInterval = null;
        this.isAttacking = false;
        this.isHurt = false;
        this.currentAttackIndex = 0;
        this.deck = [
            'fireball', 'meteor_strike', 'inferno', 'flame_burst',
            'fireball', 'meteor_strike', 'inferno', 'flame_burst',
            'fireball', 'meteor_strike', 'inferno', 'flame_burst',
            'fireball', 'meteor_strike', 'inferno', 'flame_burst',
            'fireball', 'meteor_strike', 'inferno', 'flame_burst',
            'fireball', 'meteor_strike', 'inferno', 'flame_burst',
            'fireball', 'meteor_strike', 'inferno', 'flame_burst',
            'fireball', 'meteor_strike', 'inferno', 'flame_burst',
            'fireball', 'meteor_strike', 'inferno', 'flame_burst',
            'fireball', 'meteor_strike', 'inferno', 'flame_burst'
        ];
    }

    createPlayerElement() {
        const playerElement = document.createElement('div');
        playerElement.className = 'player-character';
        playerElement.style.position = 'relative'; // Add relative positioning to parent
        
        // Create sprite container
        const spriteContainer = document.createElement('div');
        spriteContainer.className = 'player-sprite';
        spriteContainer.style.width = `${this.frameWidth * 4}px`; // 4x larger
        spriteContainer.style.height = `${this.frameHeight * 4}px`; // 4x larger
        spriteContainer.style.backgroundImage = `url(${this.spriteSheet})`;
        spriteContainer.style.position = 'absolute'; // Keep absolute positioning
        spriteContainer.style.left = '50%'; // Center horizontally
        spriteContainer.style.top = '50%'; // Center vertically
        spriteContainer.style.transform = 'translate(-50%, -50%)'; // Center the sprite
        
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
        const spriteContainer = this.element.querySelector('.player-sprite');
        if (!spriteContainer) return;

        const attackSpriteSheet = this.attackSpriteSheets[this.currentAttackIndex];
        const attackFrameWidth = 231; // 1848/8 for both attacks
        const attackFrameHeight = 190; // Height of each frame
        const totalAttackFrames = 8; // 8 frames in both attack animations
        let currentAttackFrame = 0;

        // Store original properties
        const originalSpriteSheet = spriteContainer.style.backgroundImage;
        const originalPosition = spriteContainer.style.backgroundPosition;
        const originalSize = spriteContainer.style.backgroundSize;

        // Set the attack sprite sheet
        spriteContainer.style.backgroundImage = `url(${attackSpriteSheet})`;
        
        // Calculate the scaled dimensions
        const scaleX = 2;  // Scale factor for width
        const scaleY = 2;  // Scale factor for height
        
        // Calculate the scaled dimensions for the entire sprite sheet
        const scaledWidth = 1848 * scaleX;  // Total width of sprite sheet
        const scaledHeight = 190 * scaleY;  // Height of sprite sheet
        
        // Calculate the container dimensions
        const containerWidth = this.frameWidth * 4;  // Original container width
        const containerHeight = this.frameHeight * 4; // Original container height
        
        // Calculate the offsets to center the sprite
        const horizontalOffset = (containerWidth - (attackFrameWidth * scaleX)) / 2;
        const verticalOffset = ((containerHeight - (attackFrameHeight * scaleY)) / 2) + 5; // Reduced to 5px downward offset
        
        // Set background size for the attack animation
        spriteContainer.style.backgroundSize = `${scaledWidth}px ${scaledHeight}px`;
        
        // Set initial position with offsets to center the sprite
        spriteContainer.style.backgroundPosition = `${horizontalOffset}px ${verticalOffset}px`;

        const attackInterval = setInterval(() => {
            if (currentAttackFrame >= totalAttackFrames) {
                clearInterval(attackInterval);
                this.isAttacking = false;
                this.currentAttackIndex = (this.currentAttackIndex + 1) % this.attackSpriteSheets.length;
                
                // Reset to idle animation
                spriteContainer.style.backgroundImage = originalSpriteSheet;
                spriteContainer.style.backgroundSize = originalSize;
                spriteContainer.style.backgroundPosition = originalPosition;
                
                // Restart idle animation
                this.startAnimation();
                return;
            }

            // Calculate the background position for the current frame, maintaining both offsets
            const frameOffset = currentAttackFrame * attackFrameWidth * scaleX;
            spriteContainer.style.backgroundPosition = `${horizontalOffset - frameOffset}px ${verticalOffset}px`;
            currentAttackFrame++;
        }, 150); // Faster animation for attacks
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

        // Store original properties
        const originalSpriteSheet = spriteContainer.style.backgroundImage;
        const originalPosition = spriteContainer.style.backgroundPosition;
        const originalSize = spriteContainer.style.backgroundSize;

        // Set up hurt animation properties
        spriteContainer.style.backgroundImage = `url(${this.hurtSpriteSheet})`;
        
        // Use different scales for horizontal and vertical
        const scaleX = 1.75;  // Precise horizontal scale
        const scaleY = 2.1;   // Precise vertical scale
        
        // Calculate the scaled dimensions
        const scaledWidth = 924 * scaleX;
        const scaledHeight = 190 * scaleY;
        
        // Calculate offsets to center the sprite
        const containerWidth = this.frameWidth * 4;  // Original container width
        const containerHeight = this.frameHeight * 4; // Original container height
        const verticalOffset = (containerHeight - scaledHeight) / 2;
        const horizontalOffset = (containerWidth - (231 * scaleX)) / 2;
        
        // Set background size for the hurt animation
        spriteContainer.style.backgroundSize = `${scaledWidth}px ${scaledHeight}px`;
        spriteContainer.style.backgroundPosition = `${horizontalOffset}px ${verticalOffset}px`;

        const hurtInterval = setInterval(() => {
            if (hurtFrame >= this.hurtTotalFrames) {
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

            spriteContainer.style.backgroundPosition = `${horizontalOffset - (hurtFrame * 231 * scaleX)}px ${verticalOffset}px`;
            hurtFrame++;
        }, 150); // 150ms per frame for hurt animation
    }

    getDeck() {
        const deck = {
            hand: [],
            drawPile: [],
            discardPile: []
        };

        // Add Fireball to hand first for Fire Mage
        if (this.element === 'fire') {
            deck.hand.push('fireball');
        }

        // Add remaining cards to draw pile
        const allCards = [
            // Ice Mage Cards
            'ice_shield', 'frost_wall', 'frozen_heart', 'ice_barrier', 'frost_ward',
            'frost_nova', 'blizzard', 'ice_spike', 'frost_bite', 'winter_wind',
            'cold_snap', 'ice_lance', 'frost_bolt', 'snow_blast', 'glacial_strike',
            
            // Lightning Mage Cards
            'static_shield', 'thunder_wall', 'storm_barrier', 'lightning_ward', 'storm_guard',
            'lightning_bolt', 'thunder_strike', 'chain_lightning', 'storm_cloud', 'electric_surge',
            'thunder_clap', 'lightning_rod', 'static_field', 'storm_bolt', 'thunder_blast',
            
            // Fire Mage Cards
            'flame_shield', 'fire_wall', 'inferno_barrier', 'blaze_ward', 'ember_guard',
            'fireball', 'meteor_strike', 'inferno', 'flame_burst', 'pyroclasm',
            'molten_strike', 'blaze_bolt', 'heat_wave', 'infernal_blast'
        ];

        // Filter cards based on element
        const elementCards = allCards.filter(card => {
            if (this.element === 'ice') {
                return card.startsWith('ice_') || card.startsWith('frost_') || 
                       card.startsWith('blizzard') || card.startsWith('winter_') || 
                       card.startsWith('cold_') || card.startsWith('snow_') || 
                       card.startsWith('glacial_');
            } else if (this.element === 'lightning') {
                return card.startsWith('static_') || card.startsWith('thunder_') || 
                       card.startsWith('storm_') || card.startsWith('lightning_') || 
                       card.startsWith('electric_') || card.startsWith('chain_');
            } else if (this.element === 'fire') {
                return card.startsWith('flame_') || card.startsWith('fire_') || 
                       card.startsWith('inferno_') || card.startsWith('blaze_') || 
                       card.startsWith('ember_') || card.startsWith('meteor_') || 
                       card.startsWith('pyroclasm') || card.startsWith('molten_') || 
                       card.startsWith('heat_') || card.startsWith('infernal_');
            }
            return false;
        });

        // Add remaining cards to draw pile
        deck.drawPile = elementCards.filter(card => !deck.hand.includes(card));

        // Shuffle the draw pile
        for (let i = deck.drawPile.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck.drawPile[i], deck.drawPile[j]] = [deck.drawPile[j], deck.drawPile[i]];
        }

        // Draw 4 more cards to complete the starting hand
        for (let i = 0; i < 4; i++) {
            if (deck.drawPile.length > 0) {
                deck.hand.push(deck.drawPile.pop());
            }
        }

        return deck;
    }
} 