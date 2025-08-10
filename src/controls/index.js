import { PanControlsBase } from './base.js';
import { MouseControls } from './mouse.js';
import { KeyboardTouchControls } from './keyboard-touch.js';
import { NavigationControls } from './navigation.js';

export class PanControls extends PanControlsBase {
    constructor(camera, domElement) {
        super(camera, domElement);
        
        this.mouseControls = new MouseControls(this);
        this.keyboardTouchControls = new KeyboardTouchControls(this);
        this.navigationControls = new NavigationControls(this);
        
        this.init();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.mouseControls.setupMouseEvents();
        this.keyboardTouchControls.setupKeyboardEvents();
        this.keyboardTouchControls.setupTouchEvents();
    }

    centerOnObject(animate = true) {
        return this.navigationControls.centerOnObject(animate);
    }
    
    reset(animate = true) {
        return this.navigationControls.reset(animate);
    }
    
    setTarget(x, y, z) {
        return this.navigationControls.setTarget(x, y, z);
    }
    
    animateToPosition(position, target = null, duration = 1000) {
        return this.navigationControls.animateToPosition(position, target, duration);
    }
    
    setView(view) {
        return this.navigationControls.setView(view);
    }
    
    dispose() {
        this.mouseControls.dispose();
        this.keyboardTouchControls.dispose();
    }
}