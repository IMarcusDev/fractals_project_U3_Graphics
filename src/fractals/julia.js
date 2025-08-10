let juliaCanvas = document.getElementById('julia');
let juliaCtx = juliaCanvas.getContext('2d');
let juliaWidth = juliaCanvas.width;
let juliaHeight = juliaCanvas.height;

let juliaCenterX = 0;
let juliaCenterY = 0;
let juliaScale = 3;
let juliaMaxIter = 150;

let cRe = -0.7;
let cIm = 0.27015;

function drawJulia() {
    let img = juliaCtx.createImageData(juliaWidth, juliaHeight);
    for (let x = 0; x < juliaWidth; x++) {
        for (let y = 0; y < juliaHeight; y++) {
            let zx = juliaCenterX + (x - juliaWidth/2) * juliaScale / juliaWidth;
            let zy = juliaCenterY + (y - juliaHeight/2) * juliaScale / juliaWidth;
            let i = julia(zx, zy);
            let color = i === juliaMaxIter ? 0 : 255 - Math.floor(255 * i / juliaMaxIter);
            let idx = (y * juliaWidth + x) * 4;
            img.data[idx] = color;
            img.data[idx+1] = color;
            img.data[idx+2] = color;
            img.data[idx+3] = 255;
        }
    }
    juliaCtx.putImageData(img, 0, 0);
}

function julia(zx, zy) {
    let iter = 0;
    while (zx*zx + zy*zy < 4 && iter < juliaMaxIter) {
        let xt = zx*zx - zy*zy + cRe;
        zy = 2*zx*zy + cIm;
        zx = xt;
        iter++;
    }
    return iter;
}

function zoomJulia(factor) {
    juliaScale *= 1/factor;
    drawJulia();
}

function moveJulia(dir) {
    let step = juliaScale * 0.2;
    if (dir === 'left') juliaCenterX -= step;
    if (dir === 'right') juliaCenterX += step;
    if (dir === 'up') juliaCenterY -= step;
    if (dir === 'down') juliaCenterY += step;
    drawJulia();
}

export function generateJulia(){
    document.getElementById('mandelbrot-style').style.display = 'none';
    document.getElementById('julia-style').style.display = "block";
}

window.zoomJulia = zoomJulia;
window.moveJulia = moveJulia;
window.resetJulia = function() {
    juliaCenterX = 0;
    juliaCenterY = 0;
    juliaScale = 3;
    drawJulia();
};

document.addEventListener('keydown', function(e) {
    const juliaKeyActions = {
        'ArrowLeft': () => moveJulia('left'),
        'ArrowRight': () => moveJulia('right'),
        'ArrowUp': () => moveJulia('up'),
        'ArrowDown': () => moveJulia('down'),
        '+': () => zoomJulia(1.5),
        '=': () => zoomJulia(1.5),
        '-': () => zoomJulia(0.67)
    };
    
    if (juliaKeyActions[e.key]) juliaKeyActions[e.key]();
});

drawJulia();