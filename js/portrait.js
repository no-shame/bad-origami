import * as THREE from 'https://threejs.org/build/three.module.js';

class Portrait {

 boxMaterial = new THREE.MeshPhongMaterial( { specular: 0xffffff, flatShading: true, vertexColors: false } );
 


 
	
  constructor(x_diff, z_diff, spread, geo, font, posVec, texture) {
    // this.height = height;
    // this.width = width;

    // var message = "some text";
    // var shapes = font.generateShapes( message, 8 );

    this.speed = Math.random() * 7 + 0.2;

    this.portraitMaterial = new THREE.MeshPhongMaterial( { specular: 0xffffff, flatShading: true, vertexColors: false, side: THREE.DoubleSide } );
    this.portraitMaterial.map = texture;
    this.portraitMaterial.color.setHSL( 1, 1 ,1);

    this.portraitMaterial.opacity = 0.0;
    this.portraitMaterial.transparent = true;

    this.box = new THREE.Mesh( geo, this.portraitMaterial );
    var xOffset = (x_diff > 0) ? -(spread * 10 /2): (spread * 10 / 2);
    this.box.position.x = Math.floor( Math.random() * 20 - 10 ) * spread +  posVec[0] + xOffset;
    this.box.position.y = Math.random() * 200 -200;
    this.originalY = this.box.position.y;
    this.targetY = Math.floor( Math.random() * 20 ) * 35 + 0.5;
    var zOffset = (z_diff > 0) ? -(spread * 10 /2): (spread * 10 / 2);
    this.box.position.z = Math.floor( Math.random() * 20 - 10 ) * spread  +  posVec[2] + zOffset;

    if(Math.random() > 0.75)
      this.box.rotation.y = Math.PI / 2;


    var scale = Math.random() * 7.0 + 0.15;
    this.box.scale.set(scale, scale, scale);




  }


    ascend() {
        if(this.box.position.y < this.targetY){
            this.box.position.y += this.speed;

            this.initialDiff = this.originalY - this.targetY;
            this.diff = this.box.position.y - this.targetY;
            this.portraitMaterial.opacity = 1 - this.diff / this.initialDiff;
        }
    }





}

export {Portrait};