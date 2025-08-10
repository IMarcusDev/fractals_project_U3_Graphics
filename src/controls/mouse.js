import * as THREE from 'three';

export class MouseControls {
    constructor(controlsInstance) {
        this.controls = controlsInstance;
    }
    
    setupMouseEvents() {
        this.controls.domElement.addEventListener('mousedown', this.onMouseDown.bind(this), false);
        this.controls.domElement.addEventListener('mousemove', this.onMouseMove.bind(this), false);
        this.controls.domElement.addEventListener('mouseup', this.onMouseUp.bind(this), false);
        this.controls.domElement.addEventListener('mouseleave', this.onMouseUp.bind(this), false);
        this.controls.domElement.addEventListener('wheel', this.onMouseWheel.bind(this), false);
        this.controls.domElement.addEventListener('contextmenu', (e) => e.preventDefault(), false);
    }
    
    onMouseDown(event) {
        if (!this.controls.enabled || event.button !== 0) return;
        
        event.preventDefault();
        this.controls.isMouseDown = true;
        this.controls.lastMouseX = event.clientX;
        this.controls.lastMouseY = event.clientY;
        
        if (this.controls.keys.ctrl) {
            this.controls.switchToPanMode();
        } else {
            this.controls.switchToRotateMode();
        }
    }
    
    onMouseMove(event) {
        if (!this.controls.enabled || !this.controls.isMouseDown) return;
        
        event.preventDefault();
        
        const deltaX = event.clientX - this.controls.lastMouseX;
        const deltaY = event.clientY - this.controls.lastMouseY;
        
        this.controls.lastMouseX = event.clientX;
        this.controls.lastMouseY = event.clientY;
        
        if (this.controls.isPanning) {
            this.panCamera(deltaX, deltaY);
        } else if (this.controls.isRotating) {
            this.rotateCamera(deltaX, deltaY);
        }
    }
    
    onMouseUp(event) {
        if (!this.controls.enabled) return;
        
        this.controls.isMouseDown = false;
        this.controls.isPanning = false;
        this.controls.isRotating = false;
        this.controls.domElement.style.cursor = 'grab';
    }
    
    onMouseWheel(event) {
        if (!this.controls.enabled) return;
        event.preventDefault();
        
        if (this.controls.keys.ctrl) {
            this.moveForwardBackward(event.deltaY);
        } else {
            this.zoomOrbital(event.deltaY);
        }
    }
    
    panCamera(deltaX, deltaY) {
        const distance = this.controls.camera.position.distanceTo(this.controls.target);
        const factor = distance * this.controls.panSpeed * 0.05;
        
        const right = new THREE.Vector3();
        const up = new THREE.Vector3();
        
        right.setFromMatrixColumn(this.controls.camera.matrix, 0);
        up.setFromMatrixColumn(this.controls.camera.matrix, 1);
        
        this.controls.panDelta.set(0, 0, 0);
        this.controls.panDelta.addScaledVector(right, -deltaX * factor);
        this.controls.panDelta.addScaledVector(up, deltaY * factor);
        
        this.controls.camera.position.add(this.controls.panDelta);
        this.controls.target.add(this.controls.panDelta);
    }
    
    rotateCamera(deltaX, deltaY) {
        this.controls.offset.copy(this.controls.camera.position).sub(this.controls.target);
        this.controls.spherical.setFromVector3(this.controls.offset);
        
        this.controls.spherical.theta -= deltaX * this.controls.rotateSpeed;
        this.controls.spherical.phi += deltaY * this.controls.rotateSpeed;
        this.controls.spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, this.controls.spherical.phi));
        
        this.controls.offset.setFromSpherical(this.controls.spherical);
        this.controls.camera.position.copy(this.controls.target).add(this.controls.offset);
        this.controls.camera.lookAt(this.controls.target);
    }
    
    zoomOrbital(deltaY) {
        const direction = new THREE.Vector3();
        direction.subVectors(this.controls.camera.position, this.controls.target).normalize();
        
        const distance = this.controls.camera.position.distanceTo(this.controls.target);
        const zoomDelta = deltaY > 0 ? 1 + this.controls.zoomSpeed : 1 - this.controls.zoomSpeed;
        
        let newDistance = distance * zoomDelta;
        newDistance = Math.max(this.controls.minDistance, Math.min(this.controls.maxDistance, newDistance));
        
        this.controls.camera.position.copy(this.controls.target);
        this.controls.camera.position.addScaledVector(direction, newDistance);
        this.controls.camera.lookAt(this.controls.target);
    }
    
    dispose() {
        const events = ['mousedown', 'mousemove', 'mouseup', 'mouseleave', 'wheel', 'contextmenu'];
        events.forEach(event => {
            this.controls.domElement.removeEventListener(event, this[`on${event.charAt(0).toUpperCase() + event.slice(1)}`]);
        });
    }
}