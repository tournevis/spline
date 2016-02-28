import THREE from 'three';

export default class Spline extends THREE.Object3D {
  constructor() {
    super();
    this.splice = innerWidth/256 ;
    this.decalX = innerWidth/2;
    this.points = [];

    for (var i = 0; i < 256; i++) {
      	this.points.push(new THREE.Vector3(this.splice * i - this.decalX , 0, -500 ));
     }
    this.curve = new THREE.CatmullRomCurve3(this.points);
    this.geometry = new THREE.Geometry();
    this.geometry.vertices = this.curve.getPoints( this.points.length-1 );
    this.material = new THREE.LineBasicMaterial( { color : 0xff00f0, linewidth: 10, linecap: 'round' } );

    //Create the final Object3d to add to the scene
    this.splineObject = new THREE.Line( this.geometry, this.material );
    this.add(this.splineObject);
    this.splineObject.dynamic = true;
    console.log(this.splineObject);
  }

  soundData(data){
    this.myData = data;
    //console.log(this.myData.length);
  }

  update() {
    this.splineObject.geometry.verticesNeedUpdate = true;

    for (var i = 0; i < this.points.length ; i++) {
      this.splineObject.geometry.vertices[i].y =  this.myData[i]*0.5;
    }

  }
}
