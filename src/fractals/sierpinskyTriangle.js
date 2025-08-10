import * as THREE from 'three';

export function generateSierpinskyTriangle(steps) {
    const sideLength = 10;
    const root = new THREE.Group();
    const height = Math.sqrt(3) / 2 * sideLength;

    if (steps < 1) {
        hideCanvasElements();
        return root;
    }

    let triangles = [[
        new THREE.Vector3(-sideLength / 2, 0, 0),
        new THREE.Vector3(0, height, 0),
        new THREE.Vector3(sideLength / 2, 0, 0)
    ]];

    for (let step = 1; step < steps; step++) {
        const newTriangles = [];

        for (const [a, b, c] of triangles) {
            const ab = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
            const bc = new THREE.Vector3().addVectors(b, c).multiplyScalar(0.5);
            const ca = new THREE.Vector3().addVectors(c, a).multiplyScalar(0.5);

            newTriangles.push([a, ab, ca], [ab, b, bc], [ca, bc, c]);
        }

        triangles = newTriangles;
    }

    const material = new THREE.LineBasicMaterial({ color: 0x000000 });

    for (const [a, b, c] of triangles) {
        const t = [a, b, c, a];
        const geometry = new THREE.BufferGeometry().setFromPoints(t);
        const line = new THREE.Line(geometry, material);
        root.add(line);
    }
    
    root.position.set(0, -height/3, 0);
    hideCanvasElements();
    return root;
}

function hideCanvasElements() {
    const mandelbrotStyle = document.getElementById('mandelbrot-style');
    const juliaStyle = document.getElementById('julia-style');
    if (mandelbrotStyle) mandelbrotStyle.style.display = 'none';
    if (juliaStyle) juliaStyle.style.display = 'none';
}