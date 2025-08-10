import * as THREE from 'three';

export function generateKochCurve(steps) {
    const sideLength = 10;
    const root = new THREE.Group();
    const property = Math.sqrt(3) / 2;
    let points = [];

    points.push(new THREE.Vector3(-sideLength / 2, 0, 0));
    points.push(new THREE.Vector3(0, sideLength * property, 0));
    points.push(new THREE.Vector3(sideLength / 2, 0, 0));
    points.push(points[0]);

    if (steps < 1) {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0x000000 });
        root.add(new THREE.Line(geometry, material));
        hideCanvasElements();
        return root;
    }

    for (let step = 1; step < steps; step++) {
        const newPoints = [];

        for (let i = 0; i < points.length - 1; i++) {
            const p1 = points[i];
            const p2 = points[i + 1];

            const v = new THREE.Vector3().subVectors(p2, p1);
            const first = new THREE.Vector3().addVectors(p1, v.clone().multiplyScalar(1 / 3));
            const second = new THREE.Vector3().addVectors(p1, v.clone().multiplyScalar(2 / 3));

            const dir = v.clone().normalize();
            const length = v.length() / 3;
            const perpendicular = new THREE.Vector3(-dir.y, dir.x, 0)
                .normalize()
                .multiplyScalar(length * property);

            const spike = new THREE.Vector3()
                .addVectors(new THREE.Vector3().addVectors(first, second).multiplyScalar(0.5), perpendicular);

            newPoints.push(p1, first, spike, second);
        }

        newPoints.push(points[points.length - 1]);
        points = newPoints;
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });
    root.add(new THREE.Line(geometry, material));
    
    hideCanvasElements();
    return root;
}

function hideCanvasElements() {
    const mandelbrotStyle = document.getElementById('mandelbrot-style');
    const juliaStyle = document.getElementById('julia-style');
    if (mandelbrotStyle) mandelbrotStyle.style.display = 'none';
    if (juliaStyle) juliaStyle.style.display = 'none';
}