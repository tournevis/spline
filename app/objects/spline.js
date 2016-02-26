import THREE from 'three';

export default class Spline extends THREE.Object3D {
  constructor() {
    super();

    this.points =new THREE.Vector3( 0,0,0 );
    this.geo = new THREE.Spline(this.points);
    this.mat = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    this.mesh = new THREE.Mesh(this.geom, this.mat);

    this.add(this.mesh);
  }

  update() {
    this.rotation.x += 0.01;
    this.rotation.z += 0.01;
  }
}
