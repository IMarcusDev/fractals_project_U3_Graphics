import { operationState, applyTransformations, regenerateCurrentFractal } from './core.js';
import { updateRotationControls, updateScaleControls, updateDisplayValues } from './ui.js';
export function setupKeyboardControls() {
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'r':
            case 'R':
                if (window.rotateRight) window.rotateRight();
                break;
            case 'q':
            case 'Q':
                if (window.rotateLeft) window.rotateLeft();
                break;
            case '+':
            case '=':
                if (window.zoomIn) window.zoomIn();
                break;
            case '-':
                if (window.zoomOut) window.zoomOut();
                break;
            case ' ':
                e.preventDefault();
                regenerateCurrentFractal();
                break;
            case 's':
            case 'S':
                e.preventDefault();
                if (window.saveCurrentFractal) window.saveCurrentFractal();
                break;
            case 't':
            case 'T':
                if (window.resetTransformations) window.resetTransformations();
                break;
            case 'g':
            case 'G':
                if (window.randomize) window.randomize();
                break;
        }
    });
}

function autoRotateLoop() {
    if (operationState.autoRotateEnabled) {
        operationState.currentRotation = (operationState.currentRotation + 2) % 360;
        updateRotationControls();
        applyTransformations();
        requestAnimationFrame(autoRotateLoop);
    }
}

export function setupGlobalTransformControls() {
    if (typeof window !== 'undefined') {
        window.rotateLeft = function() {
            operationState.currentRotation = (operationState.currentRotation - 15) % 360;
            if (operationState.currentRotation < 0) operationState.currentRotation += 360;
            updateRotationControls();
            applyTransformations();
        };

        window.rotateRight = function() {
            operationState.currentRotation = (operationState.currentRotation + 15) % 360;
            updateRotationControls();
            applyTransformations();
        };

        window.zoomIn = function() {
            if (operationState.currentFractalType === 'mandelbrot' && window.zoom) {
                window.zoom(1.5);
            } else if (operationState.currentFractalType === 'julia' && window.zoomJulia) {
                window.zoomJulia(1.5);
            } else {
                operationState.currentScale = Math.min(10, operationState.currentScale * 1.2);
                updateScaleControls();
                applyTransformations();
            }
        };

        window.zoomOut = function() {
            if (operationState.currentFractalType === 'mandelbrot' && window.zoom) {
                window.zoom(0.67);
            } else if (operationState.currentFractalType === 'julia' && window.zoomJulia) {
                window.zoomJulia(0.67);
            } else {
                operationState.currentScale = Math.max(0.1, operationState.currentScale / 1.2);
                updateScaleControls();
                applyTransformations();
            }
        };

        window.resetTransformations = function() {
            operationState.currentRotation = 0;
            operationState.currentScale = 1;
            updateDisplayValues();
            
            if (operationState.currentFractalType === 'mandelbrot' && window.resetMandelbrot) {
                window.resetMandelbrot();
            } else if (operationState.currentFractalType === 'julia' && window.resetJulia) {
                window.resetJulia();
            } else {
                applyTransformations();
            }
            
            if (window.resetView) {
                window.resetView();
            }
        };

        window.randomize = function() {
            operationState.currentRotation = Math.floor(Math.random() * 360);
            operationState.currentScale = 0.1 + Math.random() * 9.9;
            updateDisplayValues();
            applyTransformations();

            if (operationState.currentFractalType === 'julia' && window.randomJuliaC) {
                window.randomJuliaC();
            }
        };

        window.toggleAutoRotate = function() {
            operationState.autoRotateEnabled = !operationState.autoRotateEnabled;
            if (operationState.autoRotateEnabled) {
                autoRotateLoop();
            }
        };
    }
}