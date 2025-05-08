/**
 * Base Enemy class for handling common enemy functionality
 */
export class Enemy {
    constructor(id, health, spriteSheet) {
        this.id = id;
        this.health = health;
        this.maxHealth = health;
        this.spriteSheet = spriteSheet;
        this.currentFrame = 0;
        this.element = null;
        this.animationInterval = null;
        this.isAttacking = false;
        this.isHurt = false;
        this.originalPosition = null;

        // Preload the sprite sheet
        this.preloadSprite();
    }

    preloadSprite() {
        const img = new Image();
        img.onload = () => {
            console.log('Sprite sheet loaded successfully:', this.spriteSheet);
            if (this.element) {
                const spriteContainer = this.element.querySelector('.enemy-sprite');
                if (spriteContainer) {
                    spriteContainer.style.backgroundImage = `url('${this.spriteSheet}')`;
                }
            }
        };
        img.onerror = () => {
            console.error('Failed to load sprite sheet:', this.spriteSheet);
        };
        img.src = this.spriteSheet;
    }

    createEnemyElement() {
        console.log('Creating enemy element for:', this.spriteSheet);
        const enemyElement = document.createElement('div');
        enemyElement.className = 'enemy-character';
        enemyElement.dataset.enemyId = this.id;
        
        // Create sprite container
        const spriteContainer = document.createElement('div');
        spriteContainer.className = 'enemy-sprite';
        spriteContainer.style.width = `${this.frameWidth * this.scale}px`;
        spriteContainer.style.height = `${this.frameHeight * this.scale}px`;
        spriteContainer.style.backgroundImage = `url('${this.spriteSheet}')`;
        spriteContainer.style.backgroundSize = this.getBackgroundSize();
        spriteContainer.style.backgroundPosition = '0px 0px';
        spriteContainer.style.backgroundRepeat = 'no-repeat';
        spriteContainer.style.transform = this.getTransform();
        
        // Add positioning and transition styles
        spriteContainer.style.position = 'relative';
        spriteContainer.style.left = '0px';
        spriteContainer.style.top = '0px';
        spriteContainer.style.transition = 'left 0.3s ease-out';
        
        // Create stats container
        const statsContainer = document.createElement('div');
        statsContainer.className = 'character-stats';
        statsContainer.innerHTML = `
            <div class="health-text">${this.health}/${this.maxHealth}</div>
            <div class="health-bar">
                <div class="health-bar-fill" style="width: 100%"></div>
            </div>
        `;

        enemyElement.appendChild(spriteContainer);
        enemyElement.appendChild(statsContainer);
        this.element = enemyElement;
        
        // Start animation
        this.startIdleAnimation();
        
        return enemyElement;
    }

    // Abstract methods to be implemented by subclasses
    getBackgroundSize() {
        throw new Error('getBackgroundSize must be implemented by subclass');
    }

    getTransform() {
        throw new Error('getTransform must be implemented by subclass');
    }

    startIdleAnimation() {
        throw new Error('startIdleAnimation must be implemented by subclass');
    }

    playAttackAnimation() {
        throw new Error('playAttackAnimation must be implemented by subclass');
    }

    playHurtAnimation() {
        throw new Error('playHurtAnimation must be implemented by subclass');
    }

    playDeathAnimation() {
        throw new Error('playDeathAnimation must be implemented by subclass');
    }

    updateHealth(newHealth) {
        this.health = Math.max(0, Math.min(newHealth, this.maxHealth));
        if (this.element) {
            const healthBarFill = this.element.querySelector('.health-bar-fill');
            if (healthBarFill) {
                healthBarFill.style.width = `${(this.health / this.maxHealth) * 100}%`;
            }
            const healthText = this.element.querySelector('.health-text');
            if (healthText) {
                healthText.textContent = `${this.health}/${this.maxHealth}`;
            }
        }
    }

    takeDamage(amount) {
        this.updateHealth(this.health - amount);
        this.playHurtAnimation();
        return this.health <= 0;
    }

    destroy() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
        if (this.element) {
            this.playDeathAnimation();
        }
    }

    calculateAttackPosition() {
        const playerElement = document.querySelector('.player-character');
        if (!playerElement) return 0;

        const playerSprite = playerElement.querySelector('.player-sprite');
        if (!playerSprite) return 0;

        const playerRect = playerSprite.getBoundingClientRect();
        const enemyRect = this.element.getBoundingClientRect();

        // Calculate the distance to move to reach the right edge of player's hitbox
        // Player hitbox is 60% of sprite size, centered
        const playerHitboxWidth = playerRect.width * 0.6;
        const playerHitboxRight = playerRect.left + (playerRect.width + playerHitboxWidth) / 2;

        // Calculate how far the enemy needs to move to reach the player's hitbox
        let distanceToMove = playerHitboxRight - enemyRect.right;

        // Add class-specific offset
        if (this.constructor.name === 'Executioner') {
            // Add 100px offset for Executioner to keep it further away
            distanceToMove += 100;
        }

        return distanceToMove;
    }
} 