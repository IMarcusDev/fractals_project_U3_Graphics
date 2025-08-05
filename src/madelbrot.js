import * as THREE from 'three';

export function generateMadelbrot(width = 1512, height = 1512, maxIterations = 100) {
    const root = new THREE.Group();

    // Crear un canvas para dibujar el fractal y usarlo como textura
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    // Rango del plano complejo
    const xmin = -2.5, xmax = 1;
    const ymin = -1.5, ymax = 3.5;

    // Generar el fractal píxel por píxel
    for (let px = 0; px < width; px++) {
        for (let py = 0; py < height; py++) {
            const x0 = xmin + (px / width) * (xmax - xmin);
            const y0 = ymin + (py / height) * (ymax - ymin);
            let x = 0, y = 0;
            let iteration = 0;

            while (x*x + y*y <= 4 && iteration < maxIterations) {
                const xtemp = x*x - y*y + x0;
                y = 2*x*y + y0;
                x = xtemp;
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
