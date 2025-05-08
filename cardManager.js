/**
 * Card Manager Class
 * 
 * Card Layout Structure:
 * - Card Art: Full card background image from assets/Images/{type}.png
 * - Card Name: Centered at the top, colored based on type
 * - Stats: Three centered columns showing ATK, DEF, and COST
 * - Description: At the bottom of the card
 * 
 * Card Types:
 * - Attack (Red border)
 * - Defense (Green border)
 * - Magic (Blue border)
 * 
 * When adding new cards, follow this structure:
 * {
 *     id: 'unique_id',          // Unique identifier for the card
 *     name: 'Card Name',        // Display name of the card
 *     type: 'Attack|Defense|Magic', // Card type (must match image name)
 *     attack: number,           // Attack value
 *     defense: number,          // Defense value
 *     cost: number,            // Cost value
 *     description: 'string'     // Card description
 * }
 */
export class CardManager {
    constructor() {
        this.cards = new Map();
        this.initializeCards();
    }

    initializeCards() {
        // Attack Type Cards
        this.addCard({
            id: 'sword_strike',
            name: 'Sword Strike',
            type: 'Attack',
            attack: 6,
            defense: 0,
            cost: 2,
            description: 'A powerful sword attack'
        });

        this.addCard({
            id: 'double_slash',
            name: 'Double Slash',
            type: 'Attack',
            attack: 8,
            defense: 0,
            cost: 3,
            description: 'Two quick sword strikes'
        });

        // New Attack Cards
        this.addCard({
            id: 'critical_hit',
            name: 'Critical Hit',
            type: 'Attack',
            attack: 12,
            defense: 0,
            cost: 4,
            description: 'High risk, high reward attack'
        });

        this.addCard({
            id: 'quick_strike',
            name: 'Quick Strike',
            type: 'Attack',
            attack: 4,
            defense: 0,
            cost: 1,
            description: 'Fast but weak attack'
        });

        this.addCard({
            id: 'whirlwind',
            name: 'Whirlwind',
            type: 'Attack',
            attack: 7,
            defense: 0,
            cost: 3,
            description: 'Spinning attack that hits multiple times'
        });

        this.addCard({
            id: 'backstab',
            name: 'Backstab',
            type: 'Attack',
            attack: 10,
            defense: 0,
            cost: 3,
            description: 'Sneak attack from behind'
        });

        this.addCard({
            id: 'berserker_rage',
            name: 'Berserker Rage',
            type: 'Attack',
            attack: 15,
            defense: -5,
            cost: 4,
            description: 'Powerful attack that weakens defense'
        });

        this.addCard({
            id: 'precision_strike',
            name: 'Precision Strike',
            type: 'Attack',
            attack: 9,
            defense: 0,
            cost: 3,
            description: 'Accurate attack that never misses'
        });

        this.addCard({
            id: 'combo_strike',
            name: 'Combo Strike',
            type: 'Attack',
            attack: 5,
            defense: 0,
            cost: 2,
            description: 'Chain of quick attacks'
        });

        this.addCard({
            id: 'heavy_slash',
            name: 'Heavy Slash',
            type: 'Attack',
            attack: 11,
            defense: 0,
            cost: 4,
            description: 'Slow but powerful attack'
        });

        this.addCard({
            id: 'counter_strike',
            name: 'Counter Strike',
            type: 'Attack',
            attack: 8,
            defense: 2,
            cost: 3,
            description: 'Attack while defending'
        });

        this.addCard({
            id: 'flurry_of_blows',
            name: 'Flurry of Blows',
            type: 'Attack',
            attack: 6,
            defense: 0,
            cost: 2,
            description: 'Multiple rapid strikes'
        });

        this.addCard({
            id: 'power_surge',
            name: 'Power Surge',
            type: 'Attack',
            attack: 13,
            defense: 0,
            cost: 5,
            description: 'Channel energy into a powerful strike'
        });

        this.addCard({
            id: 'shadow_strike',
            name: 'Shadow Strike',
            type: 'Attack',
            attack: 7,
            defense: 0,
            cost: 2,
            description: 'Attack from the shadows'
        });

        this.addCard({
            id: 'dragon_fang',
            name: 'Dragon Fang',
            type: 'Attack',
            attack: 14,
            defense: 0,
            cost: 5,
            description: 'Ancient dragon technique'
        });

        this.addCard({
            id: 'blade_dance',
            name: 'Blade Dance',
            type: 'Attack',
            attack: 9,
            defense: 1,
            cost: 3,
            description: 'Graceful but deadly attack'
        });

        this.addCard({
            id: 'thunder_strike',
            name: 'Thunder Strike',
            type: 'Attack',
            attack: 10,
            defense: 0,
            cost: 4,
            description: 'Lightning-fast attack'
        });

        this.addCard({
            id: 'soul_rend',
            name: 'Soul Rend',
            type: 'Attack',
            attack: 12,
            defense: 0,
            cost: 4,
            description: 'Attack that damages the soul'
        });

        this.addCard({
            id: 'cross_slash',
            name: 'Cross Slash',
            type: 'Attack',
            attack: 8,
            defense: 0,
            cost: 3,
            description: 'Cross-shaped slash attack'
        });

        this.addCard({
            id: 'final_strike',
            name: 'Final Strike',
            type: 'Attack',
            attack: 20,
            defense: 0,
            cost: 6,
            description: 'Ultimate attack technique'
        });

        // Defense Type Cards
        this.addCard({
            id: 'shield_block',
            name: 'Shield Block',
            type: 'Defense',
            attack: 0,
            defense: 5,
            cost: 2,
            description: 'Block incoming damage'
        });

        this.addCard({
            id: 'iron_wall',
            name: 'Iron Wall',
            type: 'Defense',
            attack: 0,
            defense: 8,
            cost: 3,
            description: 'Create a strong defensive barrier'
        });

        // New Defense Cards
        this.addCard({
            id: 'mirror_shield',
            name: 'Mirror Shield',
            type: 'Defense',
            attack: 3,
            defense: 6,
            cost: 3,
            description: 'Reflect some damage back'
        });

        this.addCard({
            id: 'energy_barrier',
            name: 'Energy Barrier',
            type: 'Defense',
            attack: 0,
            defense: 10,
            cost: 4,
            description: 'Create a powerful energy shield'
        });

        this.addCard({
            id: 'counter_stance',
            name: 'Counter Stance',
            type: 'Defense',
            attack: 4,
            defense: 7,
            cost: 3,
            description: 'Defensive stance that allows counter-attacks'
        });

        this.addCard({
            id: 'healing_ward',
            name: 'Healing Ward',
            type: 'Defense',
            attack: 0,
            defense: 5,
            cost: 2,
            description: 'Ward that heals over time'
        });

        this.addCard({
            id: 'stone_skin',
            name: 'Stone Skin',
            type: 'Defense',
            attack: 0,
            defense: 12,
            cost: 4,
            description: 'Turn skin to stone for protection'
        });

        this.addCard({
            id: 'dodge_roll',
            name: 'Dodge Roll',
            type: 'Defense',
            attack: 0,
            defense: 4,
            cost: 1,
            description: 'Quick dodge to avoid damage'
        });

        this.addCard({
            id: 'guardian_spirit',
            name: 'Guardian Spirit',
            type: 'Defense',
            attack: 2,
            defense: 9,
            cost: 4,
            description: 'Spiritual guardian protects you'
        });

        this.addCard({
            id: 'ice_armor',
            name: 'Ice Armor',
            type: 'Defense',
            attack: 0,
            defense: 8,
            cost: 3,
            description: 'Protective layer of ice'
        });

        this.addCard({
            id: 'regeneration',
            name: 'Regeneration',
            type: 'Defense',
            attack: 0,
            defense: 6,
            cost: 2,
            description: 'Heal over time'
        });

        this.addCard({
            id: 'fortify',
            name: 'Fortify',
            type: 'Defense',
            attack: 0,
            defense: 15,
            cost: 5,
            description: 'Significantly increase defense'
        });

        this.addCard({
            id: 'shield_wall',
            name: 'Shield Wall',
            type: 'Defense',
            attack: 0,
            defense: 11,
            cost: 4,
            description: 'Create an impenetrable wall of shields'
        });

        this.addCard({
            id: 'deflection',
            name: 'Deflection',
            type: 'Defense',
            attack: 5,
            defense: 7,
            cost: 3,
            description: 'Deflect incoming attacks'
        });

        this.addCard({
            id: 'sacred_guard',
            name: 'Sacred Guard',
            type: 'Defense',
            attack: 0,
            defense: 9,
            cost: 3,
            description: 'Divine protection'
        });

        this.addCard({
            id: 'adamantine_skin',
            name: 'Adamantine Skin',
            type: 'Defense',
            attack: 0,
            defense: 13,
            cost: 5,
            description: 'Skin as hard as adamantine'
        });

        this.addCard({
            id: 'warding_light',
            name: 'Warding Light',
            type: 'Defense',
            attack: 0,
            defense: 7,
            cost: 2,
            description: 'Protective light barrier'
        });

        this.addCard({
            id: 'earth_shield',
            name: 'Earth Shield',
            type: 'Defense',
            attack: 0,
            defense: 10,
            cost: 4,
            description: 'Shield made of solid earth'
        });

        this.addCard({
            id: 'dragon_scale',
            name: 'Dragon Scale',
            type: 'Defense',
            attack: 0,
            defense: 14,
            cost: 5,
            description: 'Protection of dragon scales'
        });

        this.addCard({
            id: 'immortal_guard',
            name: 'Immortal Guard',
            type: 'Defense',
            attack: 0,
            defense: 16,
            cost: 6,
            description: 'Ultimate defensive technique'
        });

        // Magic Type Cards
        this.addCard({
            id: 'fireball',
            name: 'Fireball',
            type: 'Magic',
            attack: 7,
            defense: 0,
            cost: 2,
            description: 'Launch a ball of fire'
        });

        this.addCard({
            id: 'ice_shield',
            name: 'Ice Shield',
            type: 'Magic',
            attack: 0,
            defense: 6,
            cost: 1,
            description: 'Create a shield of ice'
        });

        // New Magic Cards
        this.addCard({
            id: 'arcane_blast',
            name: 'Arcane Blast',
            type: 'Magic',
            attack: 8,
            defense: 0,
            cost: 2,
            description: 'Pure arcane energy attack'
        });

        this.addCard({
            id: 'healing_wave',
            name: 'Healing Wave',
            type: 'Magic',
            attack: 0,
            defense: 8,
            cost: 2,
            description: 'Wave of healing energy'
        });

        this.addCard({
            id: 'lightning_bolt',
            name: 'Lightning Bolt',
            type: 'Magic',
            attack: 10,
            defense: 0,
            cost: 3,
            description: 'Channel lightning through your hands'
        });

        this.addCard({
            id: 'frost_nova',
            name: 'Frost Nova',
            type: 'Magic',
            attack: 6,
            defense: 4,
            cost: 2,
            description: 'Explosion of frost energy'
        });

        this.addCard({
            id: 'arcane_barrier',
            name: 'Arcane Barrier',
            type: 'Magic',
            attack: 0,
            defense: 9,
            cost: 2,
            description: 'Barrier of pure magic'
        });

        this.addCard({
            id: 'mind_blast',
            name: 'Mind Blast',
            type: 'Magic',
            attack: 9,
            defense: 0,
            cost: 2,
            description: 'Psychic attack on the mind'
        });

        this.addCard({
            id: 'nature_bond',
            name: 'Nature Bond',
            type: 'Magic',
            attack: 0,
            defense: 7,
            cost: 1,
            description: 'Bond with nature for protection'
        });

        this.addCard({
            id: 'chaos_bolt',
            name: 'Chaos Bolt',
            type: 'Magic',
            attack: 12,
            defense: 0,
            cost: 3,
            description: 'Unpredictable chaotic energy'
        });

        this.addCard({
            id: 'time_warp',
            name: 'Time Warp',
            type: 'Magic',
            attack: 5,
            defense: 5,
            cost: 2,
            description: 'Manipulate time for advantage'
        });

        this.addCard({
            id: 'soul_heal',
            name: 'Soul Heal',
            type: 'Magic',
            attack: 0,
            defense: 10,
            cost: 3,
            description: 'Heal the soul and body'
        });

        this.addCard({
            id: 'shadow_bolt',
            name: 'Shadow Bolt',
            type: 'Magic',
            attack: 11,
            defense: 0,
            cost: 3,
            description: 'Dark energy projectile'
        });

        this.addCard({
            id: 'arcane_explosion',
            name: 'Arcane Explosion',
            type: 'Magic',
            attack: 13,
            defense: 0,
            cost: 4,
            description: 'Explosion of pure magic'
        });

        this.addCard({
            id: 'divine_shield',
            name: 'Divine Shield',
            type: 'Magic',
            attack: 0,
            defense: 12,
            cost: 3,
            description: 'Shield blessed by the divine'
        });

        this.addCard({
            id: 'frost_shield',
            name: 'Frost Shield',
            type: 'Magic',
            attack: 0,
            defense: 8,
            cost: 2,
            description: 'Protective layer of frost'
        });

        this.addCard({
            id: 'void_bolt',
            name: 'Void Bolt',
            type: 'Magic',
            attack: 14,
            defense: 0,
            cost: 4,
            description: 'Attack from the void'
        });

        this.addCard({
            id: 'nature_wrath',
            name: 'Nature Wrath',
            type: 'Magic',
            attack: 9,
            defense: 3,
            cost: 3,
            description: 'Nature strikes back'
        });

        this.addCard({
            id: 'arcane_missiles',
            name: 'Arcane Missiles',
            type: 'Magic',
            attack: 7,
            defense: 0,
            cost: 1,
            description: 'Multiple arcane projectiles'
        });

        this.addCard({
            id: 'holy_light',
            name: 'Holy Light',
            type: 'Magic',
            attack: 0,
            defense: 11,
            cost: 3,
            description: 'Blessed healing light'
        });

        this.addCard({
            id: 'meteor_strike',
            name: 'Meteor Strike',
            type: 'Magic',
            attack: 15,
            defense: 0,
            cost: 5,
            description: 'Call down a meteor from the sky'
        });

        this.addCard({
            id: 'time_stop',
            name: 'Time Stop',
            type: 'Magic',
            attack: 8,
            defense: 8,
            cost: 4,
            description: 'Stop time itself'
        });

        // Ice Spells
        this.addCard({
            id: 'frost_nova',
            name: 'Frost Nova',
            type: 'Magic',
            attack: 6,
            defense: 4,
            cost: 2,
            description: 'Explosion of frost energy'
        });

        this.addCard({
            id: 'ice_shield',
            name: 'Ice Shield',
            type: 'Magic',
            attack: 0,
            defense: 8,
            cost: 2,
            description: 'Protective layer of ice'
        });

        this.addCard({
            id: 'frost_shield',
            name: 'Frost Shield',
            type: 'Magic',
            attack: 0,
            defense: 7,
            cost: 2,
            description: 'Shield of frost energy'
        });

        this.addCard({
            id: 'ice_armor',
            name: 'Ice Armor',
            type: 'Magic',
            attack: 0,
            defense: 9,
            cost: 3,
            description: 'Armor made of solid ice'
        });

        this.addCard({
            id: 'blizzard',
            name: 'Blizzard',
            type: 'Magic',
            attack: 8,
            defense: 0,
            cost: 3,
            description: 'Fierce snowstorm attack'
        });

        this.addCard({
            id: 'frozen_heart',
            name: 'Frozen Heart',
            type: 'Magic',
            attack: 0,
            defense: 10,
            cost: 3,
            description: 'Heart of ice protects you'
        });

        this.addCard({
            id: 'ice_barrier',
            name: 'Ice Barrier',
            type: 'Magic',
            attack: 0,
            defense: 12,
            cost: 4,
            description: 'Barrier of solid ice'
        });

        this.addCard({
            id: 'frost_bite',
            name: 'Frost Bite',
            type: 'Magic',
            attack: 7,
            defense: 0,
            cost: 2,
            description: 'Biting cold attack'
        });

        this.addCard({
            id: 'winter_wind',
            name: 'Winter Wind',
            type: 'Magic',
            attack: 5,
            defense: 3,
            cost: 2,
            description: 'Chilling wind attack'
        });

        this.addCard({
            id: 'snow_globe',
            name: 'Snow Globe',
            type: 'Magic',
            attack: 0,
            defense: 11,
            cost: 3,
            description: 'Protective sphere of snow'
        });

        this.addCard({
            id: 'ice_spike',
            name: 'Ice Spike',
            type: 'Magic',
            attack: 9,
            defense: 0,
            cost: 3,
            description: 'Piercing ice projectile'
        });

        this.addCard({
            id: 'frozen_ground',
            name: 'Frozen Ground',
            type: 'Magic',
            attack: 4,
            defense: 6,
            cost: 2,
            description: 'Freeze the ground for protection'
        });

        this.addCard({
            id: 'cold_snap',
            name: 'Cold Snap',
            type: 'Magic',
            attack: 10,
            defense: 0,
            cost: 3,
            description: 'Sudden burst of cold'
        });

        this.addCard({
            id: 'frost_ward',
            name: 'Frost Ward',
            type: 'Magic',
            attack: 0,
            defense: 8,
            cost: 2,
            description: 'Ward of frost energy'
        });

        this.addCard({
            id: 'winter_embrace',
            name: 'Winter Embrace',
            type: 'Magic',
            attack: 0,
            defense: 13,
            cost: 4,
            description: 'Embrace of winter protects you'
        });

        // Lightning Spells
        this.addCard({
            id: 'lightning_bolt',
            name: 'Lightning Bolt',
            type: 'Magic',
            attack: 10,
            defense: 0,
            cost: 3,
            description: 'Channel lightning through your hands'
        });

        this.addCard({
            id: 'thunder_strike',
            name: 'Thunder Strike',
            type: 'Magic',
            attack: 12,
            defense: 0,
            cost: 4,
            description: 'Powerful thunder attack'
        });

        this.addCard({
            id: 'static_shield',
            name: 'Static Shield',
            type: 'Magic',
            attack: 0,
            defense: 8,
            cost: 2,
            description: 'Shield of static electricity'
        });

        this.addCard({
            id: 'chain_lightning',
            name: 'Chain Lightning',
            type: 'Magic',
            attack: 8,
            defense: 0,
            cost: 3,
            description: 'Lightning that chains between targets'
        });

        this.addCard({
            id: 'thunder_clap',
            name: 'Thunder Clap',
            type: 'Magic',
            attack: 7,
            defense: 3,
            cost: 2,
            description: 'Thunderous shockwave'
        });

        this.addCard({
            id: 'lightning_barrier',
            name: 'Lightning Barrier',
            type: 'Magic',
            attack: 0,
            defense: 10,
            cost: 3,
            description: 'Barrier of lightning energy'
        });

        this.addCard({
            id: 'storm_cloud',
            name: 'Storm Cloud',
            type: 'Magic',
            attack: 6,
            defense: 4,
            cost: 2,
            description: 'Summon a storm cloud'
        });

        this.addCard({
            id: 'electric_surge',
            name: 'Electric Surge',
            type: 'Magic',
            attack: 9,
            defense: 0,
            cost: 3,
            description: 'Surge of electric energy'
        });

        this.addCard({
            id: 'thunder_ward',
            name: 'Thunder Ward',
            type: 'Magic',
            attack: 0,
            defense: 9,
            cost: 3,
            description: 'Ward of thunder energy'
        });

        this.addCard({
            id: 'lightning_rod',
            name: 'Lightning Rod',
            type: 'Magic',
            attack: 11,
            defense: 0,
            cost: 4,
            description: 'Channel lightning through a rod'
        });

        this.addCard({
            id: 'static_field',
            name: 'Static Field',
            type: 'Magic',
            attack: 5,
            defense: 5,
            cost: 2,
            description: 'Field of static electricity'
        });

        this.addCard({
            id: 'thunder_guard',
            name: 'Thunder Guard',
            type: 'Magic',
            attack: 0,
            defense: 11,
            cost: 3,
            description: 'Guardian of thunder'
        });

        this.addCard({
            id: 'storm_shield',
            name: 'Storm Shield',
            type: 'Magic',
            attack: 0,
            defense: 12,
            cost: 4,
            description: 'Shield of storm energy'
        });

        this.addCard({
            id: 'lightning_armor',
            name: 'Lightning Armor',
            type: 'Magic',
            attack: 0,
            defense: 10,
            cost: 3,
            description: 'Armor of lightning energy'
        });

        this.addCard({
            id: 'thunder_guardian',
            name: 'Thunder Guardian',
            type: 'Magic',
            attack: 0,
            defense: 13,
            cost: 4,
            description: 'Guardian of thunder energy'
        });

        // Fire Spells
        this.addCard({
            id: 'fireball',
            name: 'Fireball',
            type: 'Magic',
            attack: 7,
            defense: 0,
            cost: 2,
            description: 'Launch a ball of fire'
        });

        this.addCard({
            id: 'meteor_strike',
            name: 'Meteor Strike',
            type: 'Magic',
            attack: 15,
            defense: 0,
            cost: 5,
            description: 'Call down a meteor from the sky'
        });

        this.addCard({
            id: 'flame_shield',
            name: 'Flame Shield',
            type: 'Magic',
            attack: 0,
            defense: 8,
            cost: 2,
            description: 'Shield of flames'
        });

        this.addCard({
            id: 'inferno',
            name: 'Inferno',
            type: 'Magic',
            attack: 12,
            defense: 0,
            cost: 4,
            description: 'Massive fire attack'
        });

        this.addCard({
            id: 'fire_wall',
            name: 'Fire Wall',
            type: 'Magic',
            attack: 6,
            defense: 6,
            cost: 3,
            description: 'Wall of fire'
        });

        this.addCard({
            id: 'molten_armor',
            name: 'Molten Armor',
            type: 'Magic',
            attack: 0,
            defense: 11,
            cost: 3,
            description: 'Armor of molten lava'
        });

        this.addCard({
            id: 'flame_ward',
            name: 'Flame Ward',
            type: 'Magic',
            attack: 0,
            defense: 9,
            cost: 3,
            description: 'Ward of flame energy'
        });

        this.addCard({
            id: 'fire_barrier',
            name: 'Fire Barrier',
            type: 'Magic',
            attack: 0,
            defense: 10,
            cost: 3,
            description: 'Barrier of fire'
        });

        this.addCard({
            id: 'heat_wave',
            name: 'Heat Wave',
            type: 'Magic',
            attack: 8,
            defense: 0,
            cost: 3,
            description: 'Wave of intense heat'
        });

        this.addCard({
            id: 'pyroclasm',
            name: 'Pyroclasm',
            type: 'Magic',
            attack: 13,
            defense: 0,
            cost: 4,
            description: 'Explosion of fire and lava'
        });

        this.addCard({
            id: 'flame_guard',
            name: 'Flame Guard',
            type: 'Magic',
            attack: 0,
            defense: 12,
            cost: 4,
            description: 'Guardian of flame'
        });

        this.addCard({
            id: 'ember_shield',
            name: 'Ember Shield',
            type: 'Magic',
            attack: 0,
            defense: 7,
            cost: 2,
            description: 'Shield of embers'
        });

        this.addCard({
            id: 'fire_guardian',
            name: 'Fire Guardian',
            type: 'Magic',
            attack: 0,
            defense: 13,
            cost: 4,
            description: 'Guardian of fire'
        });

        this.addCard({
            id: 'blaze_ward',
            name: 'Blaze Ward',
            type: 'Magic',
            attack: 0,
            defense: 10,
            cost: 3,
            description: 'Ward of blazing fire'
        });

        this.addCard({
            id: 'infernal_guard',
            name: 'Infernal Guard',
            type: 'Magic',
            attack: 0,
            defense: 14,
            cost: 5,
            description: 'Guardian of infernal fire'
        });

        // Ice Defense Cards
        this.addCard({
            id: 'ice_shield',
            name: 'Ice Shield',
            type: 'Defense',
            attack: 0,
            defense: 5,
            cost: 2,
            description: 'Block incoming damage with ice'
        });

        this.addCard({
            id: 'frost_wall',
            name: 'Frost Wall',
            type: 'Defense',
            attack: 0,
            defense: 8,
            cost: 3,
            description: 'Create a wall of solid ice'
        });

        this.addCard({
            id: 'frost_mirror',
            name: 'Frost Mirror',
            type: 'Defense',
            attack: 3,
            defense: 6,
            cost: 3,
            description: 'Reflect damage with ice'
        });

        this.addCard({
            id: 'ice_stance',
            name: 'Ice Stance',
            type: 'Defense',
            attack: 4,
            defense: 7,
            cost: 3,
            description: 'Defensive stance with ice counter-attacks'
        });

        this.addCard({
            id: 'frozen_skin',
            name: 'Frozen Skin',
            type: 'Defense',
            attack: 0,
            defense: 12,
            cost: 4,
            description: 'Turn skin to ice for protection'
        });

        // Lightning Defense Cards
        this.addCard({
            id: 'static_block',
            name: 'Static Block',
            type: 'Defense',
            attack: 0,
            defense: 5,
            cost: 2,
            description: 'Block incoming damage with static electricity'
        });

        this.addCard({
            id: 'thunder_wall',
            name: 'Thunder Wall',
            type: 'Defense',
            attack: 0,
            defense: 8,
            cost: 3,
            description: 'Create a wall of lightning'
        });

        this.addCard({
            id: 'storm_mirror',
            name: 'Storm Mirror',
            type: 'Defense',
            attack: 3,
            defense: 6,
            cost: 3,
            description: 'Reflect damage with lightning'
        });

        this.addCard({
            id: 'lightning_stance',
            name: 'Lightning Stance',
            type: 'Defense',
            attack: 4,
            defense: 7,
            cost: 3,
            description: 'Defensive stance with lightning counter-attacks'
        });

        this.addCard({
            id: 'storm_skin',
            name: 'Storm Skin',
            type: 'Defense',
            attack: 0,
            defense: 12,
            cost: 4,
            description: 'Turn skin to storm energy for protection'
        });

        // Fire Defense Cards
        this.addCard({
            id: 'flame_block',
            name: 'Flame Block',
            type: 'Defense',
            attack: 0,
            defense: 5,
            cost: 2,
            description: 'Block incoming damage with fire'
        });

        this.addCard({
            id: 'fire_wall',
            name: 'Fire Wall',
            type: 'Defense',
            attack: 0,
            defense: 8,
            cost: 3,
            description: 'Create a wall of fire'
        });

        this.addCard({
            id: 'blaze_mirror',
            name: 'Blaze Mirror',
            type: 'Defense',
            attack: 3,
            defense: 6,
            cost: 3,
            description: 'Reflect damage with fire'
        });

        this.addCard({
            id: 'inferno_stance',
            name: 'Inferno Stance',
            type: 'Defense',
            attack: 4,
            defense: 7,
            cost: 3,
            description: 'Defensive stance with fire counter-attacks'
        });

        this.addCard({
            id: 'molten_skin',
            name: 'Molten Skin',
            type: 'Defense',
            attack: 0,
            defense: 12,
            cost: 4,
            description: 'Turn skin to molten lava for protection'
        });

        // Ice Mage Cards
        this.addCard({
            id: 'ice_shield',
            name: 'Ice Shield',
            type: 'Defense',
            attack: 0,
            defense: 5,
            cost: 2,
            description: 'Create a shield of ice'
        });

        this.addCard({
            id: 'frost_wall',
            name: 'Frost Wall',
            type: 'Defense',
            attack: 0,
            defense: 8,
            cost: 3,
            description: 'Create a wall of frost'
        });

        this.addCard({
            id: 'frozen_heart',
            name: 'Frozen Heart',
            type: 'Defense',
            attack: 0,
            defense: 6,
            cost: 2,
            description: 'Protect yourself with ice'
        });

        this.addCard({
            id: 'ice_barrier',
            name: 'Ice Barrier',
            type: 'Defense',
            attack: 0,
            defense: 7,
            cost: 3,
            description: 'Create a barrier of ice'
        });

        this.addCard({
            id: 'frost_ward',
            name: 'Frost Ward',
            type: 'Defense',
            attack: 0,
            defense: 4,
            cost: 1,
            description: 'Ward yourself with frost'
        });

        this.addCard({
            id: 'frost_nova',
            name: 'Frost Nova',
            type: 'Magic',
            attack: 8,
            defense: 0,
            cost: 3,
            description: 'Explode with frost'
        });

        this.addCard({
            id: 'blizzard',
            name: 'Blizzard',
            type: 'Magic',
            attack: 12,
            defense: 0,
            cost: 4,
            description: 'Summon a blizzard'
        });

        this.addCard({
            id: 'ice_spike',
            name: 'Ice Spike',
            type: 'Magic',
            attack: 6,
            defense: 0,
            cost: 2,
            description: 'Launch an ice spike'
        });

        this.addCard({
            id: 'frost_bite',
            name: 'Frost Bite',
            type: 'Magic',
            attack: 7,
            defense: 0,
            cost: 2,
            description: 'Bite with frost'
        });

        this.addCard({
            id: 'winter_wind',
            name: 'Winter Wind',
            type: 'Magic',
            attack: 5,
            defense: 0,
            cost: 1,
            description: 'Summon winter winds'
        });

        this.addCard({
            id: 'cold_snap',
            name: 'Cold Snap',
            type: 'Magic',
            attack: 9,
            defense: 0,
            cost: 3,
            description: 'Snap with cold'
        });

        this.addCard({
            id: 'ice_lance',
            name: 'Ice Lance',
            type: 'Magic',
            attack: 10,
            defense: 0,
            cost: 3,
            description: 'Launch an ice lance'
        });

        this.addCard({
            id: 'frost_bolt',
            name: 'Frost Bolt',
            type: 'Magic',
            attack: 7,
            defense: 0,
            cost: 2,
            description: 'Launch a frost bolt'
        });

        this.addCard({
            id: 'snow_blast',
            name: 'Snow Blast',
            type: 'Magic',
            attack: 8,
            defense: 0,
            cost: 2,
            description: 'Blast with snow'
        });

        this.addCard({
            id: 'glacial_strike',
            name: 'Glacial Strike',
            type: 'Magic',
            attack: 11,
            defense: 0,
            cost: 4,
            description: 'Strike with glacial force'
        });

        // Lightning Mage Cards
        this.addCard({
            id: 'static_shield',
            name: 'Static Shield',
            type: 'Defense',
            attack: 0,
            defense: 5,
            cost: 2,
            description: 'Create a shield of static'
        });

        this.addCard({
            id: 'thunder_wall',
            name: 'Thunder Wall',
            type: 'Defense',
            attack: 0,
            defense: 8,
            cost: 3,
            description: 'Create a wall of thunder'
        });

        this.addCard({
            id: 'storm_barrier',
            name: 'Storm Barrier',
            type: 'Defense',
            attack: 0,
            defense: 7,
            cost: 3,
            description: 'Create a barrier of storm'
        });

        this.addCard({
            id: 'lightning_ward',
            name: 'Lightning Ward',
            type: 'Defense',
            attack: 0,
            defense: 6,
            cost: 2,
            description: 'Ward yourself with lightning'
        });

        this.addCard({
            id: 'storm_guard',
            name: 'Storm Guard',
            type: 'Defense',
            attack: 0,
            defense: 4,
            cost: 1,
            description: 'Guard yourself with storm'
        });

        this.addCard({
            id: 'lightning_bolt',
            name: 'Lightning Bolt',
            type: 'Magic',
            attack: 8,
            defense: 0,
            cost: 3,
            description: 'Launch a lightning bolt'
        });

        this.addCard({
            id: 'thunder_strike',
            name: 'Thunder Strike',
            type: 'Magic',
            attack: 10,
            defense: 0,
            cost: 3,
            description: 'Strike with thunder'
        });

        this.addCard({
            id: 'chain_lightning',
            name: 'Chain Lightning',
            type: 'Magic',
            attack: 12,
            defense: 0,
            cost: 4,
            description: 'Chain lightning between targets'
        });

        this.addCard({
            id: 'storm_cloud',
            name: 'Storm Cloud',
            type: 'Magic',
            attack: 9,
            defense: 0,
            cost: 3,
            description: 'Summon a storm cloud'
        });

        this.addCard({
            id: 'electric_surge',
            name: 'Electric Surge',
            type: 'Magic',
            attack: 7,
            defense: 0,
            cost: 2,
            description: 'Surge with electricity'
        });

        this.addCard({
            id: 'thunder_clap',
            name: 'Thunder Clap',
            type: 'Magic',
            attack: 11,
            defense: 0,
            cost: 4,
            description: 'Clap with thunder'
        });

        this.addCard({
            id: 'lightning_rod',
            name: 'Lightning Rod',
            type: 'Magic',
            attack: 6,
            defense: 0,
            cost: 2,
            description: 'Channel lightning through a rod'
        });

        this.addCard({
            id: 'static_field',
            name: 'Static Field',
            type: 'Magic',
            attack: 8,
            defense: 0,
            cost: 2,
            description: 'Create a field of static'
        });

        this.addCard({
            id: 'storm_bolt',
            name: 'Storm Bolt',
            type: 'Magic',
            attack: 9,
            defense: 0,
            cost: 3,
            description: 'Launch a storm bolt'
        });

        this.addCard({
            id: 'thunder_blast',
            name: 'Thunder Blast',
            type: 'Magic',
            attack: 13,
            defense: 0,
            cost: 5,
            description: 'Blast with thunder'
        });

        // Fire Mage Cards
        this.addCard({
            id: 'flame_shield',
            name: 'Flame Shield',
            type: 'Defense',
            attack: 0,
            defense: 5,
            cost: 2,
            description: 'Create a shield of flame'
        });

        this.addCard({
            id: 'fire_wall',
            name: 'Fire Wall',
            type: 'Defense',
            attack: 0,
            defense: 8,
            cost: 3,
            description: 'Create a wall of fire'
        });

        this.addCard({
            id: 'inferno_barrier',
            name: 'Inferno Barrier',
            type: 'Defense',
            attack: 0,
            defense: 7,
            cost: 3,
            description: 'Create a barrier of inferno'
        });

        this.addCard({
            id: 'blaze_ward',
            name: 'Blaze Ward',
            type: 'Defense',
            attack: 0,
            defense: 6,
            cost: 2,
            description: 'Ward yourself with blaze'
        });

        this.addCard({
            id: 'ember_guard',
            name: 'Ember Guard',
            type: 'Defense',
            attack: 0,
            defense: 4,
            cost: 1,
            description: 'Guard yourself with embers'
        });

        this.addCard({
            id: 'fireball',
            name: 'Fireball',
            type: 'Magic',
            attack: 8,
            defense: 0,
            cost: 3,
            description: 'Launch a fireball'
        });

        this.addCard({
            id: 'meteor_strike',
            name: 'Meteor Strike',
            type: 'Magic',
            attack: 12,
            defense: 0,
            cost: 4,
            description: 'Strike with a meteor'
        });

        this.addCard({
            id: 'inferno',
            name: 'Inferno',
            type: 'Magic',
            attack: 15,
            defense: 0,
            cost: 5,
            description: 'Summon an inferno'
        });

        this.addCard({
            id: 'flame_burst',
            name: 'Flame Burst',
            type: 'Magic',
            attack: 9,
            defense: 0,
            cost: 3,
            description: 'Burst with flame'
        });

        this.addCard({
            id: 'pyroclasm',
            name: 'Pyroclasm',
            type: 'Magic',
            attack: 11,
            defense: 0,
            cost: 4,
            description: 'Explode with pyroclasm'
        });

        this.addCard({
            id: 'molten_strike',
            name: 'Molten Strike',
            type: 'Magic',
            attack: 10,
            defense: 0,
            cost: 3,
            description: 'Strike with molten force'
        });

        this.addCard({
            id: 'blaze_bolt',
            name: 'Blaze Bolt',
            type: 'Magic',
            attack: 8,
            defense: 0,
            cost: 2,
            description: 'Launch a blaze bolt'
        });

        this.addCard({
            id: 'heat_wave',
            name: 'Heat Wave',
            type: 'Magic',
            attack: 9,
            defense: 0,
            cost: 3,
            description: 'Create a wave of heat'
        });

        this.addCard({
            id: 'infernal_blast',
            name: 'Infernal Blast',
            type: 'Magic',
            attack: 13,
            defense: 0,
            cost: 5,
            description: 'Blast with infernal force'
        });
    }

    addCard(cardData) {
        this.cards.set(cardData.id, cardData);
    }

    getCard(cardId) {
        return this.cards.get(cardId);
    }

    getAllCards() {
        return Array.from(this.cards.values());
    }

    getCardsByType(type) {
        return this.getAllCards().filter(card => card.type === type);
    }

    createCardElement(cardData) {
        const card = document.createElement('div');
        card.className = `card card-${cardData.type.toLowerCase()}`;
        
        const typeColor = {
            'Attack': '#ff4444',
            'Defense': '#44ff44',
            'Magic': '#4444ff'
        };

        card.innerHTML = `
            <div class="card-art" style="background-image: url('./assets/Images/${cardData.type.toLowerCase()}.png')"></div>
            <div class="card-content">
                <div class="card-name" style="color: ${typeColor[cardData.type]}">${cardData.name}</div>
                <div class="card-stats">
                    <span data-label="ATK">${cardData.attack}</span>
                    <span data-label="DEF">${cardData.defense}</span>
                    <span data-label="COST">${cardData.cost}</span>
                </div>
                <div class="card-description">${cardData.description}</div>
            </div>
        `;
        return card;
    }
} 