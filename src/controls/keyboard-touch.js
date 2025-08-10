export class KeyboardTouchControls {
    constructor(controlsInstance) {
        this.controls = controlsInstance;
    }
    
    setupKeyboardEvents() {
        document.addEventListener('keydown', this.onKeyDown.bind(this), false);
        document.addEventListener('keyup', this.onKeyUp.bind(this), false);
    }
    
    setupTouchEvents() {
        this.controls.domElement.addEventListener('touchstart', this.onTouchStart.bind(this), false);
        this.controls.domElement.addEventListener('touchmove', this.onTouchMove.bind(this), false);
        this.controls.domElement.addEventListener('touchend', this.onTouchEnd.bind(this), false);
    }
    
    onKeyDown(event) {
        if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
            this.controls.keys.ctrl = true;
            if (this.controls.isMouseDown) this.controls.switchToPanMode();
        }
    }
    
    onKeyUp(event) {
        if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
            this.controls.keys.ctrl = false;
            if (this.controls.isMouseDown) this.controls.switchToRotateMode();
        }
    }
    
    onTouchStart(event) {
        if (!this.controls.enabled) return;
        
        if (event.touches.length === 1) {
            event.preventDefault();
            this.controls.isMouseDown = true;
            this.controls.isRotating = true;
            this.controls.lastMouseX = event.touches[0].clientX;
            this.controls.lastMouseY = event.touches[0].clientY;
        } else if (event.touches.length === 2) {
            event.preventDefault();
            this.controls.isMouseDown = true;
            this.controls.isPanning = true;
            this.controls.isRotating = false;
            
            const touch1 = event.touches[0];
            const touch2 = event.touches[1];
            this.controls.lastMouseX = (touch1.clientX + touch2.clientX) / 2;
            this.controls.lastMouseY = (touch1.clientY + touch2.clientY) / 2;
        }
    }
    
    onTouchMove(event) {
        if (!this.controls.enabled || !this.controls.isMouseDown) return;
        
        if (event.touches.length === 1 && this.controls.isRotating) {
            event.preventDefault();
            
            const deltaX = event.touches[0].clientX - this.controls.lastMouseX;
            const deltaY = event.touches[0].clientY - this.controls.lastMouseY;
            
            this.controls.lastMouseX = event.touches[0].clientX;
            this.controls.lastMouseY = event.touches[0].clientY;
            
            this.controls.mouseControls.rotateCamera(deltaX, deltaY);
        } else if (event.touches.length === 2 && this.controls.isPanning) {
            event.preventDefault();
            
            const touch1 = event.touches[0];
            const touch2 = event.touches[1];
            const currentX = (touch1.clientX + touch2.clientX) / 2;
            const currentY = (touch1.clientY + touch2.clientY) / 2;
            
            const deltaX = currentX - this.controls.lastMouseX;
            const deltaY = currentY - this.controls.lastMouseY;
            
            this.controls.lastMouseX = currentX;
            this.controls.lastMouseY = currentY;
            
            this.controls.mouseControls.panCamera(deltaX, deltaY);
        }
    }
    
    onTouchEnd(event) {
        if (!this.controls.enabled) return;
        
        this.controls.isMouseDown = false;
        this.controls.isPanning = false;
        this.controls.isRotating = false;
    }
    
    dispose() {
        document.removeEventListener('keydown', this.onKeyDown);
        document.removeEventListener('keyup', this.onKeyUp);
        
        const touchEvents = ['touchstart', 'touchmove', 'touchend'];
        touchEvents.forEach(event => {
            this.controls.domElement.removeEventListener(event, this[`on${event.charAt(0).toUpperCase() + event.slice(1)}`]);
        });
    }
}