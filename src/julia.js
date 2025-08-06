import * as THREE from 'three';

export function generateJulia(resolution = 1000, maxIterations = 50, cRe = -0.8, cIm = 0.156) {
    const root = new THREE.Group();

    // Rango del plano complejo
    const xmin = -2.5, xmax = 1;
    const ymin = -1.25, ymax = 1.25;


    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];

    for (let px = 0; px < resolution; px++) {
        for (let py = 0; py < resolution; py++) {
            const zx0 = xmin + (px / resolution) * (xmax - xmin);
            const zy0 = ymin + (py / resolution) * (ymax - ymin);

            let zx = zx0;
            let zy = zy0;
            let iteration = 0;

            while (zx * zx + zy * zy <= 4 && iteration < maxIterations) {
                const xtemp = zx * zx - zy * zy + cRe;
                zy = 2 * zx * zy + cIm;
                zx = xtemp;
                iteration++;
            }

            if (iteration === maxIterations) {

                const worldX = (zx0 / (xmax - xmin)) * 20 - 5;
                const worldY = (zy0 / (ymax - ymin)) * 20 - 5;
                
                positions.push(worldX, worldY, 0);
                
                colors.push(0, 0, 0);
            }
        }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.9
    });

    const points = new THREE.Points(geometry, material);
    root.add(points);

    return root;
}
