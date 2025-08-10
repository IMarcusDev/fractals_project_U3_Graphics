import { initOperations, applyTransformations, updateCurrentFractal, regenerateCurrentFractal } from './core.js';
import { setupEventListeners, updateDisplayValues } from './ui.js';
import { setupKeyboardControls, setupGlobalTransformControls } from './controls.js';
import { setupGlobalSaveFunction } from './save.js';

export function initializeOperations(scene, camera, renderer) {
    initOperations(scene, camera, renderer);
    
    setupEventListeners();
    updateDisplayValues();
    
    setupKeyboardControls();
    setupGlobalTransformControls();
    
    setupGlobalSaveFunction();
}

export {
    applyTransformations,
    updateCurrentFractal,
    regenerateCurrentFractal
} from './core.js';

export {
    setupKeyboardControls
} from './controls.js';