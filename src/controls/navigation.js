import * as THREE from 'three';

export class NavigationControls {
    constructor(controlsInstance) {
        this.controls = controlsInstance;
    }
    
    centerOnObject(animate = true) {
        const targetPos = new THREE.Vector3(0, 6, 8);
        const targetLookAt = new THREE.Vector3(0, 0, 0);
        
        if (animate) {
            this.animateToPosition(targetPos, targetLookAt, 800);
        } else {
            this.controls.camera.position.copy(targetPos);
            this.controls.target.copy(targetLookAt);
            this.controls.camera.lookAt(this.controls.target);
        }
    }
    
    reset(animate = true) {
        this.centerOnObject(animate);
    }
    
    setTarget(x, y, z) {
        this.controls.target.set(x, y, z);
        this.controls.camera.lookAt(this.controls.target);
    }
    
    animateToPosition(position, target = null, duration = 1000) {
        const startPos = this.controls.camera.position.clone();
        const startTarget = this.controls.target.clone();
        const endPos = position.clone();
        const endTarget = target ? target.clone() : this.controls.target.clone();
        
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            
            this.controls.camera.position.lerpVectors(startPos, endPos, easedProgress);
            this.controls.target.lerpVectors(startTarget, endTarget, easedProgress);
            this.controls.camera.lookAt(this.controls.target);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    setView(view) {
        const distance = this.controls.getDistance();
        let newPos;
        
        const viewPositions = {
            'front': new THREE.Vector3(0, 0, distance),
            'back': new THREE.Vector3(0, 0, -distance),
            'left': new THREE.Vector3(-distance, 0, 0),
            'right': new THREE.Vector3(distance, 0, 0),
            'top': new THREE.Vector3(0, distance, 0),
            'bottom': new THREE.Vector3(0, -distance, 0)
        };
        
        newPos = viewPositions[view] || new THREE.Vector3(0, distance * 0.7, distance * 0.7);
        this.animateToPosition(newPos.add(this.controls.target), this.controls.target);
    }
}