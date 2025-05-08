export class DebugMenu {
    constructor(game) {
        this.game = game;
        this.isVisible = false;
        this.menu = null;
        this.debugViewEnabled = false;
        this.hitboxViewEnabled = false;
        this.isKillMode = false;
        this.showCoordinates = false;
        this.coordinatesDisplay = null;
        this.isDragging = false;
        this.isResizing = false;
        this.dragOffset = { x: 0, y: 0 };
        this.resizeDirection = null;
        this.initialSize = { width: 0, height: 0 };
        this.initialPosition = { x: 0, y: 0 };
        this.createMenu();
        this.setupKeyListener();
        this.addStyles();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .debug-menu {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(20, 20, 20, 0.95);
                border: 2px solid #444;
                border-radius: 12px;
                padding: 20px;
                color: white;
                z-index: 9999;
                min-width: 300px;
                min-height: 200px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
                font-family: 'Arial', sans-serif;
                resize: both;
                overflow: auto;
            }

            .debug-menu.dragging {
                cursor: grabbing;
                user-select: none;
            }

            .debug-menu-content {
                position: relative;
                height: 100%;
            }

            .debug-drag-handle {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 30px;
                background: rgba(68, 68, 68, 0.5);
                border-radius: 10px 10px 0 0;
                cursor: grab;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #888;
                font-size: 12px;
                user-select: none;
            }

            .debug-drag-handle:hover {
                background: rgba(68, 68, 68, 0.8);
            }

            .debug-drag-handle.dragging {
                cursor: grabbing;
            }

            .debug-resize-handle {
                position: absolute;
                width: 10px;
                height: 10px;
                background: #4CAF50;
                border-radius: 50%;
                z-index: 10000;
            }

            .debug-resize-handle.nw { top: -5px; left: -5px; cursor: nw-resize; }
            .debug-resize-handle.ne { top: -5px; right: -5px; cursor: ne-resize; }
            .debug-resize-handle.sw { bottom: -5px; left: -5px; cursor: sw-resize; }
            .debug-resize-handle.se { bottom: -5px; right: -5px; cursor: se-resize; }

            .debug-resize-handle:hover {
                background: #66BB6A;
                transform: scale(1.2);
            }

            .debug-close-button {
                position: absolute;
                top: -10px;
                right: -10px;
                background: #ff4444;
                border: none;
                color: white;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                transition: background-color 0.2s;
            }

            .debug-close-button:hover {
                background: #ff6666;
            }

            .debug-menu h2 {
                margin: 0 0 20px 0;
                color: #ffd700;
                text-align: center;
                font-size: 24px;
                text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
            }

            .debug-section {
                background: rgba(40, 40, 40, 0.5);
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 15px;
            }

            .debug-section h3 {
                margin: 0 0 15px 0;
                color: #4CAF50;
                font-size: 18px;
                border-bottom: 1px solid #4CAF50;
                padding-bottom: 5px;
            }

            .debug-section button {
                width: 100%;
                padding: 10px;
                margin: 5px 0;
                border: none;
                border-radius: 5px;
                background: #333;
                color: white;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 14px;
                text-align: left;
                display: flex;
                align-items: center;
            }

            .debug-section button:hover {
                background: #444;
                transform: translateX(5px);
            }

            .debug-section button:active {
                transform: translateX(0);
            }

            .card-selector {
                margin-top: 10px;
                display: flex;
                gap: 10px;
                align-items: center;
            }

            .card-selector select {
                flex: 1;
                padding: 8px;
                border-radius: 5px;
                background: #333;
                color: white;
                border: 1px solid #555;
                font-size: 14px;
            }

            .card-selector select:focus {
                outline: none;
                border-color: #4CAF50;
            }

            .card-selector select option {
                background: #333;
                color: white;
                padding: 5px;
            }

            .card-selector button {
                white-space: nowrap;
            }

            .coordinates-display {
                position: fixed;
                top: 10px;
                left: 10px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 5px;
                font-family: monospace;
                font-size: 14px;
                z-index: 1000;
                border: 1px solid #444;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            }
        `;
        document.head.appendChild(style);
    }

    createMenu() {
        const menu = document.createElement('div');
        menu.className = 'debug-menu';
        menu.style.display = 'none';

        // Create drag handle
        const dragHandle = document.createElement('div');
        dragHandle.className = 'debug-drag-handle';
        dragHandle.textContent = '⋮⋮ Drag to Move';
        menu.appendChild(dragHandle);

        // Create resize handles
        const resizeHandles = ['nw', 'ne', 'sw', 'se'].map(pos => {
            const handle = document.createElement('div');
            handle.className = `debug-resize-handle ${pos}`;
            return handle;
        });
        resizeHandles.forEach(handle => menu.appendChild(handle));

        // Create menu content
        const content = document.createElement('div');
        content.className = 'debug-menu-content';

        // Add close button
        const closeButton = document.createElement('button');
        closeButton.className = 'debug-close-button';
        closeButton.innerHTML = '×';
        closeButton.onclick = () => this.toggleMenu();
        content.appendChild(closeButton);

        // Add title
        const title = document.createElement('h2');
        title.textContent = 'Debug Menu';
        content.appendChild(title);

        // Create coordinates display
        this.coordinatesDisplay = document.createElement('div');
        this.coordinatesDisplay.className = 'coordinates-display';
        this.coordinatesDisplay.style.display = 'none';
        document.body.appendChild(this.coordinatesDisplay);

        // Add sections
        const sections = [
            {
                title: 'Player Controls',
                actions: [
                    { id: 'heal-player', label: 'Heal Player', icon: '❤️' },
                    { id: 'damage-player', label: 'Damage Player', icon: '💔' },
                    { id: 'add-mana', label: 'Add Mana', icon: '🔮' },
                    { id: 'draw-card', label: 'Draw Card', icon: '🎴' },
                    { id: 'show-coordinates', label: 'Show Coordinates', icon: '📍' },
                    { id: 'kill-player', label: 'Kill Player', icon: '💀', style: 'background-color: #ff4444' }
                ]
            },
            {
                title: 'Enemy Controls',
                actions: [
                    { id: 'heal-enemy', label: 'Heal All Enemies', icon: '❤️' },
                    { id: 'damage-enemy', label: 'Damage All Enemies', icon: '💔' },
                    { id: 'next-enemy', label: 'Next Enemy', icon: '➡️' },
                    { id: 'kill-enemy', label: 'Kill Enemy', icon: '💀', style: 'background-color: #ff4444' }
                ]
            },
            {
                title: 'Card Controls',
                actions: [
                    { id: 'add-card', label: 'Add Card to Hand', icon: '➕' }
                ]
            }
        ];

        sections.forEach(section => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'debug-section';

            const sectionTitle = document.createElement('h3');
            sectionTitle.textContent = section.title;
            sectionDiv.appendChild(sectionTitle);

            section.actions.forEach(action => {
                if (action.id === 'add-card') {
                    // Create card selector
                    const cardSelector = document.createElement('div');
                    cardSelector.className = 'card-selector';
                    
                    const select = document.createElement('select');
                    // Sort cards alphabetically by name
                    const sortedCards = Array.from(this.game.cardManager.cards.values())
                        .sort((a, b) => a.name.localeCompare(b.name));
                    
                    sortedCards.forEach(card => {
                        const option = document.createElement('option');
                        option.value = card.id;
                        option.textContent = `${card.id} - ${card.name}`;
                        select.appendChild(option);
                    });
                    
                    const button = document.createElement('button');
                    button.innerHTML = `${action.icon} ${action.label}`;
                    button.onclick = () => this.handleDebugAction(action.id, select.value);
                    
                    cardSelector.appendChild(select);
                    cardSelector.appendChild(button);
                    sectionDiv.appendChild(cardSelector);
                } else if (action.id === 'kill-enemy') {
                    // Create enemy selector for kill action
                    const enemySelector = document.createElement('div');
                    enemySelector.className = 'card-selector';
                    
                    const select = document.createElement('select');
                    this.game.enemies.forEach(enemy => {
                        const option = document.createElement('option');
                        option.value = enemy.id;
                        option.textContent = `Enemy ${enemy.id}`;
                        select.appendChild(option);
                    });
                    
                    const button = document.createElement('button');
                    button.innerHTML = `${action.icon} ${action.label}`;
                    if (action.style) {
                        button.style.cssText = action.style;
                    }
                    button.onclick = () => this.handleDebugAction(action.id, select.value);
                    
                    enemySelector.appendChild(select);
                    enemySelector.appendChild(button);
                    sectionDiv.appendChild(enemySelector);
                } else {
                    const button = document.createElement('button');
                    button.innerHTML = `${action.icon} ${action.label}`;
                    if (action.style) {
                        button.style.cssText = action.style;
                    }
                    button.onclick = () => this.handleDebugAction(action.id);
                    sectionDiv.appendChild(button);
                }
            });

            content.appendChild(sectionDiv);
        });

        menu.appendChild(content);
        document.body.appendChild(menu);
        this.menu = menu;

        this.setupDragAndResize(menu, dragHandle, resizeHandles);
    }

    setupKeyListener() {
        document.addEventListener('keydown', (e) => {
            if (e.key === '`') {
                this.toggleMenu();
            }
        });
    }

    toggleMenu() {
        this.isVisible = !this.isVisible;
        this.menu.style.display = this.isVisible ? 'block' : 'none';
    }

    toggleDebugView() {
        this.debugViewEnabled = !this.debugViewEnabled;
        document.body.classList.toggle('debug-view', this.debugViewEnabled);
    }

    toggleHitboxView() {
        this.hitboxViewEnabled = !this.hitboxViewEnabled;
        document.body.classList.toggle('hitbox-view', this.hitboxViewEnabled);
    }

    toggleKillMode() {
        this.isKillMode = !this.isKillMode;
        const killButton = this.menu.querySelector('[data-action="toggle-kill-mode"]');
        if (killButton) {
            killButton.style.backgroundColor = this.isKillMode ? '#ff4444' : '';
        }

        // Remove existing click handlers
        document.removeEventListener('click', this.handleKillClick);

        if (this.isKillMode) {
            // Add click handler for kill mode
            this.handleKillClick = (e) => {
                const enemyElement = e.target.closest('.enemy-character');
                const playerElement = e.target.closest('.player-character');
                
                if (enemyElement) {
                    const enemyId = parseInt(enemyElement.dataset.enemyId);
                    const enemy = this.game.enemies.find(e => e.id === enemyId);
                    if (enemy) {
                        enemy.destroy();
                        this.game.enemies = this.game.enemies.filter(e => e.id !== enemyId);
                    }
                } else if (playerElement) {
                    this.game.playerHealth = 0;
                    this.game.updateHealthBars();
                    this.game.endGame();
                }
            };
            document.addEventListener('click', this.handleKillClick);
        }
    }

    handleDebugAction(action, cardId) {
        switch(action) {
            case 'toggle-debug-view':
                this.toggleDebugView();
                break;
            case 'toggle-hitbox-view':
                this.toggleHitboxView();
                break;
            case 'heal-player':
                this.game.playerHealth = 100;
                this.game.updateHealthBars();
                break;
            case 'damage-player':
                this.game.playerHealth = Math.max(0, this.game.playerHealth - 10);
                this.game.updateHealthBars();
                break;
            case 'kill-player':
                this.game.playerHealth = 0;
                this.game.updateHealthBars();
                this.game.endGame();
                break;
            case 'max-resources':
                this.game.playerResource = this.game.maxResource;
                this.game.updateResourceBar();
                break;
            case 'kill-enemy':
                const enemyId = parseInt(cardId);
                const enemy = this.game.enemies.find(e => e.id === enemyId);
                if (enemy) {
                    enemy.destroy();
                    this.game.enemies = this.game.enemies.filter(e => e.id !== enemyId);
                }
                break;
            case 'heal-enemy':
                this.game.enemies.forEach(enemy => {
                    enemy.health = 100;
                    enemy.updateHealthBar();
                });
                break;
            case 'damage-enemy':
                this.game.enemies.forEach(enemy => {
                    enemy.takeDamage(10);
                });
                break;
            case 'add-enemy':
                const newEnemy = new Enemy(
                    this.game.enemies.length + 1,
                    100,
                    './assets/Sprites/Executioner/idle2.png'
                );
                this.game.enemies.push(newEnemy);
                document.querySelector('.enemy-side').appendChild(newEnemy.createEnemyElement());
                break;
            case 'draw-card':
                this.game.drawCard();
                break;
            case 'shuffle-deck':
                this.game.shuffleDeck();
                this.game.updatePileCounts();
                break;
            case 'toggle-kill-mode':
                this.toggleKillMode();
                break;
            case 'add-card':
                if (cardId) {
                    this.game.addCardToHand(cardId);
                }
                break;
            case 'show-coordinates':
                this.toggleCoordinates();
                break;
        }
    }

    toggleCoordinates() {
        this.showCoordinates = !this.showCoordinates;
        this.coordinatesDisplay.style.display = this.showCoordinates ? 'block' : 'none';
        
        if (this.showCoordinates) {
            document.addEventListener('mousemove', this.updateCoordinates);
        } else {
            document.removeEventListener('mousemove', this.updateCoordinates);
        }
    }

    updateCoordinates = (e) => {
        if (this.showCoordinates) {
            const x = Math.round(e.clientX);
            const y = Math.round(e.clientY);
            this.coordinatesDisplay.textContent = `X: ${x}, Y: ${y}`;
        }
    }

    setupDragAndResize(menu, dragHandle, resizeHandles) {
        // Dragging functionality
        dragHandle.addEventListener('mousedown', (e) => {
            if (e.target === dragHandle) {
                this.isDragging = true;
                menu.classList.add('dragging');
                dragHandle.classList.add('dragging');
                
                const rect = menu.getBoundingClientRect();
                this.dragOffset = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                };
            }
        });

        // Resizing functionality
        resizeHandles.forEach(handle => {
            handle.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                this.isResizing = true;
                this.resizeDirection = handle.className.split(' ')[1];
                
                const rect = menu.getBoundingClientRect();
                this.initialSize = {
                    width: rect.width,
                    height: rect.height
                };
                this.initialPosition = {
                    x: rect.left,
                    y: rect.top
                };
            });
        });

        // Mouse move handler for both dragging and resizing
        document.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                const x = e.clientX - this.dragOffset.x;
                const y = e.clientY - this.dragOffset.y;
                menu.style.transform = 'none';
                menu.style.left = `${x}px`;
                menu.style.top = `${y}px`;
            } else if (this.isResizing) {
                const rect = menu.getBoundingClientRect();
                let newWidth = this.initialSize.width;
                let newHeight = this.initialSize.height;
                let newLeft = this.initialPosition.x;
                let newTop = this.initialPosition.y;

                switch (this.resizeDirection) {
                    case 'se':
                        newWidth = e.clientX - rect.left;
                        newHeight = e.clientY - rect.top;
                        break;
                    case 'sw':
                        newWidth = rect.right - e.clientX;
                        newHeight = e.clientY - rect.top;
                        newLeft = e.clientX;
                        break;
                    case 'ne':
                        newWidth = e.clientX - rect.left;
                        newHeight = rect.bottom - e.clientY;
                        newTop = e.clientY;
                        break;
                    case 'nw':
                        newWidth = rect.right - e.clientX;
                        newHeight = rect.bottom - e.clientY;
                        newLeft = e.clientX;
                        newTop = e.clientY;
                        break;
                }

                // Apply minimum size constraints
                newWidth = Math.max(300, newWidth);
                newHeight = Math.max(200, newHeight);

                menu.style.width = `${newWidth}px`;
                menu.style.height = `${newHeight}px`;
                menu.style.left = `${newLeft}px`;
                menu.style.top = `${newTop}px`;
            }
        });

        // Mouse up handler to stop dragging/resizing
        document.addEventListener('mouseup', () => {
            if (this.isDragging) {
                this.isDragging = false;
                menu.classList.remove('dragging');
                dragHandle.classList.remove('dragging');
            }
            if (this.isResizing) {
                this.isResizing = false;
                this.resizeDirection = null;
            }
        });
    }
}