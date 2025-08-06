import * as THREE from 'three';
import { createFractalTree } from './fractalTree.js';
import { generateKochCurve } from './kochCurve.js';
import { generateSierpinskyTriangle } from './sierpinskyTriangle.js';
import { generateJulia } from './julia.js';
import { generateMandelbrot } from './madelbrot.js';

const menu = document.getElementById('menu');
const range = document.getElementById('iterationRange');
const title = document.getElementById('title');

let isOverMenu = false;

// When mouse moves
document.addEventListener('mousemove', (e) => {
  if (e.clientX < 50)
    menu.classList.add('visible');
  else if (!isOverMenu)
    menu.classList.remove('visible');
});

// Detects if the mouse is inside the menu
menu.addEventListener('mouseenter', () => {
  isOverMenu = true;
});

// Detects if the mouse leaves the menu
menu.addEventListener('mouseleave', () => {
  isOverMenu = false;
  menu.classList.remove('visible');
});

let currentFractal = null;

function renderFractal(fractal, name) {
  if (currentFractal)
    scene.remove(currentFractal);

  currentFractal = fractal;
  scene.add(currentFractal);
  renderer.render(scene, camera);

  title.innerText = name;
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.set(0, 6, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// Buttons
document.getElementById('btnTree').addEventListener('click', () => renderFractal(createFractalTree(), 'Árbol Fractal'));
document.getElementById('btnKoch').addEventListener('click', () => renderFractal(generateKochCurve(range.value), 'Curva de Koch'));
document.getElementById('btnSierpinsky').addEventListener('click', () => renderFractal(generateSierpinskyTriangle(range.value), 'Triángulo de Sierpinsky'));


// arbol fractal
//const fractal = createFractalTree();

// Curva de Koch
//const fractal = generateKochCurve(3);

// Madelbrot
//const fractal = generateMandelbrot()

//Julia
//const fractal = generateJulia()

// Triángulo de Sierpinsky
//const fractal = generateSierpinskyTriangle(3);

// scene.add(fractal);  // COMENTADO - causaba error

// renderer.render(scene, camera);  // COMENTADO - se renderiza en renderFractal()

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
