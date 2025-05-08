import { Enemy } from './enemy.js';

/**
 * Flying Demon enemy class
 * A flying enemy, using the IDLE.png sprite sheet
 * Sprite sheet details: 324x71px, 1 row × 4 columns (4 frames total)
 */
export class FlyingDemon extends Enemy {
    constructor(id, health) {
        super(id, health, './assets/Sprites/Flying Demon/IDLE.png');
        this.attackSpriteSheet = './assets/Sprites/Flying Demon/ATTACK.png';
        this.hurtSpriteSheet = './assets/Sprites/Flying Demon/HURT.png';
        this.deathSpriteSheet = './assets/Sprites/Flying Demon/DEATH.png';
        this.currentFrame = Math.floor(Math.random() * 4);
        this.totalFrames = 4;
        this.frameWidth = 81;
        this.frameHeight = 71;
        this.animationSpeed = 150;
        this.scale = 1.5;
    }

    getBackgroundSize() {
        return '486px 106px'; // 1.5x larger (324*1.5 x 71*1.5)
    }

    getTransform() {
        return 'none';
    }

    startIdleAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }

        this.animationInterval = setInterval(() => {
            this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
            
            if (this.element) {
                const spriteContainer = this.element.querySelector('.enemy-sprite');
                if (spriteContainer) {
                    spriteContainer.style.backgroundImage = `url('${this.spriteSheet}')`;
                    spriteContainer.style.backgroundSize = this.getBackgroundSize();
                    spriteContainer.style.backgroundPosition = `-${this.currentFrame * this.frameWidth * this.scale}px 0px`;
                }
            }
        }, this.animationSpeed);
    }

    playAttackAnimation() {
        this.isAttacking = true;
        this.currentFrame = 0;

        const spriteContainer = this.element.querySelector('.enemy-sprite');
        if (!spriteContainer) return;

        // If we haven't stored the original position yet, store it
        if (!this.originalPosition) {
            this.originalPosition = {
                x: parseInt(spriteContainer.style.left) || 0,
                y: parseInt(spriteContainer.style.top) || 0
            };
            // Calculate and move to attack position based on player's hitbox
            const attackDistance = this.calculateAttackPosition();
            spriteContainer.style.left = `${attackDistance}px`;
            // Wait for movement to complete before starting attack animation
            setTimeout(() => {
                this.currentFrame = 0;
                this.startAttackAnimation();
            }, 300); // Match transition duration
            return;
        }
    }

    startAttackAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }

        this.animationInterval = setInterval(() => {
            if (this.currentFrame < 8) {
                const spriteContainer = this.element.querySelector('.enemy-sprite');
                if (spriteContainer) {
                    spriteContainer.style.backgroundImage = `url('${this.attackSpriteSheet}')`;
                    spriteContainer.style.backgroundSize = '972px 106px';
                    spriteContainer.style.backgroundPosition = `-${this.currentFrame * this.frameWidth * this.scale}px 0px`;
                    this.currentFrame++;
                }
            } else {
                // Return to original position
                const spriteContainer = this.element.querySelector('.enemy-sprite');
                if (spriteContainer && this.originalPosition) {
                    spriteContainer.style.left = `${this.originalPosition.x}px`;
                    // Wait for return movement to complete
                    setTimeout(() => {
                        this.isAttacking = false;
                        this.currentFrame = 0;
                        this.originalPosition = null;
                        this.startIdleAnimation();
                    }, 300); // Match transition duration
                }
            }
        }, this.animationSpeed);
    }

    playHurtAnimation() {
        if (this.isHurt) return;
        
        this.isHurt = true;
        let hurtFrame = 0;
        
        const spriteContainer = this.element.querySelector('.enemy-sprite');
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

        // Set up hurt animation properties
        spriteContainer.style.backgroundImage = `url('${this.hurtSpriteSheet}')`;
        spriteContainer.style.backgroundSize = '486px 106px'; // 1.5x larger (324*1.5 x 71*1.5)
        spriteContainer.style.backgroundPosition = '0px 0px';

        const hurtInterval = setInterval(() => {
            if (hurtFrame >= 4) { // 4 frames total (1 row × 4 columns)
                clearInterval(hurtInterval);
                this.isHurt = false;
                
                // Restore original properties
                spriteContainer.style.backgroundImage = originalSpriteSheet;
                spriteContainer.style.backgroundSize = originalSize;
                spriteContainer.style.backgroundPosition = originalPosition;
                
                // Restart idle animation
                this.startIdleAnimation();
                return;
            }

            spriteContainer.style.backgroundPosition = `-${hurtFrame * this.frameWidth * this.scale}px 0px`;
            hurtFrame++;
        }, 150); // Same speed as idle animation
    }

    playDeathAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }

        const spriteContainer = this.element.querySelector('.enemy-sprite');
        if (!spriteContainer) return;

        // Store original properties
        const originalSpriteSheet = spriteContainer.style.backgroundImage;
        const originalPosition = spriteContainer.style.backgroundPosition;
        const originalSize = spriteContainer.style.backgroundSize;

        // Set up death animation properties
        spriteContainer.style.backgroundImage = `url('${this.deathSpriteSheet}')`;
        spriteContainer.style.backgroundSize = '972px 106px'; // 1.5x larger (648*1.5 x 71*1.5)
        spriteContainer.style.backgroundPosition = '0px 0px';

        let deathFrame = 0;
        const totalDeathFrames = 7; // 7 frames in death animation
        const deathFrameWidth = 92.57; // 648px / 7 frames

        const deathInterval = setInterval(() => {
            if (deathFrame >= totalDeathFrames) {
                clearInterval(deathInterval);
                this.element.remove();
                return;
            }

            spriteContainer.style.backgroundPosition = `-${deathFrame * deathFrameWidth * this.scale}px 0px`;
            deathFrame++;
        }, 150); // Same speed as other animations
    }
} 