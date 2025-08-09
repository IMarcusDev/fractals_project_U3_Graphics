let canvas = document.getElementById('mandelbrot');
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;

// Parámetros iniciales
let centerX = -0.5;
let centerY = 0;
let scale = 3;
let maxIter = 100;

function drawMandelbrot() {
  let img = ctx.createImageData(width, height);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let zx = centerX + (x - width/2) * scale / width;
      let zy = centerY + (y - height/2) * scale / width;
      let i = mandelbrot(zx, zy);
      let color = i === maxIter ? 0 : 255 - Math.floor(255 * i / maxIter);
      let idx = (y * width + x) * 4;
      img.data[idx] = color;
      img.data[idx+1] = color;
      img.data[idx+2] = color;
      img.data[idx+3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
}

function mandelbrot(cx, cy) {
  let zx = 0, zy = 0, iter = 0;
  while (zx*zx + zy*zy < 4 && iter < maxIter) {
    let xt = zx*zx - zy*zy + cx;
    zy = 2*zx*zy + cy;
    zx = xt;
    iter++;
  }
  return iter;
}

drawMandelbrot();

// Interacción
function zoom(factor) {
  scale *= 1/factor;
  drawMandelbrot();
}

function move(dir) {
  let step = scale * 0.2;
  if (dir === 'left') centerX -= step;
  if (dir === 'right') centerX += step;
  if (dir === 'up') centerY -= step;
  if (dir === 'down') centerY += step;
  drawMandelbrot();
}

export function generateMandelbrot(){
  document.getElementById('mandelbrot-style').style.display = 'block';
  document.getElementById('julia-style').style.display = "none"

}

window.zoom = zoom;
window.move = move;

document.addEventListener('keydown', function(e) {
  switch(e.key) {
    case 'ArrowLeft':
      move('left');
      break;
    case 'ArrowRight':
      move('right');
      break;
    case 'ArrowUp':
      move('up');
      break;
    case 'ArrowDown':
      move('down');
      break;
    case '+':
    case '=': // Para la tecla "+" en algunos teclados
      zoom(1.5);
      break;
    case '-':
      zoom(0.67);
      break;
  }
});

