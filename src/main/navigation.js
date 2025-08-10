export class NavigationManager {
    constructor(panControls) {
        this.panControls = panControls;
    }
    
    setupNavigationFunctions() {
        const navigationFunctions = {
            resetView: () => {
                if (this.panControls) {
                    this.panControls.centerOnObject(true);
                } else {
                    const camera = this.panControls?.camera;
                    if (camera) {
                        camera.position.set(0, 6, 8);
                        camera.lookAt(0, 0, 0);
                    }
                }
            },
            
            setFrontView: () => {
                if (this.panControls) this.panControls.setView('front');
            },
            
            setTopView: () => {
                if (this.panControls) this.panControls.setView('top');
            },
            
            setSideView: () => {
                if (this.panControls) this.panControls.setView('right');
            },
            
            getCameraStatus: () => {
                if (this.panControls) {
                    return this.panControls.getStatus();
                }
                return null;
            }
        };

        Object.entries(navigationFunctions).forEach(([name, func]) => {
            window[name] = func;
        });
    }
    
    setupAdditionalKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            if (!this.panControls) return;
            
            const keyActions = {
                'c': () => this.panControls.centerOnObject(true),
                'f': () => this.panControls.setView('front'),
                'b': () => this.panControls.setView('back'),
                '1': () => this.panControls.setView('front'),
                '3': () => this.panControls.setView('right'),
                '7': () => this.panControls.setView('top'),
                '9': () => this.panControls.setView('bottom')
            };
            
            const action = keyActions[e.key.toLowerCase()];
            if (action) {
                e.preventDefault();
                action();
            }
        });
    }
}