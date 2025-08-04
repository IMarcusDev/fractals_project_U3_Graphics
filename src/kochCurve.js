import * as THREE from 'three';

export function generateKochCurve(steps) {
  const sideLength = 10;
  const root = new THREE.Group();
  const property = Math.sqrt(3) / 2;  // Prop Trigonométrica
  let points = [];

  // Triángulo inicial (step 1)
  points.push( new THREE.Vector3( -sideLength / 2, 0, 0 ) );
  points.push( new THREE.Vector3( 0, sideLength * property, 0 ) );
  points.push( new THREE.Vector3( sideLength / 2, 0, 0 ) );
  points.push( points[0] );

  if (steps < 1) return;  // No check in the loops

  for (let step = 1; step < steps; step++) {
    const newPoints = [];

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];

      const v = new THREE.Vector3().subVectors(p2, p1);  // b - a; p2 - p1
      const first = new THREE.Vector3().addVectors(p1, v.clone().multiplyScalar(1 / 3));  // Primer Tercio
      const second = new THREE.Vector3().addVectors(p1, v.clone().multiplyScalar(2 / 3));  // Segundo Tercio

      // const deg = Math.PI / 3; // 60 deg
      const dir = v.clone().normalize();  // Ángulo de Dirección
      const length = v.length() / 3;
      const perpendicular = new THREE.Vector3(-dir.y, dir.x, 0).normalize().multiplyScalar(length * property);  // Dirección Perpendicular

      const spike = new THREE.Vector3()
        .addVectors(new THREE.Vector3()
        .addVectors(first, second)
        .multiplyScalar(0.5), perpendicular);

      newPoints.push(p1);
      newPoints.push(first);
      newPoints.push(spike);
      newPoints.push(second);
    }

    newPoints.push(points[points.length - 1]);
    points = newPoints;
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

  root.add(new THREE.Line( geometry, material ));

  return root;
}
