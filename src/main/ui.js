export class UIManager {
    constructor() {
        this.menu = document.getElementById('menu');
        this.range = document.getElementById('iterationRange');
        this.isOverMenu = false;
    }
    
    init() {
        this.setupMenuControls();
    }
    
    setupMenuControls() {
        document.addEventListener('mousemove', (e) => {
            if (e.clientX < 50) {
                this.menu.classList.add('visible');
            } else if (!this.isOverMenu) {
                this.menu.classList.remove('visible');
            }
        });

        this.menu.addEventListener('mouseenter', () => { 
            this.isOverMenu = true; 
        });
        
        this.menu.addEventListener('mouseleave', () => {
            this.isOverMenu = false;
            this.menu.classList.remove('visible');
        });
    }
    
    showLoadingIndicator(message = 'Generando fractal...') {
        let indicator = document.getElementById('loadingIndicator');
        
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'loadingIndicator';
            indicator.style.cssText = `
                position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.8); color: white; padding: 20px 30px;
                border-radius: 10px; font-size: 16px; z-index: 10000;
                backdrop-filter: blur(5px); display: flex; align-items: center; gap: 15px;
            `;
            
            const spinner = document.createElement('div');
            spinner.style.cssText = `
                width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3);
                border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;
            `;
            
            indicator.appendChild(spinner);
            indicator.appendChild(document.createTextNode(message));
            document.body.appendChild(indicator);
        } else {
            indicator.style.display = 'flex';
            indicator.lastChild.textContent = message;
        }
    }
    
    hideLoadingIndicator() {
        const indicator = document.getElementById('loadingIndicator');
        if (indicator) indicator.style.display = 'none';
    }
    
    getCurrentDepth() {
        return parseInt(this.range.value);
    }
}