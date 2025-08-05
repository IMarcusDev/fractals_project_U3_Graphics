import * as THREE from 'three';

export function generateJulia(width = 512, height = 512, maxIterations = 100, cRe = -0.7, cIm = 0.27015) {
    const root = new THREE.Group();

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    // Rango del plano complejo
    const xmin = -2.5, xmax = 1;
    const ymin = -1.5, ymax = 3.5;

    for (let px = 0; px < width; px++) {
        for (let py = 0; py < height; py++) {
            const zx0 = xmin + (px / width) * (xmax - xmin);
            const zy0 = ymin + (py / height) * (ymax - ymin);

            let zx = zx0;
            let zy = zy0;
            let iteration = 0;

            while (zx * zx + zy * zy <= 4 && iteration < maxIterations) {
                const xtemp = zx * zx - zy * zy + cRe;
                zy = 2 * zx * zy + cIm;
                zx = xtemp;
                iteration++;
            }

            const pixelIndex = 4 * (py * width + px);
            const color = iteration === maxIterations ? 0 : 255 - (iteration * 10 % 255);

            data[pixelIndex + 100] = color;
            data[pixelIndex + 1] = color;
            data[pixelIndex + 2] = color;
            data[pixelIndex + 3] = 255;
        }
    }

    ctx.putImageData(imageData, 0, 0);
    
    // Crear textura desde el canvas
    const texture = new THREE.CanvasTexture(canvas);

    // Crear plano y aplicarle la textura
    const geometry = new THREE.PlaneGeometry(20, 30); // Ajusta escala visual
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);
    root.add(plane);

    return root;
}
