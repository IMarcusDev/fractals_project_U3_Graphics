import { operationState, applyTransformations, regenerateCurrentFractal, getDOMReferences } from './core.js';

export function setupEventListeners() {
    const { rangeValue, rotationRange, scaleRange, rotationValue, scaleValue } = getDOMReferences();
    
    const iterationRange = document.getElementById('iterationRange');
    if (iterationRange && rangeValue) {
        let regenerateTimeout;
        iterationRange.addEventListener('input', function() {
            rangeValue.textContent = this.value;
            clearTimeout(regenerateTimeout);
            regenerateTimeout = setTimeout(() => regenerateCurrentFractal(), 300);
        });
    }

    if (rotationRange && rotationValue) {
        rotationRange.addEventListener('input', function() {
            operationState.currentRotation = parseInt(this.value);
            rotationValue.textContent = operationState.currentRotation + '°';
            applyTransformations();
            updateInfoPanels();
        });
    }
    
    if (scaleRange && scaleValue) {
        scaleRange.addEventListener('input', function() {
            operationState.currentScale = parseFloat(this.value);
            scaleValue.textContent = operationState.currentScale.toFixed(1) + 'x';
            applyTransformations();
            updateInfoPanels();
        });
    }
}

export function updateRotationControls() {
    const { rotationRange, rotationValue } = getDOMReferences();
    if (rotationRange && rotationValue) {
        rotationRange.value = operationState.currentRotation;
        rotationValue.textContent = operationState.currentRotation + '°';
    }
}

export function updateScaleControls() {
    const { scaleRange, scaleValue } = getDOMReferences();
    if (scaleRange && scaleValue) {
        scaleRange.value = operationState.currentScale;
        scaleValue.textContent = operationState.currentScale.toFixed(1) + 'x';
    }
}

export function updateDisplayValues() {
    updateRotationControls();
    updateScaleControls();
    
    const { rangeValue } = getDOMReferences();
    if (rangeValue) {
        const iterationRange = document.getElementById('iterationRange');
        if (iterationRange) {
            rangeValue.textContent = iterationRange.value;
        }
    }
}

export function updateInfoPanels() {
    const zoomInfo = document.getElementById('zoomInfo');
    const positionInfo = document.getElementById('positionInfo');
    
    if (zoomInfo) {
        if (operationState.currentFractalType === 'mandelbrot' || operationState.currentFractalType === 'julia') {
            zoomInfo.textContent = `Fractal: ${operationState.currentFractalType}`;
        } else {
            zoomInfo.textContent = `Zoom: ${operationState.currentScale.toFixed(1)}x`;
        }
    }
    
    if (positionInfo) {
        positionInfo.textContent = `Rotación: ${operationState.currentRotation}°`;
    }
}