import THREE from 'three';

export default class Spline extends THREE.Object3D {
  constructor() {
    super();
    this.splice = innerWidth/256 ;
    this.decalX = innerWidth/2;
    this.points = [];
    this.colors = [];
    this.yvalues = new Float32Array(256);
    this.theta = new Float32Array(256);
    this.delta =0;
    this.period =50;
    this.dx = (2 * Math.PI / this.period) * this.splice ;

    for (var i = 0; i < 256; i++) {
      	this.points.push(new THREE.Vector3(this.splice * i - this.decalX , 0, -500 ));
        this.colors[ i ] = new THREE.Color( 0xffffff );
				this.colors[ i ].setHSL( 0.6, 1.0, Math.max( 0, i / 500 ) + 0.5 );
     }

    this.curve = new THREE.CatmullRomCurve3(this.points);
    this.geometry = new THREE.Geometry();
    this.geometry.colors = this.colors;
    this.geometry.vertices = this.curve.getPoints( this.points.length-1 );
    this.material = new THREE.LineBasicMaterial({ color : 0x00FFBF, linewidth: 10, vertexColors: THREE.VertexColors });

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


    for (var i = 0; i < this.myData.length; i++) {
      //  this.theta[i] += 0.001* ( this.myData[i] -100) ;
      var x = this.theta[i];
      this.yvalues[i] = Math.sin(x) * 50;
       x += this.dx;
    }
   //console.log(this.yvalues);
    for (var i = 0; i <  this.yvalues.length  ; i++) {

        this.splineObject.geometry.vertices[i].y =  this.yvalues[i];

    }
    //console.log(this.yvalues);
  }
}
