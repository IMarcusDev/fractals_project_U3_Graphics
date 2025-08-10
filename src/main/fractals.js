import { createFractalTree } from '../fractals/fractalTree.js';
import { generateKochCurve } from '../fractals/kochCurve.js';
import { generateSierpinskyTriangle } from '../fractals/sierpinskyTriangle.js';
import { generateJulia } from '../fractals/julia.js';
import { generateMandelbrot} from '../fractals/mandelbrot.js';

export class FractalManager {
    constructor(sceneManager, uiManager) {
        this.sceneManager = sceneManager;
        this.uiManager = uiManager;
    }
    
    init(panControls, updateCurrentFractal) {
        this.panControls = panControls;
        this.updateCurrentFractal = updateCurrentFractal;
        this.setupFractalButtons();
        this.setupRegenerationListener();
    }
    
    generateWithLoading(generator, name, type, depth) {
        this.uiManager.showLoadingIndicator(`Generando ${name}...`);
        setTimeout(() => {
            const fractal = generator(depth);
            this.sceneManager.renderFractal(fractal, name, type, this.panControls, this.updateCurrentFractal);
            this.uiManager.hideLoadingIndicator();
        }, 100);
    }
    
    generate2DWithLoading(generator, name, type) {
        this.uiManager.showLoadingIndicator(`Generando ${name}...`);
        setTimeout(() => {
            generator();
            this.sceneManager.renderFractal(null, name, type, this.panControls, this.updateCurrentFractal);
            this.uiManager.hideLoadingIndicator();
        }, 100);
    }
    
    setupFractalButtons() {
        const fractalButtons = [
            { id: 'btnTree', generator: createFractalTree, name: 'Árbol fractal', type: 'tree', is3D: true },
            { id: 'btnKoch', generator: generateKochCurve, name: 'Curva de Koch', type: 'koch', is3D: true },
            { id: 'btnSierpinsky', generator: generateSierpinskyTriangle, name: 'Triángulo de Sierpinski', type: 'sierpinsky', is3D: true },
            { id: 'btnMandelbrot', generator: generateMandelbrot, name: 'Conjunto de Mandelbrot', type: 'mandelbrot', is3D: false },
            { id: 'btnJulia', generator: generateJulia, name: 'Conjunto de Julia', type: 'julia', is3D: false }
        ];
        
        fractalButtons.forEach(({ id, generator, name, type, is3D }) => {
            document.getElementById(id).addEventListener('click', () => {
                if (is3D) {
                    this.generateWithLoading(generator, name, type, this.uiManager.getCurrentDepth());
                } else {
                    this.generate2DWithLoading(generator, name, type);
                }
            });
        });
    }
    
    setupRegenerationListener() {
        document.addEventListener('regenerateFractal', (e) => {
            const { type, depth } = e.detail;
            this.uiManager.showLoadingIndicator(`Regenerando ${type}...`);
            
            setTimeout(() => {
                this.regenerateFractal(type, depth);
                this.uiManager.hideLoadingIndicator();
            }, 100);
        });
    }
    
    regenerateFractal(type, depth) {
        const fractalMap = {
            'tree': () => this.sceneManager.renderFractal(
                createFractalTree(depth), 'Árbol fractal', 'tree', this.panControls, this.updateCurrentFractal
            ),
            'koch': () => this.sceneManager.renderFractal(
                generateKochCurve(depth), 'Curva de Koch', 'koch', this.panControls, this.updateCurrentFractal
            ),
            'sierpinsky': () => this.sceneManager.renderFractal(
                generateSierpinskyTriangle(depth), 'Triángulo de Sierpinski', 'sierpinsky', this.panControls, this.updateCurrentFractal
            ),
            'mandelbrot': () => {
                generateMandelbrot();
                this.sceneManager.renderFractal(null, 'Conjunto de Mandelbrot', 'mandelbrot', this.panControls, this.updateCurrentFractal);
            },
            'julia': () => {
                generateJulia();
                this.sceneManager.renderFractal(null, 'Conjunto de Julia', 'julia', this.panControls, this.updateCurrentFractal);
            }
        };
        
        if (fractalMap[type]) {
            fractalMap[type]();
        }
    }
}