import * as THREE from 'three';

export function createFractalTree(depth) {
  const root = new THREE.Group();

  function buildBranch(parent, length, depth, maxDepth) {
    if (length < 0.2 || depth > maxDepth) return;

    const geometry = new THREE.CylinderGeometry(0.02 * length, 0.02 * length, length, 8);
    const material = new THREE.MeshStandardMaterial({
      color: length < 0.4 ? 0x006400 : 0x8B4513,
    });

    const branch = new THREE.Mesh(geometry, material);
    branch.position.y = length / 2;

    const container = new THREE.Group();
    container.add(branch);
    parent.add(container);

    const numBranches = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < numBranches; i++) {
      const child = new THREE.Group();

      const angleX = THREE.MathUtils.randFloat(-Math.PI / 6, Math.PI / 6);
      const angleZ = THREE.MathUtils.randFloat(-Math.PI / 6, Math.PI / 6);

      child.rotation.x = angleX;
      child.rotation.z = angleZ;
      child.position.y = length;

      container.add(child);
      const scale = THREE.MathUtils.randFloat(0.6, 0.9);
      buildBranch(child, length * scale, depth + 1, maxDepth);
    }
  }

  buildBranch(root, 2.5, 0, depth);
  document.getElementById('mandelbrot-style').style.display = 'none';
  document.getElementById('julia-style').style.display = "none"
  return root;
}
