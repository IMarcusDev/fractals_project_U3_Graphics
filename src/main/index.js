import { SceneManager } from './scene.js';
import { UIManager } from './ui.js';
import { FractalManager } from './fractals.js';
import { NavigationManager } from './navigation.js';
import { PanControls } from '../controls/index.js';
import { initializeOperations, updateCurrentFractal } from '../operations/index.js';

class FractalApp {
    constructor() {
        this.sceneManager = new SceneManager();
        this.uiManager = new UIManager();
        this.fractalManager = null;
        this.navigationManager = null;
        this.panControls = null;
    }
    
    async init() {
        this.sceneManager.init();

        this.uiManager.init();

        const { scene, camera, renderer } = this.sceneManager.getSceneObjects();

        this.panControls = new PanControls(camera, renderer.domElement);

        initializeOperations(scene, camera, renderer);

        this.fractalManager = new FractalManager(this.sceneManager, this.uiManager);
        this.fractalManager.init(this.panControls, updateCurrentFractal);
        
        this.navigationManager = new NavigationManager(this.panControls);
        this.navigationManager.setupNavigationFunctions();
        this.navigationManager.setupAdditionalKeyboardControls();

        this.setupSystemEvents();

        this.sceneManager.animate();
    }
    
    setupSystemEvents() {
        window.addEventListener('resize', () => {
            this.sceneManager.handleResize();
        });
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });
    }
    
    cleanup() {
        if (this.panControls) {
            this.panControls.dispose();
        }
        if (this.sceneManager) {
            this.sceneManager.dispose();
        }
    }
}

const app = new FractalApp();
app.init().catch(console.error);