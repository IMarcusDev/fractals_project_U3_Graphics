import * as THREE from 'three';

export function generateSierpinskyTriangle(steps) {
  const sideLength = 10;
  const root = new THREE.Group();
  const height = Math.sqrt(3) / 2 * sideLength;

  if (steps < 1) return root;

  // Listado de Triángulos
  let triangles = [[
    // Triángulo Inicial
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

      // Crear nuevos triángulos (sin centro)
      newTriangles.push([a, ab, ca]);
      newTriangles.push([ab, b, bc]);
      newTriangles.push([ca, bc, c]);
    }

    triangles = newTriangles;
  }

  const material = new THREE.LineBasicMaterial({ color: 0x000000 });

  // Add Triangules to Root
  for (const [a, b, c] of triangles) {
    const t = [a, b, c, a];  // Triángulo cerrado (con valor final)

    const geometry = new THREE.BufferGeometry().setFromPoints(t);
    const line = new THREE.Line(geometry, material);
    root.add(line);
  }

  return root;
}
