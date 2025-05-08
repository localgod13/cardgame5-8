export class Warrior {
    constructor() {
        this.health = 100;
        this.defense = 0;
        this.resource = 0;
        this.maxResource = 100;
        this.spriteSheet = './assets/Sprites/Warrior/Idle.png';
        this.attackSpriteSheets = [
            './assets/Sprites/Warrior/Attack1.png',
            './assets/Sprites/Warrior/Attack2.png',
            './assets/Sprites/Warrior/Attack3.png'
        ];
        this.hurtSpriteSheets = [
            './assets/Sprites/Warrior/hurt1.png',
            './assets/Sprites/Warrior/hurt2.png',
            './assets/Sprites/Warrior/hurt3.png'
        ];
    }

    // Add methods specific to Warrior here
    // For example:
    // playAttackAnimation() { ... }
    // playHurtAnimation() { ... }
} 