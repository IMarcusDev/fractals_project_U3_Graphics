import * as THREE from 'three';

export let operationState = {
    currentFractal: null,
    currentFractalType: null,
    currentRotation: 0,
    currentScale: 1,
    autoRotateEnabled: false,
    scene: null,
    camera: null,
    renderer: null
};

let rangeValue, rotationRange, scaleRange, rotationValue, scaleValue;

export function initOperations(scene, camera, renderer) {
    operationState.scene = scene;
    operationState.camera = camera;
    operationState.renderer = renderer;

    rangeValue = document.getElementById('rangeValue');
    rotationRange = document.getElementById('rotationRange');
    scaleRange = document.getElementById('scaleRange');
    rotationValue = document.getElementById('rotationValue');
    scaleValue = document.getElementById('scaleValue');
}

export function applyTransformations() {
    if (operationState.currentFractal && 
        operationState.currentFractalType !== 'mandelbrot' && 
        operationState.currentFractalType !== 'julia') {
        
        const rotationRadians = operationState.currentRotation * Math.PI / 180;
        operationState.currentFractal.rotation.y = rotationRadians;
        operationState.currentFractal.scale.set(
            operationState.currentScale, 
            operationState.currentScale, 
            operationState.currentScale
        );
        operationState.currentFractal.updateMatrixWorld();
    }
}

export function updateCurrentFractal(fractal, type) {
    operationState.currentFractal = fractal;
    operationState.currentFractalType = type;

    if (fractal) {
        applyTransformations();
    }

    document.querySelectorAll('.menuBtn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`[data-fractal="${type}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

export function regenerateCurrentFractal() {
    if (!operationState.currentFractalType) return;
    
    const iterationRange = document.getElementById('iterationRange');
    const depth = iterationRange ? parseInt(iterationRange.value) : 3;

    const event = new CustomEvent('regenerateFractal', {
        detail: { type: operationState.currentFractalType, depth: depth }
    });
    document.dispatchEvent(event);
}

export function getDOMReferences() {
    return { rangeValue, rotationRange, scaleRange, rotationValue, scaleValue };
}