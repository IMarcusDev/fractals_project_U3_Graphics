import * as THREE from 'three';

export class PanControlsBase {
    constructor(camera, domElement) {
        this.camera = camera;
        this.domElement = domElement;

        // Estado del control
        this.enabled = true;
        this.isMouseDown = false;
        this.isPanning = false;
        this.isRotating = false;

        // Posiciones del mouse
        this.lastMouseX = 0;
        this.lastMouseY = 0;

        // Configuración de velocidades
        this.panSpeed = 0.02;
        this.rotateSpeed = 0.008;
        this.zoomSpeed = 0.1;

        // Límites de distancia
        this.minDistance = 2;
        this.maxDistance = 100;

        // Target y posiciones iniciales
        this.target = new THREE.Vector3(0, 0, 0);
        this.initialPosition = new THREE.Vector3(0, 6, 8);
        this.initialTarget = new THREE.Vector3(0, 0, 0);

        // Variables temporales para cálculos
        this.spherical = new THREE.Spherical();
        this.offset = new THREE.Vector3();
        this.panDelta = new THREE.Vector3();

        // Estado de teclas
        this.keys = { ctrl: false };
    }
    
    init() {
        this.domElement.style.cursor = 'grab';
    }
    
    // Métodos de utilidad
    switchToPanMode() {
        this.isPanning = true;
        this.isRotating = false;
        this.domElement.style.cursor = 'move';
    }
    
    switchToRotateMode() {
        this.isPanning = false;
        this.isRotating = true;
        this.domElement.style.cursor = 'grabbing';
    }
    
    getDistance() {
        return this.camera.position.distanceTo(this.target);
    }
    
    getStatus() {
        return {
            mode: this.isPanning ? 'pan' : this.isRotating ? 'rotate' : 'idle',
            ctrlPressed: this.keys.ctrl,
            distance: this.getDistance().toFixed(2),
            position: {
                x: this.camera.position.x.toFixed(2),
                y: this.camera.position.y.toFixed(2),
                z: this.camera.position.z.toFixed(2)
            }
        };
    }
}