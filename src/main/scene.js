import * as THREE from 'three';

export class SceneManager {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.currentFractal = null;
    }
    
    init() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.setupLighting();
    }
    
    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);
    }
    
    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(0, 6, 8);
    }
    
    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            preserveDrawingBuffer: true,
            alpha: false,
            powerPreference: "high-performance"
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0xffffff, 1);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        document.getElementById('app').appendChild(this.renderer.domElement);
    }
    
    setupLighting() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 7);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        this.scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0xffffff, 0.4);
        pointLight.position.set(-5, 5, 5);
        this.scene.add(pointLight);
    }
    
    renderFractal(fractal, name, type, panControls, updateCurrentFractal) {
        if (this.currentFractal) this.scene.remove(this.currentFractal);

        this.currentFractal = fractal;
        if (fractal) {
            this.scene.add(fractal);
            if (panControls) {
                setTimeout(() => panControls.centerOnObject(true), 100);
            }
        }
        
        const title = document.getElementById('title');
        title.innerText = name;
        updateCurrentFractal(fractal, type);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }
    
    handleResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    dispose() {
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
    
    getSceneObjects() {
        return {
            scene: this.scene,
            camera: this.camera,
            renderer: this.renderer
        };
    }
}