import * as THREE from 'three';

export function generateMandelbrot(resolution = 1000, maxIterations = 1000) {
    const root = new THREE.Group();

    // Rango del plano complejo
    const xmin = -2.5, xmax = 1;
    const ymin = -1.25, ymax = 1.25;
    
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];

    for (let px = 0; px < resolution; px++) {
        for (let py = 0; py < resolution; py++) {
            const x0 = xmin + (px / resolution) * (xmax - xmin);
            const y0 = ymin + (py / resolution) * (ymax - ymin);
            let x = 0, y = 0;
            let iteration = 0;

            while (x*x + y*y <= 4 && iteration < maxIterations) {
                const xtemp = x*x - y*y + x0;
                y = 2*x*y + y0;
                x = xtemp;
                iteration++;
            }

            if (iteration === maxIterations) {
                const worldX = (x0 / (xmax - xmin)) * 20 - 5;
                const worldY = (y0 / (ymax - ymin)) * 20 - 5;
                
                positions.push(worldX, worldY, 0);
                
                colors.push(0, 0, 0);
            }
        }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });

    const points = new THREE.Points(geometry, material);
    root.add(points);

    return root;
}
