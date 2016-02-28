import THREE from 'three';

export default class Spline extends THREE.Object3D {
  constructor() {
    super();
    this.splice = innerWidth/256 ;
    this.decalX = innerWidth/2;
    this.splineGeometry = new THREE.Geometry();

    for (var i = 0; i < 256; i++) {
      	var vert = new THREE.Vector3(this.splice * i - this.decalX , 0, 10 );
        this.splineGeometry.vertices.push(vert);
     }
    this.curve = new THREE.CatmullRomCurve3(this.splineGeometry.vertices);

    this.geometry = new THREE.Geometry();

    this.geometry.vertices = this.curve.getPoints( 150 );


    this.material = new THREE.LineBasicMaterial( { color : 0xff00f0, linewidth: 10, linecap: 'round' } );

    //Create the final Object3d to add to the scene
    this.splineObject = new THREE.Line( this.geometry, this.material );

    this.splineObject.geometry.verticesNeedUpdate = true;
    this.add(this.splineObject);
    console.log(this.splineObject);
  }

  soundData(data){
    this.myData = data;
    //console.log(this.myData.length);
  }

  update() {
    //this.splineGeometry.verticesNeedUpdate = true;
  this.geometry.verticesNeedUpdate = true;

  //  this.rotation.x += 0.01;
  //  this.rotation.z += 0.01;
  //console.log(this.splineGeometry);
  console.log(this.splineObject.geometry.verticesNeedUpdate);
    for (var i = 0; i < this.splineObject.geometry.length; i++) {
      this.splineObject.geometry[i].vertices.y *= this.myData[i]*200;
    }

  }
}
